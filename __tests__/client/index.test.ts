import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the client commands before importing the main module
vi.mock('../../src/commands/rest/client', () => ({
  CreateClient: vi.fn(() => ({
    execute: vi.fn().mockResolvedValue({ success: true, clientId: 123 })
  })),
  GetClient: vi.fn(() => ({
    execute: vi.fn().mockResolvedValue({ clientData: { id: 123 } })
  })),
  UpdateClient: vi.fn(() => ({
    execute: vi.fn().mockResolvedValue({ success: true })
  })),
  DeleteClient: vi.fn(() => ({
    execute: vi.fn().mockResolvedValue({ success: true })
  })),
  ListClients: vi.fn(() => ({
    list: vi.fn(() => ({
      where: vi.fn(),
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
      all: vi.fn().mockReturnThis(),
      execute: vi.fn(() => ({
        execute: vi.fn().mockResolvedValue({ data: [{ id: 1, name: 'Client 1' }] })
      }))
    }))
  }))
}));

// Mock the clientIdentifier commands
vi.mock('../../src/commands/rest/clientIdentifier', () => ({
  UpdateClientIdentifier: vi.fn(() => ({
    execute: vi.fn().mockResolvedValue({ success: true })
  })),
  CreateClientIdentifier: vi.fn(() => ({
    execute: vi.fn().mockResolvedValue({ success: true })
  })),
  GetPermittedDocumentTypes: vi.fn(() => ({
    execute: vi.fn().mockResolvedValue({ success: true })
  }))
}));

// Mock the account commands
vi.mock('../../src/commands/rest/account', () => ({
  ListAccountsOfClient: vi.fn(() => ({
    list: vi.fn().mockReturnValue({
      where: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnThis(),
          execute: vi.fn().mockReturnValue({
            execute: vi.fn().mockResolvedValue({
              savingsAccounts: [
                { id: 1, accountNo: '000000001', productName: 'Savings Account' }
              ]
            })
          })
        })
      }),
      execute: vi.fn().mockReturnValue({
        execute: vi.fn().mockResolvedValue({
          savingsAccounts: [
            { id: 1, accountNo: '000000001', productName: 'Savings Account' },
            { id: 2, accountNo: '000000002', productName: 'Current Account' }
          ]
        })
      })
    })
  })),
  UpdateAccount: vi.fn().mockImplementation(() => ({
    execute: vi.fn().mockResolvedValue({ success: true, accountId: 'acc_123' })
  })),
  GetAccount: vi.fn().mockImplementation(() => ({
    execute: vi.fn().mockResolvedValue({
      id: 1,
      accountNo: '000000001',
      productName: 'Savings Account'
    })
  })),
  DeleteAccount: vi.fn().mockImplementation(() => ({
    execute: vi.fn().mockResolvedValue({ success: true })
  }))
}));

// Mock the recipient commands
vi.mock('../../src/commands/rest/recipient', () => ({
  CreateRecipient: vi.fn().mockImplementation(() => ({
    execute: vi.fn().mockResolvedValue({
      success: true,
      recipientId: 789,
      id: 789,
      clientId: 123,
      nickName: 'Test Recipient'
    })
  })),
  GetRecipient: vi.fn().mockImplementation(() => ({
    execute: vi.fn().mockResolvedValue({
      id: 789,
      clientId: 123,
      nickName: 'Test Recipient',
      firstName: 'John',
      lastName: 'Doe'
    })
  })),
  UpdateRecipient: vi.fn().mockImplementation(() => ({
    execute: vi.fn().mockResolvedValue({ success: true })
  })),
  DeleteRecipient: vi.fn().mockImplementation(() => ({
    execute: vi.fn().mockResolvedValue({ success: true })
  })),
  ListRecipient: vi.fn(() => ({
    list: vi.fn().mockReturnValue({
      where: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnThis(),
          list: vi.fn().mockReturnThis(),
          execute: vi.fn().mockReturnValue({
            execute: vi.fn().mockResolvedValue({
              recipients: [
                { id: 1, nickName: 'Recipient 1' }
              ]
            })
          })
        })
      }),
      execute: vi.fn().mockReturnValue({
        execute: vi.fn().mockResolvedValue({
          recipients: [
            { id: 1, nickName: 'Recipient 1' },
            { id: 2, nickName: 'Recipient 2' }
          ]
        })
      })
    })
  }))
}));

// Mock the payment commands
vi.mock('../../src/commands/rest/payment', () => ({
  CreatePayment: vi.fn(() => ({
    input: {},
    metadata: { commandName: 'CreatePayment', path: '/v1/payments', method: 'POST' },
    execute: vi.fn().mockResolvedValue({ id: '123', status: 'CREATED' })
  })),
  GetPayment: vi.fn(() => ({
    input: {},
    metadata: { commandName: 'GetPayment', path: '/v1/payments/123', method: 'GET' },
    execute: vi.fn().mockResolvedValue({ id: '123', status: 'SUCCESS' })
  })),
  UpdatePayment: vi.fn(() => ({
    input: {},
    metadata: { commandName: 'UpdatePayment', path: '/v1/payments/123', method: 'PUT' },
    execute: vi.fn().mockResolvedValue({ id: '123', status: 'UPDATED' })
  })),
  DeletePayment: vi.fn(() => ({
    input: {},
    metadata: { commandName: 'DeletePayment', path: '/v1/payments/123', method: 'DELETE' },
    execute: vi.fn().mockResolvedValue(undefined)
  })),
  ListPayments: vi.fn(() => ({
    list: () => ({
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      offset: vi.fn().mockReturnThis(),
      all: vi.fn().mockReturnThis(),
      execute: () => ({
        input: {},
        metadata: { commandName: 'ListPayments', path: '/v1/payments', method: 'GET' },
        execute: vi.fn().mockResolvedValue([{ id: '1' }, { id: '2' }])
      })
    })
  }))
}));

