import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  GetPermittedDocumentTypes,
  CreateClientIdentifier,
  UpdateClientIdentifier,
  UploadClientIdentifierDocument
} from '../../../src/commands/rest/clientIdentifier';
import * as baseRequestModule from '../../../src/utils/baseRequest';

describe('Client Identifier Commands', () => {
  let mockAxiosInstance: any;

  beforeEach(() => {
    vi.stubEnv('SECRET', 'your_secret');
    vi.stubEnv('SIGNEE', 'your_signee');
    vi.stubEnv('TENANT_ID', 'your_tenant_id');
    vi.stubEnv('BASE_URL', 'https://your.api.url');

    mockAxiosInstance = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn()
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

  describe('GetPermittedDocumentTypes', () => {
    it('should get permitted document types successfully', async () => {
      const mockResponse = {
        data: {
          documentTypes: [
            { id: 'PASSPORT', name: 'Passport' },
            { id: 'DRIVING_LICENSE', name: 'Driving License' },
            { id: 'NATIONAL_ID', name: 'National ID' }
          ]
        }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params = { clientId: 123 };
      const command = GetPermittedDocumentTypes(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/123/identifiers/template');
      expect(result).toEqual(mockResponse.data);
    });

    it('should get permitted document types with tenantId', async () => {
      const mockResponse = {
        data: { documentTypes: [] }
      };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const params = { clientId: 123, tenantId: 'custom-tenant' };
      const command = GetPermittedDocumentTypes(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/123/identifiers/template');
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Client not found');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const params = { clientId: 999 };
      const command = GetPermittedDocumentTypes(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Client not found');
    });

    it('should have correct metadata', () => {
      const params = { clientId: 123 };
      const command = GetPermittedDocumentTypes(params);

      expect(command.metadata.commandName).toBe('GetPermittedDocumentTypes');
      expect(command.metadata.path).toBe('/v1/clients/123/identifiers/template');
      expect(command.metadata.method).toBe('GET');
    });

    it('should handle validation errors in baseRequest', async () => {
      const mockError = new Error('Network error');
      mockAxiosInstance.get.mockRejectedValue(mockError);

      const params = { clientId: 123 };
      const command = GetPermittedDocumentTypes(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Network error');
    });

    it('should pass input parameters through command', () => {
      const params = { clientId: 456, tenantId: 'test-tenant' };
      const command = GetPermittedDocumentTypes(params);

      expect(command.input).toEqual(params);
    });
  });

  describe('CreateClientIdentifier', () => {
    it('should create client identifier successfully', async () => {
      const mockResponse = {
        data: {
          id: 456,
          clientId: 123,
          documentTypeId: 'PASSPORT',
          documentKey: 'ABC123456',
          status: 'ACTIVE'
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const identifierData = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'ACTIVE',
        description: 'Valid passport',
        issuedBy: 'US Department of State',
        locale: 'en_US',
        expiryDate: '2025-12-31',
        nationality: 1,
        issuedDate: '2020-01-01'
      };

      const params = { clientId: 123, input: identifierData };
      const command = CreateClientIdentifier(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v1/clients/123/identifiers',
        identifierData
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should create client identifier with minimal required fields', async () => {
      const mockResponse = {
        data: { id: 456, clientId: 123 }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const identifierData = {
        documentTypeId: 'NATIONAL_ID',
        documentKey: 'ID123456',
        status: 'PENDING'
      };

      const params = { clientId: 123, input: identifierData };
      const command = CreateClientIdentifier(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v1/clients/123/identifiers',
        identifierData
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should create client identifier with tenantId', async () => {
      const mockResponse = { data: { id: 456 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const identifierData = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'ACTIVE'
      };

      const params = { clientId: 123, tenatId: 'custom-tenant', input: identifierData };
      const command = CreateClientIdentifier(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v1/clients/123/identifiers',
        identifierData
      );
    });

    it('should pass input parameters through command', () => {
      const identifierData = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'ACTIVE'
      };

      const params = { clientId: 789, input: identifierData };
      const command = CreateClientIdentifier(params);

      expect(command.input).toEqual(params);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Creation failed');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const identifierData = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'ACTIVE'
      };

      const params = { clientId: 123, input: identifierData };
      const command = CreateClientIdentifier(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Creation failed');
    });

    it('should have correct metadata', () => {
      const identifierData = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'ACTIVE'
      };

      const params = { clientId: 123, input: identifierData };
      const command = CreateClientIdentifier(params);

      expect(command.metadata.commandName).toBe('CreateClientIdentifier');
      expect(command.metadata.path).toBe('/v1/clients/123/identifiers');
      expect(command.metadata.method).toBe('POST');
    });
  });

  describe('UpdateClientIdentifier', () => {
    it('should update client identifier successfully', async () => {
      const mockResponse = {
        data: {
          id: 456,
          clientId: 123,
          documentTypeId: 'PASSPORT',
          documentKey: 'ABC123456',
          status: 'VERIFIED',
          description: 'Updated passport description'
        }
      };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const updates = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'VERIFIED',
        description: 'Updated passport description',
        expiryDate: '2026-12-31'
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        updates
      };
      const command = UpdateClientIdentifier(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        '/v1/clients/123/identifiers/456',
        updates
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should update client identifier with tenantId', async () => {
      const mockResponse = { data: { id: 456 } };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const updates = {
        documentTypeId: 'DRIVING_LICENSE',
        documentKey: 'DL789012',
        status: 'ACTIVE'
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        updates,
        tenantId: 'custom-tenant'
      };

      const command = UpdateClientIdentifier(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        '/v1/clients/123/identifiers/456',
        updates
      );
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Update failed');
      mockAxiosInstance.put.mockRejectedValue(mockError);

      const updates = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'ACTIVE'
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        updates
      };
      const command = UpdateClientIdentifier(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Update failed');
    });

    it('should have correct metadata', () => {
      const updates = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'ACTIVE'
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        updates
      };
      const command = UpdateClientIdentifier(params);

      expect(command.metadata.commandName).toBe('UpdateClientIdentifier');
      expect(command.metadata.path).toBe('/v1/clients/123/identifiers/456');
      expect(command.metadata.method).toBe('PUT');
    });

    it('should pass input parameters through command', () => {
      const updates = {
        documentTypeId: 'DRIVING_LICENSE',
        documentKey: 'DL789012',
        status: 'ACTIVE'
      };

      const params = {
        clientId: 999,
        identifierId: '888',
        updates,
        tenantId: 'test-tenant'
      };
      const command = UpdateClientIdentifier(params);

      expect(command.input).toEqual(params);
    });

    it('should handle update without tenantId', async () => {
      const mockResponse = { data: { id: 456 } };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const updates = {
        documentTypeId: 'PASSPORT',
        documentKey: 'ABC123456',
        status: 'ACTIVE'
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        updates
      };

      const command = UpdateClientIdentifier(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        '/v1/clients/123/identifiers/456',
        updates
      );
    });
  });

  describe('UploadClientIdentifierDocument', () => {
    it('should upload document file successfully', async () => {
      const mockResponse = {
        data: {
          id: 789,
          documentId: '456',
          fileName: 'passport.jpg',
          uploadStatus: 'SUCCESS'
        }
      };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const file = new File(['test content'], 'passport.jpg', { type: 'image/jpeg' });
      const uploadData = {
        name: 'passport.jpg',
        file,
        type: 'PASSPORT_SCAN',
        description: 'Front side of passport'
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        data: uploadData
      };

      const command = UploadClientIdentifierDocument(params);
      const result = await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v1/client_identifiers/456/documents',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should upload document with Buffer file', async () => {
      const mockResponse = { data: { id: 789 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const file = Buffer.from('test content');
      const uploadData = {
        name: 'document.pdf',
        file,
        type: 'PDF_DOCUMENT'
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        data: uploadData
      };

      const command = UploadClientIdentifierDocument(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v1/client_identifiers/456/documents',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
    });

    it('should upload document with Blob file', async () => {
      const mockResponse = { data: { id: 789 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const file = new Blob(['test content'], { type: 'application/pdf' });
      const uploadData = {
        name: 'document.pdf',
        file
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        data: uploadData
      };

      const command = UploadClientIdentifierDocument(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v1/client_identifiers/456/documents',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
    });

    it('should upload document with tenantId', async () => {
      const mockResponse = { data: { id: 789 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const file = new File(['test'], 'test.jpg');
      const uploadData = {
        name: 'test.jpg',
        file
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        data: uploadData,
        tenantId: 'custom-tenant'
      };

      const command = UploadClientIdentifierDocument(params);
      const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
      await command.execute(mockConfig);

      expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    });

    it('should handle errors properly', async () => {
      const mockError = new Error('Upload failed');
      mockAxiosInstance.post.mockRejectedValue(mockError);

      const file = new File(['test'], 'test.jpg');
      const uploadData = {
        name: 'test.jpg',
        file
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        data: uploadData
      };
      const command = UploadClientIdentifierDocument(params);

      await expect(command.execute(mockConfig)).rejects.toThrow('Upload failed');
    });

    it('should validate upload data before making request', () => {
      const invalidUploadData = {
        name: 123,
        file: new File(['test'], 'test.jpg')
      } as any;

      const params = {
        clientId: 123,
        identifierId: '456',
        data: invalidUploadData
      };

      expect(() => UploadClientIdentifierDocument(params)).toThrow();
    });

    it('should have correct metadata', () => {
      const file = new File(['test'], 'test.jpg');
      const uploadData = {
        name: 'test.jpg',
        file
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        data: uploadData
      };
      const command = UploadClientIdentifierDocument(params);

      expect(command.metadata.commandName).toBe('UploadClientIdentifierDocument');
      expect(command.metadata.path).toBe('/v1/client_identifiers/456/documents');
      expect(command.metadata.method).toBe('POST');
    });

    it('should pass input parameters through command', () => {
      const file = new File(['test content'], 'document.pdf');
      const uploadData = {
        name: 'document.pdf',
        file,
        type: 'IDENTITY_DOCUMENT',
        description: 'Client ID document'
      };

      const params = {
        clientId: 555,
        identifierId: '777',
        data: uploadData,
        tenantId: 'test-tenant'
      };
      const command = UploadClientIdentifierDocument(params);

      expect(command.input).toEqual(params);
    });

    it('should handle FormData creation correctly', async () => {
      const mockResponse = { data: { id: 999 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      const uploadData = {
        name: 'test.pdf',
        file,
        type: 'PASSPORT_COPY',
        description: 'Client passport copy'
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        data: uploadData
      };

      const command = UploadClientIdentifierDocument(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v1/client_identifiers/456/documents',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const formDataCall = mockAxiosInstance.post.mock.calls[0];
      const formData = formDataCall[1] as FormData;

      expect(formData.get('name')).toBe('test.pdf');
      expect(formData.get('type')).toBe('PASSPORT_COPY');
      expect(formData.get('description')).toBe('Client passport copy');
      expect(formData.get('file')).toBeInstanceOf(File);
    });

    it('should handle upload without optional fields', async () => {
      const mockResponse = { data: { id: 888 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const file = new File(['minimal content'], 'minimal.jpg');
      const uploadData = {
        name: 'minimal.jpg',
        file
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        data: uploadData
      };

      const command = UploadClientIdentifierDocument(params);
      await command.execute(mockConfig);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        '/v1/client_identifiers/456/documents',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const formDataCall = mockAxiosInstance.post.mock.calls[0];
      const formData = formDataCall[1] as FormData;

      expect(formData.get('name')).toBe('minimal.jpg');
      expect(formData.get('type')).toBeNull();
      expect(formData.get('description')).toBeNull();
      expect(formData.get('file')).toBeInstanceOf(File);
    });

    it('should handle different file types correctly', async () => {
      const mockResponse = { data: { id: 777 } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);
      const fileObject = new File(['file content'], 'document.docx');

      const uploadData = {
        name: 'document.docx',
        file: fileObject
      };

      const params = {
        clientId: 123,
        identifierId: '456',
        data: uploadData
      };

      const command = UploadClientIdentifierDocument(params);
      await command.execute(mockConfig);

      const formDataCall = mockAxiosInstance.post.mock.calls[0];
      const formData = formDataCall[1] as FormData;
      const uploadedFile = formData.get('file') as File;

      expect(uploadedFile.name).toBe('document.docx');
    });
  });
});
