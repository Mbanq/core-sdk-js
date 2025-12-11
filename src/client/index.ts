import type { Command, Config, RequestOptions } from '../types';
import { validateConfig } from '../utils/validation';
import { createCommandError } from '../utils/errorHandler';

export const createInstance = (initialConfig: Config) => {
  let currentConfig = initialConfig;

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
    if (!currentConfig.middlewares) return;

    for (const middleware of currentConfig.middlewares) {
      if (phase === 'before' && middleware.before) {
        await middleware.before(command);
      } else if (phase === 'after' && middleware.after) {
        await middleware.after(command, data);
      } else if (phase === 'onError' && middleware.onError) {
        await middleware.onError(command, data);
      }
    }
  };

  const requestHandler = async <TInput, TOutput>(
    command: Command<TInput, TOutput>,
    options?: RequestOptions
  ): Promise<TOutput | undefined> => {
    try {
      await executeMiddlewares('before', command);

      // Merge RequestOptions into config only if options are provided
      let requestConfig: Config = currentConfig;

      if (options) {
        requestConfig = {
          ...currentConfig,
          ...(options.traceId && { traceId: options.traceId }),
          axiosConfig: {
            ...currentConfig.axiosConfig,
            ...(options.timeout && { timeout: options.timeout }),
            ...(options.keepAlive !== undefined && { keepAlive: options.keepAlive }),
            headers: {
              ...currentConfig.axiosConfig?.headers,
              ...options.headers
            }
          }
        };
      }

      const result = await command.execute(requestConfig);
      await executeMiddlewares('after', command, result);
      return result;
    } catch (error) {
      await executeMiddlewares('onError', command, error);
      throw error;
    }
  };

  const createTenantContext = (tenantId: string) => {
    return {
      request: <TInput, TOutput>(command: Command<TInput, TOutput>, options?: RequestOptions) => {
        // Override tenant ID for this specific request
        const commandWithTenant = {
          ...command,
          input: {
            ...command.input,
            tenantId
          }
        };
        return requestHandler(commandWithTenant, options);
      }
    };
  };

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
    tenant: createTenantContext
  };
};
