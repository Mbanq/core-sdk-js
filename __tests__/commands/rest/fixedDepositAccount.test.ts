import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CreateFixedDepositAccount } from '../../../src/commands/rest/fixedDepositAccount';
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

describe('CreateFixedDepositAccount', () => {
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

    it('should create a CreateFixedDepositAccount command with correct metadata', () => {
        const params = {
            productId: 609,
            depositAmount: '1000',
            depositPeriod: '1',
            depositPeriodFrequencyId: 3,
            isConsent: true,
            submittedOnDate: '22 October 2024',
            locale: 'en',
            dateFormat: 'dd MMMM yyyy',
            clientId: 5162
        };

        const command = CreateFixedDepositAccount(params);

        expect(command.input).toEqual({ params });
        expect(command.metadata).toEqual({
            commandName: 'CreateFixedDepositAccount',
            path: '/v1/fixeddepositaccounts',
            method: 'POST'
        });
    });

    it('should execute POST request with minimal required fields and return response data', async () => {
        const requestData = {
            productId: 609,
            depositAmount: '1000',
            depositPeriod: '1',
            depositPeriodFrequencyId: 3,
            isConsent: true,
            submittedOnDate: '22 October 2024',
            locale: 'en',
            dateFormat: 'dd MMMM yyyy',
            clientId: 5162
        };

        const mockResponse = {
            id: 13399,
            officeId: 1,
            clientId: 5162,
            savingsId: 13399,
            resourceId: 13399
        };

        mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

        const command = CreateFixedDepositAccount(requestData);

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/v1/fixeddepositaccounts?command=submit,approve,activate',
            requestData
        );
        expect(result).toEqual(mockResponse);
        expect(config.tenantId).toBe('default-tenant');
    });

    it('should execute POST request with all optional fields', async () => {
        const requestData = {
            productId: 609,
            nominalAnnualInterestRate: 5.5,
            minRequiredOpeningBalance: 1000,
            interestCompoundingPeriodType: 1,
            interestPostingPeriodType: 4,
            interestCalculationType: 1,
            interestCalculationDaysInYearType: 365,
            preClosurePenalApplicable: false,
            minDepositTerm: 3,
            minDepositTermTypeId: 2,
            transferInterestToSavings: false,
            depositAmount: '1000',
            depositPeriod: '1',
            depositPeriodFrequencyId: 3,
            isConsent: true,
            submittedOnDate: '22 October 2024',
            locale: 'en',
            dateFormat: 'dd MMMM yyyy',
            monthDayFormat: 'dd MMM',
            clientId: 5162,
            charges: [
                {
                    chargeId: 1,
                    amount: 50,
                    dueDate: '22 October 2024',
                    feeInterval: 1
                }
            ],
            charts: [
                {
                    fromDate: [2024, 9, 3],
                    dateFormat: 'dd MMMM yyyy',
                    locale: 'en',
                    chartSlabs: [
                        {
                            periodType: 1,
                            fromPeriod: 1,
                            toPeriod: 12,
                            annualInterestRate: 5.5,
                            description: 'Standard rate'
                        }
                    ],
                    isActiveChart: 'true'
                }
            ]
        };

        const mockResponse = {
            id: 13400,
            officeId: 1,
            clientId: 5162,
            savingsId: 13400,
            resourceId: 13400
        };

        mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

        const command = CreateFixedDepositAccount(requestData);

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        const result = await command.execute(config);

        expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/v1/fixeddepositaccounts?command=submit,approve,activate',
            requestData
        );
        expect(result).toEqual(mockResponse);
    });

    it('should handle axios errors during fixed deposit account creation', async () => {
        const mockError: MockAxiosError = new Error('Creation failed');
        mockError.response = {
            status: 400,
            data: {
                message: 'Invalid fixed deposit data',
                developerMessage: 'Validation failed for fixed deposit account creation'
            }
        };
        mockError.isAxiosError = true;

        mockAxiosInstance.post.mockRejectedValue(mockError);

        const command = CreateFixedDepositAccount({
            productId: 609,
            depositAmount: '1000',
            depositPeriod: '1',
            depositPeriodFrequencyId: 3,
            isConsent: true,
            submittedOnDate: '22 October 2024',
            locale: 'en',
            dateFormat: 'dd MMMM yyyy',
            clientId: 5162
        });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await expect(command.execute(config)).rejects.toThrow();
    });

    it('should handle missing client error', async () => {
        const mockError: MockAxiosError = new Error('Client not found');
        mockError.response = {
            status: 404,
            data: {
                message: 'Client not found',
                developerMessage: 'Client with ID 5162 does not exist'
            }
        };
        mockError.isAxiosError = true;

        mockAxiosInstance.post.mockRejectedValue(mockError);

        const command = CreateFixedDepositAccount({
            productId: 609,
            depositAmount: '1000',
            depositPeriod: '1',
            depositPeriodFrequencyId: 3,
            isConsent: true,
            submittedOnDate: '22 October 2024',
            locale: 'en',
            dateFormat: 'dd MMMM yyyy',
            clientId: 5162
        });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await expect(command.execute(config)).rejects.toThrow();
    });

    it('should not override tenantId if not provided in params', async () => {
        const mockResponse = {
            id: 13399,
            officeId: 1,
            clientId: 5162,
            savingsId: 13399,
            resourceId: 13399
        };

        mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

        const command = CreateFixedDepositAccount({
            productId: 609,
            depositAmount: '1000',
            depositPeriod: '1',
            depositPeriodFrequencyId: 3,
            isConsent: true,
            submittedOnDate: '22 October 2024',
            locale: 'en',
            dateFormat: 'dd MMMM yyyy',
            clientId: 5162
        });

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await command.execute(config);

        expect(config.tenantId).toBe('default-tenant');
    });

    it('should send requestData as-is without modifying it', async () => {
        const requestData = {
            productId: 609,
            depositAmount: '1000',
            depositPeriod: '1',
            depositPeriodFrequencyId: 3,
            isConsent: true,
            submittedOnDate: '22 October 2024',
            locale: 'en',
            dateFormat: 'dd MMMM yyyy',
            clientId: 5162
        };

        mockAxiosInstance.post.mockResolvedValue({ data: { savingsId: 13399 } });

        const command = CreateFixedDepositAccount(requestData);

        const config = {
            baseUrl: 'https://api.example.com',
            tenantId: 'default-tenant'
        };

        await command.execute(config);

        expect(mockAxiosInstance.post).toHaveBeenCalledWith(
            '/v1/fixeddepositaccounts?command=submit,approve,activate',
            requestData
        );
    });
});
