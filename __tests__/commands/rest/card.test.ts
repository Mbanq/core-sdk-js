import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SendAuthorizationToCore, UpdateCardID } from '../../../src/commands/rest/card';
import * as baseRequestModule from '../../../src/utils/baseRequest';
import * as errorHandlerModule from '../../../src/utils/errorHandler';
import type { Config } from '../../../src/types/config';
import type { AuthorizationRequest, CardUpdate } from '../../../src/types/card';

vi.mock('../../../src/utils/baseRequest');
vi.mock('../../../src/utils/errorHandler');

interface MockAxiosInstance {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
}

describe('Card Commands', () => {
  let mockAxiosInstance: MockAxiosInstance;
  let mockConfig: Config;

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

    vi.spyOn(baseRequestModule, 'default').mockResolvedValue(mockAxiosInstance as unknown as import('axios').AxiosInstance);
    vi.spyOn(errorHandlerModule, 'handleAxiosError').mockImplementation(() => {
      throw new Error('Mocked error');
    });

    mockConfig = {
      secret: 'your_secret',
      signee: 'your_signee',
      tenantId: 'your_tenant_id',
      baseUrl: 'https://your.api.url'
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  describe('SendAuthorizationToCore', () => {
    it('should send authorization for debit card without skipNotification', async () => {
      const mockResponse = {
        data: {
          id: 123,
          status: 'APPROVED',
          amount: 100.50
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const params: AuthorizationRequest = {
        card: {
          internalCardId: 'card-123',
          cardType: 'DEBIT'
        },
        payload: {
          amount: 100.50,
          merchantId: 'merchant-456'
        },
        tenantId: 'test-tenant'
      };

      const command = SendAuthorizationToCore(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/cards/card-123/authorization',
        {
          amount: 100.50,
          merchantId: 'merchant-456',
          query: '',
          flag: undefined
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should send authorization for credit card with skipNotification', async () => {
      const mockResponse = {
        data: {
          id: 456,
          status: 'PENDING'
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const params: AuthorizationRequest = {
        card: {
          internalCardId: 'credit-card-789',
          cardType: 'CREDIT'
        },
        payload: {
          amount: 250.00,
          merchantId: 'merchant-789'
        },
        skipNotification: true,
        flag: 'URGENT',
        tenantId: 'test-tenant'
      };

      const command = SendAuthorizationToCore(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/creditcards/credit-card-789/authorization?skipNotification=true',
        {
          amount: 250.00,
          merchantId: 'merchant-789',
          query: '?skipNotification=true',
          flag: 'URGENT'
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it('should use custom tenantId when provided', async () => {
      const mockResponse = { data: { id: 123 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const params: AuthorizationRequest = {
        card: {
          internalCardId: 'card-123',
          cardType: 'DEBIT'
        },
        payload: { amount: 100 },
        tenantId: 'custom-tenant'
      };

      const command = SendAuthorizationToCore(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Authorization failed');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const params: AuthorizationRequest = {
        card: {
          internalCardId: 'card-123',
          cardType: 'DEBIT'
        },
        payload: { amount: 100 }
      };

      const command = SendAuthorizationToCore(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Mocked error');
      expect(errorHandlerModule.handleAxiosError).toHaveBeenCalledWith(mockError);
    });

    it('should have correct metadata for debit card', () => {
      const params: AuthorizationRequest = {
        card: {
          internalCardId: 'card-123',
          cardType: 'DEBIT'
        },
        payload: { amount: 100 }
      };

      const command = SendAuthorizationToCore(params);

      expect(command.metadata.commandName).toBe('SendAuthorizationToCore');
      expect(command.metadata.path).toBe('/cards/card-123/authorization');
      expect(command.metadata.method).toBe('POST');
    });

    it('should have correct metadata for credit card with skipNotification', () => {
      const params: AuthorizationRequest = {
        card: {
          internalCardId: 'credit-card-123',
          cardType: 'CREDIT'
        },
        payload: { amount: 100 },
        skipNotification: true
      };

      const command = SendAuthorizationToCore(params);

      expect(command.metadata.commandName).toBe('SendAuthorizationToCore');
      expect(command.metadata.path).toBe('/creditcards/credit-card-123/authorization?skipNotification=true');
      expect(command.metadata.method).toBe('POST');
    });

    it('should handle card without cardType (defaults to debit)', async () => {
      const mockResponse = { data: { id: 123 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const params: AuthorizationRequest = {
        card: {
          internalCardId: 'card-123'
        },
        payload: { amount: 100 }
      };

      const command = SendAuthorizationToCore(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/cards/card-123/authorization',
        expect.objectContaining({
          amount: 100,
          query: ''
        })
      );
    });

    it('should include flag in enriched params when provided', async () => {
      const mockResponse = { data: { id: 123 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const params: AuthorizationRequest = {
        card: {
          internalCardId: 'card-123',
          cardType: 'DEBIT'
        },
        payload: { amount: 100 },
        flag: 'HIGH_PRIORITY'
      };

      const command = SendAuthorizationToCore(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/cards/card-123/authorization',
        expect.objectContaining({
          flag: 'HIGH_PRIORITY'
        })
      );
    });
  });

  describe('UpdateCardID', () => {
    it('should update card ID successfully', async () => {
      mockAxiosInstance.put.mockResolvedValue({});

      const params: CardUpdate = {
        clientId: 123,
        businessCardIDURL: 'https://example.com/card-id',
        businessCardIDQRCode: 'QR_CODE_DATA_123',
        tenantId: 'test-tenant'
      };

      const command = UpdateCardID(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/clients/123', {
        businessCardIDURL: 'https://example.com/card-id',
        businessCardIDQRCode: 'QR_CODE_DATA_123'
      });
    });

    it('should use custom tenantId when provided', async () => {
      mockAxiosInstance.put.mockResolvedValue({});

      const params: CardUpdate = {
        clientId: 456,
        businessCardIDURL: 'https://example.com/card-id',
        businessCardIDQRCode: 'QR_CODE_DATA_456',
        tenantId: 'custom-tenant'
      };

      const command = UpdateCardID(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Update failed');
      mockAxiosInstance.put.mockRejectedValue(mockError);

      const params: CardUpdate = {
        clientId: 123,
        businessCardIDURL: 'https://example.com/card-id',
        businessCardIDQRCode: 'QR_CODE_DATA_123'
      };

      const command = UpdateCardID(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Mocked error');
      expect(errorHandlerModule.handleAxiosError).toHaveBeenCalledWith(mockError);
    });

    it('should have correct metadata', () => {
      const params: CardUpdate = {
        clientId: 123,
        businessCardIDURL: 'https://example.com/card-id',
        businessCardIDQRCode: 'QR_CODE_DATA_123'
      };

      const command = UpdateCardID(params);

      expect(command.metadata.commandName).toBe('UpdateCardID');
      expect(command.metadata.path).toBe('/clients/123');
      expect(command.metadata.method).toBe('PUT');
    });

    it('should not return any data on successful update', async () => {
      mockAxiosInstance.put.mockResolvedValue({});

      const params: CardUpdate = {
        clientId: 123,
        businessCardIDURL: 'https://example.com/card-id',
        businessCardIDQRCode: 'QR_CODE_DATA_123'
      };

      const command = UpdateCardID(params);
      const result = await command.execute(mockConfig);

      expect(result).toBeUndefined();
    });

    it('should handle different client IDs and URLs', async () => {
      mockAxiosInstance.put.mockResolvedValue({});

      const params: CardUpdate = {
        clientId: 999,
        businessCardIDURL: 'https://different-domain.com/custom/path',
        businessCardIDQRCode: 'DIFFERENT_QR_CODE'
      };

      const command = UpdateCardID(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/clients/999', {
        businessCardIDURL: 'https://different-domain.com/custom/path',
        businessCardIDQRCode: 'DIFFERENT_QR_CODE'
      });
    });
  });
});
