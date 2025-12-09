import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  GetClientClassification,
  SwitchClientClassification,
  CancelSwitchClientClassification
} from '../../../src/commands/rest/clientClassification';
import * as baseRequestModule from '../../../src/utils/baseRequest';

describe('Client Classification Commands', () => {
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

  describe('GetClientClassification', () => {
    it('should get client classification successfully', async () => {
      const mockResponse = {
        data: {
          clientId: 123,
          currentClassificationStartDate: '2024-01-01',
          applicableDate: '2024-01-01',
          upcomingClassificationRequestId: 456,
          currentClassification: {
            id: 1,
            name: 'Standard',
            position: 1,
            description: 'Standard classification',
            active: true,
            mandatory: true,
            systemDefined: true,
            codeName: 'STANDARD',
            isMasked: false,
            charges: [
              {
                chargeId: 1,
                numberOfFeeExemptedCharge: 0,
                exemptedFeeAmount: 0,
                chargeAmount: 100
              }
            ]
          }
        }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const command = GetClientClassification(123, { tenantId: 'your_tenant_id' });
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/123/classifications');
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Client not found');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const command = GetClientClassification(999);

      await expect(command.execute(mockConfig)).rejects.toThrow('Client not found');
    });
  });

  describe('SwitchClientClassification', () => {
    it('should switch client classification successfully', async () => {
      const mockResponse = {
        data: {
          id: 789,
          clientId: 123,
          resourceId: 456,
          data: {
            oldClassificationId: 1,
            newClassificationId: 2
          }
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const params = {
        classificationId: 2,
        expectedApplicableDate: '2024-02-01',
        dateFormat: 'yyyy-MM-dd',
        locale: 'en_US'
      };

      const command = SwitchClientClassification(123, params, { tenantId: 'your_tenant_id' });
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v1/clients/123?command=switchclassification',
        params
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Switch classification failed');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const params = {
        classificationId: 2,
        expectedApplicableDate: '2024-02-01',
        dateFormat: 'yyyy-MM-dd'
      };

      const command = SwitchClientClassification(123, params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Switch classification failed');
    });
  });

  describe('CancelSwitchClientClassification', () => {
    it('should cancel switch client classification successfully', async () => {
      const mockResponse = {
        data: {
          id: 790,
          clientId: 123,
          resourceId: 456,
          data: {
            oldClassificationId: 2,
            newClassificationId: 1
          }
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const params = { switchClassificationRequestId: 789 };

      const command = CancelSwitchClientClassification(123, params, { tenantId: 'your_tenant_id' });
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v1/clients/123?command=cancelSwitchclassification',
        params
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Cancel switch classification failed');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const params = { switchClassificationRequestId: 789 };

      const command = CancelSwitchClientClassification(123, params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Cancel switch classification failed');
    });
  });

});
