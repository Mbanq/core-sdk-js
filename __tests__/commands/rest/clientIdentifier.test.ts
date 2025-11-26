import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    ListClientDocument,
    CreateClientIdentifier,
    UpdateClientIdentifier,
    GetPermittedDocumentTypes,
    DeleteClientDocument
} from '../../../src/commands/rest/clientIdentifier';
import * as baseRequestModule from '../../../src/utils/baseRequest';

describe('ClientIdentifier Commands', () => {
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

    describe('ListClientDocument', () => {
        it('should list client identifiers successfully', async () => {
            const mockResponse = {
                data: {
                    pageItems: [
                        {
                            id: 1,
                            clientId: 15,
                            documentType: { id: 1, name: 'Passport' },
                            documentKey: 'ABC123456',
                            status: 'ACTIVE',
                            description: 'Valid passport',
                            issuedBy: 'Government',
                            expiryDate: '2030-12-31',
                            nationality: { id: 1, name: 'USA' },
                            issuedDate: '2020-01-01'
                        },
                        {
                            id: 2,
                            clientId: 15,
                            documentType: { id: 2, name: 'Driver License' },
                            documentKey: 'DL987654',
                            status: 'ACTIVE'
                        }
                    ]
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = { clientId: 15 };
            const command = ListClientDocument(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/15/identifiers');
            expect(result).toEqual({
                pageItems: [
                    {
                        id: 1,
                        clientId: 15,
                        documentType: { id: 1, name: 'Passport' },
                        documentKey: 'ABC123456',
                        status: 'ACTIVE',
                        description: 'Valid passport',
                        issuedBy: 'Government',
                        expiryDate: '2030-12-31',
                        nationality: { id: 1, name: 'USA' },
                        issuedDate: '2020-01-01'
                    },
                    {
                        id: 2,
                        clientId: 15,
                        documentType: { id: 2, name: 'Driver License' },
                        documentKey: 'DL987654',
                        status: 'ACTIVE'
                    }
                ]
            });
        });

        it('should list client identifiers with unmaskValue=true', async () => {
            const mockResponse = {
                data: {
                    pageItems: [
                        {
                            id: 1,
                            clientId: 15,
                            documentType: { id: 1, name: 'Passport' },
                            documentKey: 'ABC123456789',
                            status: 'ACTIVE'
                        }
                    ]
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = { clientId: 15, unmaskValue: true };
            const command = ListClientDocument(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/15/identifiers?unmaskValue=true');
            expect(result).toEqual({
                pageItems: [
                    {
                        id: 1,
                        clientId: 15,
                        documentType: { id: 1, name: 'Passport' },
                        documentKey: 'ABC123456789',
                        status: 'ACTIVE'
                    }
                ]
            });
        });

        it('should list client identifiers with specific fields', async () => {
            const mockResponse = {
                data: {
                    pageItems: [
                        {
                            id: 1,
                            documentKey: 'ABC123456',
                            documentType: { id: 1, name: 'Passport' },
                            status: 'ACTIVE'
                        }
                    ]
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = {
                clientId: 15,
                fields: 'documentKey,documentType,status'
            };
            const command = ListClientDocument(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/15/identifiers?fields=documentKey%2CdocumentType%2Cstatus');
            expect(result).toEqual({
                pageItems: [
                    {
                        id: 1,
                        documentKey: 'ABC123456',
                        documentType: { id: 1, name: 'Passport' },
                        status: 'ACTIVE'
                    }
                ]
            });
        });

        it('should list client identifiers with both unmaskValue and fields', async () => {
            const mockResponse = {
                data: {
                    pageItems: [
                        {
                            id: 1,
                            documentKey: 'ABC123456789',
                            status: 'ACTIVE'
                        }
                    ]
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = {
                clientId: 15,
                unmaskValue: true,
                fields: 'documentKey,status'
            };
            const command = ListClientDocument(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/15/identifiers?unmaskValue=true&fields=documentKey%2Cstatus');
            expect(result).toEqual({
                pageItems: [
                    {
                        id: 1,
                        documentKey: 'ABC123456789',
                        status: 'ACTIVE'
                    }
                ]
            });
        });

        it('should use custom tenantId when provided', async () => {
            const mockResponse = {
                data: { pageItems: [] }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = {
                clientId: 15,
                tenantId: 'custom-tenant'
            };

            const command = ListClientDocument(params);
            const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
            await command.execute(mockConfig);

            expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
        });

        it('should handle errors properly', async () => {
            const mockError = new Error('Failed to fetch identifiers');
            mockAxiosInstance.get.mockRejectedValue(mockError);

            const params = { clientId: 15 };
            const command = ListClientDocument(params);

            await expect(command.execute(mockConfig)).rejects.toThrow('Failed to fetch identifiers');
        });

        it('should have correct metadata', () => {
            const params = { clientId: 15 };
            const command = ListClientDocument(params);

            expect(command.metadata.commandName).toBe('ListClientDocument');
            expect(command.metadata.path).toBe('/v1/clients/15/identifiers');
            expect(command.metadata.method).toBe('GET');
        });

        it('should have correct metadata with query parameters', () => {
            const params = { clientId: 15, unmaskValue: true };
            const command = ListClientDocument(params);

            expect(command.metadata.commandName).toBe('ListClientDocument');
            expect(command.metadata.path).toBe('/v1/clients/15/identifiers?unmaskValue=true');
            expect(command.metadata.method).toBe('GET');
        });
    });

    describe('GetPermittedDocumentTypes', () => {
        it('should get permitted document types successfully', async () => {
            const mockResponse = {
                data: {
                    allowedDocumentTypes: [
                        { id: 1, name: 'Passport', position: 1 },
                        { id: 2, name: 'Driver License', position: 2 }
                    ]
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = { clientId: 15 };
            const command = GetPermittedDocumentTypes(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/15/identifiers/template');
            expect(result).toEqual({
                allowedDocumentTypes: [
                    { id: 1, name: 'Passport', position: 1 },
                    { id: 2, name: 'Driver License', position: 2 }
                ]
            });
        });

        it('should handle errors properly', async () => {
            const mockError = new Error('Failed to fetch document types');
            mockAxiosInstance.get.mockRejectedValue(mockError);

            const params = { clientId: 15 };
            const command = GetPermittedDocumentTypes(params);

            await expect(command.execute(mockConfig)).rejects.toThrow('Failed to fetch document types');
        });

        it('should have correct metadata', () => {
            const params = { clientId: 15 };
            const command = GetPermittedDocumentTypes(params);

            expect(command.metadata.commandName).toBe('GetPermittedDocumentTypes');
            expect(command.metadata.path).toBe('/v1/clients/15/identifiers/template');
            expect(command.metadata.method).toBe('GET');
        });
    });

    describe('CreateClientIdentifier', () => {
        it('should create client identifier successfully', async () => {
            const mockResponse = {
                data: {
                    id: 1,
                    officeId: 1,
                    clientId: 15,
                    resourceId: 1,
                    changes: {},
                    isScheduledTransfer: false,
                    isSkipNotification: false
                }
            };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);

            const params = {
                clientId: 15,
                input: {
                    documentTypeId: '1',
                    documentKey: 'ABC123456',
                    status: 'ACTIVE',
                    description: 'Valid passport',
                    issuedBy: 'Government',
                    locale: 'en_US',
                    dateFormat: 'yyyy-MM-dd',
                    expiryDate: '2030-12-31',
                    nationality: 1,
                    issuedDate: '2020-01-01'
                }
            };

            const command = CreateClientIdentifier(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/clients/15/identifiers', params.input);
            expect(result).toEqual({
                id: 1,
                officeId: 1,
                clientId: 15,
                resourceId: 1,
                changes: {},
                isScheduledTransfer: false,
                isSkipNotification: false
            });
        });

        it('should handle errors properly', async () => {
            const mockError = new Error('Validation failed');
            mockAxiosInstance.post.mockRejectedValue(mockError);

            const params = {
                clientId: 15,
                input: {
                    documentTypeId: '1',
                    documentKey: 'ABC123',
                    status: 'ACTIVE'
                }
            };

            const command = CreateClientIdentifier(params);

            await expect(command.execute(mockConfig)).rejects.toThrow('Validation failed');
        });

        it('should have correct metadata', () => {
            const params = {
                clientId: 15,
                input: {
                    documentTypeId: '1',
                    documentKey: 'ABC123',
                    status: 'ACTIVE'
                }
            };

            const command = CreateClientIdentifier(params);

            expect(command.metadata.commandName).toBe('CreateClientIdentifier');
            expect(command.metadata.path).toBe('/v1/clients/15/identifiers');
            expect(command.metadata.method).toBe('POST');
        });
    });

    describe('UpdateClientIdentifier', () => {
        it('should update client identifier successfully', async () => {
            const mockResponse = {
                data: {
                    id: 1,
                    officeId: 1,
                    clientId: 15,
                    resourceId: 1,
                    changes: { documentKey: 'XYZ789456' },
                    isScheduledTransfer: false,
                    isSkipNotification: false
                }
            };
            mockAxiosInstance.put.mockResolvedValue(mockResponse);

            const params = {
                clientId: 15,
                identifierId: 'id123',
                updates: {
                    documentTypeId: '1',
                    documentKey: 'XYZ789456',
                    status: 'ACTIVE',
                    description: 'Updated passport'
                }
            };

            const command = UpdateClientIdentifier(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.put).toHaveBeenCalledWith(
                '/v1/clients/15/identifiers/id123',
                params.updates
            );
            expect(result).toEqual({
                id: 1,
                officeId: 1,
                clientId: 15,
                resourceId: 1,
                changes: { documentKey: 'XYZ789456' },
                isScheduledTransfer: false,
                isSkipNotification: false
            });
        });

        it('should use custom tenantId when provided', async () => {
            const mockResponse = { data: { success: true } };
            mockAxiosInstance.put.mockResolvedValue(mockResponse);

            const params = {
                clientId: 15,
                identifierId: 'id123',
                updates: {
                    documentTypeId: '1',
                    documentKey: 'ABC123',
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
            const mockError = new Error('Update failed');
            mockAxiosInstance.put.mockRejectedValue(mockError);

            const params = {
                clientId: 15,
                identifierId: 'id123',
                updates: {
                    documentTypeId: '1',
                    documentKey: 'ABC123',
                    status: 'ACTIVE'
                }
            };

            const command = UpdateClientIdentifier(params);

            await expect(command.execute(mockConfig)).rejects.toThrow('Update failed');
        });

        it('should have correct metadata', () => {
            const params = {
                clientId: 15,
                identifierId: 'id123',
                updates: {
                    documentTypeId: '1',
                    documentKey: 'ABC123',
                    status: 'ACTIVE'
                }
            };

            const command = UpdateClientIdentifier(params);

            expect(command.metadata.commandName).toBe('UpdateClientIdentifier');
            expect(command.metadata.path).toBe('/v1/clients/15/identifiers/id123');
            expect(command.metadata.method).toBe('PUT');
        });
    });

    describe('UploadClientIdentifierDocument', () => {
        it('should upload document with File object successfully', async () => {
            const mockResponse = {
                data: {
                    id: 'doc123',
                    resourceIdentifier: 'resource-456',
                    uuid: 'uuid-789'
                }
            };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);

            const mockFile = new File(['test content'], 'passport.pdf', { type: 'application/pdf' });
            const params = {
                clientId: 15,
                identifierId: 'id123',
                data: {
                    name: 'Passport Document',
                    file: mockFile,
                    type: 'PASSPORT',
                    description: 'Valid passport copy'
                }
            };

            const { UploadClientIdentifierDocument } = await import('../../../src/commands/rest/clientIdentifier');
            const command = UploadClientIdentifierDocument(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.post).toHaveBeenCalledWith(
                '/v1/client_identifiers/id123/documents',
                expect.any(FormData),
                expect.objectContaining({
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            );
            expect(result).toEqual({
                id: 'doc123',
                resourceIdentifier: 'resource-456',
                uuid: 'uuid-789'
            });
        });

        it('should upload document with Blob object successfully', async () => {
            const mockResponse = {
                data: {
                    id: 'doc456',
                    resourceIdentifier: 'resource-789',
                    uuid: 'uuid-abc'
                }
            };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);

            const mockBlob = new Blob(['test content'], { type: 'application/pdf' });
            const params = {
                clientId: 15,
                identifierId: 'id123',
                data: {
                    name: 'License Document',
                    file: mockBlob,
                    description: 'Driver license copy'
                }
            };

            const { UploadClientIdentifierDocument } = await import('../../../src/commands/rest/clientIdentifier');
            const command = UploadClientIdentifierDocument(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.post).toHaveBeenCalled();
            expect(result).toEqual({
                id: 'doc456',
                resourceIdentifier: 'resource-789',
                uuid: 'uuid-abc'
            });
        });

        it('should upload document with Buffer object successfully', async () => {
            const mockResponse = {
                data: {
                    id: 'doc789',
                    resourceIdentifier: 'resource-abc',
                    uuid: 'uuid-def'
                }
            };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);

            const mockBuffer = Buffer.from('test content');
            const params = {
                clientId: 15,
                identifierId: 'id123',
                data: {
                    name: 'ID Card',
                    file: mockBuffer
                }
            };

            const { UploadClientIdentifierDocument } = await import('../../../src/commands/rest/clientIdentifier');
            const command = UploadClientIdentifierDocument(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.post).toHaveBeenCalled();
            expect(result).toEqual({
                id: 'doc789',
                resourceIdentifier: 'resource-abc',
                uuid: 'uuid-def'
            });
        });

        it('should upload document without optional fields', async () => {
            const mockResponse = {
                data: {
                    id: 'doc999',
                    resourceIdentifier: 'resource-999',
                    uuid: 'uuid-999'
                }
            };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);

            const mockFile = new File(['content'], 'doc.pdf');
            const params = {
                clientId: 15,
                identifierId: 'id123',
                data: {
                    name: 'Simple Document',
                    file: mockFile
                }
            };

            const { UploadClientIdentifierDocument } = await import('../../../src/commands/rest/clientIdentifier');
            const command = UploadClientIdentifierDocument(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.post).toHaveBeenCalled();
            expect(result).toEqual({
                id: 'doc999',
                resourceIdentifier: 'resource-999',
                uuid: 'uuid-999'
            });
        });

        it('should use custom tenantId when provided', async () => {
            const mockResponse = {
                data: {
                    id: 'doc111',
                    resourceIdentifier: 'resource-111',
                    uuid: 'uuid-111'
                }
            };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);

            const mockFile = new File(['content'], 'doc.pdf');
            const params = {
                clientId: 15,
                identifierId: 'id123',
                data: {
                    name: 'Document',
                    file: mockFile
                },
                tenantId: 'custom-tenant'
            };

            const { UploadClientIdentifierDocument } = await import('../../../src/commands/rest/clientIdentifier');
            const command = UploadClientIdentifierDocument(params);
            const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
            await command.execute(mockConfig);

            expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
        });

        it('should handle upload errors properly', async () => {
            const mockError = new Error('Upload failed');
            mockAxiosInstance.post.mockRejectedValue(mockError);

            const mockFile = new File(['content'], 'doc.pdf');
            const params = {
                clientId: 15,
                identifierId: 'id123',
                data: {
                    name: 'Document',
                    file: mockFile
                }
            };

            const { UploadClientIdentifierDocument } = await import('../../../src/commands/rest/clientIdentifier');
            const command = UploadClientIdentifierDocument(params);

            await expect(command.execute(mockConfig)).rejects.toThrow('Upload failed');
        });

        it('should have correct metadata', async () => {
            const mockFile = new File(['content'], 'doc.pdf');
            const params = {
                clientId: 15,
                identifierId: 'id123',
                data: {
                    name: 'Document',
                    file: mockFile
                }
            };

            const { UploadClientIdentifierDocument } = await import('../../../src/commands/rest/clientIdentifier');
            const command = UploadClientIdentifierDocument(params);

            expect(command.metadata.commandName).toBe('UploadClientIdentifierDocument');
            expect(command.metadata.path).toBe('/v1/client_identifiers/id123/documents');
            expect(command.metadata.method).toBe('POST');
        });
    });

    describe('DeleteClientDocument', () => {
        it('should delete client document successfully', async () => {
            const mockResponse = {
                data: {
                    officeId: 1,
                    clientId: 15,
                    resourceId: 22411
                }
            };
            mockAxiosInstance.delete.mockResolvedValue(mockResponse);

            const params = {
                clientId: 15,
                identifierId: 15
            };

            const command = DeleteClientDocument(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/clients/15/identifiers/15');
            expect(result).toEqual({
                officeId: 1,
                clientId: 15,
                resourceId: 22411
            });
        });

        it('should use custom tenantId when provided', async () => {
            const mockResponse = {
                data: {
                    officeId: 1,
                    clientId: 15,
                    resourceId: 22411
                }
            };
            mockAxiosInstance.delete.mockResolvedValue(mockResponse);

            const params = {
                clientId: 15,
                identifierId: 15,
                tenantId: 'custom-tenant'
            };

            const command = DeleteClientDocument(params);
            const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
            await command.execute(mockConfig);

            expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
        });

        it('should handle errors properly', async () => {
            const mockError = new Error('Delete failed');
            mockAxiosInstance.delete.mockRejectedValue(mockError);

            const params = {
                clientId: 15,
                identifierId: 15
            };

            const command = DeleteClientDocument(params);

            await expect(command.execute(mockConfig)).rejects.toThrow('Delete failed');
        });

        it('should handle 404 error when document not found', async () => {
            const mockError = new Error('Document not found');
            mockAxiosInstance.delete.mockRejectedValue(mockError);

            const params = {
                clientId: 15,
                identifierId: 999
            };

            const command = DeleteClientDocument(params);

            await expect(command.execute(mockConfig)).rejects.toThrow('Document not found');
        });

        it('should have correct metadata', () => {
            const params = {
                clientId: 15,
                identifierId: 15
            };

            const command = DeleteClientDocument(params);

            expect(command.metadata.commandName).toBe('DeleteClientDocument');
            expect(command.metadata.path).toBe('/v1/clients/15/identifiers/15');
            expect(command.metadata.method).toBe('DELETE');
        });

        it('should handle different identifier types', async () => {
            const mockResponse = {
                data: {
                    officeId: 1,
                    clientId: 100,
                    resourceId: 5000
                }
            };
            mockAxiosInstance.delete.mockResolvedValue(mockResponse);

            const params = {
                clientId: 100,
                identifierId: 5000
            };

            const command = DeleteClientDocument(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/clients/100/identifiers/5000');
            expect(result).toEqual({
                officeId: 1,
                clientId: 100,
                resourceId: 5000
            });
        });
    });
});
