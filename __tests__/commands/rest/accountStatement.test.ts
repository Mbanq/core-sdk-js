import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
    GenerateAccountStatement,
    DownloadAccountStatement,
    GetAccountDocumentsDetails
} from '../../../src/commands/rest/accountStatement';
import * as baseRequestModule from '../../../src/utils/baseRequest';

interface MockAxiosInstance {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
}

interface MockAxiosError extends Error {
    response?: {
        status: number;
        data: {
            message?: string;
            developerMessage?: string;
        };
    };
    isAxiosError?: boolean;
}

describe('GenerateAccountStatement', () => {
    let mockAxiosInstance: MockAxiosInstance;

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
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.unstubAllEnvs();
    });

    it('should create a GenerateAccountStatement command with correct metadata', () => {
        const requestData = {
            reportName: 'Report current and saving account(Pentaho)',
            parentEntityType: 'savings',
            parentEntityId: 1,
            reportType: 'PDF' as const,
            docType: 'statement',
            params: {
                start_date: '01 January 2023',
                end_date: '02 January 2023',
                saving_no: '1'
            }
        };
        const command = GenerateAccountStatement(requestData, { tenantId: 'test-tenant' });

        expect(command.input).toEqual({ requestData, configuration: { tenantId: 'test-tenant' } });
        expect(command.metadata).toEqual({
            commandName: 'GenerateAccountStatement',
            path: '/v1/generatestatements',
            method: 'POST'
        });
    });

    it('should execute POST request and return response data', async () => {
        const requestData = {
            reportName: 'Report current and saving account(Pentaho)',
            parentEntityType: 'savings',
            parentEntityId: 1,
            reportType: 'PDF' as const,
            docType: 'statement',
            params: {
                start_date: '01 January 2023',
                end_date: '02 January 2023',
                saving_no: '1'
            }
        };

        const mockResponse = {
            jobId: 315,
            status: 'ACCEPTED'
        };

        mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

        const command = GenerateAccountStatement(requestData, { tenantId: 'test-tenant' });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/v1/generatestatements',
            requestData
        );
        expect(result).toEqual(mockResponse);
        expect(config.tenantId).toBe('test-tenant');
    });

    it('should handle axios errors during statement generation', async () => {
        const mockError: MockAxiosError = new Error('Generation failed');
        mockError.response = {
            status: 400,
            data: {
                message: 'Cannot generate statement',
                developerMessage: 'Invalid parameters'
            }
        };
        mockError.isAxiosError = true;

        mockAxiosInstance.post.mockRejectedValue(mockError);

        const command = GenerateAccountStatement({
            reportName: 'Report current and saving account(Pentaho)',
            parentEntityType: 'savings',
            parentEntityId: 1,
            reportType: 'PDF' as const,
            docType: 'statement',
            params: {
                start_date: '01 January 2023',
                end_date: '02 January 2023',
                saving_no: '1'
            }
        });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await expect(command.execute(config)).rejects.toThrow();
    });

    it('should not override tenantId if not provided in params', async () => {
        const mockResponse = { success: true };
        mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

        const command = GenerateAccountStatement({
            reportName: 'Report current and saving account(Pentaho)',
            parentEntityType: 'savings',
            parentEntityId: 1,
            reportType: 'PDF' as const,
            docType: 'statement',
            params: {
                start_date: '01 January 2023',
                end_date: '02 January 2023',
                saving_no: '1'
            }
        });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await command.execute(config);

        expect(config.tenantId).toBe('default-tenant');
    });
});


