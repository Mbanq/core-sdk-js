import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GetClient, UpdateClient, CreateClient, ListClients, GetClients, DeleteClient } from '../../../src/commands/rest/client';
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

  describe('ListClients', () => {
    it('should create query builder successfully', () => {
      const listClients = ListClients();
      const queryBuilder = listClients.list();

      expect(queryBuilder).toBeDefined();
      expect(typeof queryBuilder.where).toBe('function');
      expect(typeof queryBuilder.limit).toBe('function');
      expect(typeof queryBuilder.offset).toBe('function');
      expect(typeof queryBuilder.all).toBe('function');
      expect(typeof queryBuilder.execute).toBe('function');
    });

    it('should create query builder with custom tenantId', () => {
      const listClients = ListClients({ tenantId: 'custom-tenant' });
      const queryBuilder = listClients.list();

      expect(queryBuilder).toBeDefined();
      // We can test that the tenantId parameter is passed through by checking the builder
    });

    it('should build query with where clause', () => {
      const listClients = ListClients();
      const queryBuilder = listClients.list().where('firstname').eq('John');

      expect(queryBuilder).toBeDefined();
      expect(typeof queryBuilder.execute).toBe('function');
    });

    it('should build query with limit', () => {
      const listClients = ListClients();
      const queryBuilder = listClients.list().limit(50);

      expect(queryBuilder).toBeDefined();
      expect(typeof queryBuilder.execute).toBe('function');
    });

    it('should build query with offset', () => {
      const listClients = ListClients();
      const queryBuilder = listClients.list().offset(100);

      expect(queryBuilder).toBeDefined();
      expect(typeof queryBuilder.execute).toBe('function');
    });

    it('should build query to fetch all records', () => {
      const listClients = ListClients();
      const queryBuilder = listClients.list().all();

      expect(queryBuilder).toBeDefined();
      expect(typeof queryBuilder.execute).toBe('function');
    });

    it('should throw error for invalid limit (negative)', () => {
      const listClients = ListClients();

      expect(() => {
        listClients.list().limit(-5);
      }).toThrow('Invalid limit: -5. Limit must be positive or 0 for fetching all records.');
    });

    it('should throw error for invalid offset (negative)', () => {
      const listClients = ListClients();

      expect(() => {
        listClients.list().offset(-1);
      }).toThrow('Invalid offset: -1. Offset must be non-negative.');
    });

    it('should allow limit of 0 for fetching all records', () => {
      const listClients = ListClients();
      const queryBuilder = listClients.list().limit(0);

      expect(queryBuilder).toBeDefined();
    });

    it('should execute query with pagination logic when limit is 0', async () => {
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

      const listClients = ListClients();
      const command = listClients.list().limit(0).execute();
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(2);
      expect(result).toBeDefined();
      expect(result!.totalFilteredRecords).toBe(250);
      expect(result!.pageItems).toHaveLength(250);
    });

    it('should execute regular paginated query when limit is not 0', async () => {
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

      const listClients = ListClients();
      const command = listClients.list().limit(10).offset(0).execute();
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients', {
        params: { limit: 10, offset: 0 }
      });
      expect(result).toEqual({
        totalFilteredRecords: 50,
        pageItems: [
          { id: 1, firstname: 'John', lastname: 'Doe' },
          { id: 2, firstname: 'Jane', lastname: 'Smith' }
        ]
      });
    });

    it('should handle errors in query execution', async () => {
      const mockError = new Error('Server error');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const listClients = ListClients();
      const command = listClients.list().execute();

      await expect(command.execute(mockConfig)).rejects.toThrow('Server error');
    });

    it('should use custom tenantId in query execution', async () => {
      const mockResponse = {
        data: { totalFilteredRecords: 0, pageItems: [] }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const listClients = ListClients({ tenantId: 'custom-tenant' });
      const command = listClients.list().execute();
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should validate filters when using where clause', () => {
      const listClients = ListClients();

      // This should not throw since firstname is a valid filter key
      expect(() => {
        listClients.list().where('firstname').eq('John');
      }).not.toThrow();

      // This should throw since invalidKey is not a valid filter key
      expect(() => {
        listClients.list().where('invalidKey').eq('value');
      }).toThrow();
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
});
