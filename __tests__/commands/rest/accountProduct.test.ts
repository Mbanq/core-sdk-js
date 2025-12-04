import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CreateAccountProduct, UpdateAccountProduct, GetAllAccountProducts } from '../../../src/commands/rest/accountProduct';
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

describe('CreateAccountProduct', () => {
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

    it('should create a CreateAccountProduct command with correct metadata', () => {
        const params = {
            currencyCode: "USD",
            digitsAfterDecimal: 2,
            interestCompoundingPeriodType: 1,
            interestPostingPeriodType: 4,
            interestCalculationType: 1,
            interestCalculationDaysInYearType: 365,
            accountingRule: 1,
            name: "savings product",
            shortName: "te21",
            description: "test",
            locale: "en",
            dateFormat: "dd MMMM yyyy"
        };

        const command = CreateAccountProduct(params, { tenantId: 'test-tenant' });

        expect(command.input).toEqual({ params, configuration: { tenantId: 'test-tenant' } });
        expect(command.metadata).toEqual({
            commandName: 'CreateAccountProduct',
            path: '/v1/savingsproducts',
            method: 'POST'
        });
    });

    it('should execute POST request and return response data', async () => {
        const requestData = {
            currencyCode: "USD",
            digitsAfterDecimal: 2,
            interestCompoundingPeriodType: 1,
            interestPostingPeriodType: 4,
            interestCalculationType: 1,
            interestCalculationDaysInYearType: 365,
            accountingRule: 1,
            name: "savings product",
            shortName: "te21",
            description: "test",
            inMultiplesOf: "1",
            isLinkedToFloatingInterestRates: true,
            floatingRateId: 1,
            minDifferentialRate: "1",
            interestRateDifferential: "12",
            defaultDifferentialRate: "3",
            maxDifferentialRate: "14",
            isFloatingInterestRateCalculationAllowed: true,
            minRequiredOpeningBalance: "1000",
            locale: "en",
            dateFormat: "dd MMMM yyyy",
            startDate: "01 January 2024",
            endDate: "31 December 2024"
        };

        const mockResponse = {
            resourceId: "1",
            id: "1"
        };

        mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

        const command = CreateAccountProduct(requestData, { tenantId: 'test-tenant' });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/v1/savingsproducts',
            requestData
        );
        expect(result).toEqual(mockResponse);
        expect(config.tenantId).toBe('test-tenant');
    });

    it('should handle minimal required fields', async () => {
        const requestData = {
            currencyCode: "USD",
            digitsAfterDecimal: 2,
            interestCompoundingPeriodType: 1,
            interestPostingPeriodType: 4,
            interestCalculationType: 1,
            interestCalculationDaysInYearType: 365,
            accountingRule: 1,
            name: "savings product",
            shortName: "te21",
            description: "test",
            locale: "en",
            dateFormat: "dd MMMM yyyy"
        };

        const mockResponse = {
            resourceId: "1",
            id: "1"
        };

        mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

        const command = CreateAccountProduct(requestData);

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/v1/savingsproducts',
            requestData
        );
        expect(result).toEqual(mockResponse);
    });

    it('should handle axios errors during product creation', async () => {
        const mockError: MockAxiosError = new Error('Creation failed');
        mockError.response = {
            status: 400,
            data: {
                message: 'Invalid product data',
                developerMessage: 'Validation failed for product creation'
            }
        };
        mockError.isAxiosError = true;

        mockAxiosInstance.post.mockRejectedValue(mockError);

        const command = CreateAccountProduct({
            currencyCode: "USD",
            digitsAfterDecimal: 2,
            interestCompoundingPeriodType: 1,
            interestPostingPeriodType: 4,
            interestCalculationType: 1,
            interestCalculationDaysInYearType: 365,
            accountingRule: 1,
            name: "savings product",
            shortName: "te21",
            description: "test",
            locale: "en",
            dateFormat: "dd MMMM yyyy"
        });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await expect(command.execute(config)).rejects.toThrow();
    });

    it('should not override tenantId if not provided in params', async () => {
        const mockResponse = { resourceId: "1", id: "1" };
        mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

        const command = CreateAccountProduct({
            currencyCode: "USD",
            digitsAfterDecimal: 2,
            interestCompoundingPeriodType: 1,
            interestPostingPeriodType: 4,
            interestCalculationType: 1,
            interestCalculationDaysInYearType: 365,
            accountingRule: 1,
            name: "savings product",
            shortName: "te21",
            description: "test",
            locale: "en",
            dateFormat: "dd MMMM yyyy"
        });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await command.execute(config);

        expect(config.tenantId).toBe('default-tenant');
    });

    it('should include optional fields when provided', async () => {
        const requestData = {
            currencyCode: "USD",
            digitsAfterDecimal: 2,
            interestCompoundingPeriodType: 1,
            interestPostingPeriodType: 4,
            interestCalculationType: 1,
            interestCalculationDaysInYearType: 365,
            accountingRule: 1,
            name: "savings product",
            shortName: "te21",
            description: "test",
            locale: "en",
            dateFormat: "dd MMMM yyyy",
            charges: [
                { id: 499, isMandatory: true }
            ],
            paymentChannelToFundSourceMappings: "[]",
            feeToIncomeAccountMappings: "[]",
            penaltyToIncomeAccountMappings: "[]"
        };

        const mockResponse = {
            resourceId: "1",
            id: "1"
        };

        mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

        const command = CreateAccountProduct(requestData);

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/v1/savingsproducts',
            requestData
        );
        expect(result).toEqual(mockResponse);
    });
});

