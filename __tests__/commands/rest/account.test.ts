import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  GetAccount,
  UpdateAccount,
  DeleteAccount,
  GetAccountsOfClient,
  CreateAndActivateAccount,
  CloseAccount,
  BlockAccount
} from '../../../src/commands/rest/account';
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

describe('GetAccount', () => {
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

  it('should create a GetAccount command with correct metadata', () => {
    const command = GetAccount(123, { tenantId: 'test-tenant' });

    expect(command.input).toEqual({ accountId: 123, configuration: { tenantId: 'test-tenant' } });
    expect(command.metadata).toEqual({
      commandName: 'GetAccount',
      path: '/v1/savingsaccounts/123',
      method: 'GET'
    });
  });

  it('should execute GET request and return account data', async () => {
    const mockAccountData = {
      id: 123,
      accountNo: '000000123',
      depositType: {
        id: 100,
        code: 'depositAccountType.savingsDeposit',
        value: 'Savings'
      },
      clientId: 456,
      clientName: 'John Doe',
      status: {
        id: 300,
        code: 'savingsAccountStatusType.active',
        value: 'Active',
        submittedAndPendingApproval: false,
        approved: false,
        rejected: false,
        withdrawnByApplicant: false,
        active: true,
        closed: false,
        prematureClosed: false,
        transferInProgress: false,
        transferOnHold: false,
        matured: false
      }
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockAccountData });

    const command = GetAccount(123, { tenantId: 'test-tenant' });
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/savingsaccounts/123');
    expect(result).toEqual(mockAccountData);
    expect(config.tenantId).toBe('test-tenant');
  });

  it('should handle axios errors', async () => {
    const mockError: MockAxiosError = new Error('Request failed');
    mockError.response = {
      status: 404,
      data: {
        message: 'Account not found',
        developerMessage: 'Account with ID 123 does not exist'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.get.mockRejectedValue(mockError);

    const command = GetAccount(123);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should not override tenantId if not provided in params', async () => {
    const mockAccountData = { id: 123, accountNo: '000000123' };
    mockAxiosInstance.get.mockResolvedValue({ data: mockAccountData });

    const command = GetAccount(123);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(config.tenantId).toBe('default-tenant');
  });
});

describe('UpdateAccount', () => {
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

  it('should create an UpdateAccount command with correct metadata', () => {
    const updateData = {
      clientId: 123,
      productId: 48,
      submittedOnDate: '26 August 2025',
      nominalAnnualInterestRate: '1',
      minRequiredOpeningBalance: '0',
      lockinPeriodFrequency: '1',
      withdrawalFeeForTransfers: true,
      allowOverdraft: false,
      overdraftLimit: 0,
      minOverdraftForInterestCalculation: 0,
      enforceMinRequiredBalance: true,
      minRequiredBalance: 0,
      withHoldTax: false,
      interestCompoundingPeriodType: 4,
      interestPostingPeriodType: 5,
      interestCalculationType: 1,
      interestCalculationDaysInYearType: 365,
      fieldOfficerId: 1,
      lockinPeriodFrequencyType: 2,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      monthDayFormat: 'dd MMM',
      charges: []
    };

    const command = UpdateAccount(456, updateData, { tenantId: 'test-tenant' });

    expect(command.input).toEqual({ accountId: 456, requestData: updateData, configuration: { tenantId: 'test-tenant' } });
    expect(command.metadata).toEqual({
      commandName: 'UpdateAccount',
      path: '/v1/savingsaccounts/456',
      method: 'PUT'
    });
  });

  it('should execute PUT request with correct data', async () => {
    const updateData = {
      clientId: 123,
      productId: 48,
      submittedOnDate: '26 August 2025',
      nominalAnnualInterestRate: '1',
      minRequiredOpeningBalance: '0',
      lockinPeriodFrequency: '1',
      withdrawalFeeForTransfers: true,
      allowOverdraft: false,
      overdraftLimit: 0,
      minOverdraftForInterestCalculation: 0,
      enforceMinRequiredBalance: true,
      minRequiredBalance: 0,
      withHoldTax: false,
      interestCompoundingPeriodType: 4,
      interestPostingPeriodType: 5,
      interestCalculationType: 1,
      interestCalculationDaysInYearType: 365,
      fieldOfficerId: 1,
      lockinPeriodFrequencyType: 2,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      monthDayFormat: 'dd MMM',
      charges: []
    };

    const mockResponse = { success: true, accountId: 456 };
    mockAxiosInstance.put.mockResolvedValue({ data: mockResponse });

    const command = UpdateAccount(456, updateData, { tenantId: 'test-tenant' });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.put).toHaveBeenCalledWith(
      '/v1/savingsaccounts/456',
      updateData
    );
    expect(result).toEqual(mockResponse);
    expect(config.tenantId).toBe('test-tenant');
  });

  it('should handle axios errors during update', async () => {
    const mockError: MockAxiosError = new Error('Update failed');
    mockError.response = {
      status: 400,
      data: {
        message: 'Invalid account data',
        developerMessage: 'Validation failed for account update'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.put.mockRejectedValue(mockError);

    const command = UpdateAccount(456, {
      clientId: 123,
      productId: 48,
      submittedOnDate: '26 August 2025',
      nominalAnnualInterestRate: '1',
      minRequiredOpeningBalance: '0',
      lockinPeriodFrequency: '1',
      withdrawalFeeForTransfers: true,
      allowOverdraft: false,
      overdraftLimit: 0,
      minOverdraftForInterestCalculation: 0,
      enforceMinRequiredBalance: true,
      minRequiredBalance: 0,
      withHoldTax: false,
      interestCompoundingPeriodType: 4,
      interestPostingPeriodType: 5,
      interestCalculationType: 1,
      interestCalculationDaysInYearType: 365,
      fieldOfficerId: 1,
      lockinPeriodFrequencyType: 2,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      monthDayFormat: 'dd MMM',
      charges: []
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should send requestData as-is without modifying it', async () => {
    const updateData = {
      clientId: 123,
      productId: 48,
      submittedOnDate: '26 August 2025',
      nominalAnnualInterestRate: '1',
      minRequiredOpeningBalance: '0',
      lockinPeriodFrequency: '1',
      withdrawalFeeForTransfers: true,
      allowOverdraft: false,
      overdraftLimit: 0,
      minOverdraftForInterestCalculation: 0,
      enforceMinRequiredBalance: true,
      minRequiredBalance: 0,
      withHoldTax: false,
      interestCompoundingPeriodType: 4,
      interestPostingPeriodType: 5,
      interestCalculationType: 1,
      interestCalculationDaysInYearType: 365,
      fieldOfficerId: 1,
      lockinPeriodFrequencyType: 2,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      monthDayFormat: 'dd MMM',
      charges: []
    };

    mockAxiosInstance.put.mockResolvedValue({ data: { success: true } });

    const command = UpdateAccount(789, updateData);

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(mockAxiosInstance.put).toHaveBeenCalledWith(
      '/v1/savingsaccounts/789',
      updateData // Should send requestData as-is
    );
  });
});

describe('DeleteAccount', () => {
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

  it('should create a DeleteAccount command with correct metadata', () => {
    const command = DeleteAccount(456, { tenantId: 'test-tenant' });

    expect(command.input).toEqual({ accountId: 456, configuration: { tenantId: 'test-tenant' } });
    expect(command.metadata).toEqual({
      commandName: 'DeleteAccount',
      path: '/v1/savingsaccounts/456',
      method: 'DELETE'
    });
  });

  it('should execute DELETE request and return response data', async () => {
    const mockResponse = { success: true };
    mockAxiosInstance.delete.mockResolvedValue({ data: mockResponse });

    const command = DeleteAccount(456, { tenantId: 'test-tenant' });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/savingsaccounts/456');
    expect(result).toEqual(mockResponse);
    expect(config.tenantId).toBe('test-tenant');
  });

  it('should handle axios errors during delete', async () => {
    const mockError: MockAxiosError = new Error('Delete failed');
    mockError.response = {
      status: 404,
      data: {
        message: 'Account not found',
        developerMessage: 'Account with ID acc_456 does not exist'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.delete.mockRejectedValue(mockError);

    const command = DeleteAccount(456);

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should not override tenantId if not provided in params', async () => {
    const mockResponse = { success: true };
    mockAxiosInstance.delete.mockResolvedValue({ data: mockResponse });

    const command = DeleteAccount(456);

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(config.tenantId).toBe('default-tenant');
  });
});

describe('GetAccountsOfClient', () => {
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

  it('should create a GetAccountsOfClient command with correct metadata', () => {
    const clientId = 123;
    const params = { showReservedAccount: true };
    const configuration = { tenantId: 'test-tenant' };
    const command = GetAccountsOfClient(clientId, params, configuration);

    expect(command.input).toEqual({ clientId, params, configuration });
    expect(command.metadata).toEqual({
      commandName: 'ListAccountsOfClient',
      path: '/v1/clients/123/accounts',
      method: 'GET'
    });
  });

  it('should execute GET request with params and return response data', async () => {
    const mockAccountsData = {
      savingsAccounts: [
        {
          id: 123,
          accountNo: '000000123',
          productId: 1,
          productName: 'Savings Account',
          shortProductName: 'SAV'
        }
      ]
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockAccountsData });

    const command = GetAccountsOfClient(
      123,
      { showReservedAccount: true },
      { tenantId: 'test-tenant' }
    );

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/123/accounts', {
      params: { showReservedAccount: true }
    });
    expect(result).toEqual(mockAccountsData);
    expect(config.tenantId).toBe('test-tenant');
  });

  it('should handle axios errors during get accounts', async () => {
    const mockError: MockAxiosError = new Error('Request failed');
    mockError.response = {
      status: 404,
      data: {
        message: 'Client not found',
        developerMessage: 'Client with ID 123 does not exist'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.get.mockRejectedValue(mockError);

    const command = GetAccountsOfClient(123, { showReservedAccount: false }, {});

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should not override tenantId if not provided in configuration', async () => {
    const mockAccountsData = { savingsAccounts: [] };
    mockAxiosInstance.get.mockResolvedValue({ data: mockAccountsData });

    const command = GetAccountsOfClient(123, { showReservedAccount: false }, {});

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(config.tenantId).toBe('default-tenant');
  });
});

describe('CreateAndActivateAccount', () => {
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

  it('should create a CreateAndActivateAccount command with correct metadata', () => {
    const params = {
      clientId: 12,
      productId: 1,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      submittedOnDate: '22 June 2023',
      monthDayFormat: 'dd MMMM yyyy'
    };

    const command = CreateAndActivateAccount(params);

    expect(command.input).toEqual({ params, configuration: undefined });
    expect(command.metadata).toEqual({
      commandName: 'CreateAndActivateAccount',
      path: '/v1/savingsaccounts',
      method: 'POST'
    });
  });

  it('should execute POST request with correct query parameters and return response data', async () => {
    const requestData = {
      clientId: 12,
      productId: 1,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      submittedOnDate: '22 June 2023',
      monthDayFormat: 'dd MMMM yyyy',
      nominalAnnualInterestRate: 22.49,
      minRequiredOpeningBalance: '1000',
      lockinPeriodFrequency: 0,
      withdrawalFeeForTransfers: true,
      allowOverdraft: true,
      overdraftLimit: 2,
      nominalAnnualInterestRateOverdraft: 22.49,
      minOverdraftForInterestCalculation: 2,
      enforceMinRequiredBalance: false,
      minRequiredBalance: 0,
      withHoldTax: false,
      interestCompoundingPeriodType: 1,
      interestPostingPeriodType: 4,
      interestCalculationType: 1,
      interestCalculationDaysInYearType: 365,
      externalId: '63748',
      lockinPeriodFrequencyType: 0,
      nickname: '12323',
      charges: []
    };

    const mockResponse = {
      officeId: 1,
      clientId: 12,
      savingsId: 15,
      resourceId: 15,
      changes: {
        status: 'ACTIVE',
        locale: 'en',
        dateFormat: 'dd MMMM yyyy',
        activatedOnDate: '22 June 2023'
      }
    };

    mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

    const command = CreateAndActivateAccount(requestData, { tenantId: 'test-tenant' });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/v1/savingsaccounts?command=submit,approve,activate',
      requestData
    );
    expect(result).toEqual(mockResponse);
    expect(config.tenantId).toBe('test-tenant');
  });

  it('should handle minimal required fields', async () => {
    const requestData = {
      clientId: 12,
      productId: 1,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      submittedOnDate: '22 June 2023',
      monthDayFormat: 'dd MMMM yyyy'
    };

    const mockResponse = {
      officeId: 1,
      clientId: 12,
      savingsId: 15,
      resourceId: 15,
      changes: {
        status: 'ACTIVE',
        locale: 'en',
        dateFormat: 'dd MMMM yyyy',
        activatedOnDate: '22 June 2023'
      }
    };

    mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

    const command = CreateAndActivateAccount(requestData);

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/v1/savingsaccounts?command=submit,approve,activate',
      requestData
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle axios errors during account creation', async () => {
    const mockError: MockAxiosError = new Error('Creation failed');
    mockError.response = {
      status: 400,
      data: {
        message: 'Invalid account data',
        developerMessage: 'Validation failed for account creation'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.post.mockRejectedValue(mockError);

    const command = CreateAndActivateAccount({
      clientId: 12,
      productId: 1,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      submittedOnDate: '22 June 2023',
      monthDayFormat: 'dd MMMM yyyy'
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should override tenantId if provided in configuration', async () => {
    const mockResponse = {
      officeId: 1,
      clientId: 12,
      savingsId: 15,
      resourceId: 15,
      changes: {
        status: 'ACTIVE',
        locale: 'en',
        dateFormat: 'dd MMMM yyyy',
        activatedOnDate: '22 June 2023'
      }
    };

    mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

    const command = CreateAndActivateAccount(
      {
        clientId: 12,
        productId: 1,
        locale: 'en',
        dateFormat: 'dd MMMM yyyy',
        submittedOnDate: '22 June 2023',
        monthDayFormat: 'dd MMMM yyyy'
      },
      { tenantId: 'custom-tenant' }
    );

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(config.tenantId).toBe('custom-tenant');
  });

  it('should not override tenantId if not provided in configuration', async () => {
    const mockResponse = {
      officeId: 1,
      clientId: 12,
      savingsId: 15,
      resourceId: 15,
      changes: {
        status: 'ACTIVE',
        locale: 'en',
        dateFormat: 'dd MMMM yyyy',
        activatedOnDate: '22 June 2023'
      }
    };

    mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

    const command = CreateAndActivateAccount({
      clientId: 12,
      productId: 1,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      submittedOnDate: '22 June 2023',
      monthDayFormat: 'dd MMMM yyyy'
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(config.tenantId).toBe('default-tenant');
  });

  it('should include all optional fields in the request', async () => {
    const requestData = {
      clientId: 12,
      productId: 1,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      submittedOnDate: '22 June 2023',
      monthDayFormat: 'dd MMMM yyyy',
      nominalAnnualInterestRate: 22.49,
      minRequiredOpeningBalance: '1000',
      lockinPeriodFrequency: 0,
      withdrawalFeeForTransfers: true,
      allowOverdraft: true,
      overdraftLimit: 2,
      nominalAnnualInterestRateOverdraft: 22.49,
      minOverdraftForInterestCalculation: 2,
      enforceMinRequiredBalance: false,
      minRequiredBalance: 0,
      withHoldTax: false,
      interestCompoundingPeriodType: 1,
      interestPostingPeriodType: 4,
      interestCalculationType: 1,
      interestCalculationDaysInYearType: 365,
      externalId: '63748',
      lockinPeriodFrequencyType: 0,
      nickname: '12323',
      charges: [
        { chargeId: 1, amount: 100 },
        { chargeId: 2, amount: 50 }
      ]
    };

    const mockResponse = {
      officeId: 1,
      clientId: 12,
      savingsId: 15,
      resourceId: 15,
      changes: {
        status: 'ACTIVE',
        locale: 'en',
        dateFormat: 'dd MMMM yyyy',
        activatedOnDate: '22 June 2023'
      }
    };

    mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

    const command = CreateAndActivateAccount(requestData);

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/v1/savingsaccounts?command=submit,approve,activate',
      requestData
    );
  });
});

describe('CloseAccount', () => {
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

  it('should create a CloseAccount command with correct metadata', () => {
    const requestData = {
      closedOnDate: '01 April 2025',
      dateFormat: 'dd MMMM yyyy',
      locale: 'en',
      closeReasonCodeId: 5100
    };
    const command = CloseAccount(5100, requestData, { tenantId: 'test-tenant' });

    expect(command.input).toEqual({ savingsAccountId: 5100, requestData, configuration: { tenantId: 'test-tenant' } });
    expect(command.metadata).toEqual({
      commandName: 'CloseAccount',
      path: '/v1/savingsaccounts/5100?command=close',
      method: 'POST'
    });
  });

  it('should execute POST request and return response data', async () => {
    const requestData = {
      closedOnDate: '01 April 2025',
      dateFormat: 'dd MMMM yyyy',
      locale: 'en',
      closeReasonCodeId: 5100,
      withdrawBalance: false,
      postInterestValidationOnClosure: true,
      ignoreNegativeBalance: false
    };

    const mockResponse = {
      officeId: 1,
      clientId: 123,
      savingsId: 5100,
      resourceId: 5100,
      changes: {
        status: 'CLOSED',
        locale: 'en',
        dateFormat: 'dd MMMM yyyy',
        closedOnDate: '01 April 2025',
        closeReason: 'ACCOUNT_CLOSE_REASON'
      }
    };

    mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

    const command = CloseAccount(5100, requestData, { tenantId: 'test-tenant' });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/v1/savingsaccounts/5100?command=close',
      requestData
    );
    expect(result).toEqual(mockResponse);
    expect(config.tenantId).toBe('test-tenant');
  });

  it('should handle axios errors during close', async () => {
    const mockError: MockAxiosError = new Error('Close failed');
    mockError.response = {
      status: 400,
      data: {
        message: 'Cannot close account',
        developerMessage: 'Account has non-zero balance'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.post.mockRejectedValue(mockError);

    const command = CloseAccount(5100, {
      closedOnDate: '01 April 2025',
      dateFormat: 'dd MMMM yyyy',
      locale: 'en',
      closeReasonCodeId: 5100
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

    const command = CloseAccount(5100, {
      closedOnDate: '01 April 2025',
      dateFormat: 'dd MMMM yyyy',
      locale: 'en',
      closeReasonCodeId: 5100
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(config.tenantId).toBe('default-tenant');
  });
});


describe('BlockAccount', () => {
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

  it('should create a BlockAccount command with correct metadata', () => {
    const requestData = { blockReasonCodeId: 5100 };
    const command = BlockAccount(123, requestData, { tenantId: 'test-tenant' });

    expect(command.input).toEqual({ accountId: 123, requestData, configuration: { tenantId: 'test-tenant' } });
    expect(command.metadata).toEqual({
      commandName: 'BlockAccount',
      path: '/v1/savingsaccounts/123?command=block',
      method: 'POST'
    });
  });

  it('should execute POST request and return response data', async () => {
    const requestData = { blockReasonCodeId: 5100 };

    const mockResponse = {
      id: 11999,
      clientId: 111,
      officeId: 1,
      savingsId: 4865,
      resourceId: 111,
      changes: {
        subStatus: {
          id: 400,
          code: 'SavingsAccountSubStatusEnum.block',
          value: 'Block',
          none: false,
          inactive: false,
          dormant: false,
          escheat: false,
          block: true,
          blockCredit: false,
          blockDebit: false
        },
        blockReason: {
          id: 3002,
          name: 'Suspicious Transactions',
          codeName: 'ACCOUNT_BLOCK_REASON'
        }
      }
    };

    mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

    const command = BlockAccount(123, requestData, { tenantId: 'test-tenant' });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/v1/savingsaccounts/123?command=block',
      requestData
    );
    expect(result).toEqual(mockResponse);
    expect(config.tenantId).toBe('test-tenant');
  });

  it('should handle axios errors during block', async () => {
    const mockError: MockAxiosError = new Error('Block failed');
    mockError.response = {
      status: 400,
      data: {
        message: 'Cannot block account',
        developerMessage: 'Account is already blocked'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.post.mockRejectedValue(mockError);

    const command = BlockAccount(123, { blockReasonCodeId: 5100 });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should not override tenantId if not provided in params', async () => {
    const mockResponse = { success: true };
    mockAxiosInstance.post.mockResolvedValue({ data: mockResponse });

    const command = BlockAccount(123, { blockReasonCodeId: 5100 });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(config.tenantId).toBe('default-tenant');
  });
});



