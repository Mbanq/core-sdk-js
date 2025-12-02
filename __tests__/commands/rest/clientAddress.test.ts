import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  GetClientAddress,
  CreateClientAddress,
  UpdateClientAddress,
  SetClientAddressStatus
} from '../../../src/commands/rest/clientAddress';
import * as baseRequestModule from '../../../src/utils/baseRequest';

describe('ClientAddress Commands', () => {
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

  describe('GetClientAddress', () => {
    it('should get client addresses', async () => {
      const mockResponse = {
        data: [
          {
            clientId: 123,
            addressType: 'HOME',
            addressId: 456,
            addressTypeId: 1,
            isActive: true,
            addressLine1: '123 Main St',
            addressLine2: '',
            addressLine3: '',
            mobileNo: 1234567890,
            townVillage: 'Springfield',
            countyDistrict: 'County',
            city: 'Springfield',
            stateProvinceId: 1,
            countryName: 'United States',
            stateName: 'Illinois',
            countryId: 1,
            postalCode: '62701',
            createdBy: 'admin',
            updatedBy: 'admin',
            minifiedAddress: ['123 Main St', 'Springfield', 'IL 62701']
          }
        ]
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params = { clientId: 123 };
      const configuration = { tenantId: 'custom-tenant-id' };
      const command = GetClientAddress(params.clientId, configuration);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/client/123/addresses');
      expect(result).toEqual(mockResponse.data);
      expect(command.input).toEqual({ clientId: 123 });
      expect(command.metadata.commandName).toBe('GetClientAddress');
      expect(command.metadata.path).toBe('/v1/client/123/addresses');
      expect(command.metadata.method).toBe('GET');
    });

    it('should handle errors when getting client addresses', async () => {
      const mockError = new Error('Network error');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const params = { clientId: 123 };
      const command = GetClientAddress(params.clientId);

      await expect(command.execute(mockConfig)).rejects.toThrow();
    });

    it('should have correct metadata', () => {
      const params = { clientId: 123 };
      const command = GetClientAddress(params.clientId);

      expect(command.input).toEqual({ clientId: 123 });
      expect(command.metadata.commandName).toBe('GetClientAddress');
      expect(command.metadata.path).toBe('/v1/client/123/addresses');
      expect(command.metadata.method).toBe('GET');
    });
  });

  describe('CreateClientAddress', () => {
    const mockCreateParams = {
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      city: 'Springfield',
      stateProvinceId: 1,
      countryId: 1,
      postalCode: '62701',
      isActive: true
    };

    it('should create a client address', async () => {
      const mockResponse = {
        data: {
          clientId: 123,
          resourceId: 456
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockResponse);
      const params = { clientId: 123, type: 1, params: mockCreateParams };
      const configuration = { tenantId: 'custom-tenant-id' };
      const command = CreateClientAddress(params.clientId, params.type, params.params, configuration);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/client/123/addresses?type=1', mockCreateParams);
      expect(result).toEqual(mockResponse.data);
      expect(command.input).toEqual({ clientId: 123, type: 1, params: mockCreateParams });
      expect(command.metadata.commandName).toBe('CreateClientAddress');
      expect(command.metadata.path).toBe('/v1/client/123/addresses?type=1');
      expect(command.metadata.method).toBe('POST');
    });

    it('should handle errors when creating client address', async () => {
      const mockError = new Error('Network error');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const params = { clientId: 123, type: 1, params: mockCreateParams };
      const command = CreateClientAddress(params.clientId, params.type, params.params);

      await expect(command.execute(mockConfig)).rejects.toThrow();
    });
  });

  describe('UpdateClientAddress', () => {
    const mockUpdateParams = {
      addressId: 456,
      addressTypeId: 1,
      addressLine1: '456 Updated St',
      addressLine2: 'Suite 100',
      city: 'Chicago',
      stateProvinceId: 1,
      countryId: 1,
      postalCode: '60601'
    };

    it('should update a client address', async () => {
      const mockResponse = {
        data: {
          id: 456,
          clientId: 123,
          resourceId: 789
        }
      };

      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const params = { clientId: 123, type: 1, params: mockUpdateParams };
      const configuration = { tenantId: 'custom-tenant-id' };
      const command = UpdateClientAddress(params.clientId, params.type, params.params, configuration);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/v1/client/123/addresses?type=1', mockUpdateParams);
      expect(result).toEqual(mockResponse.data);
      expect(command.input).toEqual({ clientId: 123, type: 1, params: mockUpdateParams });
      expect(command.metadata.commandName).toBe('UpdateClientAddress');
      expect(command.metadata.path).toBe('/v1/client/123/addresses?type=1');
      expect(command.metadata.method).toBe('PUT');
    });

    it('should handle errors when updating client address', async () => {
      const mockError = new Error('Network error');
      mockAxiosInstance.put.mockRejectedValue(mockError);

      const params = { clientId: 123, type: 1, params: mockUpdateParams };
      const command = UpdateClientAddress(params.clientId, params.type, params.params);

      await expect(command.execute(mockConfig)).rejects.toThrow();
    });
  });

  describe('SetClientAddressStatus', () => {
    it('should set client address status to deactivate', async () => {
      const mockResponse = {
        data: {
          id: 456,
          clientId: 123,
          resourceId: 789
        }
      };

      mockAxiosInstance.put.mockResolvedValue(mockResponse);
      const configuration = { tenantId: 'custom-tenant-id' };
      const deactivateParams = { addressId: 456, isActive: true };
      const params = { clientId: 123, type: 1, params: { addressId: 456, isActive: true }, configuration };
      const command = SetClientAddressStatus(params.clientId, params.type, params.params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/v1/client/123/addresses?type=1', deactivateParams);
      expect(result).toEqual(mockResponse.data);
    });

    it('should set client address status to active', async () => {
      const mockResponse = { data: { id: 456, clientId: 123, resourceId: 789 } };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const activeParams = { addressId: 456, isActive: true };
      const params = { clientId: 123, type: 1, params: activeParams };
      const command = SetClientAddressStatus(params.clientId, params.type, params.params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/v1/client/123/addresses?type=1', activeParams);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle errors when setting client address status', async () => {
      const mockError = new Error('Network error');
      mockAxiosInstance.put.mockRejectedValue(mockError);

      const params = { clientId: 123, type: 1, params: { addressId: 456, isActive: true } };
      const command = SetClientAddressStatus(params.clientId, params.type, params.params);

      await expect(command.execute(mockConfig)).rejects.toThrow();
    });
  });
});