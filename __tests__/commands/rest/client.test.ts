import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GetClient, UpdateClient, CreateClient, GetClients, DeleteClient, VerifyWithActivateClients, GetStatusOfVerifyClient } from '../../../src/commands/rest/client';
import { UpdateClientIdentifier } from '../../../src/commands/rest/clientIdentifier';
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
      const command = GetClient(params);
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

      const command = GetClient(params);
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

    it('should get client data with query parameters', async () => {
      const mockClientData = { data: { id: 123, name: 'John Doe' } };
      mockAxiosInstance.get.mockResolvedValue(mockClientData);

      const params = {
        clientId: 123,
        staffInSelectedOfficeOnly: true,
        checkIdentitiesExpiration: true,
        clientAccountAssociate: true
      };

      const command = GetClient(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/123?staffInSelectedOfficeOnly=true&checkIdentitiesExpiration=true&clientAccountAssociate=true');
      expect(result!.clientData).toEqual(mockClientData);
    });

    it('should use custom tenantId when provided', async () => {
      const mockClientData = { data: { id: 123 } };
      mockAxiosInstance.get.mockResolvedValue(mockClientData);

      const params = {
        clientId: 123,
        tenantId: 'custom-tenant'
      };

      const command = GetClient(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Client not found');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const params = { clientId: 999 };
      const command = GetClient(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Client not found');
    });

    it('should have correct metadata', () => {
      const params = { clientId: 123 };
      const command = GetClient(params);

      expect(command.metadata.commandName).toBe('GetClient');
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
          documentTypeId: 'PASSPORT',
          documentKey: 'ABC123456',
          status: 'ACTIVE',
          description: 'Valid passport'
        }
      };

      const command = UpdateClientIdentifier(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        '/v1/clients/123/identifiers/id123',
        {
          documentTypeId: 'PASSPORT',
          documentKey: 'ABC123456',
          status: 'ACTIVE',
          description: 'Valid passport'
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
        updates: {
          documentTypeId: 'PASSPORT',
          documentKey: 'ABC123456',
          status: 'ACTIVE'
        },
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
        updates: {
          documentTypeId: 'PASSPORT',
          documentKey: 'ABC123456',
          status: 'ACTIVE'
        }
      };

      const command = UpdateClientIdentifier(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Identifier update failed');
    });

    it('should have correct metadata', () => {
      const params = {
        clientId: 123,
        identifierId: 'id123',
        updates: {
          documentTypeId: 'PASSPORT',
          documentKey: 'ABC123456',
          status: 'ACTIVE'
        }
      };

      const command = UpdateClientIdentifier(params);

      expect(command.metadata.commandName).toBe('UpdateClientIdentifier');
      expect(command.metadata.path).toBe('/v1/clients/123/identifiers/id123');
      expect(command.metadata.method).toBe('PUT');
    });
  });

  describe('CreateClient', () => {
    it('should create client successfully', async () => {
      const mockResponse = {
        data: {
          clientId: 123,
          status: 'CREATED',
          resourceIdentifier: 'CLIENT_123'
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const clientData = {
        firstname: 'John',
        lastname: 'Doe',
        dob: '1990-01-01',
        dateOfBirth: '1990-01-01',
        dateFormat: 'yyyy-MM-dd',
        submittedOnDate: '2024-01-01',
        genderId: 1,
        locale: 'en_US',
        officeId: 1,
        mobileCountryCode: '+1',
        mobileNo: '1234567890',
        emailAddress: 'john.doe@example.com',
        legalFormId: 1
      };

      const command = CreateClient({ clientData });
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/clients', clientData);
      expect(result).toEqual({
        clientId: 123,
        status: 'CREATED',
        resourceIdentifier: 'CLIENT_123'
      });
    });

    it('should use custom tenantId when provided', async () => {
      const mockResponse = { data: { clientId: 123 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const clientData = {
        firstname: 'Jane',
        lastname: 'Smith',
        dob: '1985-05-15',
        dateOfBirth: '1985-05-15',
        dateFormat: 'yyyy-MM-dd',
        submittedOnDate: '2024-01-01',
        genderId: 2,
        locale: 'en_US',
        officeId: 1,
        mobileCountryCode: '+1',
        mobileNo: '9876543210',
        emailAddress: 'jane.smith@example.com',
        legalFormId: 1
      };

      const command = CreateClient({
        clientData,
        tenantId: 'custom-tenant'
      });

      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Validation failed');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const clientData = {
        firstname: 'John',
        lastname: 'Doe',
        dob: '1990-01-01',
        dateOfBirth: '1990-01-01',
        dateFormat: 'yyyy-MM-dd',
        submittedOnDate: '2024-01-01',
        genderId: 1,
        locale: 'en_US',
        officeId: 1,
        mobileCountryCode: '+1',
        mobileNo: '1234567890',
        emailAddress: 'invalid-email',
        legalFormId: 1
      };

      const command = CreateClient({ clientData });

      await expect(command.execute(mockConfig)).rejects.toThrow('Validation failed');
    });

    it('should have correct metadata', () => {
      const clientData = {
        firstname: 'John',
        lastname: 'Doe',
        dob: '1990-01-01',
        dateOfBirth: '1990-01-01',
        dateFormat: 'yyyy-MM-dd',
        submittedOnDate: '2024-01-01',
        genderId: 1,
        locale: 'en_US',
        officeId: 1,
        mobileCountryCode: '+1',
        mobileNo: '1234567890',
        emailAddress: 'john.doe@example.com',
        legalFormId: 1
      };

      const command = CreateClient({ clientData });

      expect(command.metadata.commandName).toBe('CreateClient');
      expect(command.metadata.path).toBe('/v1/clients');
      expect(command.metadata.method).toBe('POST');
    });
  });

  describe('GetClients', () => {
    it('should get clients with default pagination', async () => {
      const mockResponse = {
        data: {
          totalFilteredRecords: 50,
          pageItems: [
            { id: 1, firstname: 'John', lastname: 'Doe' },
            { id: 2, firstname: 'Jane', lastname: 'Smith' }
          ]
        }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const command = GetClients({}, {});
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients', {
        params: { limit: 200, offset: 0 }
      });
      expect(result).toEqual({
        totalFilteredRecords: 50,
        pageItems: [
          { id: 1, firstname: 'John', lastname: 'Doe' },
          { id: 2, firstname: 'Jane', lastname: 'Smith' }
        ]
      });
    });

    it('should get clients with custom pagination', async () => {
      const mockResponse = {
        data: {
          totalFilteredRecords: 100,
          pageItems: [
            { id: 21, firstname: 'Client', lastname: '21' }
          ]
        }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params = {
        limit: 10,
        offset: 20,
        firstname: 'John'
      };

      const command = GetClients(params, {});
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients', {
        params: { limit: 10, offset: 20, firstname: 'John' }
      });
      expect(result).toEqual({
        totalFilteredRecords: 100,
        pageItems: [
          { id: 21, firstname: 'Client', lastname: '21' }
        ]
      });
    });

    it('should fetch all clients when limit is 0', async () => {
      const mockResponsePage1 = {
        data: {
          totalFilteredRecords: 250,
          pageItems: Array(200).fill(null).map((_, i) => ({ id: i + 1, name: `Client ${i + 1}` }))
        }
      };
      const mockResponsePage2 = {
        data: {
          totalFilteredRecords: 250,
          pageItems: Array(50).fill(null).map((_, i) => ({ id: i + 201, name: `Client ${i + 201}` }))
        }
      };

      mockAxiosInstance.get
        .mockResolvedValueOnce(mockResponsePage1)
        .mockResolvedValueOnce(mockResponsePage2);

      const params = { limit: 0 };
      const command = GetClients(params, {});
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
      expect(result!.totalFilteredRecords).toBe(250);
      expect(result!.pageItems).toHaveLength(250);
    });

    it('should use custom tenantId when provided', async () => {
      const mockResponse = {
        data: { totalFilteredRecords: 0, pageItems: [] }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const command = GetClients({}, { tenantId: 'custom-tenant' });
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Server error');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const command = GetClients({}, {});

      await expect(command.execute(mockConfig)).rejects.toThrow('Server error');
    });

    it('should have correct metadata', () => {
      const command = GetClients({}, {});

      expect(command.metadata.commandName).toBe('GetClients');
      expect(command.metadata.path).toBe('/v1/clients');
      expect(command.metadata.method).toBe('GET');
    });
  });

  describe('DeleteClient', () => {
    it('should delete client successfully', async () => {
      const mockResponse = {
        data: {
          clientId: 123,
          status: 'DELETED'
        }
      };
      mockAxiosInstance.delete.mockResolvedValue(mockResponse);

      const command = DeleteClient({ clientId: 123 });
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/clients/123');
      expect(result).toEqual({
        clientId: 123,
        status: 'DELETED'
      });
    });

    it('should use custom tenantId when provided', async () => {
      const mockResponse = { data: { status: 'DELETED' } };
      mockAxiosInstance.delete.mockResolvedValue(mockResponse);

      const command = DeleteClient({
        clientId: 123,
        tenantId: 'custom-tenant'
      });

      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Client not found');
      mockAxiosInstance.delete.mockRejectedValue(mockError);

      const command = DeleteClient({ clientId: 999 });

      await expect(command.execute(mockConfig)).rejects.toThrow('Client not found');
    });

    it('should have correct metadata', () => {
      const command = DeleteClient({ clientId: 123 });

      expect(command.metadata.commandName).toBe('DeleteClient');
      expect(command.metadata.path).toBe('/v1/clients/123');
      expect(command.metadata.method).toBe('DELETE');
    });
  });

  describe('VerifyWithActivateClients', () => {
    it('should verify client without auto-activation', async () => {
      const mockVerifyResponse = {
        data: {
          id: 1,
          clientId: 123,
          officeId: 1,
          resourceId: 123,
          data: {
            clientVerificationStatus: 'APPROVED',
            clientKycStatus: 'APPROVED'
          }
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockVerifyResponse);

      const command = VerifyWithActivateClients({
        param: {
          clientId: '123',
          kycVerificationType: 'FULL',
          note: 'Test verification',
          locale: 'en',
          dateFormat: 'dd MMMM yyyy',
          activationDate: '2024-01-01',
          skipVerify: false,
          skipActivate: false,
          autoActivate: false, // Changed to false to test only verification
          isActivatedByManualReview: false
        }
      });

      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/clients/123', {
        kycVerificationType: 'FULL',
        note: 'Test verification'
      });
      expect(result).toEqual(mockVerifyResponse.data);
    });

    it('should verify and activate when status is APPROVED and autoActivate is true', async () => {
      const mockVerifyResponse = {
        data: {
          id: 1,
          clientId: 123,
          officeId: 1,
          resourceId: 123,
          data: {
            clientVerificationStatus: 'APPROVED',
            clientKycStatus: 'APPROVED'
          }
        }
      };

      const mockActivateResponse = {
        data: {
          clientId: 123,
          resourceId: 123
        }
      };

      mockAxiosInstance.post
        .mockResolvedValueOnce(mockVerifyResponse)
        .mockResolvedValueOnce(mockActivateResponse);

      const command = VerifyWithActivateClients({
        param: {
          clientId: '123',
          kycVerificationType: 'FULL',
          locale: 'en',
          dateFormat: 'dd MMMM yyyy',
          activationDate: '2024-01-01',
          skipVerify: false,
          skipActivate: false,
          autoActivate: true,
          isActivatedByManualReview: false
        }
      });

      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(2);
      expect(mockAxiosInstance.post).toHaveBeenNthCalledWith(1, '/v1/clients/123', {
        kycVerificationType: 'FULL',
        note: undefined
      });
      expect(mockAxiosInstance.post).toHaveBeenNthCalledWith(2, '/v1/clients/123', {
        locale: 'en',
        dateFormat: 'dd MMMM yyyy',
        activationDate: '2024-01-01',
        isActivatedByManualReview: false,
        manualReviewActivationComments: undefined
      });
      expect(result).toHaveProperty('clientId', 123);
      expect(result).toHaveProperty('data');
    });

    it('should skip verification when skipVerify is true', async () => {
      const command = VerifyWithActivateClients({
        param: {
          clientId: '123',
          locale: 'en',
          dateFormat: 'dd MMMM yyyy',
          activationDate: '2024-01-01',
          skipVerify: true,
          skipActivate: false,
          autoActivate: true,
          isActivatedByManualReview: false,
          kycVerificationType: 'FULL'
        }
      });

      const mockActivateResponse = {
        data: {
          clientId: 123,
          resourceId: 123
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockActivateResponse);

      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/clients/123', {
        locale: 'en',
        dateFormat: 'dd MMMM yyyy',
        activationDate: '2024-01-01',
        isActivatedByManualReview: false,
        manualReviewActivationComments: undefined
      });
      expect(result).toEqual(mockActivateResponse.data);
    });

    it('should skip activation when skipActivate is true', async () => {
      const mockVerifyResponse = {
        data: {
          id: 1,
          clientId: 123,
          officeId: 1,
          resourceId: 123,
          data: {
            clientVerificationStatus: 'APPROVED',
            clientKycStatus: 'APPROVED'
          }
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockVerifyResponse);

      const command = VerifyWithActivateClients({
        param: {
          clientId: '123',
          kycVerificationType: 'FULL',
          skipVerify: false,
          skipActivate: true,
          autoActivate: true,
          isActivatedByManualReview: false,
          locale: 'en',
          dateFormat: 'dd MMMM yyyy'
        }
      });

      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockVerifyResponse.data);
    });

    it('should not activate when autoActivate is false', async () => {
      const mockVerifyResponse = {
        data: {
          id: 1,
          clientId: 123,
          officeId: 1,
          resourceId: 123,
          data: {
            clientVerificationStatus: 'APPROVED',
            clientKycStatus: 'APPROVED'
          }
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockVerifyResponse);

      const command = VerifyWithActivateClients({
        param: {
          clientId: '123',
          kycVerificationType: 'FULL',
          skipVerify: false,
          skipActivate: false,
          autoActivate: false,
          isActivatedByManualReview: false,
          locale: 'en',
          dateFormat: 'dd MMMM yyyy'
        }
      });

      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockVerifyResponse.data);
    });

    it('should throw error when both skipVerify and skipActivate are true', async () => {
      const command = VerifyWithActivateClients({
        param: {
          clientId: '123',
          kycVerificationType: 'FULL',
          skipVerify: true,
          skipActivate: true,
          autoActivate: true,
          isActivatedByManualReview: false,
          locale: 'en',
          dateFormat: 'dd MMMM yyyy'
        }
      });

      await expect(command.execute(mockConfig)).rejects.toThrow();
    });

    it('should use custom tenantId when provided', async () => {
      const mockVerifyResponse = {
        data: {
          id: 1,
          clientId: 123,
          officeId: 1,
          resourceId: 123,
          data: {
            clientVerificationStatus: 'APPROVED',
            clientKycStatus: 'APPROVED'
          }
        }
      };

      mockAxiosInstance.post.mockResolvedValue(mockVerifyResponse);

      const command = VerifyWithActivateClients({
        tenantId: 'custom-tenant',
        param: {
          clientId: '123',
          kycVerificationType: 'FULL',
          skipVerify: false,
          skipActivate: true,
          autoActivate: true,
          isActivatedByManualReview: false,
          locale: 'en',
          dateFormat: 'dd MMMM yyyy'
        }
      });

      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should have correct metadata', () => {
      const command = VerifyWithActivateClients({
        param: {
          clientId: '123',
          kycVerificationType: 'FULL',
          skipVerify: false,
          skipActivate: false,
          autoActivate: true,
          isActivatedByManualReview: false,
          locale: 'en',
          dateFormat: 'dd MMMM yyyy'
        }
      });

      expect(command.metadata.commandName).toBe('VerifyWithActivateClients');
      expect(command.metadata.path).toBe('/v1/clients/123');
      expect(command.metadata.method).toBe('POST');
    });

    it('should handle API errors', async () => {
      const mockError = new Error('Verification failed');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const command = VerifyWithActivateClients({
        param: {
          clientId: '123',
          kycVerificationType: 'FULL',
          skipVerify: false,
          skipActivate: true,
          autoActivate: true,
          isActivatedByManualReview: false,
          locale: 'en',
          dateFormat: 'dd MMMM yyyy'
        }
      });

      await expect(command.execute(mockConfig)).rejects.toThrow('Verification failed');
    });
  });

  describe('GetStatusOfVerifyClient', () => {
    it('should get client verification status successfully', async () => {
      const mockResponse = {
        data: {
          id: 623148,
          accountNo: '623148',
          displayName: 'Stan YKeeling H',
          legalForm: {
            code: 'legalFormType.person',
            value: 1
          },
          verificationStatus: {
            id: 1,
            value: 'APPROVED'
          },
          identifiers: [
            {
              id: 11,
              clientId: 101,
              documentType: {
                id: 87,
                name: 'Social Security Number',
                isMasked: false
              },
              documentKey: '577575f83c49bb69f7605d5',
              issuedDate: [2025, 11, 3],
              expiryDate: [2026, 11, 25],
              description: 'Front page of document',
              status: 'clientIdentifierStatusType.active',
              issuedBy: 'string',
              verificationStatus: {
                id: 98,
                value: 'APPROVED'
              }
            }
          ],
          ofLoanCycle: 0,
          mobileCountryCode: '+1',
          ofLoanActive: 0,
          activeDepositAccount: 0
        }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const command = GetStatusOfVerifyClient({ clientId: 623148 });
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/623148/verificationstatus');
      expect(result).toEqual(mockResponse.data);
      expect(result?.id).toBe(623148);
      expect(result?.verificationStatus.value).toBe('APPROVED');
      expect(result?.identifiers).toHaveLength(1);
    });

    it('should use custom tenantId when provided', async () => {
      const mockResponse = {
        data: {
          id: 123,
          accountNo: '123',
          displayName: 'Test User',
          legalForm: { code: 'person', value: 1 },
          verificationStatus: { id: 1, value: 'PENDING' },
          ofLoanCycle: 0,
          mobileCountryCode: '+1',
          ofLoanActive: 0,
          activeDepositAccount: 0
        }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const command = GetStatusOfVerifyClient({
        clientId: 123,
        tenantId: 'custom-tenant'
      });

      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle API errors', async () => {
      const mockError = new Error('Client not found');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const command = GetStatusOfVerifyClient({ clientId: 999 });

      await expect(command.execute(mockConfig)).rejects.toThrow('Client not found');
    });

    it('should have correct metadata', () => {
      const command = GetStatusOfVerifyClient({ clientId: 123 });

      expect(command.metadata.commandName).toBe('GetStatusOfVerifyClient');
      expect(command.metadata.path).toBe('/v1/clients/123/verificationstatus');
      expect(command.metadata.method).toBe('GET');
    });

    it('should handle response with no identifiers', async () => {
      const mockResponse = {
        data: {
          id: 456,
          accountNo: '456',
          displayName: 'No ID User',
          legalForm: { code: 'person', value: 1 },
          verificationStatus: { id: 2, value: 'PENDING' },
          ofLoanCycle: 0,
          mobileCountryCode: '+1',
          ofLoanActive: 0,
          activeDepositAccount: 0
        }
      };

      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const command = GetStatusOfVerifyClient({ clientId: 456 });
      const result = await command.execute(mockConfig);

      expect(result).toEqual(mockResponse.data);
      expect(result?.identifiers).toBeUndefined();
    });

    it('should handle different verification statuses', async () => {
      const statuses = ['PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED'];

      for (const status of statuses) {
        const mockResponse = {
          data: {
            id: 789,
            accountNo: '789',
            displayName: 'Test User',
            legalForm: { code: 'person', value: 1 },
            verificationStatus: { id: 1, value: status },
            ofLoanCycle: 0,
            mobileCountryCode: '+1',
            ofLoanActive: 0,
            activeDepositAccount: 0
          }
        };

        mockAxiosInstance.get.mockResolvedValue(mockResponse);

        const command = GetStatusOfVerifyClient({ clientId: 789 });
        const result = await command.execute(mockConfig);

        expect(result?.verificationStatus.value).toBe(status);
      }
    });
  });
});