describe('DownloadAccountStatement', () => {
    let mockAxiosInstance: MockAxiosInstance;

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
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.unstubAllEnvs();
    });

    it('should create a DownloadAccountStatement command with correct metadata', () => {
        const command = DownloadAccountStatement(12, '45ac4379-7185-471b-a103-916d25dc648d', { tenantId: 'test-tenant' });

        expect(command.input).toEqual({
            savingsAccountId: 12,
            documentId: '45ac4379-7185-471b-a103-916d25dc648d',
            configuration: { tenantId: 'test-tenant' }
        });
        expect(command.metadata).toEqual({
            commandName: 'DownloadAccountStatement',
            path: '/v1/savings/12/documents/45ac4379-7185-471b-a103-916d25dc648d/attachment',
            method: 'GET'
        });
    });

    it('should execute GET request with responseType blob and return file data with metadata', async () => {
        const mockBlob = new Blob(['test file content'], { type: 'application/pdf' });
        const mockResponse = {
            data: mockBlob,
            headers: {
                'content-disposition': 'attachment; filename="statement.pdf"',
                'content-type': 'application/pdf'
            }
        };

        mockAxiosInstance.get.mockResolvedValue(mockResponse);

        const command = DownloadAccountStatement(12, '45ac4379-7185-471b-a103-916d25dc648d', { tenantId: 'test-tenant' });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            '/v1/savings/12/documents/45ac4379-7185-471b-a103-916d25dc648d/attachment',
            { responseType: 'blob' }
        );
        expect(result).toEqual({
            data: mockBlob,
            fileName: 'statement.pdf',
            contentType: 'application/pdf'
        });
        expect(config.tenantId).toBe('test-tenant');
    });

    it('should extract filename from Content-Disposition header without quotes', async () => {
        const mockBlob = new Blob(['test content']);
        const mockResponse = {
            data: mockBlob,
            headers: {
                'content-disposition': 'attachment; filename=statement.pdf',
                'content-type': 'application/pdf'
            }
        };

        mockAxiosInstance.get.mockResolvedValue(mockResponse);

        const command = DownloadAccountStatement(12, 'doc-id');
        const config = { baseUrl: 'https://api.example.com' };

        const result = await command.execute(config);

        expect(result.fileName).toBe('statement.pdf');
    });

    it('should handle missing Content-Disposition header', async () => {
        const mockBlob = new Blob(['test content']);
        const mockResponse = {
            data: mockBlob,
            headers: {
                'content-type': 'application/pdf'
            }
        };

        mockAxiosInstance.get.mockResolvedValue(mockResponse);

        const command = DownloadAccountStatement(12, 'doc-id');
        const config = { baseUrl: 'https://api.example.com' };

        const result = await command.execute(config);

        expect(result.fileName).toBeUndefined();
    });

    it('should handle axios errors during download', async () => {
        const mockError: MockAxiosError = new Error('Download failed');
        mockError.response = {
            status: 404,
            data: {
                message: 'Document not found'
            }
        };
        mockError.isAxiosError = true;

        mockAxiosInstance.get.mockRejectedValue(mockError);

        const command = DownloadAccountStatement(12, 'doc-id');
        const config = { baseUrl: 'https://api.example.com' };

        await expect(command.execute(config)).rejects.toThrow();
    });

    it('should not override tenantId if not provided in params', async () => {
        const mockBlob = new Blob(['test content']);
        const mockResponse = {
            data: mockBlob,
            headers: {}
        };
        mockAxiosInstance.get.mockResolvedValue(mockResponse);

        const command = DownloadAccountStatement(12, 'doc-id');
        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await command.execute(config);

        expect(config.tenantId).toBe('default-tenant');
    });
});

describe('GetAccountDocumentsDetails', () => {
    let mockAxiosInstance: MockAxiosInstance;

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
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.unstubAllEnvs();
    });

    it('should create a GetAccountDocumentsDetails command with correct metadata', () => {
        const command = GetAccountDocumentsDetails(123, undefined, { tenantId: 'test-tenant' });

        expect(command.input).toEqual({ savingsAccountId: 123, queryParams: undefined, configuration: { tenantId: 'test-tenant' } });
        expect(command.metadata).toEqual({
            commandName: 'GetAccountDocumentsDetails',
            path: '/v1/savings/123/documents',
            method: 'GET'
        });
    });

    it('should execute GET request and return documents list', async () => {
        const mockDocuments = [
            {
                id: "45ac4379-7185-471b-a103-916d25dc648d",
                parentEntityType: "savings",
                parentEntityId: 345134,
                name: "January 01st - July 17st",
                fileName: "Reportcurrentandsavingaccount(Pentaho).pdf",
                size: 151712,
                mimeType: "application/pdf",
                type: "statement",
                description: "account statement",
                createdAt: "2023-07-17 22:34:51"
            }
        ];

        mockAxiosInstance.get.mockResolvedValue({ data: mockDocuments });

        const command = GetAccountDocumentsDetails(123, undefined, { tenantId: 'test-tenant' });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            '/v1/savings/123/documents',
            { params: undefined }
        );
        expect(result).toEqual(mockDocuments);
        expect(config.tenantId).toBe('test-tenant');
    });

    it('should execute GET request with query parameters', async () => {
        const mockDocuments = [
            {
                id: "45ac4379-7185-471b-a103-916d25dc648d",
                parentEntityType: "savings",
                parentEntityId: 345134,
                name: "January 01st - July 17st",
                fileName: "Reportcurrentandsavingaccount(Pentaho).pdf",
                size: 151712,
                mimeType: "application/pdf",
                type: "statement",
                description: "account statement",
                createdAt: "2023-07-17 22:34:51"
            }
        ];

        mockAxiosInstance.get.mockResolvedValue({ data: mockDocuments });

        const queryParams = {
            type: 'statement' as const,
            createdAtFrom: '2023-01-01+00:00:00',
            createdAtTo: '2023-12-31+23:59:00'
        };

        const command = GetAccountDocumentsDetails(123, queryParams, { tenantId: 'test-tenant' });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            '/v1/savings/123/documents',
            { params: queryParams }
        );
        expect(result).toEqual(mockDocuments);
    });

    it('should handle axios errors during retrieval', async () => {
        const mockError: MockAxiosError = new Error('Retrieval failed');
        mockError.response = {
            status: 404,
            data: {
                message: 'Account not found'
            }
        };
        mockError.isAxiosError = true;

        mockAxiosInstance.get.mockRejectedValue(mockError);

        const command = GetAccountDocumentsDetails(123);
        const config = { baseUrl: 'https://api.example.com', tenantId: 'default-tenant' };

        await expect(command.execute(config)).rejects.toThrow();
    });

    it('should not override tenantId if not provided in params', async () => {
        const mockDocuments: any[] = [];
        mockAxiosInstance.get.mockResolvedValue({ data: mockDocuments });

        const command = GetAccountDocumentsDetails(123);
        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await command.execute(config);

        expect(config.tenantId).toBe('default-tenant');
    });
});
