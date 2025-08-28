import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  GetAccount,
  UpdateAccount,
  DeleteAccount,
  ListAccountsOfClient,
  GetAccountsOfClient
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
    const params = { id: 123, tenantId: 'test-tenant' };
    const command = GetAccount(params);

    expect(command.input).toEqual(params);
    expect(command.metadata).toEqual({
      commandName: 'GetAccount',
      path: '/v1/savingaccounts/123',
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

    const command = GetAccount({ id: 123, tenantId: 'test-tenant' });
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/savingaccounts/123');
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

    const command = GetAccount({ id: 123 });
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should not override tenantId if not provided in params', async () => {
    const mockAccountData = { id: 123, accountNo: '000000123' };
    mockAxiosInstance.get.mockResolvedValue({ data: mockAccountData });

    const command = GetAccount({ id: 123 });
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
    const params = {
      clientId: 123,
      accountId: 'acc_456',
      updates: {
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
      },
      tenantId: 'test-tenant'
    };

    const command = UpdateAccount(params);

    expect(command.input).toEqual(params);
    expect(command.metadata).toEqual({
      commandName: 'UpdateAccount',
      path: '/v1/savingsaccounts/acc_456',
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

    const mockResponse = { success: true, accountId: 'acc_456' };
    mockAxiosInstance.put.mockResolvedValue({ data: mockResponse });

    const command = UpdateAccount({
      clientId: 123,
      accountId: 'acc_456',
      updates: updateData,
      tenantId: 'test-tenant'
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.put).toHaveBeenCalledWith(
      '/v1/savingsaccounts/acc_456',
      { ...updateData, clientId: 123 }
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

    const command = UpdateAccount({
      clientId: 123,
      accountId: 'acc_456',
      updates: {
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
      }
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should include clientId in the request body', async () => {
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

    const command = UpdateAccount({
      clientId: 456, // Different from updateData.clientId
      accountId: 'acc_789',
      updates: updateData
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(mockAxiosInstance.put).toHaveBeenCalledWith(
      '/v1/savingsaccounts/acc_789',
      { ...updateData, clientId: 456 } // Should use clientId from params, not from updates
    );
  });
});

describe('ListAccountsOfClient', () => {
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

  it('should create a list query with correct default parameters', () => {
    const listQuery = ListAccountsOfClient({ clientId: 123, tenantId: 'test-tenant' });
    const queryBuilder = listQuery.list();

    expect(queryBuilder).toBeDefined();
    expect(typeof queryBuilder.execute).toBe('function');
    expect(typeof queryBuilder.where).toBe('function');
  });

  it('should execute list request and return accounts data', async () => {
    const mockAccountsData = {
      savingsAccounts: [
        {
          id: 123,
          accountNo: '000000123',
          productId: 1,
          productName: 'Savings Account',
          shortProductName: 'SAV',
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
          },
          accountBalance: 1000,
          availableBalance: 1000,
          allowPrepaidCard: false,
          primaryAccount: {}
        }
      ]
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockAccountsData });

    const listQuery = ListAccountsOfClient({ clientId: 123, tenantId: 'test-tenant' });
    const queryBuilder = listQuery.list();
    const command = queryBuilder.execute();

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/123/accounts', { params: {} });
    expect(result).toEqual(mockAccountsData);
  });

  it('should support filtering with where().eq() chain', async () => {
    const mockAccountsData = {
      savingsAccounts: [
        {
          id: 123,
          accountNo: '000000123',
          showReserved: true
        }
      ]
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockAccountsData });

    const listQuery = ListAccountsOfClient({ clientId: 123 });
    const queryBuilder = listQuery.list();
    const filteredBuilder = queryBuilder.where('showReservedAccount').eq(true);
    const command = filteredBuilder.execute();

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/123/accounts', {
      params: { showReservedAccount: true }
    });
    expect(result).toEqual(mockAccountsData);
  });

  it('should handle validation errors for invalid filter keys', () => {
    const listQuery = ListAccountsOfClient({ clientId: 123 });
    const queryBuilder = listQuery.list();

    expect(() => {
      queryBuilder.where('invalidField');
    }).toThrow();
  });

  it('should handle multiple where().eq() chains', async () => {
    const mockAccountsData = { savingsAccounts: [] };
    mockAxiosInstance.get.mockResolvedValue({ data: mockAccountsData });

    const listQuery = ListAccountsOfClient({ clientId: 123 });
    const queryBuilder = listQuery.list();
    const filteredBuilder = queryBuilder
      .where('showReservedAccount').eq(true)
      .where('showReservedAccount').eq(false); // This would override the previous filter

    const command = filteredBuilder.execute();

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/clients/123/accounts', {
      params: { showReservedAccount: false }
    });
  });

  it('should handle axios errors during list request', async () => {
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

    const listQuery = ListAccountsOfClient({ clientId: 123 });
    const queryBuilder = listQuery.list();
    const command = queryBuilder.execute();

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
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
    const params = { clientId: 123, accountId: 'acc_456', tenantId: 'test-tenant' };
    const command = DeleteAccount(params);

    expect(command.input).toEqual(params);
    expect(command.metadata).toEqual({
      commandName: 'DeleteAccount',
      path: '/v1/savingsaccounts/acc_456',
      method: 'DELETE'
    });
  });

  it('should execute DELETE request and return response data', async () => {
    const mockResponse = { success: true };
    mockAxiosInstance.delete.mockResolvedValue({ data: mockResponse });

    const command = DeleteAccount({
      clientId: 123,
      accountId: 'acc_456',
      tenantId: 'test-tenant'
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/savingsaccounts/acc_456');
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

    const command = DeleteAccount({
      clientId: 123,
      accountId: 'acc_456'
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should not override tenantId if not provided in params', async () => {
    const mockResponse = { success: true };
    mockAxiosInstance.delete.mockResolvedValue({ data: mockResponse });

    const command = DeleteAccount({
      clientId: 123,
      accountId: 'acc_456'
    });

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

    expect(command.input).toEqual({ params, configuration });
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