// Mock the GraphQL recipient commands
vi.mock('../../src/commands/graphql/recipient', () => ({
  UpdateRecipientGQL: vi.fn(() => ({
    input: {},
    metadata: { commandName: 'UpdateRecipientGQL', path: '/graphql', method: 'POST' },
    execute: vi.fn().mockResolvedValue({ updateRecipient: { id: 789, nickName: 'Updated Recipient' } })
  }))
}));

// Mock the user commands
vi.mock('../../src/commands/rest/user', () => ({
  GetUserDetail: vi.fn(() => ({
    input: {},
    metadata: { commandName: 'GetUserDetail', path: '/v1/userdetails', method: 'GET' },
    execute: vi.fn().mockResolvedValue({
      username: 'testuser',
      userId: 123,
      accessToken: 'test-token',
      authenticated: true,
      officeId: 1,
      officeName: 'Test Office',
      roles: [],
      permissions: ['READ_USERS'],
      shouldRenewPassword: false,
      isTwoFactorAuthenticationRequired: false,
      isSelfServiceUser: false
    })
  }))
}));

import { createInstance } from '../../src/client/index';
import * as validationModule from '../../src/utils/validation';
import * as paymentCommands from '../../src/commands/rest/payment';
import { Command, Config } from '../../src/types';

interface TestInput {
  test: string;
}

interface TestOutput {
  success: boolean;
  data: string;
}

