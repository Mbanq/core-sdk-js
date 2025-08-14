import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CustomUpdate, CustomCreate, CustomGet } from '../../../src/commands/rest/custom';
import * as baseRequestModule from '../../../src/utils/baseRequest';

describe('Custom Commands', () => {
  let mockAxiosInstance: any;

  beforeEach(() => {
    vi.stubEnv('SECRET', 'your_secret');
    vi.stubEnv('SIGNEE', 'your_signee');
    vi.stubEnv('TENANT_ID', 'your_tenant_id');
    vi.stubEnv('BASE_URL', 'https://your.api.url');

    mockAxiosInstance = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    };

    vi.spyOn(baseRequestModule, 'default').mockResolvedValue(mockAxiosInstance);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  const mockConfig = {
    secret: 'your_secret',
    signee: 'your_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://your.api.url'
  };

  describe('CustomUpdate', () => {
    it('should perform custom update successfully', async () => {
      const mockResponse = {
        data: { success: true, id: 123 }
      };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const params = {
        url: '/custom/endpoint/123',
        updates: {
          name: 'Updated Name',
          status: 'active'
        },
        params: {
          force: true
        }
      };

      const command = CustomUpdate(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        '/custom/endpoint/123',
        {
          name: 'Updated Name',
          status: 'active'
        },
        {
          params: {
            force: true
          }
        }
      );
      expect(result).toEqual({ success: true, id: 123 });
    });

    it('should use custom command name when provided', () => {
      const params = {
        url: '/custom/endpoint',
        updates: { field: 'value' },
        commandName: 'CustomUpdateSpecial'
      };

      const command = CustomUpdate(params);

      expect(command.metadata.commandName).toBe('CustomUpdateSpecial');
    });

    it('should use default command name when not provided', () => {
      const params = {
        url: '/custom/endpoint',
        updates: { field: 'value' }
      };

      const command = CustomUpdate(params);

      expect(command.metadata.commandName).toBe('CustomUpdate');
    });

    it('should use custom tenantId when provided', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const params = {
        url: '/custom/endpoint',
        updates: { field: 'value' },
        tenantId: 'custom-tenant'
      };

      const command = CustomUpdate(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Update failed');
      mockAxiosInstance.put.mockRejectedValue(mockError);

      const params = {
        url: '/custom/endpoint',
        updates: { field: 'value' }
      };

      const command = CustomUpdate(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Update failed');
    });

    it('should have correct metadata', () => {
      const params = {
        url: '/custom/endpoint/456',
        updates: { field: 'value' }
      };

      const command = CustomUpdate(params);

      expect(command.metadata.commandName).toBe('CustomUpdate');
      expect(command.metadata.path).toBe('/custom/endpoint/456');
      expect(command.metadata.method).toBe('PUT');
    });
  });

  describe('CustomCreate', () => {
    it('should perform custom create successfully', async () => {
      const mockResponse = {
        data: { success: true, id: 456 }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const params = {
        url: '/custom/items',
        data: {
          name: 'New Item',
          description: 'Item description'
        },
        params: {
          validate: true
        }
      };

      const command = CustomCreate(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/custom/items',
        {
          name: 'New Item',
          description: 'Item description'
        },
        {
          params: {
            validate: true
          }
        }
      );
      expect(result).toEqual({ success: true, id: 456 });
    });

    it('should use custom command name when provided', () => {
      const params = {
        url: '/custom/items',
        data: { name: 'test' },
        commandName: 'CreateSpecialItem'
      };

      const command = CustomCreate(params);

      expect(command.metadata.commandName).toBe('CreateSpecialItem');
    });

    it('should use default command name when not provided', () => {
      const params = {
        url: '/custom/items',
        data: { name: 'test' }
      };

      const command = CustomCreate(params);

      expect(command.metadata.commandName).toBe('CustomCreate');
    });

    it('should use custom tenantId when provided', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const params = {
        url: '/custom/items',
        data: { name: 'test' },
        tenantId: 'custom-tenant'
      };

      const command = CustomCreate(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Create failed');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const params = {
        url: '/custom/items',
        data: { name: 'test' }
      };

      const command = CustomCreate(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Create failed');
    });

    it('should have correct metadata', () => {
      const params = {
        url: '/custom/items',
        data: { name: 'test' }
      };

      const command = CustomCreate(params);

      expect(command.metadata.commandName).toBe('CustomCreate');
      expect(command.metadata.path).toBe('/custom/items');
      expect(command.metadata.method).toBe('POST');
    });
  });

  describe('CustomGet', () => {
    it('should perform custom get successfully', async () => {
      const mockResponse = {
        data: { id: 789, name: 'Test Item' }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params = {
        url: '/custom/items/789',
        params: {
          include: 'details'
        }
      };

      const command = CustomGet(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        '/custom/items/789',
        {
          params: {
            include: 'details'
          }
        }
      );
      expect(result).toEqual({ id: 789, name: 'Test Item' });
    });

    it('should use custom command name when provided', () => {
      const params = {
        url: '/custom/items/123',
        commandName: 'GetSpecialItem'
      };

      const command = CustomGet(params);

      expect(command.metadata.commandName).toBe('GetSpecialItem');
    });

    it('should use default command name when not provided', () => {
      const params = {
        url: '/custom/items/123'
      };

      const command = CustomGet(params);

      expect(command.metadata.commandName).toBe('CustomGet');
    });

    it('should use custom tenantId when provided', async () => {
      const mockResponse = { data: { id: 123 } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params = {
        url: '/custom/items/123',
        tenantId: 'custom-tenant'
      };

      const command = CustomGet(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Get failed');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const params = {
        url: '/custom/items/999'
      };

      const command = CustomGet(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Get failed');
    });

    it('should have correct metadata', () => {
      const params = {
        url: '/custom/items/123'
      };

      const command = CustomGet(params);

      expect(command.metadata.commandName).toBe('CustomGet');
      expect(command.metadata.path).toBe('/custom/items/123');
      expect(command.metadata.method).toBe('GET');
    });
  });
});