describe('UpdateAccountProduct', () => {
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

    it('should create an UpdateAccountProduct command with correct metadata', () => {
        const params = {
            name: "Saving Product test",
            shortName: "savi",
            description: "SAVING TEST"
        };

        const command = UpdateAccountProduct(101, params, { tenantId: 'test-tenant' });

        expect(command.input).toEqual({
            productId: 101,
            params,
            configuration: { tenantId: 'test-tenant' }
        });
        expect(command.metadata).toEqual({
            commandName: 'UpdateAccountProduct',
            path: '/v1/savingsproducts/101',
            method: 'PUT'
        });
    });

    it('should execute PUT request and return response data', async () => {
        const requestData = {
            name: "Saving Product test",
            shortName: "savi",
            description: "SAVING TEST",
            currencyCode: "USD",
            digitsAfterDecimal: 2,
            inMultiplesOf: "1",
            nominalAnnualInterestRate: "2",
            minRequiredOpeningBalance: "1000",
            withdrawalFeeForTransfers: false,
            interestCompoundingPeriodType: 1,
            interestPostingPeriodType: 4,
            interestCalculationType: 1,
            interestCalculationDaysInYearType: 365,
            accountingRule: 1,
            charges: [{ id: 132, isMandatory: false }],
            startDate: "2023-07-01",
            endDate: "2024-09-30",
            paymentChannelToFundSourceMappings: "[]",
            penaltyToIncomeAccountMappings: "[]",
            feeToIncomeAccountMappings: "[]",
            locale: "en",
            dateFormat: "dd MMMM yyyy"
        };

        const mockResponse = {
            id: "2329",
            resourceId: "2329",
            changes: {
                name: "savings test1",
                shortName: "terB",
                nominalAnnualInterestRate: 1,
                locale: "en",
                minRequiredOpeningBalance: 10000,
                charges: "[{\"id\":132,\"isMandatory\":false}]",
                startDate: "2023-07-01",
                endDate: "2024-09-30",
                paymentChannelToFundSourceMappings: "[]",
                penaltyToIncomeAccountMappings: "[]",
                feeToIncomeAccountMappings: "[]"
            }
        };

        mockAxiosInstance.put.mockResolvedValue({ data: mockResponse });

        const command = UpdateAccountProduct(101, requestData, { tenantId: 'test-tenant' });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            '/v1/savingsproducts/101',
            requestData
        );
        expect(result).toEqual(mockResponse);
        expect(config.tenantId).toBe('test-tenant');
    });

    it('should handle partial updates with minimal fields', async () => {
        const requestData = {
            name: "Updated Product Name",
            shortName: "UPN"
        };

        const mockResponse = {
            id: "101",
            resourceId: "101",
            changes: {
                name: "Updated Product Name",
                shortName: "UPN"
            }
        };

        mockAxiosInstance.put.mockResolvedValue({ data: mockResponse });

        const command = UpdateAccountProduct(101, requestData);

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            '/v1/savingsproducts/101',
            requestData
        );
        expect(result).toEqual(mockResponse);
    });

    it('should handle axios errors during product update', async () => {
        const mockError: MockAxiosError = new Error('Update failed');
        mockError.response = {
            status: 400,
            data: {
                message: 'Invalid product data',
                developerMessage: 'Validation failed for product update'
            }
        };
        mockError.isAxiosError = true;

        mockAxiosInstance.put.mockRejectedValue(mockError);

        const command = UpdateAccountProduct(101, {
            name: "Test Product"
        });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await expect(command.execute(config)).rejects.toThrow();
    });

    it('should not override tenantId if not provided in params', async () => {
        const mockResponse = {
            id: "101",
            resourceId: "101",
            changes: {}
        };
        mockAxiosInstance.put.mockResolvedValue({ data: mockResponse });

        const command = UpdateAccountProduct(101, {
            name: "Test Product"
        });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await command.execute(config);

        expect(config.tenantId).toBe('default-tenant');
    });

    it('should handle updates with all optional fields', async () => {
        const requestData = {
            name: "Complete Update",
            shortName: "CU",
            description: "Full update test",
            currencyCode: "EUR",
            digitsAfterDecimal: 2,
            nominalAnnualInterestRate: "3.5",
            minRequiredOpeningBalance: "500",
            isLinkedToFloatingInterestRates: true,
            floatingRateId: 5,
            interestRateDifferential: "1.5",
            locale: "en",
            dateFormat: "dd MMMM yyyy"
        };

        const mockResponse = {
            id: "101",
            resourceId: "101",
            changes: requestData
        };

        mockAxiosInstance.put.mockResolvedValue({ data: mockResponse });

        const command = UpdateAccountProduct(101, requestData);

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.put).toHaveBeenCalledWith(
            '/v1/savingsproducts/101',
            requestData
        );
        expect(result).toEqual(mockResponse);
    });
});

