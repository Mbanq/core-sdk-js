import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createClient } from '../../src/client/index';
import * as validationModule from '../../src/utils/validation';
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
});
