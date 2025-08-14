import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GetClientData, UpdateClient, UpdateClientIdentifier } from '../../../src/commands/rest/client';
import * as baseRequestModule from '../../../src/utils/baseRequest';

describe('Client Commands', () => {
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

  describe('GetClientData', () => {
    it('should get basic client data only', async () => {
      const mockClientData = {
        data: { id: 123, name: 'John Doe' }
      };
      mockAxiosInstance.get.mockResolvedValue(mockClientData);

      const params = { clientId: 123 };
      const command = GetClientData(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/123');
      expect(result).toBeDefined();
      expect(result!.clientData).toEqual(mockClientData);
      expect(result!.riskRatingData).toBeUndefined();
      expect(result!.clientAddressData).toBeUndefined();
      expect(result!.clientIdentifierData).toBeUndefined();
    });

    it('should get client data with all optional data', async () => {
      const mockClientData = { data: { id: 123, name: 'John Doe' } };
      const mockRiskRating = { data: { rating: 'LOW' } };
      const mockAddress = { data: { street: '123 Main St' } };
      const mockIdentifier = { data: { ssn: '***-**-1234' } };

      mockAxiosInstance.get
        .mockResolvedValueOnce(mockClientData)
        .mockResolvedValueOnce(mockRiskRating)
        .mockResolvedValueOnce(mockAddress)
        .mockResolvedValueOnce(mockIdentifier);

      const params = {
        clientId: 123,
        riskRating: true,
        clientAddress: true,
        clientIdentifier: true
      };

      const command = GetClientData(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(4);
      expect(mockAxiosInstance.get).toHaveBeenNthCalledWith(1, '/v1/clients/123');
      expect(mockAxiosInstance.get).toHaveBeenNthCalledWith(2, '/v1/clients/123/riskrating');
      expect(mockAxiosInstance.get).toHaveBeenNthCalledWith(3, '/v1/client/123/addresses');
      expect(mockAxiosInstance.get).toHaveBeenNthCalledWith(4, '/v1/clients/123/identifiers?unmaskValue=true');

      expect(result).toBeDefined();
      expect(result!.clientData).toEqual(mockClientData);
      expect(result!.riskRatingData).toEqual(mockRiskRating);
      expect(result!.clientAddressData).toEqual(mockAddress);
      expect(result!.clientIdentifierData).toEqual(mockIdentifier);
    });

    it('should use custom tenantId when provided', async () => {
      const mockClientData = { data: { id: 123 } };
      mockAxiosInstance.get.mockResolvedValue(mockClientData);

      const params = {
        clientId: 123,
        tenantId: 'custom-tenant'
      };

      const command = GetClientData(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Client not found');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const params = { clientId: 999 };
      const command = GetClientData(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Client not found');
    });

    it('should have correct metadata', () => {
      const params = { clientId: 123 };
      const command = GetClientData(params);

      expect(command.metadata.commandName).toBe('GetClientData');
      expect(command.metadata.path).toBe('/v1/clients/123');
      expect(command.metadata.method).toBe('GET');
    });
  });

  describe('UpdateClient', () => {
    it('should update client successfully', async () => {
      const mockResponse = {
        data: { success: true, clientId: 123 }
      };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const params = {
        clientId: 123,
        updates: {
          name: 'Jane Doe',
          email: 'jane@example.com'
        }
      };

      const command = UpdateClient(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        '/v1/clients/123',
        {
          name: 'Jane Doe',
          email: 'jane@example.com'
        }
      );
      expect(result).toEqual({ success: true, clientId: 123 });
    });

    it('should use custom tenantId when provided', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const params = {
        clientId: 123,
        updates: { name: 'Updated Name' },
        tenantId: 'custom-tenant'
      };

      const command = UpdateClient(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Update failed');
      mockAxiosInstance.put.mockRejectedValue(mockError);

      const params = {
        clientId: 123,
        updates: { name: 'New Name' }
      };

      const command = UpdateClient(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Update failed');
    });

    it('should have correct metadata', () => {
      const params = {
        clientId: 123,
        updates: { name: 'Test' }
      };

      const command = UpdateClient(params);

      expect(command.metadata.commandName).toBe('UpdateClient');
      expect(command.metadata.path).toBe('/v1/clients/123');
      expect(command.metadata.method).toBe('PUT');
    });
  });

  describe('UpdateClientIdentifier', () => {
    it('should update client identifier successfully', async () => {
      const mockResponse = {
        data: { success: true, identifierId: 'id123' }
      };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const params = {
        clientId: 123,
        identifierId: 'id123',
        updates: {
          value: 'new-value',
          verified: true
        }
      };

      const command = UpdateClientIdentifier(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        '/v1/clients/123/identifiers/id123',
        {
          value: 'new-value',
          verified: true
        }
      );
      expect(result).toEqual({ success: true, identifierId: 'id123' });
    });

    it('should use custom tenantId when provided', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const params = {
        clientId: 123,
        identifierId: 'id123',
        updates: { verified: true },
        tenantId: 'custom-tenant'
      };

      const command = UpdateClientIdentifier(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Identifier update failed');
      mockAxiosInstance.put.mockRejectedValue(mockError);

      const params = {
        clientId: 123,
        identifierId: 'id123',
        updates: { verified: false }
      };

      const command = UpdateClientIdentifier(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Identifier update failed');
    });

    it('should have correct metadata', () => {
      const params = {
        clientId: 123,
        identifierId: 'id123',
        updates: { verified: true }
      };

      const command = UpdateClientIdentifier(params);

      expect(command.metadata.commandName).toBe('UpdateClientIdentifier');
      expect(command.metadata.path).toBe('/v1/clients/123/identifiers/id123');
      expect(command.metadata.method).toBe('PUT');
    });
  });
});