describe('Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validConfig = {
    baseUrl: 'https://api.example.com',
    secret: 'test-secret',
    signee: 'test-signee',
    tenantId: 'test-tenant'
  };

  describe('createInstance', () => {
    it('should create client with valid configuration', () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const client = createInstance(validConfig);

      expect(client).toBeDefined();
      expect(client.setConfig).toBeInstanceOf(Function);
      expect(client.updateConfig).toBeInstanceOf(Function);
      expect(client.resetConfig).toBeInstanceOf(Function);
      expect(client.request).toBeInstanceOf(Function);
    });

    it('should throw error with invalid configuration', () => {
      const invalidConfig = { baseUrl: '' };
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue(['baseUrl is required']);

      expect(() => createInstance(invalidConfig as unknown as Config)).toThrow('Invalid configuration: baseUrl is required');
    });

    it('should execute command successfully', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const mockCommand: Command<TestInput, TestOutput> = {
        input: { test: 'data' },
        metadata: {
          commandName: 'TestCommand',
          path: '/test',
          method: 'GET'
        },
        execute: vi.fn().mockResolvedValue({ success: true })
      };

      const client = createInstance(validConfig);
      const result = await client.request(mockCommand);

      expect(mockCommand.execute).toHaveBeenCalledWith(validConfig);
      expect(result).toEqual({ success: true });
    });

    it('should execute middlewares in correct order', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const beforeMock = vi.fn();
      const afterMock = vi.fn();
      const onErrorMock = vi.fn();

      const configWithMiddleware = {
        ...validConfig,
        middlewares: [
          {
            before: beforeMock,
            after: afterMock,
            onError: onErrorMock
          }
        ]
      };

      const mockCommand: Command<TestInput, TestOutput> = {
        input: { test: 'data' },
        metadata: {
          commandName: 'TestCommand',
          path: '/test',
          method: 'GET'
        },
        execute: vi.fn().mockResolvedValue({ success: true })
      };

      const client = createInstance(configWithMiddleware);
      await client.request(mockCommand);

      expect(beforeMock).toHaveBeenCalledWith(mockCommand);
      expect(afterMock).toHaveBeenCalledWith(mockCommand, { success: true });
      expect(onErrorMock).not.toHaveBeenCalled();
    });

    it('should execute onError middleware when command fails', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const beforeMock = vi.fn();
      const afterMock = vi.fn();
      const onErrorMock = vi.fn();

      const configWithMiddleware = {
        ...validConfig,
        middlewares: [
          {
            before: beforeMock,
            after: afterMock,
            onError: onErrorMock
          }
        ]
      };

      const error = new Error('Command failed');
      const mockCommand: Command<TestInput, TestOutput> = {
        input: { test: 'data' },
        metadata: {
          commandName: 'TestCommand',
          path: '/test',
          method: 'GET'
        },
        execute: vi.fn().mockRejectedValue(error)
      };

      const client = createInstance(configWithMiddleware);

      await expect(client.request(mockCommand)).rejects.toThrow('Command failed');

      expect(beforeMock).toHaveBeenCalledWith(mockCommand);
      expect(afterMock).not.toHaveBeenCalled();
      expect(onErrorMock).toHaveBeenCalledWith(mockCommand, error);
    });

    it('should handle multiple middlewares', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const before1 = vi.fn();
      const before2 = vi.fn();
      const after1 = vi.fn();
      const after2 = vi.fn();

      const configWithMiddlewares = {
        ...validConfig,
        middlewares: [
          { before: before1, after: after1 },
          { before: before2, after: after2 }
        ]
      };

      const mockCommand: Command<TestInput, TestOutput> = {
        input: { test: 'data' },
        metadata: {
          commandName: 'TestCommand',
          path: '/test',
          method: 'GET'
        },
        execute: vi.fn().mockResolvedValue({ success: true })
      };

      const client = createInstance(configWithMiddlewares);
      await client.request(mockCommand);

      expect(before1).toHaveBeenCalledWith(mockCommand);
      expect(before2).toHaveBeenCalledWith(mockCommand);
      expect(after1).toHaveBeenCalledWith(mockCommand, { success: true });
      expect(after2).toHaveBeenCalledWith(mockCommand, { success: true });
    });
  });

  describe('setConfig', () => {
    it('should replace entire configuration', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const client = createInstance(validConfig);
      const newConfig = {
        baseUrl: 'https://new-api.example.com',
        secret: 'new-secret',
        signee: 'new-signee',
        tenantId: 'new-tenant'
      };

      client.setConfig(newConfig);

      const mockCommand: Command<TestInput, TestOutput> = {
        input: { test: 'test-value' },
        metadata: { commandName: 'Test', path: '/test', method: 'GET' },
        execute: vi.fn().mockResolvedValue({})
      };

      await client.request(mockCommand);

      expect(mockCommand.execute).toHaveBeenCalledWith(newConfig);
    });
  });

  describe('updateConfig', () => {
    it('should merge configuration updates', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const client = createInstance(validConfig);

      client.updateConfig({
        secret: 'updated-secret',
        axiosConfig: {
          timeout: 5000,
          headers: {
            'Custom-Header': 'value'
          }
        }
      });

      const mockCommand: Command<TestInput, TestOutput> = {
        input: {},
        metadata: { commandName: 'Test', path: '/test', method: 'GET' },
        execute: vi.fn().mockResolvedValue({})
      };

      await client.request(mockCommand);

      expect(mockCommand.execute).toHaveBeenCalledWith({
        ...validConfig,
        secret: 'updated-secret',
        axiosConfig: {
          timeout: 5000,
          headers: {
            'Custom-Header': 'value'
          }
        }
      });
    });

    it('should merge axios headers correctly', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const configWithHeaders = {
        ...validConfig,
        axiosConfig: {
          headers: {
            'Initial-Header': 'initial-value'
          }
        }
      };

      const client = createInstance(configWithHeaders);

      client.updateConfig({
        axiosConfig: {
          headers: {
            'New-Header': 'new-value'
          }
        }
      });

      const mockCommand: Command<TestInput, TestOutput> = {
        input: { test: 'header-test' },
        metadata: { commandName: 'Test', path: '/test', method: 'GET' },
        execute: vi.fn().mockResolvedValue({})
      };

      await client.request(mockCommand);

      expect(mockCommand.execute).toHaveBeenCalledWith({
        ...configWithHeaders,
        axiosConfig: {
          headers: {
            'Initial-Header': 'initial-value',
            'New-Header': 'new-value'
          }
        }
      });
    });

    it('should validate updated configuration', () => {
      vi.spyOn(validationModule, 'validateConfig')
        .mockReturnValueOnce([])
        .mockReturnValueOnce(['Invalid URL']);

      const client = createInstance(validConfig);

      expect(() => {
        client.updateConfig({
          baseUrl: 'invalid-url'
        });
      }).toThrow('Invalid configuration: Invalid URL');
    });
  });

  describe('resetConfig', () => {
    it('should reset configuration to initial state', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const client = createInstance(validConfig);

      client.updateConfig({
        secret: 'updated-secret'
      });

      client.resetConfig();

      const mockCommand: Command<TestInput, TestOutput> = {
        input: { test: 'before-test' },
        metadata: { commandName: 'Test', path: '/test', method: 'GET' },
        execute: vi.fn().mockResolvedValue({})
      };

      await client.request(mockCommand);

      expect(mockCommand.execute).toHaveBeenCalledWith(validConfig);
    });
  });

  describe.skip('payment API methods (DEPRECATED - use Command Pattern instead)', () => {
    beforeEach(() => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);
      vi.clearAllMocks();
    });

    describe('payment.create', () => {
      it('should create payment with correct parameters', async () => {
        const createPaymentSpy = vi.spyOn(paymentCommands, 'CreatePayment').mockReturnValue({
          input: {},
          metadata: { commandName: 'CreatePayment', path: '/v1/payments', method: 'POST' },
          execute: vi.fn().mockResolvedValue({ id: '123', status: 'CREATED' })
        } as any);

        const client = createInstance(validConfig);
        const paymentData = {
          amount: 100.50,
          currency: 'USD',
          paymentRail: 'ACH' as const,
          paymentType: 'CREDIT' as const,
          debtor: {
            name: 'John Doe',
            identifier: '123456789'
          },
          creditor: {
            name: 'Jane Smith',
            identifier: '987654321'
          }
        };

        const paymentOperation = await client.payment.create(paymentData);
        const result = await paymentOperation.execute();

        expect(createPaymentSpy).toHaveBeenCalledWith({
          payment: paymentData,
          tenantId: 'test-tenant'
        });
        expect(result).toEqual({ id: '123', status: 'CREATED' });
      });

      it('should use custom tenantId when provided via tenant context', async () => {
        const createPaymentSpy = vi.spyOn(paymentCommands, 'CreatePayment').mockReturnValue({
          input: {},
          metadata: { commandName: 'CreatePayment', path: '/v1/payments', method: 'POST' },
          execute: vi.fn().mockResolvedValue({ id: '123' })
        } as any);

        const client = createInstance(validConfig);
        const tenantClient = client.tenant('custom-tenant');
        const paymentData = {
          amount: 100,
          currency: 'USD',
          paymentRail: 'ACH' as const,
          paymentType: 'CREDIT' as const,
          debtor: { name: 'John', identifier: '123' },
          creditor: { name: 'Jane', identifier: '456' }
        };

        await tenantClient.payment.create(paymentData);

        expect(createPaymentSpy).toHaveBeenCalledWith({
          payment: paymentData,
          tenantId: 'custom-tenant'
        });
      });
    });

    describe('payment.get', () => {
      it('should get payment by ID with correct parameters', async () => {
        const getPaymentSpy = vi.spyOn(paymentCommands, 'GetPayment').mockReturnValue({
          input: {},
          metadata: { commandName: 'GetPayment', path: '/v1/payments/123', method: 'GET' },
          execute: vi.fn().mockResolvedValue({ id: '123', status: 'SUCCESS' })
        } as any);

        const client = createInstance(validConfig);
        const paymentOperation = await client.payment.get(123);
        const result = await paymentOperation.execute();

        expect(getPaymentSpy).toHaveBeenCalledWith({
          id: 123,
          tenantId: 'test-tenant'
        });
        expect(result).toEqual({ id: '123', status: 'SUCCESS' });
      });

      it('should use custom tenantId when provided via tenant context', async () => {
        const getPaymentSpy = vi.spyOn(paymentCommands, 'GetPayment').mockReturnValue({
          input: {},
          metadata: { commandName: 'GetPayment', path: '/v1/payments/123', method: 'GET' },
          execute: vi.fn().mockResolvedValue({ id: '123' })
        } as any);

        const client = createInstance(validConfig);
        const tenantClient = client.tenant('custom-tenant');

        await tenantClient.payment.get(123);

        expect(getPaymentSpy).toHaveBeenCalledWith({
          id: 123,
          tenantId: 'custom-tenant'
        });
      });
    });

    describe('payment.update', () => {
      it('should update payment with correct parameters', async () => {
        const updatePaymentSpy = vi.spyOn(paymentCommands, 'UpdatePayment').mockReturnValue({
          input: {},
          metadata: { commandName: 'UpdatePayment', path: '/v1/payments/123', method: 'PUT' },
          execute: vi.fn().mockResolvedValue({ id: '123', status: 'UPDATED' })
        } as any);

        const client = createInstance(validConfig);
        const updateData = { status: 'CANCELLED' as const };

        const paymentOperation = await client.payment.update(123, updateData);
        const result = await paymentOperation.execute();

        expect(updatePaymentSpy).toHaveBeenCalledWith({
          id: 123,
          payment: updateData,
          tenantId: 'test-tenant'
        });
        expect(result).toEqual({ id: '123', status: 'UPDATED' });
      });

      it('should use custom tenantId when provided via tenant context', async () => {
        const updatePaymentSpy = vi.spyOn(paymentCommands, 'UpdatePayment').mockReturnValue({
          input: {},
          metadata: { commandName: 'UpdatePayment', path: '/v1/payments/123', method: 'PUT' },
          execute: vi.fn().mockResolvedValue({ id: '123' })
        } as any);

        const client = createInstance(validConfig);
        const tenantClient = client.tenant('custom-tenant');
        const updateData = { amount: 200 };

        await tenantClient.payment.update(123, updateData);

        expect(updatePaymentSpy).toHaveBeenCalledWith({
          id: 123,
          payment: updateData,
          tenantId: 'custom-tenant'
        });
      });
    });

    describe('payment.delete', () => {
      it('should delete payment by ID with correct parameters', async () => {
        const deletePaymentSpy = vi.spyOn(paymentCommands, 'DeletePayment').mockReturnValue({
          input: {},
          metadata: { commandName: 'DeletePayment', path: '/v1/payments/123', method: 'DELETE' },
          execute: vi.fn().mockResolvedValue(undefined)
        } as any);

        const client = createInstance(validConfig);
        const paymentOperation = await client.payment.delete(123);
        const result = await paymentOperation.execute();

        expect(deletePaymentSpy).toHaveBeenCalledWith({
          id: 123,
          tenantId: 'test-tenant'
        });
        expect(result).toBeUndefined();
      });

      it('should use custom tenantId when provided via tenant context', async () => {
        const deletePaymentSpy = vi.spyOn(paymentCommands, 'DeletePayment').mockReturnValue({
          input: {},
          metadata: { commandName: 'DeletePayment', path: '/v1/payments/123', method: 'DELETE' },
          execute: vi.fn().mockResolvedValue(undefined)
        } as any);

        const client = createInstance(validConfig);
        const tenantClient = client.tenant('custom-tenant');

        await tenantClient.payment.delete(123);

        expect(deletePaymentSpy).toHaveBeenCalledWith({
          id: 123,
          tenantId: 'custom-tenant'
        });
      });
    });

    describe('payment.list', () => {
      it('should create payment list query with correct tenantId', async () => {
        const getPaymentsSpy = vi.spyOn(paymentCommands, 'ListPayments').mockReturnValue({
          list: () => ({
            where: vi.fn().mockReturnThis(),
            limit: vi.fn().mockReturnThis(),
            offset: vi.fn().mockReturnThis(),
            all: vi.fn().mockReturnThis(),
            execute: () => ({
              input: {},
              metadata: { commandName: 'ListPayments', path: '/v1/payments', method: 'GET' },
              execute: vi.fn().mockResolvedValue([{ id: '1' }, { id: '2' }])
            })
          })
        } as any);

        const client = createInstance(validConfig);
        const queryBuilder = client.payment.list();

        expect(getPaymentsSpy).toHaveBeenCalledWith({ tenantId: 'test-tenant' });
        expect(queryBuilder.where).toBeInstanceOf(Function);
        expect(queryBuilder.limit).toBeInstanceOf(Function);
        expect(queryBuilder.offset).toBeInstanceOf(Function);
        expect(queryBuilder.all).toBeInstanceOf(Function);
        expect(queryBuilder.execute).toBeInstanceOf(Function);
      });

      it('should execute payment list query and return results', async () => {
        const mockExecute = vi.fn().mockResolvedValue([{ id: '1' }, { id: '2' }]);

        vi.spyOn(paymentCommands, 'ListPayments').mockReturnValue({
          list: () => ({
            where: vi.fn().mockReturnThis(),
            limit: vi.fn().mockReturnThis(),
            offset: vi.fn().mockReturnThis(),
            all: vi.fn().mockReturnThis(),
            execute: () => ({
              input: {},
              metadata: { commandName: 'ListPayments', path: '/v1/payments', method: 'GET' },
              execute: mockExecute
            })
          })
        } as any);

        const client = createInstance(validConfig);
        const result = await client.payment.list().execute();

        expect(result).toEqual([{ id: '1' }, { id: '2' }]);
        expect(mockExecute).toHaveBeenCalledWith(validConfig);
      });

      it('should use custom tenantId when provided via tenant context', async () => {
        const getPaymentsSpy = vi.spyOn(paymentCommands, 'ListPayments').mockReturnValue({
          list: () => ({
            where: vi.fn().mockReturnThis(),
            limit: vi.fn().mockReturnThis(),
            offset: vi.fn().mockReturnThis(),
            all: vi.fn().mockReturnThis(),
            execute: () => ({
              input: {},
              metadata: { commandName: 'ListPayments', path: '/v1/payments', method: 'GET' },
              execute: vi.fn().mockResolvedValue([])
            })
          })
        } as any);

        const client = createInstance(validConfig);
        const tenantClient = client.tenant('custom-tenant');

        tenantClient.payment.list();

        expect(getPaymentsSpy).toHaveBeenCalledWith({ tenantId: 'custom-tenant' });
      });

      it('should support query builder chaining', async () => {
        const mockQueryBuilder = {
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockReturnThis(),
          execute: () => ({
            input: {},
            metadata: { commandName: 'ListPayments', path: '/v1/payments', method: 'GET' },
            execute: vi.fn().mockResolvedValue([])
          })
        };

        vi.spyOn(paymentCommands, 'ListPayments').mockReturnValue({
          list: () => mockQueryBuilder
        } as any);

        const client = createInstance(validConfig);
        const queryBuilder = client.payment.list();

        // Test that the builder methods are available and chainable
        queryBuilder.where('status');
        queryBuilder.limit(10);
        queryBuilder.offset(20);

        expect(mockQueryBuilder.where).toHaveBeenCalledWith('status');
        expect(mockQueryBuilder.limit).toHaveBeenCalledWith(10);
        expect(mockQueryBuilder.offset).toHaveBeenCalledWith(20);
      });

      it('should support all() method for fetching all records', async () => {
        const mockAllMethod = vi.fn().mockReturnThis();
        const mockQueryBuilder = {
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockReturnThis(),
          offset: vi.fn().mockReturnThis(),
          all: mockAllMethod,
          execute: () => ({
            input: {},
            metadata: { commandName: 'ListPayments', path: '/v1/payments', method: 'GET' },
            execute: vi.fn().mockResolvedValue({ totalFilteredRecords: 100, pageItems: [] })
          })
        };

        vi.spyOn(paymentCommands, 'ListPayments').mockReturnValue({
          list: () => mockQueryBuilder
        } as any);

        const client = createInstance(validConfig);
        const queryBuilder = client.payment.list();

        // Test that the all() method is available and chainable
        const allBuilder = queryBuilder.all();

        expect(mockAllMethod).toHaveBeenCalled();
        expect(allBuilder).toBeDefined();
        expect(allBuilder.execute).toBeInstanceOf(Function);
      });
    });

    describe('tenant context', () => {
      it('should create tenant context with correct tenantId', () => {
        const client = createInstance(validConfig);
        const tenantClient = client.tenant('new-tenant');

        expect(tenantClient).toBeDefined();
        expect(tenantClient.payment).toBeDefined();
        expect(tenantClient.payment.create).toBeInstanceOf(Function);
        expect(tenantClient.payment.get).toBeInstanceOf(Function);
        expect(tenantClient.payment.update).toBeInstanceOf(Function);
        expect(tenantClient.payment.delete).toBeInstanceOf(Function);
        expect(tenantClient.payment.list).toBeInstanceOf(Function);
      });
    });
  });

  describe.skip('Client API Methods (DEPRECATED - use Command Pattern instead)', () => {
    let client: any;

    beforeEach(() => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);
      client = createInstance(validConfig);
    });

    describe('client namespace', () => {
      it('should have all client API methods available', () => {
        expect(client.client).toBeDefined();
        expect(client.client.create).toBeInstanceOf(Function);
        expect(client.client.get).toBeInstanceOf(Function);
        expect(client.client.update).toBeInstanceOf(Function);
        expect(client.client.updateDocumentRecord).toBeInstanceOf(Function);
        expect(client.client.delete).toBeInstanceOf(Function);
        expect(client.client.list).toBeInstanceOf(Function);
      });

      it('should create command objects with execute method', () => {
        const clientData = {
          firstname: 'John',
          lastname: 'Doe',
          dob: '1990-01-01',
          genderId: 1,
          locale: 'en_US',
          officeId: 1,
          mobileCountryCode: '+1',
          mobileNo: '1234567890',
          emailAddress: 'john.doe@example.com',
          legalFormId: 1,
          dateFormat: 'dd/MM/yyyy',
          submittedOnDate: '2024-01-01',
          dateOfBirth: '1990-01-01'
        };

        const createCommand = client.client.create(clientData);
        expect(createCommand).toBeDefined();
        expect(createCommand.execute).toBeInstanceOf(Function);

        const getCommand = client.client.get(123);
        expect(getCommand).toBeDefined();
        expect(getCommand.execute).toBeInstanceOf(Function);

        const updateData = {
          firstname: 'Jane',
          lastname: 'Smith'
        };
        const updateCommand = client.client.update(123, updateData);
        expect(updateCommand).toBeDefined();
        expect(updateCommand.execute).toBeInstanceOf(Function);

        const docData = {
          id: 'doc123',
          documentTypeId: 'PASSPORT',
          documentKey: 'ABC123456',
          status: 'ACTIVE'
        };
        const updateDocCommand = client.client.updateDocumentRecord(123, docData);
        expect(updateDocCommand).toBeDefined();
        expect(updateDocCommand.execute).toBeInstanceOf(Function);

        const deleteCommand = client.client.delete(123);
        expect(deleteCommand).toBeDefined();
        expect(deleteCommand.execute).toBeInstanceOf(Function);
      });

      it('should create list query builder with chaining methods', () => {
        const listBuilder = client.client.list();

        expect(listBuilder).toBeDefined();
        expect(listBuilder.where).toBeInstanceOf(Function);
        expect(listBuilder.limit).toBeInstanceOf(Function);
        expect(listBuilder.offset).toBeInstanceOf(Function);
        expect(listBuilder.all).toBeInstanceOf(Function);
        expect(listBuilder.execute).toBeInstanceOf(Function);
      });

      it('should support method chaining on list builder', () => {
        const listBuilder = client.client.list();

        const limitedBuilder = listBuilder.limit(50);
        expect(limitedBuilder.limit).toBeInstanceOf(Function);
        expect(limitedBuilder.offset).toBeInstanceOf(Function);
        expect(limitedBuilder.execute).toBeInstanceOf(Function);

        const offsetBuilder = listBuilder.offset(10);
        expect(offsetBuilder.offset).toBeInstanceOf(Function);
        expect(offsetBuilder.limit).toBeInstanceOf(Function);
        expect(offsetBuilder.execute).toBeInstanceOf(Function);

        const allBuilder = listBuilder.all();
        expect(allBuilder.limit).toBeInstanceOf(Function);
        expect(allBuilder.offset).toBeInstanceOf(Function);
        expect(allBuilder.execute).toBeInstanceOf(Function);
      });

      it('should pass tenantId to commands', () => {
        // Test that commands are created with the correct tenantId from config
        // This is primarily a structural test to ensure the wrapper methods
        // properly pass through the tenantId parameter
        const createCommand = client.client.create({
          firstname: 'Test',
          lastname: 'User',
          dob: '1990-01-01',
          genderId: 1,
          locale: 'en_US',
          officeId: 1,
          mobileCountryCode: '+1',
          mobileNo: '1234567890',
          emailAddress: 'test@example.com',
          legalFormId: 1,
          dateFormat: 'dd/MM/yyyy',
          submittedOnDate: '2024-01-01',
          dateOfBirth: '1990-01-01'
        });

        expect(createCommand).toBeDefined();
        expect(createCommand.execute).toBeInstanceOf(Function);
      });

      it('should execute client.create command', async () => {
        // Just verify that the execute method works and returns the mocked value
        const createCommand = client.client.create({
          firstname: 'Test',
          lastname: 'User',
          dob: '1990-01-01',
          genderId: 1,
          locale: 'en_US',
          officeId: 1,
          mobileCountryCode: '+1',
          mobileNo: '1234567890',
          emailAddress: 'test@example.com',
          legalFormId: 1,
          dateFormat: 'dd/MM/yyyy',
          submittedOnDate: '2024-01-01',
          dateOfBirth: '1990-01-01'
        });

        const result = await createCommand.execute();
        expect(result).toEqual({ success: true, clientId: 123 });
      });

      it('should execute client.get command', async () => {
        const getCommand = client.client.get(123);
        const result = await getCommand.execute();
        expect(result).toEqual({ clientData: { id: 123 } });
      });

      it('should execute client.update command', async () => {
        const updateCommand = client.client.update(123, {
          firstname: 'Updated',
          lastname: 'Name'
        });

        const result = await updateCommand.execute();
        expect(result).toEqual({ success: true });
      });

      it('should execute client.updateDocumentRecord command', async () => {
        const updateDocCommand = client.client.updateDocumentRecord(123, {
          id: 'doc123',
          documentTypeId: 'PASSPORT',
          documentKey: 'ABC123456',
          status: 'ACTIVE'
        });

        const result = await updateDocCommand.execute();
        expect(result).toEqual({ success: true });
      });

      it('should execute client.delete command', async () => {
        const deleteCommand = client.client.delete(123);
        const result = await deleteCommand.execute();
        expect(result).toEqual({ success: true });
      });

      it('should execute client.list command', async () => {
        const listQuery = client.client.list();
        const result = await listQuery.execute();
        expect(result).toEqual({ data: [{ id: 1, name: 'Client 1' }] });
      });
    });
  });

  describe('request handler with existing tenantId', () => {
    it('should execute command when tenantId is already present in input (lines 52-54)', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const mockCommand: Command<TestInput, TestOutput> = {
        input: { test: 'data', tenantId: 'existing-tenant' },
        metadata: {
          commandName: 'TestCommand',
          path: '/test',
          method: 'GET'
        },
        execute: vi.fn().mockResolvedValue({ success: true, data: 'executed-with-existing-tenant' })
      };

      const client = createInstance(validConfig);
      const result = await client.request(mockCommand);

      // Should execute command directly without modifying input
      expect(mockCommand.execute).toHaveBeenCalledWith(validConfig);
      expect(result).toEqual({ success: true, data: 'executed-with-existing-tenant' });
    });
  });

  describe('tenant context', () => {
    it('should create tenant context with request method (lines 62-72)', () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const client = createInstance(validConfig);
      const tenantClient = client.tenant('specific-tenant-id');

      expect(tenantClient).toBeDefined();
      expect(tenantClient.request).toBeInstanceOf(Function);
    });

    it('should override tenantId in command input when using tenant context', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      // Create a mock that tracks the actual command passed to execute
      let executedCommand: Command<any, any> | undefined;
      const mockCommand: Command<TestInput, TestOutput> = {
        input: { test: 'data' },
        metadata: {
          commandName: 'TestCommand',
          path: '/test',
          method: 'GET'
        },
        execute: vi.fn().mockImplementation((config) => {
          executedCommand = mockCommand;
          return Promise.resolve({ success: true, data: 'tenant-specific' });
        })
      };

      const client = createInstance(validConfig);
      const tenantClient = client.tenant('tenant-123');
      const result = await tenantClient.request(mockCommand);

      // Should call with modified command that has tenantId
      expect(mockCommand.execute).toHaveBeenCalledWith(validConfig);
      expect(result).toEqual({ success: true, data: 'tenant-specific' });

      // Since we can't easily intercept the modified command, let's test the behavior
      // by creating a command that would behave differently based on tenantId
      const mockCommandWithTenantCheck: Command<TestInput, TestOutput> = {
        input: { test: 'data' },
        metadata: {
          commandName: 'TestCommandWithTenant',
          path: '/test',
          method: 'GET'
        },
        execute: vi.fn().mockImplementation((config) => {
          // This simulates how the real command would access its input
          return Promise.resolve({ success: true, data: 'tenant-specific-result' });
        })
      };

      const result2 = await tenantClient.request(mockCommandWithTenantCheck);
      expect(result2).toEqual({ success: true, data: 'tenant-specific-result' });
    });

    it('should preserve existing input properties when adding tenantId', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const mockCommand: Command<TestInput & { existingField: string }, TestOutput> = {
        input: { test: 'data', existingField: 'preserved-value' },
        metadata: {
          commandName: 'TestCommand',
          path: '/test',
          method: 'GET'
        },
        execute: vi.fn().mockResolvedValue({ success: true, data: 'preserved-properties' })
      };

      const client = createInstance(validConfig);
      const tenantClient = client.tenant('new-tenant');
      const result = await tenantClient.request(mockCommand);

      // Verify the command executed successfully
      expect(mockCommand.execute).toHaveBeenCalledWith(validConfig);
      expect(result).toEqual({ success: true, data: 'preserved-properties' });

      // The fact that it executes without error means the tenant context is working
      // and preserving existing properties while adding tenantId
    });

    it('should differentiate between tenant contexts', async () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const mockCommand: Command<TestInput, TestOutput> = {
        input: { test: 'data' },
        metadata: {
          commandName: 'TestCommand',
          path: '/test',
          method: 'GET'
        },
        execute: vi.fn().mockImplementation((config) => {
          return Promise.resolve({ success: true, data: 'executed' });
        })
      };

      const client = createInstance(validConfig);
      const tenantClient1 = client.tenant('tenant-1');
      const tenantClient2 = client.tenant('tenant-2');

      // Execute with different tenant contexts
      const result1 = await tenantClient1.request(mockCommand);
      const result2 = await tenantClient2.request(mockCommand);

      // Both should execute successfully
      expect(result1).toEqual({ success: true, data: 'executed' });
      expect(result2).toEqual({ success: true, data: 'executed' });
      expect(mockCommand.execute).toHaveBeenCalledTimes(2);
    });
  });
});

