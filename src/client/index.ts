import type { Command, Config } from '../types';
import { validateConfig } from '../utils/validation';
import { createCommandError } from '../utils/errorHandler';
import { CreatePayment, GetPayment, UpdatePayment, GetPayments } from '../commands/rest/payment';
import type { CreatePaymentInput, UpdatePaymentInput } from '../types/payment';

export const createClient = (initialConfig: Config) => {
  const errors = validateConfig(initialConfig);
  if (errors.length > 0) {
    throw createCommandError({
      message: `Invalid configuration: ${errors.join(', ')}`,
      code: 'invalid_config'
    });
  }
  const executeMiddlewares = async (
    phase: 'before' | 'after' | 'onError',
    command: Command<any, any>,
    data?: any
  ) => {
    if (!initialConfig.middlewares) return;

    for (const middleware of initialConfig.middlewares) {
      if (phase === 'before' && middleware.before) {
        await middleware.before(command);
      } else if (phase === 'after' && middleware.after) {
        await middleware.after(command, data);
      } else if (phase === 'onError' && middleware.onError) {
        await middleware.onError(command, data);
      }
    }
  };

  let currentConfig = { ...initialConfig };

  const requestHandler = async <TOutput>(command: Command<any, TOutput>): Promise<TOutput | undefined> => {
    try {
      await executeMiddlewares('before', command);
      const response = await command.execute(currentConfig);
      await executeMiddlewares('after', command, response);
      return response;
    } catch (error) {
      await executeMiddlewares('onError', command, error);
      throw error;
    }
  };

  const createApiMethods = (tenantId?: string) => {
    const effectiveTenantId = tenantId || currentConfig.tenantId;

    return {
      payment: {
        create: async (data: CreatePaymentInput) => {
          const command = CreatePayment({
            payment: data,
            tenantId: effectiveTenantId
          });
          return requestHandler(command);
        },
        get: async (id: string) => {
          const command = GetPayment({
            id,
            tenantId: effectiveTenantId
          });
          return requestHandler(command);
        },
        update: async (id: string, data: UpdatePaymentInput) => {
          const command = UpdatePayment({
            id,
            payment: data,
            tenantId: effectiveTenantId
          });
          return requestHandler(command);
        },
        list: () => {
          const query = GetPayments({ tenantId: effectiveTenantId });
          const queryBuilder = query.list();

          return {
            where: queryBuilder.where,
            limit: queryBuilder.limit,
            offset: queryBuilder.offset,
            execute: async () => {
              const command = queryBuilder.execute();
              return requestHandler(command);
            }
          };
        }
      }
    };
  };

  const createTenantContext = (tenantId: string) => createApiMethods(tenantId);

  return {
    setConfig: (config: Config) => {
      currentConfig = config;
    },
    updateConfig: (config: Partial<Config>) => {
      const newConfig = {
        ...currentConfig,
        ...config,
        axiosConfig: {
          ...currentConfig.axiosConfig,
          ...config.axiosConfig,
          headers: {
            ...currentConfig.axiosConfig?.headers,
            ...config.axiosConfig?.headers
          }
        }
      };

      const errors = validateConfig(newConfig);
      if (errors.length > 0) {
        throw createCommandError({
          message: `Invalid configuration: ${errors.join(', ')}`,
          code: 'invalid_config'
        });
      }
      currentConfig = newConfig;
    },
    resetConfig: () => {
      currentConfig = initialConfig;
    },
    request: requestHandler,
    tenant: createTenantContext,
    ...createApiMethods()
  };
};