describe('GetAllAccountProducts', () => {
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

    it('should create a GetAllAccountProducts command with correct metadata', () => {
        const command = GetAllAccountProducts({ tenantId: 'test-tenant' });

        expect(command.input).toEqual({ configuration: { tenantId: 'test-tenant' } });
        expect(command.metadata).toEqual({
            commandName: 'GetAllAccountProducts',
            path: '/v1/savingsproducts',
            method: 'GET'
        });
    });

    it('should execute GET request and return response data', async () => {
        const mockResponse: any[] = [
            {
                id: 543,
                name: "test_pro1z",
                shortName: "kj",
                description: "zn",
                currency: {
                    code: "USD",
                    name: "US Dollar",
                    decimalPlaces: 0,
                    displaySymbol: "$",
                    nameCode: "currency.USD",
                    displayLabel: "US Dollar ($)"
                }
            }
        ];

        mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

        const command = GetAllAccountProducts({ tenantId: 'test-tenant' });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.get).toHaveBeenCalledWith(
            '/v1/savingsproducts'
        );
        expect(result).toEqual(mockResponse);
        expect(config.tenantId).toBe('test-tenant');
    });

    it('should handle axios errors during retrieval', async () => {
        const mockError: MockAxiosError = new Error('Retrieval failed');
        mockError.response = {
            status: 400,
            data: {
                message: 'Failed to retrieve products',
                developerMessage: 'Something went wrong'
            }
        };
        mockError.isAxiosError = true;

        mockAxiosInstance.get.mockRejectedValue(mockError);

        const command = GetAllAccountProducts();

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await expect(command.execute(config)).rejects.toThrow();
    });

    it('should not override tenantId if not provided in params', async () => {
        const mockResponse: any[] = [];
        mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

        const command = GetAllAccountProducts();

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await command.execute(config);

        expect(config.tenantId).toBe('default-tenant');
    });
});
