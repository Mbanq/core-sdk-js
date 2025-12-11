// Test for RequestOptions merging into config
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createInstance } from '../../src/client/index';
import * as validationModule from '../../src/utils/validation';
import { Command } from '../../src/types';

describe('RequestOptions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validConfig = {
    baseUrl: 'https://api.example.com',
    secret: 'test-secret',
    signee: 'test-signee',
    tenantId: 'test-tenant'
  };

  it('should merge RequestOptions into config when provided', async () => {
    vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

    const mockCommand: Command<{ test: string }, { success: boolean }> = {
      input: { test: 'data' },
      metadata: {
        commandName: 'TestCommand',
        path: '/test',
        method: 'GET'
      },
      execute: vi.fn().mockResolvedValue({ success: true })
    };

    const client = createInstance(validConfig);

    const requestOptions = {
      traceId: 'trace-123',
      timeout: 5000,
      keepAlive: true,
      headers: {
        'X-Custom-Header': 'custom-value'
      }
    };

    await client.request(mockCommand, requestOptions);

    // Verify that execute was called with merged config
    expect(mockCommand.execute).toHaveBeenCalledWith({
      ...validConfig,
      traceId: 'trace-123',
      axiosConfig: {
        timeout: 5000,
        keepAlive: true,
        headers: {
          'X-Custom-Header': 'custom-value'
        }
      }
    });
  });

  it('should merge RequestOptions headers with existing axiosConfig headers', async () => {
    vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

    const configWithHeaders = {
      ...validConfig,
      axiosConfig: {
        headers: {
          'X-Existing-Header': 'existing-value'
        }
      }
    };

    const mockCommand: Command<{ test: string }, { success: boolean }> = {
      input: { test: 'data' },
      metadata: {
        commandName: 'TestCommand',
        path: '/test',
        method: 'GET'
      },
      execute: vi.fn().mockResolvedValue({ success: true })
    };

    const client = createInstance(configWithHeaders);

    const requestOptions = {
      headers: {
        'X-New-Header': 'new-value'
      }
    };

    await client.request(mockCommand, requestOptions);

    // Verify that headers are merged
    expect(mockCommand.execute).toHaveBeenCalledWith({
      ...configWithHeaders,
      axiosConfig: {
        headers: {
          'X-Existing-Header': 'existing-value',
          'X-New-Header': 'new-value'
        }
      }
    });
  });

  it('should not modify config when no RequestOptions provided', async () => {
    vi.spyOn(validationModule, 'validateConfig').mockReturnValue([]);

    const mockCommand: Command<{ test: string }, { success: boolean }> = {
      input: { test: 'data' },
      metadata: {
        commandName: 'TestCommand',
        path: '/test',
        method: 'GET'
      },
      execute: vi.fn().mockResolvedValue({ success: true })
    };

    const client = createInstance(validConfig);
    await client.request(mockCommand);

    // Verify that execute was called with original config (no axiosConfig added)
    expect(mockCommand.execute).toHaveBeenCalledWith(validConfig);
  });
});