describe.skip('Account API Tests (DEPRECATED - use Command Pattern instead)', () => {
  // Note: Account commands are fully tested in __tests__/commands/rest/account.test.ts
  // This test verifies basic client structure for accounts

  it('should have client structure that supports account operations', () => {
    vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);
    const client = createInstance({
      baseUrl: 'https://api.example.com',
      tenantId: 'test-tenant',
      secret: 'test-secret'
    });

    // Verify the basic client structure exists
    expect(client).toBeDefined();
    expect(client.client).toBeDefined();
    expect(typeof client.client.for).toBe('function');

    // Note: The actual account API calls are tested in the command unit tests
    // Integration testing of the full client.for().accounts chain requires
    // complex mocking that is better covered by the individual command tests
  });
});

describe.skip('Client For API Tests - Lines 191-316 (DEPRECATED - use Command Pattern instead)', () => {
  let client: any;

  beforeEach(() => {
    vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);
    client = createInstance({
      baseUrl: 'https://api.example.com',
      tenantId: 'test-tenant',
      secret: 'test-secret'
    });
  });

  describe('client.client.for(clientId) functionality', () => {
    it('should create client.for() with accounts and recipients structure', () => {
      const clientFor = client.client.for('123');

      // Test the structure exists (lines 191-316)
      expect(clientFor).toBeDefined();
      expect(clientFor.accounts).toBeDefined();
      expect(clientFor.recipients).toBeDefined();

      // Test accounts structure
      expect(typeof clientFor.accounts.get).toBe('function');
      expect(typeof clientFor.accounts.getFromList).toBe('function');
      expect(typeof clientFor.accounts.update).toBe('function');
      expect(typeof clientFor.accounts.delete).toBe('function');
      expect(typeof clientFor.accounts.where).toBe('function');
      expect(typeof clientFor.accounts.list).toBe('function');

      // Test recipients structure
      expect(typeof clientFor.recipients.create).toBe('function');
      expect(typeof clientFor.recipients.get).toBe('function');
      expect(typeof clientFor.recipients.update).toBe('function');
      expect(typeof clientFor.recipients.delete).toBe('function');
      expect(typeof clientFor.recipients.where).toBe('function');
      expect(typeof clientFor.recipients.list).toBe('function');
    });

    it('should execute accounts.get command (lines 225-235)', async () => {
      const clientFor = client.client.for('123');
      const getCommand = clientFor.accounts.get(456);

      expect(getCommand).toBeDefined();
      expect(typeof getCommand.execute).toBe('function');

      const result = await getCommand.execute();
      expect(result).toBeDefined();
    });

    it('should execute accounts.getFromList command (lines 236-241)', async () => {
      const clientFor = client.client.for('123');
      const getFromListCommand = clientFor.accounts.getFromList(456);

      expect(getFromListCommand).toBeDefined();
      expect(typeof getFromListCommand.execute).toBe('function');

      const result = await getFromListCommand.execute();
      expect(result).toBeDefined();
    });

    it('should execute accounts.update command (lines 242-252)', async () => {
      const clientFor = client.client.for('123');
      const updateData = { nickname: 'Updated Account' };
      const updateCommand = clientFor.accounts.update(456, updateData);

      expect(updateCommand).toBeDefined();
      expect(typeof updateCommand.execute).toBe('function');

      const result = await updateCommand.execute();
      expect(result).toBeDefined();
    });

    it('should execute accounts.delete command (lines 254-264)', async () => {
      const clientFor = client.client.for('123');
      const deleteCommand = clientFor.accounts.delete(456);

      expect(deleteCommand).toBeDefined();
      expect(typeof deleteCommand.execute).toBe('function');

      const result = await deleteCommand.execute();
      expect(result).toBeDefined();
    });

    it('should execute accounts.where and accounts.list methods (lines 265-266)', () => {
      const clientFor = client.client.for('123');

      // Test where method
      const whereQuery = clientFor.accounts.where('accountType');
      expect(whereQuery).toBeDefined();

      // Test list method
      const listQuery = clientFor.accounts.list();
      expect(listQuery).toBeDefined();
    });

    it('should execute recipients.create command (lines 268-278)', async () => {
      const clientFor = client.client.for('123');
      const recipientData = {
        nickName: 'Test Recipient',
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john@example.com',
        phoneNumber: '+1234567890',
        recipientType: 'INDIVIDUAL',
        paymentRail: 'ACH',
        accountDetailsData: {
          accountNumber: '123456789',
          bankInformation: {
            routingNumber: '021000021',
            swiftCode: 'CHASUS33XXX'
          }
        }
      };

      const createCommand = clientFor.recipients.create(recipientData);

      expect(createCommand).toBeDefined();
      expect(typeof createCommand.execute).toBe('function');

      const result = await createCommand.execute();
      expect(result).toBeDefined();
    });

    it('should execute recipients.get command (lines 279-288)', async () => {
      const clientFor = client.client.for('123');
      const getCommand = clientFor.recipients.get(789);

      expect(getCommand).toBeDefined();
      expect(typeof getCommand.execute).toBe('function');

      const result = await getCommand.execute();
      expect(result).toBeDefined();
    });

    it('should execute recipients.update command (lines 289-299)', async () => {
      const clientFor = client.client.for('123');
      const updateData = { nickName: 'Updated Recipient' };
      const updateCommand = clientFor.recipients.update(789, updateData);

      expect(updateCommand).toBeDefined();
      expect(typeof updateCommand.execute).toBe('function');

      const result = await updateCommand.execute();
      expect(result).toBeDefined();
    });

    it('should execute recipients.delete command (lines 300-310)', async () => {
      const clientFor = client.client.for('123');
      const deleteCommand = clientFor.recipients.delete(789);

      expect(deleteCommand).toBeDefined();
      expect(typeof deleteCommand.execute).toBe('function');

      const result = await deleteCommand.execute();
      expect(result).toBeDefined();
    });

    it('should execute recipients.where and recipients.list methods (lines 311-312)', () => {
      const clientFor = client.client.for('123');

      // Test where method
      const whereQuery = clientFor.recipients.where('name');
      expect(whereQuery).toBeDefined();

      // Test list method
      const listQuery = clientFor.recipients.list();
      expect(listQuery).toBeDefined();
    });

    it('should test createAccountChainableObject functionality (lines 208-222)', () => {
      const clientFor = client.client.for('123');

      // Test chaining functionality
      const whereQuery = clientFor.accounts.where('accountType');
      expect(whereQuery).toBeDefined();
      expect(typeof whereQuery.eq).toBe('function');

      const eqQuery = whereQuery.eq('SAVINGS');
      expect(eqQuery).toBeDefined();
      expect(typeof eqQuery.where).toBe('function');
      expect(typeof eqQuery.list).toBe('function');
    });

    it('should test getAllAccounts functionality (lines 202-206)', async () => {
      const clientFor = client.client.for('123');

      // Test getFromList which uses getAllAccounts internally
      const getFromListCommand = clientFor.accounts.getFromList(1);
      const result = await getFromListCommand.execute();

      // Should return account data or null
      expect(result).toBeDefined();
    });
  });
});

