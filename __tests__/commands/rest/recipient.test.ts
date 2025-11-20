import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  GetRecipient,
  CreateRecipient,
  DeleteRecipient,
  GetRecipients
} from '../../../src/commands/rest/recipient';
import * as baseRequestModule from '../../../src/utils/baseRequest';
import * as errorHandlerModule from '../../../src/utils/errorHandler';
import { Recipient, CreateRecipientRequest, RecipientRequest } from '../../../src/types/recipient';
import { Config } from '../../../src/types/config';

interface MockAxiosInstance {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
}

describe('Recipient Commands', () => {
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

  describe('GetRecipient', () => {
    it('should retrieve a specific recipient successfully', async () => {
      const mockRecipient: Recipient = {
        id: 123,
        clientId: 456,
        nickName: 'John\'s Account',
        firstName: 'John',
        lastName: 'Doe',
        businessName: '',
        emailAddress: 'john.doe@example.com',
        phoneNumber: '+1234567890',
        recipientType: 'INDIVIDUAL',
        paymentRail: 'ACH',
        isOwnAccount: false,
        address: {
          line1: '123 Main St',
          line2: 'Apt 4B',
          city: 'New York',
          stateCode: 'NY',
          countryCode: 'US',
          postalCode: '10001'
        },
        accountDetailsData: {
          accountNumber: '987654321',
          bankInformation: {
            routingNumber: '021000021',
            swiftCode: 'CHASUS33XXX'
          }
        }
      };

      const mockResponse = { data: mockRecipient };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params = { clientId: 456, id: 123, tenantId: 'test-tenant' };
      const command = GetRecipient(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/456/recipients/123');
      expect(result).toEqual(mockRecipient);
      expect(command.metadata.commandName).toBe('GetRecipient');
      expect(command.metadata.path).toBe('/v1/clients/456/recipients/123');
      expect(command.metadata.method).toBe('GET');
    });

    it('should use custom tenantId when provided', async () => {
      const mockRecipient: Recipient = {
        id: 123,
        clientId: 456,
        nickName: 'Test Recipient',
        firstName: 'Jane',
        lastName: 'Smith',
        businessName: '',
        emailAddress: 'jane.smith@example.com',
        phoneNumber: '+1987654321',
        recipientType: 'INDIVIDUAL',
        paymentRail: 'WIRE',
        isOwnAccount: true,
        address: {
          line1: '456 Oak Ave',
          line2: '',
          city: 'Los Angeles',
          stateCode: 'CA',
          countryCode: 'US',
          postalCode: '90210'
        },
        accountDetailsData: {
          accountNumber: '123456789',
          bankInformation: {
            routingNumber: '121000248',
            swiftCode: 'WELLSFARGO'
          }
        }
      };

      mockAxiosInstance.get.mockResolvedValue({ data: mockRecipient });

      const params = { clientId: 456, id: 123, tenantId: 'custom-tenant' };
      const command = GetRecipient(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Recipient not found');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const params = { clientId: 456, id: 999 };
      const command = GetRecipient(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Mocked error');
      expect(errorHandlerModule.handleAxiosError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('CreateRecipient', () => {
    it('should create a recipient successfully', async () => {
      const recipientData: CreateRecipientRequest = {
        nickName: 'Business Partner',
        firstName: 'Alice',
        lastName: 'Johnson',
        businessName: 'Johnson Enterprises',
        emailAddress: 'alice@johnson-ent.com',
        phoneNumber: '+1555123456',
        recipientType: 'BUSINESS',
        paymentRail: 'ACH',
        isOwnAccount: false,
        address: {
          line1: '789 Business Blvd',
          line2: 'Suite 200',
          city: 'Chicago',
          stateCode: 'IL',
          countryCode: 'US',
          postalCode: '60601'
        },
        accountDetailsData: {
          accountNumber: '555666777',
          bankInformation: {
            routingNumber: '071000013',
            swiftCode: 'JPMORGAN'
          }
        }
      };

      const createdRecipient: Recipient = {
        id: 789,
        clientId: 456,
        nickName: recipientData.nickName,
        firstName: recipientData.firstName,
        lastName: recipientData.lastName,
        businessName: recipientData.businessName || '',
        emailAddress: recipientData.emailAddress,
        phoneNumber: recipientData.phoneNumber,
        recipientType: recipientData.recipientType,
        paymentRail: recipientData.paymentRail,
        isOwnAccount: recipientData.isOwnAccount || false,
        address: recipientData.address!,
        accountDetailsData: recipientData.accountDetailsData
      };

      const mockResponse = { data: createdRecipient };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const params = { clientId: 456, recipient: recipientData, tenantId: 'test-tenant' };
      const command = CreateRecipient(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/clients/456/recipients', recipientData);
      expect(result).toEqual(createdRecipient);
      expect(command.metadata.commandName).toBe('CreateRecipient');
      expect(command.metadata.path).toBe('/v1/clients/456/recipients');
      expect(command.metadata.method).toBe('POST');
    });

    it('should create a WIRE recipient with required address fields', async () => {
      const wireRecipientData: CreateRecipientRequest = {
        nickName: 'International Partner',
        firstName: 'Hans',
        lastName: 'Mueller',
        emailAddress: 'hans.mueller@example.de',
        phoneNumber: '+49123456789',
        recipientType: 'INDIVIDUAL',
        paymentRail: 'WIRE',
        isOwnAccount: false,
        address: {
          line1: 'Hauptstraße 123',
          line2: '',
          city: 'Berlin',
          stateCode: 'BE',
          countryCode: 'DE',
          postalCode: '10115'
        },
        accountDetailsData: {
          accountNumber: 'DE89370400440532013000',
          bankInformation: {
            routingNumber: '37040044',
            swiftCode: 'COBADEFFXXX'
          }
        }
      };

      const createdRecipient: Recipient = {
        id: 999,
        clientId: 456,
        nickName: wireRecipientData.nickName,
        firstName: wireRecipientData.firstName,
        lastName: wireRecipientData.lastName,
        businessName: wireRecipientData.businessName || '',
        emailAddress: wireRecipientData.emailAddress,
        phoneNumber: wireRecipientData.phoneNumber,
        recipientType: wireRecipientData.recipientType,
        paymentRail: wireRecipientData.paymentRail,
        isOwnAccount: wireRecipientData.isOwnAccount || false,
        address: wireRecipientData.address!,
        accountDetailsData: wireRecipientData.accountDetailsData
      };

      mockAxiosInstance.post.mockResolvedValue({ data: createdRecipient });

      const params = { clientId: 456, recipient: wireRecipientData };
      const command = CreateRecipient(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/clients/456/recipients', wireRecipientData);
      expect(result).toEqual(createdRecipient);
    });

    it('should handle creation errors properly', async () => {
      const recipientData: CreateRecipientRequest = {
        nickName: 'Test Recipient',
        firstName: 'Test',
        lastName: 'User',
        emailAddress: 'test@example.com',
        phoneNumber: '+1234567890',
        recipientType: 'INDIVIDUAL',
        paymentRail: 'ACH',
        accountDetailsData: {
          accountNumber: '123456789',
          bankInformation: {
            routingNumber: '021000021',
            swiftCode: 'CHASUS33XXX'
          }
        }
      };

      const mockError = new Error('Validation failed');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const params = { clientId: 456, recipient: recipientData };
      const command = CreateRecipient(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Mocked error');
      expect(errorHandlerModule.handleAxiosError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('DeleteRecipient', () => {
    it('should delete a recipient successfully', async () => {
      const mockResponse = { data: { message: 'Recipient deleted successfully' } };
      mockAxiosInstance.delete.mockResolvedValue(mockResponse);

      const params = { clientId: 456, recipientId: 123, tenantId: 'test-tenant' };
      const command = DeleteRecipient(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/clients/456/recipients/123');
      expect(result).toEqual(mockResponse.data);
      expect(command.metadata.commandName).toBe('DeleteRecipient');
      expect(command.metadata.path).toBe('/v1/clients/456/recipients/123');
      expect(command.metadata.method).toBe('DELETE');
    });

    it('should use custom tenantId when provided', async () => {
      mockAxiosInstance.delete.mockResolvedValue({ data: {} });

      const params = { clientId: 456, recipientId: 123, tenantId: 'custom-tenant' };
      const command = DeleteRecipient(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle deletion errors properly', async () => {
      const mockError = new Error('Recipient not found for deletion');
      mockAxiosInstance.delete.mockRejectedValue(mockError);

      const params = { clientId: 456, recipientId: 999 };
      const command = DeleteRecipient(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Mocked error');
      expect(errorHandlerModule.handleAxiosError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('GetRecipients', () => {
    it('should retrieve recipients with default parameters', async () => {
      const mockRecipients = [
        {
          id: 1,
          clientId: 456,
          nickName: 'Recipient 1',
          firstName: 'John',
          lastName: 'Doe',
          businessName: '',
          emailAddress: 'john@example.com',
          phoneNumber: '+1234567890',
          recipientType: 'INDIVIDUAL',
          paymentRail: 'ACH',
          isOwnAccount: false,
          address: {
            line1: '123 Main St',
            line2: '',
            city: 'New York',
            stateCode: 'NY',
            countryCode: 'US',
            postalCode: '10001'
          },
          accountDetailsData: {
            accountNumber: '987654321',
            bankInformation: {
              routingNumber: '021000021',
              swiftCode: 'CHASUS33XXX'
            }
          }
        },
        {
          id: 2,
          clientId: 456,
          nickName: 'Recipient 2',
          firstName: 'Jane',
          lastName: 'Smith',
          businessName: 'Smith Corp',
          emailAddress: 'jane@smithcorp.com',
          phoneNumber: '+1987654321',
          recipientType: 'BUSINESS',
          paymentRail: 'WIRE',
          isOwnAccount: true,
          address: {
            line1: '456 Business Ave',
            line2: 'Floor 10',
            city: 'Los Angeles',
            stateCode: 'CA',
            countryCode: 'US',
            postalCode: '90210'
          },
          accountDetailsData: {
            accountNumber: '123456789',
            bankInformation: {
              routingNumber: '121000248',
              swiftCode: 'WELLSFARGO'
            }
          }
        }
      ];

      const mockResponse = { data: mockRecipients };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params: RecipientRequest = { limit: 20, offset: 0 };
      const configuration = { tenantId: 'test-tenant' };
      const command = GetRecipients(456, params, configuration);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/456/recipients', {
        params: { ...params, name: '' }
      });
      expect(result).toEqual(mockRecipients);
      expect(command.metadata.commandName).toBe('GetRecipients');
      expect(command.metadata.path).toBe('/v1/clients/456/recipients');
      expect(command.metadata.method).toBe('GET');
    });

    it('should set default limit when not provided', async () => {
      const mockResponse = { data: [] };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params: RecipientRequest = { offset: 10 };
      const configuration = { tenantId: 'test-tenant' };
      const command = GetRecipients(456, params, configuration);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/456/recipients', {
        params: { ...params, limit: 20, name: '' }
      });
    });

    it('should filter recipients by name', async () => {
      const mockResponse = { data: [] };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params: RecipientRequest = {
        limit: 10,
        offset: 0,
        name: 'John'
      };
      const configuration = { tenantId: 'test-tenant' };
      const command = GetRecipients(456, params, configuration);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/456/recipients', {
        params: params
      });
    });

    it('should use custom tenantId when provided', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: [] });

      const params: RecipientRequest = { limit: 5 };
      const configuration = { tenantId: 'custom-tenant' };
      const command = GetRecipients(456, params, configuration);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Failed to retrieve recipients');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const params: RecipientRequest = { limit: 20 };
      const configuration = {};
      const command = GetRecipients(456, params, configuration);

      await expect(command.execute(mockConfig)).rejects.toThrow('Mocked error');
      expect(errorHandlerModule.handleAxiosError).toHaveBeenCalledWith(mockError);
    });
  });

  describe('Command Metadata', () => {
    it('should have correct metadata for all commands', () => {
      const getCommand = GetRecipient({ clientId: 456, id: 123 });
      const createCommand = CreateRecipient({
        clientId: 456,
        recipient: {
          nickName: 'Test',
          firstName: 'Test',
          lastName: 'User',
          emailAddress: 'test@example.com',
          phoneNumber: '+1234567890',
          recipientType: 'INDIVIDUAL',
          paymentRail: 'ACH',
          accountDetailsData: {
            accountNumber: '123456789',
            bankInformation: {
              routingNumber: '021000021',
              swiftCode: 'TEST'
            }
          }
        }
      });
      const deleteCommand = DeleteRecipient({ clientId: 456, recipientId: 123 });
      const getRecipientsCommand = GetRecipients(456, { limit: 20 }, {});

      expect(getCommand.metadata).toEqual({
        commandName: 'GetRecipient',
        path: '/v1/clients/456/recipients/123',
        method: 'GET'
      });

      expect(createCommand.metadata).toEqual({
        commandName: 'CreateRecipient',
        path: '/v1/clients/456/recipients',
        method: 'POST'
      });

      expect(deleteCommand.metadata).toEqual({
        commandName: 'DeleteRecipient',
        path: '/v1/clients/456/recipients/123',
        method: 'DELETE'
      });

      expect(getRecipientsCommand.metadata).toEqual({
        commandName: 'GetRecipients',
        path: '/v1/clients/456/recipients',
        method: 'GET'
      });
    });
  });
});
