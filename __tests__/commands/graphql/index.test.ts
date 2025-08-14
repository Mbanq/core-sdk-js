import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GraphQL } from '../../../src/commands/graphql/index';
import * as baseRequestModule from '../../../src/utils/baseRequest';

describe('GraphQL Commands', () => {
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

  describe('GraphQL', () => {
    it('should execute GraphQL query with string command successfully', async () => {
      const mockResponse = {
        data: {
          data: {
            users: [
              { id: 1, name: 'John' },
              { id: 2, name: 'Jane' }
            ]
          },
          errors: null
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const request = {
        command: 'query GetUsers { users { id name } }',
        variables: { limit: 10 },
        operationName: 'GetUsers'
      };

      const command = GraphQL(request);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/graphql',
        {
          query: 'query GetUsers { users { id name } }',
          variables: { limit: 10 },
          operationName: 'GetUsers'
        }
      );
      expect(result).toEqual({
        users: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ]
      });
    });

    it('should use custom graphqlPath when provided in config', async () => {
      const mockResponse = {
        data: {
          data: { test: 'success' },
          errors: null
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const configWithCustomPath = {
        ...mockConfig,
        graphqlPath: '/api/graphql'
      };

      const request = {
        command: 'query { test }'
      };

      const command = GraphQL(request);
      await command.execute(configWithCustomPath);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/api/graphql',
        expect.any(Object)
      );
    });

    it('should use custom tenantId when provided in request', async () => {
      const mockResponse = {
        data: {
          data: { test: 'success' },
          errors: null
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const request = {
        command: 'query { test }',
        tenantId: 'custom-tenant'
      };

      const command = GraphQL(request);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle GraphQL errors properly', async () => {
      const mockResponse = {
        data: {
          data: null,
          errors: [
            {
              message: 'Field "invalidField" is not defined',
              path: ['invalidField']
            }
          ]
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const request = {
        command: 'query { invalidField }'
      };

      const command = GraphQL(request);

      await expect(command.execute(mockConfig)).rejects.toThrow('Field "invalidField" is not defined');
    });

    it('should handle missing data in response', async () => {
      const mockResponse = {
        data: {
          data: null,
          errors: null
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const request = {
        command: 'query { test }'
      };

      const command = GraphQL(request);

      await expect(command.execute(mockConfig)).rejects.toThrow('No data returned from GraphQL query');
    });

    it('should handle network errors properly', async () => {
      const networkError = new Error('Network error');
      mockAxiosInstance.post.mockRejectedValue(networkError);

      const request = {
        command: 'query { test }'
      };

      const command = GraphQL(request);

      await expect(command.execute(mockConfig)).rejects.toThrow('Network error');
    });

    it('should have correct metadata with operation name', () => {
      const request = {
        command: 'query GetUser { user { id } }',
        operationName: 'GetUser'
      };

      const command = GraphQL(request);

      expect(command.metadata.commandName).toBe('GetUser');
      expect(command.metadata.path).toBe('/graphql');
      expect(command.metadata.method).toBe('POST');
    });

    it('should have default metadata when no operation name provided', () => {
      const request = {
        command: 'query { user { id } }'
      };

      const command = GraphQL(request);

      expect(command.metadata.commandName).toBe('GraphQL');
      expect(command.metadata.path).toBe('/graphql');
      expect(command.metadata.method).toBe('POST');
    });

    it('should handle empty variables', async () => {
      const mockResponse = {
        data: {
          data: { test: 'success' },
          errors: null
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const request = {
        command: 'query { test }'
      };

      const command = GraphQL(request);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/graphql',
        {
          query: 'query { test }',
          variables: undefined,
          operationName: undefined
        }
      );
    });
  });
});
