import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { UpdateRecipientGQL } from '../../../src/commands/graphql/recipient';
import baseRequest from '../../../src/utils/baseRequest';

// Mock the utility functions
vi.mock('../../../src/utils/baseRequest', () => ({
  default: vi.fn()
}));

vi.mock('../../../src/utils/errorHandler', () => ({
  handleAxiosError: vi.fn(),
  createCommandError: vi.fn().mockImplementation(({ message }) => new Error(message))
}));

const mockBaseRequest = vi.mocked(baseRequest);

describe('GraphQL Recipient Commands', () => {
  const mockAxiosInstance = {
    post: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockBaseRequest.mockResolvedValue(mockAxiosInstance as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('UpdateRecipientGQL', () => {
    it('should create UpdateRecipientGQL command with correct metadata', () => {
      const params = {
        id: 123,
        input: {
          firstName: 'UpdatedName',
          lastName: 'UpdatedLastName'
        }
      };

      const command = UpdateRecipientGQL(params);

      expect(command.input).toEqual(params);
      expect(command.metadata.commandName).toBe('UpdateRecipientGQL');
      expect(command.metadata.method).toBe('POST');
      expect(command.metadata.path).toBe('/graphql');
    });

    it('should handle successful recipient update via GraphQL', async () => {
      const mockUpdatedRecipient = {
        id: 123,
        clientId: 456,
        firstName: 'UpdatedName',
        lastName: 'UpdatedLastName',
        emailAddress: 'updated@example.com'
      };

      mockAxiosInstance.post.mockResolvedValue({
        data: {
          data: {
            updateRecipient: mockUpdatedRecipient
          }
        }
      });

      const params = {
        id: 123,
        input: {
          firstName: 'UpdatedName',
          lastName: 'UpdatedLastName'
        },
        tenantId: 'test-tenant'
      };

      const command = UpdateRecipientGQL(params);
      const config = { baseUrl: 'https://api.test.com', tenantId: 'test-tenant' };

      const result = await command.execute(config);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/graphql', expect.objectContaining({
        query: expect.any(String),
        variables: expect.objectContaining({
          id: 123,
          input: params.input
        })
      }));
      expect(result).toEqual({ updateRecipient: mockUpdatedRecipient });
    });

    it('should handle GraphQL errors during recipient update', async () => {
      const error = new Error('GraphQL mutation failed');
      mockAxiosInstance.post.mockRejectedValue(error);

      const params = {
        id: 123,
        input: {
          firstName: 'UpdatedName'
        }
      };

      const command = UpdateRecipientGQL(params);
      const config = { baseUrl: 'https://api.test.com', tenantId: 'test-tenant' };

      // Expect the execute method to throw an error
      await expect(command.execute(config)).rejects.toThrow();
    });
  });
});
