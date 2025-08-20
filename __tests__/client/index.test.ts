import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createClient } from '../../src/client/index';
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

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const validConfig = {
    baseUrl: 'https://api.example.com',
    secret: 'test-secret',
    signee: 'test-signee',
    tenantId: 'test-tenant'
  };

  describe('createClient', () => {
    it('should create client with valid configuration', () => {
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

      const client = createClient(validConfig);

      expect(client).toBeDefined();
      expect(client.setConfig).toBeInstanceOf(Function);
      expect(client.updateConfig).toBeInstanceOf(Function);
      expect(client.resetConfig).toBeInstanceOf(Function);
      expect(client.request).toBeInstanceOf(Function);
    });

    it('should throw error with invalid configuration', () => {
      const invalidConfig = { baseUrl: '' };
      vi.spyOn(validationModule, 'validateConfig').mockReturnValue(['baseUrl is required']);

      expect(() => createClient(invalidConfig as unknown as Config)).toThrow('Invalid configuration: baseUrl is required');
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

      const client = createClient(validConfig);
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

      const client = createClient(configWithMiddleware);
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

      const client = createClient(configWithMiddleware);

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

      const client = createClient(configWithMiddlewares);
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

      const client = createClient(validConfig);
      const newConfig = {
        baseUrl: 'https://new-api.example.com',
        secret: 'new-secret',
        signee: 'new-signee',
        tenantId: 'new-tenant'
      };

      client.setConfig(newConfig);

      const mockCommand: Command<TestInput, TestOutput> = {
        input: {},
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

      const client = createClient(validConfig);

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

      const client = createClient(configWithHeaders);

      client.updateConfig({
        axiosConfig: {
          headers: {
            'New-Header': 'new-value'
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

      const client = createClient(validConfig);

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

      const client = createClient(validConfig);

      client.updateConfig({
        secret: 'updated-secret'
      });

      client.resetConfig();

      const mockCommand: Command<TestInput, TestOutput> = {
        input: {},
        metadata: { commandName: 'Test', path: '/test', method: 'GET' },
        execute: vi.fn().mockResolvedValue({})
      };

      await client.request(mockCommand);

      expect(mockCommand.execute).toHaveBeenCalledWith(validConfig);
    });
  });

  describe('payment API methods', () => {
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

        const client = createClient(validConfig);
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

        const client = createClient(validConfig);
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

        const client = createClient(validConfig);
        const paymentOperation = await client.payment.get('123');
        const result = await paymentOperation.execute();

        expect(getPaymentSpy).toHaveBeenCalledWith({
          id: '123',
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

        const client = createClient(validConfig);
        const tenantClient = client.tenant('custom-tenant');

        await tenantClient.payment.get('123');

        expect(getPaymentSpy).toHaveBeenCalledWith({
          id: '123',
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

        const client = createClient(validConfig);
        const updateData = { status: 'CANCELLED' as const };

        const paymentOperation = await client.payment.update('123', updateData);
        const result = await paymentOperation.execute();

        expect(updatePaymentSpy).toHaveBeenCalledWith({
          id: '123',
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

        const client = createClient(validConfig);
        const tenantClient = client.tenant('custom-tenant');
        const updateData = { amount: 200 };

        await tenantClient.payment.update('123', updateData);

        expect(updatePaymentSpy).toHaveBeenCalledWith({
          id: '123',
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

        const client = createClient(validConfig);
        const paymentOperation = await client.payment.delete('123');
        const result = await paymentOperation.execute();

        expect(deletePaymentSpy).toHaveBeenCalledWith({
          id: '123',
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

        const client = createClient(validConfig);
        const tenantClient = client.tenant('custom-tenant');

        await tenantClient.payment.delete('123');

        expect(deletePaymentSpy).toHaveBeenCalledWith({
          id: '123',
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

        const client = createClient(validConfig);
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

        const client = createClient(validConfig);
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

        const client = createClient(validConfig);
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

        const client = createClient(validConfig);
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

        const client = createClient(validConfig);
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
        const client = createClient(validConfig);
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
});