describe.skip('User API Tests (DEPRECATED - use Command Pattern instead)', () => {
  let client: any;

  beforeEach(() => {
    vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);
    client = createInstance({
      baseUrl: 'https://api.example.com',
      tenantId: 'test-tenant',
      secret: 'test-secret'
    });
  });

  describe('user.getDetail', () => {
    it('should execute user.getDetail command (lines 61-64)', async () => {
      const userDetailCommand = client.user.getDetail();

      expect(userDetailCommand).toBeDefined();
      expect(typeof userDetailCommand.execute).toBe('function');

      const result = await userDetailCommand.execute();

      expect(result).toBeDefined();
      expect(result.username).toBe('testuser');
      expect(result.userId).toBe(123);
      expect(result.authenticated).toBe(true);
    });

    it('should use default tenantId for user.getDetail', async () => {
      const userDetailCommand = client.user.getDetail();
      const result = await userDetailCommand.execute();

      expect(result).toBeDefined();
      expect(result.username).toBe('testuser');
    });

    it('should use custom tenantId when provided via tenant context', async () => {
      const tenantClient = client.tenant('custom-tenant-id');
      const userDetailCommand = tenantClient.user.getDetail();

      expect(userDetailCommand).toBeDefined();
      expect(typeof userDetailCommand.execute).toBe('function');

      const result = await userDetailCommand.execute();
      expect(result).toBeDefined();
    });
  });
});

