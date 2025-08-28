import type { Command, Config } from '../types';
import { validateConfig } from '../utils/validation';
import { createCommandError } from '../utils/errorHandler';
import { CreatePayment, GetPayment, UpdatePayment, DeletePayment, ListPayments } from '../commands/rest/payment';
import type { CreatePaymentInput, UpdatePaymentInput } from '../types/payment';
import { CreateClientRequest, UpdateClientIdentifierRequest, UpdateClientRequest } from '../types/client';
import { CreateClient, GetClient, ListClients, UpdateClient, UpdateClientIdentifier, DeleteClient } from '../commands/rest/client';
import { DeleteAccount, GetAccount, ListAccountsOfClient, UpdateAccount } from '../commands/rest/account';
import type { UpdateAccountRequest } from '../types/account';

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
        create: (data: CreatePaymentInput) => {
          const command = CreatePayment({
            payment: data,
            tenantId: effectiveTenantId
          });
          return {
            execute: async () => {
              return requestHandler(command);
            }
          };
        },
        get: (id: number) => {
          const command = GetPayment({
            id,
            tenantId: effectiveTenantId
          });
          return {
            execute: async () => {
              return requestHandler(command);
            }
          };
        },
        update: (id: number, data: UpdatePaymentInput) => {
          const command = UpdatePayment({
            id,
            payment: data,
            tenantId: effectiveTenantId
          });
          return {
            execute: async () => {
              return requestHandler(command);
            }
          };
        },
        delete: (id: number) => {
          const command = DeletePayment({
            id,
            tenantId: effectiveTenantId
          });
          return {
            execute: async () => {
              return requestHandler(command);
            }
          };
        },
        list: () => {
          const query = ListPayments({ tenantId: effectiveTenantId });
          const currentBuilder = query.list();

          const createChainableObject = (builder: any) => ({
            where: builder.where,
            limit: (value: number) => {
              const newBuilder = builder.limit(value);
              return createChainableObject(newBuilder);
            },
            offset: (value: number) => {
              const newBuilder = builder.offset(value);
              return createChainableObject(newBuilder);
            },
            all: () => {
              const newBuilder = builder.all();
              return createChainableObject(newBuilder);
            },
            execute: async () => {
              const command = builder.execute();
              return requestHandler(command);
            }
          });

          return createChainableObject(currentBuilder);
        }
      },
      client: {
        create: (data: CreateClientRequest) => {
          const command = CreateClient({
            clientData: data,
            tenantId: effectiveTenantId
          });
          return {
            execute: async () => {
              return requestHandler(command);
            }
          };
        },
        get: (id: number) => {
          const command = GetClient({
            clientId: id,
            tenantId: effectiveTenantId
          });
          return {
            execute: async () => {
              return requestHandler(command);
            }
          };
        },
        update: (id: number, data: UpdateClientRequest) => {
          const command = UpdateClient({
            clientId: id,
            updates: data,
            tenantId: effectiveTenantId
          });
          return {
            execute: async () => {
              return requestHandler(command);
            }
          };
        },
        updateDocumentRecord: (id: number, data: UpdateClientIdentifierRequest) => {
          const command = UpdateClientIdentifier({
            clientId: id,
            identifierId: data.id,
            updates: data,
            tenantId: effectiveTenantId
          });
          return {
            execute: async () => {
              return requestHandler(command);
            }
          };
        },
        delete: (id: number) => {
          const command = DeleteClient({
            clientId: id,
            tenantId: effectiveTenantId
          });
          return {
            execute: async () => {
              return requestHandler(command);
            }
          };
        },
        for: (clientId: string) => {
          const clientIdNumber = parseInt(clientId, 10);
          const query = ListAccountsOfClient({ clientId: clientIdNumber, tenantId: effectiveTenantId });
          const currentBuilder = query.list();

          // Shared function to execute and get all accounts
          const getAllAccounts = async () => {
            const command = currentBuilder.execute();
            const result: any = await requestHandler(command);
            return result?.savingsAccounts || [];
          };

          const createAccountChainableObject = (builder: any) => ({
            where: builder.where,
            execute: async () => {
              const command = builder.execute();
              return requestHandler(command);
            }
          });

          return {
            accounts: {
              get: (accountId: number) => ({
                execute: async () => {
                  const command = GetAccount({
                    id: accountId,
                    tenantId: effectiveTenantId
                  });
                  return requestHandler(command);
                }
              } as const),
              getFromList: (accountId: number) => ({
                execute: async () => {
                  const accounts = await getAllAccounts();
                  return accounts.find((acc: any) => acc.id === accountId) || null;
                }
              } as const),
              update: (accountId: string, updates: UpdateAccountRequest) => {
                const command = UpdateAccount({
                  clientId: clientIdNumber,
                  accountId,
                  updates,
                  tenantId: effectiveTenantId
                });
                return {
                  execute: async () => {
                    return requestHandler(command);
                  }
                };
              },
              delete: (accountId: string) => {
                const command = DeleteAccount({
                  accountId,
                  tenantId: effectiveTenantId
                });
                return {
                  execute: async () => {
                    return requestHandler(command);
                  }
                };
              },
              where: () => ({
                eq: () => ({
                  list: () => createAccountChainableObject(currentBuilder)
                })
              }),
              list: () => createAccountChainableObject(currentBuilder)
            }
          };
        },
        list: () => {
          const query = ListClients({ tenantId: effectiveTenantId });
          const currentBuilder = query.list();

          const createChainableObject = (builder: any) => ({
            where: builder.where,
            limit: (value: number) => {
              const newBuilder = builder.limit(value);
              return createChainableObject(newBuilder);
            },
            offset: (value: number) => {
              const newBuilder = builder.offset(value);
              return createChainableObject(newBuilder);
            },
            all: () => {
              const newBuilder = builder.all();
              return createChainableObject(newBuilder);
            },
            execute: async () => {
              const command = builder.execute();
              return requestHandler(command);
            }
          });

          return createChainableObject(currentBuilder);
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
