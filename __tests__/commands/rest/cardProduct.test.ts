import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ListCardProduct,
  GetCardProduct,
  CreateCardProduct,
  UpdateCardProduct
} from '../../../src/commands/rest/cardProduct';
import * as baseRequestModule from '../../../src/utils/baseRequest';
import { handleAxiosError } from '../../../src/utils/errorHandler';

describe('CardProduct Commands', () => {
  let mockAxiosInstance: any;
  const mockConfig = {
    secret: 'test_secret',
    signee: 'test_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://test.api.url'
  };

  beforeEach(() => {
    vi.stubEnv('SECRET', 'test_secret');
    vi.stubEnv('SIGNEE', 'test_signee');
    vi.stubEnv('TENANT_ID', 'test_tenant_id');
    vi.stubEnv('BASE_URL', 'https://test.api.url');

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

  describe('ListCardProduct', () => {
    it('should get card product list successfully with default limit', async () => {
      const params = { tenantId: 'your_tenant_id' };
      const command = ListCardProduct(params);

      const mockResponse = {
        data: {
          totalFilteredRecords: 1,
          pageItems: [{
            id: 1,
            name: 'Test Card Product',
            active: true,
            bin: '123456',
            cardType: 'DEBIT',
            network: 'VISA',
            manualPin: false,
            virtual: false,
            digitalFirst: false,
            atmWithdrawalsEnabled: true,
            internationalPaymentsEnabled: true,
            currencyCode: 'USD',
            currencyDigitsAfterDecimal: 2,
            currencyInMultiplesOf: 1,
            cardProcessorId: 1,
            cardProcessorDisplayName: 'Test Processor',
            yearExpire: 5,
            maxActiveCardAllowed: 1,
            creditProductId: 1
          }]
        }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);
      const result = command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/cardproducts?limit=0');
      expect(result).toEqual(mockResponse.data);
    });

    it('should get card product list successfully with set limit and offset', async () => {
      const params = { limit: 10, offset: 20 };
      const command = ListCardProduct({ ...params });

      const mockResponse = {
        data: {
          totalFilteredRecords: 1,
          pageItems: [{
            id: 1,
            name: 'Test Card Product',
            active: true,
            bin: '123456',
            cardType: 'DEBIT',
            network: 'VISA',
            manualPin: false,
            virtual: false,
            digitalFirst: false,
            atmWithdrawalsEnabled: true,
            internationalPaymentsEnabled: true,
            currencyCode: 'USD',
            currencyDigitsAfterDecimal: 2,
            currencyInMultiplesOf: 1,
            cardProcessorId: 1,
            cardProcessorDisplayName: 'Test Processor',
            yearExpire: 5,
            maxActiveCardAllowed: 1,
            creditProductId: 1
          }]
        }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);
      const result = command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/cardproducts?offset=20&limit=10');
      expect(result).toEqual(mockResponse.data);
      expect(command.metadata.commandName).toBe('ListCardProduct');
      expect(command.metadata.path).toBe('/v1/cardproducts?offset=20&limit=10');
      expect(command.metadata.method).toBe('GET');
    });

    it('should handle API errors', async () => {
      const params = { limit: 10 };
      const command = ListCardProduct(params);

      const mockError = new Error('Network error');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(command.execute(mockConfig)).rejects.toThrow('Network error');
    });
  });

  describe('GetCardProduct', () => {
    it('should get card product successfully', async () => {
      const params = { cardProductId: 123 };
      const command = GetCardProduct(params);

      const mockResponse = {
        data: {
          id: 123,
          name: 'Test Card Product',
          externalProductId: 1,
          active: true,
          bin: 123456,
          cardType: 'DEBIT',
          network: 'VISA',
          manualPin: false,
          virtual: false,
          digitalFirst: false,
          atmWithdrawalsEnabled: true,
          internationalPaymentsEnabled: true,
          onlinePaymentsEnabled: true,
          contactlessPaymentsEnabled: true,
          posPaymentsEnabled: true,
          currencyCode: 'USD',
          currencyDigitsAfterDecimal: 2,
          currencyInMultiplesOf: 1,
          velocityRules: {
            controls: ['daily_limit'],
            type: 'amount',
            value: 1000,
            timePeriod: 1,
            timeUnit: 'day',
            category: 'general',
            categoryId: 1,
            version: 1,
            id: 1
          },
          cardProcessorId: 1,
          cardProcessorDisplayName: 'Test Processor',
          yearExpire: 5,
          maxActiveCardAllowed: 1,
          prepaidCard: false,
          legalForm: 1,
          businessCardIDEnabled: false,
          fulfillCardOnOrder: false
        }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/cardproducts/123');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API errors', async () => {
      const params = { tenantId: mockConfig.tenantId, cardProductId: 123 };
      const command = GetCardProduct(params);
      const mockError = new Error('Not found');

      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(command.execute(mockConfig)).rejects.toThrow('Not found');
      expect(handleAxiosError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('CreateCardProduct', () => {
    it('should create command with correct metadata', async () => {
      const params = {
        tenantId: 'tenant123',
        params: {
          name: 'New Card Product',
          legalForm: 1,
          cardType: 'DEBIT' as const,
          bin: '123456',
          yearExpire: 5,
          maxActiveCardAllowed: 1,
          currencyCode: 'USD',
          currencyDigitsAfterDecimal: 2,
          cardProcessorId: 12,
          externalProductId: 1,
          cardProcessorConfigId: 50000,
          network: 'VISA'
        }
      };
      const command = CreateCardProduct(params);
      
      const mockResponse = {
        data: {
          resourceId: 456
        }
      };
      
      mockAxiosInstance.get.mockResolvedValue(mockResponse);
      const result = await command.execute(mockConfig);

      expect(result).toEqual(mockResponse.data);
      expect(command.input).toEqual(params);
      expect(command.metadata.commandName).toBe('CreateCardProduct');
      expect(command.metadata.method).toBe('POST');
      expect(command.metadata.path).toBe('/v1/cardproducts');
    });

    it('should handle API errors', async () => {
      const params = {
        params: {
          name: 'New Card Product',
          legalForm: 1,
          cardType: 'DEBIT' as const,
          bin: '123456',
          yearExpire: 5,
          maxActiveCardAllowed: 1,
          currencyCode: 'USD',
          currencyDigitsAfterDecimal: 2,
          cardProcessorId: 12,
          externalProductId: 1,
          cardProcessorConfigId: 50000,
          network: 'VISA'
        }
      };
      const command = CreateCardProduct(params);

      const mockError = new Error('Validation error');

      mockAxiosInstance.get.mockRejectedValue(mockError);
      await expect(command.execute(mockConfig)).rejects.toThrow('Validation error');
    });
  });

  describe('UpdateCardProduct', () => {
    it('should make PUT request to correct endpoint', async () => {
      const params = {
        cardProductId: 789,
        params: {
          name: 'Updated Card Product',
          active: false
        }
      };
      const command = UpdateCardProduct(params);

      const mockResponse = {
        data: {
          resourceId: 789,
          id: 789
        }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/cardproducts/789');
      expect(result).toEqual(mockResponse.data);
      expect(command.input).toEqual(params);
      expect(command.metadata.commandName).toBe('UpdateCardProduct');
      expect(command.metadata.method).toBe('PUT');
      expect(command.metadata.path).toBe('/cardproducts/789');
    });

    it('should handle API errors', async () => {
      const params = {
        cardProductId: 789,
        params: {
          name: 'Updated Card Product',
          active: false
        }
      };
      const command = UpdateCardProduct(params);

      const mockError = new Error('Update failed');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(command.execute(mockConfig)).rejects.toThrow('Update failed');
    });
  });
});