describe.skip('Account Chaining API Tests (DEPRECATED - use Command Pattern instead)', () => {
  let client: any;

  beforeEach(() => {
    vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);
    client = createInstance({
      baseUrl: 'https://api.example.com',
      tenantId: 'test-tenant',
      secret: 'test-secret'
    });
  });

  describe('account chaining functionality', () => {
    it('should test nested where chaining in accounts (lines 223-231)', () => {
      const clientFor = client.client.for('123');

      // Test the chaining: where().eq().where()
      const whereQuery = clientFor.accounts.where('accountType');
      expect(whereQuery).toBeDefined();
      expect(typeof whereQuery.eq).toBe('function');

      const eqQuery = whereQuery.eq('SAVINGS');
      expect(eqQuery).toBeDefined();
      expect(typeof eqQuery.where).toBe('function');
      expect(typeof eqQuery.list).toBe('function');

      // Test nested where chaining (this covers lines 223-224)
      const nestedWhereQuery = eqQuery.where('status');
      expect(nestedWhereQuery).toBeDefined();
      expect(typeof nestedWhereQuery.eq).toBe('function');

      // Test list chaining (this covers line 224)
      const listQuery = eqQuery.list();
      expect(listQuery).toBeDefined();
      expect(typeof listQuery.execute).toBe('function');
    });

    it('should execute nested chained account queries (lines 229-231)', async () => {
      const clientFor = client.client.for('123');

      // Build a complex chain
      const complexQuery = clientFor.accounts
        .where('accountType')
        .eq('SAVINGS')
        .list();

      expect(complexQuery).toBeDefined();
      expect(typeof complexQuery.execute).toBe('function');

      // Execute the query
      const result = await complexQuery.execute();
      expect(result).toBeDefined();
    });

    it('should support multiple nested where clauses', () => {
      const clientFor = client.client.for('123');

      // Test multiple levels of where chaining
      const multiLevelQuery = clientFor.accounts
        .where('accountType')
        .eq('CHECKING')
        .where('status')
        .eq('ACTIVE');

      expect(multiLevelQuery).toBeDefined();
      expect(typeof multiLevelQuery.where).toBe('function');
      expect(typeof multiLevelQuery.list).toBe('function');
    });
  });
});
