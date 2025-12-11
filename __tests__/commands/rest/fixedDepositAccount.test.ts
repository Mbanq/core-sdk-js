import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { CreateFixedDepositAccount, GetFixedDepositAccount, UpdateFixedDepositAccount } from '../../../src/commands/rest/fixedDepositAccount';
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

describe('GetFixedDepositAccount', () => {
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

  it('should create a GetFixedDepositAccount command with correct metadata', () => {
    const command = GetFixedDepositAccount(13400);

    expect(command.input).toEqual({ accountId: 13400 });
    expect(command.metadata).toEqual({
      commandName: 'GetFixedDepositAccount',
      path: '/v1/fixeddepositaccounts/13400',
      method: 'GET'
    });
  });

  it('should execute GET request and return fixed deposit account data', async () => {
    const mockAccountData = {
      id: '13400',
      preClosurePenalApplicable: false,
      minDepositTerm: 3,
      minDepositTermType: {
        id: 2,
        code: 'deposit.term.savingsPeriodFrequencyType.months',
        value: 'Months'
      },
      depositAmount: 10001,
      maturityAmount: 10001,
      maturityDate: [2025, 10, 22],
      depositPeriod: 1,
      depositPeriodFrequency: {
        id: 3,
        code: 'deposit.period.savingsPeriodFrequencyType.years',
        value: 'Years'
      },
      activationCharge: 0,
      transferInterestToSavings: false,
      accountNo: '000013400',
      clientId: 5162,
      clientName: 'test fix deposit',
      depositProductId: 609,
      depositProductName: 'SecurePlus Fixed Deposit',
      fieldOfficerId: 0,
      status: {
        id: 100,
        code: 'savingsAccountStatusType.submitted.and.pending.approval',
        value: 'Submitted and pending approval',
        submittedAndPendingApproval: true,
        approved: false,
        rejected: false,
        withdrawnByApplicant: false,
        active: false,
        closed: false,
        prematureClosed: false,
        transferInProgress: false,
        transferOnHold: false,
        matured: false
      },
      timeline: {
        submittedOnDate: [2024, 10, 22],
        submittedByUsername: 'testName',
        submittedByFirstname: 'test',
        submittedByLastname: 'test'
      },
      currency: {
        code: 'AWG',
        name: 'Aruban Guilder',
        decimalPlaces: 2,
        displaySymbol: 'ƒ',
        nameCode: 'currency.AWG',
        displayLabel: 'Aruban Guilder (ƒ)'
      },
      nominalAnnualInterestRate: 2,
      interestCompoundingPeriodType: {
        id: 4,
        code: 'savings.interest.period.savingsCompoundingInterestPeriodType.monthly',
        value: 'Monthly'
      },
      interestPostingPeriodType: {
        id: 4,
        code: 'savings.interest.period.savingsInterestPostingPeriodType.monthly',
        value: 'Monthly'
      },
      minRequiredOpeningBalance: 0,
      withdrawalFeeForTransfers: false,
      depositType: {
        id: 200,
        code: 'depositAccountType.fixedDeposit',
        value: 'Fixed Deposit'
      },
      minBalanceForInterestCalculation: 0,
      withHoldTax: false,
      summary: {
        currency: {
          code: 'AWG',
          name: 'Aruban Guilder',
          decimalPlaces: 2,
          displaySymbol: 'ƒ',
          nameCode: 'currency.AWG',
          displayLabel: 'Aruban Guilder (ƒ)'
        },
        totalDeposits: 0,
        totalWithdrawals: 0,
        totalWithdrawalFees: 0,
        totalAnnualFees: 0,
        totalInterestEarned: 0,
        totalInterestPosted: 0,
        accountBalance: 0,
        totalFeeCharge: 0,
        totalPenaltyCharge: 0,
        totalOverdraftInterestDerived: 0,
        totalWithholdTax: 0,
        interestNotPosted: 0,
        availableBalance: 0
      },
      charges: [],
      accountChart: {
        id: 101,
        fromDate: [2024, 9, 3],
        isPrimaryGroupingByAmount: false,
        accountId: 13400,
        accountNumber: '000013400',
        chartSlabs: [
          {
            id: 101,
            description: 'Applicable for senior citizens only',
            periodType: {
              id: 3,
              code: 'periodFrequencyType.years',
              value: 'Years'
            },
            fromPeriod: 1,
            annualInterestRate: 2,
            currency: {
              code: 'AWG',
              name: 'Aruban Guilder',
              decimalPlaces: 2,
              displaySymbol: 'ƒ',
              nameCode: 'currency.AWG',
              displayLabel: 'Aruban Guilder (ƒ)'
            }
          }
        ],
        periodTypes: [
          {
            id: 0,
            code: 'periodFrequencyType.days',
            value: 'Days'
          }
        ]
      }
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockAccountData });

    const command = GetFixedDepositAccount(13400);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/fixeddepositaccounts/13400');
    expect(result).toEqual(mockAccountData);
    expect(result.accountNo).toBe('000013400');
    expect(result.status.value).toBe('Submitted and pending approval');
  });

  it('should handle axios errors', async () => {
    const mockError: MockAxiosError = new Error('Request failed');
    mockError.response = {
      status: 404,
      data: {
        message: 'Fixed deposit account not found',
        developerMessage: 'Fixed deposit account with ID 13400 does not exist'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.get.mockRejectedValue(mockError);

    const command = GetFixedDepositAccount(13400);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should not override tenantId if not provided in params', async () => {
    const mockAccountData = {
      id: '13400',
      accountNo: '000013400',
      depositAmount: 10001
    };
    mockAxiosInstance.get.mockResolvedValue({ data: mockAccountData });

    const command = GetFixedDepositAccount(13400);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(config.tenantId).toBe('default-tenant');
  });
});

describe('UpdateFixedDepositAccount', () => {
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

  it('should create an UpdateFixedDepositAccount command with correct metadata', () => {
    const params = {
      clientId: 5162,
      productId: 609,
      submittedOnDate: '22 October 2024',
      nominalAnnualInterestRate: 2,
      depositAmount: '10001',
      depositPeriod: 1,
      depositPeriodFrequencyId: 3,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy'
    };

    const command = UpdateFixedDepositAccount(13400, params);

    expect(command.input).toEqual({ accountId: 13400, params });
    expect(command.metadata).toEqual({
      commandName: 'UpdateFixedDepositAccount',
      path: '/v1/fixeddepositaccounts/13400',
      method: 'PUT'
    });
  });

  it('should execute PUT request with minimal required fields and return response data', async () => {
    const requestData = {
      clientId: 5162,
      productId: 609,
      submittedOnDate: '22 October 2024',
      depositAmount: '10001',
      depositPeriod: 1,
      depositPeriodFrequencyId: 3,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy'
    };

    const mockResponse = {
      id: '13400',
      officeId: 1,
      clientId: 5162,
      savingsId: '13400',
      resourceId: '13400',
      changes: {
        depositAmount: 10001
      }
    };

    mockAxiosInstance.put.mockResolvedValue({ data: mockResponse });

    const command = UpdateFixedDepositAccount(13400, requestData);

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.put).toHaveBeenCalledWith(
      '/v1/fixeddepositaccounts/13400',
      requestData
    );
    expect(result).toEqual(mockResponse);
    expect(result.savingsId).toBe('13400');
  });

  it('should execute PUT request with all optional fields', async () => {
    const requestData = {
      clientId: 5162,
      productId: 609,
      submittedOnDate: '22 October 2024',
      nominalAnnualInterestRate: 2,
      depositAmount: '10001',
      depositPeriod: 1,
      withHoldTax: false,
      interestCompoundingPeriodType: 4,
      interestPostingPeriodType: 7,
      interestCalculationType: 2,
      interestCalculationDaysInYearType: 365,
      depositPeriodFrequencyId: 3,
      preClosurePenalApplicable: false,
      minDepositTerm: 3,
      minDepositTermTypeId: 2,
      transferInterestToSavings: false,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      monthDayFormat: 'dd MMM',
      charges: [
        {
          chargeId: 645,
          amount: 10,
          dueDate: '22 October 2024'
        }
      ]
    };

    const mockResponse = {
      id: '13400',
      officeId: 1,
      clientId: 5162,
      savingsId: '13400',
      resourceId: '13400',
      changes: {
        interestCompoundingPeriodType: 4,
        interestPostingPeriodType: 7,
        interestCalculationType: 2,
        charges: [
          {
            chargeId: 645,
            amount: '10',
            dueDate: '22 October 2024'
          }
        ],
        depositAmount: 10001
      }
    };

    mockAxiosInstance.put.mockResolvedValue({ data: mockResponse });

    const command = UpdateFixedDepositAccount(13400, requestData);

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.put).toHaveBeenCalledWith(
      '/v1/fixeddepositaccounts/13400',
      requestData
    );
    expect(result).toEqual(mockResponse);
    expect(result.changes?.interestCompoundingPeriodType).toBe(4);
  });

  it('should handle axios errors during update', async () => {
    const mockError: MockAxiosError = new Error('Update failed');
    mockError.response = {
      status: 400,
      data: {
        message: 'Invalid update data',
        developerMessage: 'Validation failed for fixed deposit account update'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.put.mockRejectedValue(mockError);

    const command = UpdateFixedDepositAccount(13400, {
      clientId: 5162,
      productId: 609,
      submittedOnDate: '22 October 2024',
      depositAmount: '10001',
      depositPeriod: 1,
      depositPeriodFrequencyId: 3,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy'
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should handle account not found error', async () => {
    const mockError: MockAxiosError = new Error('Account not found');
    mockError.response = {
      status: 404,
      data: {
        message: 'Fixed deposit account not found',
        developerMessage: 'Fixed deposit account with ID 13400 does not exist'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.put.mockRejectedValue(mockError);

    const command = UpdateFixedDepositAccount(13400, {
      clientId: 5162,
      productId: 609,
      submittedOnDate: '22 October 2024',
      depositAmount: '10001',
      depositPeriod: 1,
      depositPeriodFrequencyId: 3,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy'
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should not override tenantId if not provided in params', async () => {
    const mockResponse = {
      id: '13400',
      officeId: 1,
      clientId: 5162,
      savingsId: '13400',
      resourceId: '13400'
    };

    mockAxiosInstance.put.mockResolvedValue({ data: mockResponse });

    const command = UpdateFixedDepositAccount(13400, {
      clientId: 5162,
      productId: 609,
      submittedOnDate: '22 October 2024',
      depositAmount: '10001',
      depositPeriod: 1,
      depositPeriodFrequencyId: 3,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy'
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(config.tenantId).toBe('default-tenant');
  });
});
