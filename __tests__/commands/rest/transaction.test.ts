import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  GetPendingTransactions,
  GetCompletedTransactions,
  GetRecentTransactions,
  GetTransactionById,
  GetBankDetailsFromRoutingCode
} from '../../../src/commands/rest/transaction';
import { SavingsTransactionType, SubTransactionType } from '../../../src/types/transaction';
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

describe('GetPendingTransactions', () => {
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

  it('should create a GetPendingTransactions command with correct metadata', () => {
    const command = GetPendingTransactions(123, { offset: 0, limit: 200 });

    expect(command.input).toEqual({
      savingsId: 123,
      params: { offset: 0, limit: 200 }
    });
    expect(command.metadata).toEqual({
      commandName: 'GetPendingTransactions',
      path: '/v1/savingsaccounts/123/pendingTransaction',
      method: 'GET'
    });
  });

  it('should execute GET request and return pending transactions data', async () => {
    const mockResponse = {
      totalFilteredRecords: 1,
      pageItems: [
        {
          id: 212214,
          transfer: {
            id: 65869,
            amount: 20005,
            correlationId: 'ab639913-6791-482a-9c55-750537c3fbc5',
            creditor: {
              identifier: 'SWIFT://CITILULX/1221212',
              name: 'P Rash',
              country: 'US'
            },
            debtor: {
              identifier: 'ACCOUNT:000000315',
              name: 'yashas bank',
              country: 'US'
            },
            createdAt: '2024-02-14T11:22:14.572966',
            executedAt: '2024-02-14T11:22:38.708364',
            externalId: '17079061345616f',
            reference: [],
            status: 'AML_SCREENING',
            transactionId: 'ab639913-6791-482a-9c55-750537c3fbc5',
            type: 'CREDIT',
            valueDate: '2024-02-14',
            paymentType: 'SWIFT',
            debtorAccountNumber: '000000315',
            debtorAccountId: 315,
            creditorAccountNumber: '1221212',
            statementDescription: 'Wire out nametest P Rash',
            stopFutureDebit: false,
            createdBySystem: false
          },
          typeOf: 'HOLD_AMOUNT',
          valueDate: '2024-02-14',
          amount: 20010,
          pendingAmount: 20010,
          createdAt: '2024-02-14 11:22:38',
          manual: false,
          active: true,
          type: 'TRANSFER'
        }
      ]
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetPendingTransactions(123, { offset: 0, limit: 200 });
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/savingsaccounts/123/pendingTransaction',
      { params: { offset: 0, limit: 200 } }
    );
    expect(result).toEqual(mockResponse);
    expect(config.tenantId).toBe('default-tenant');
  });

  it('should handle axios errors', async () => {
    const mockError: MockAxiosError = new Error('Request failed');
    mockError.response = {
      status: 404,
      data: {
        message: 'Account not found',
        developerMessage: 'Savings account with ID 123 does not exist'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.get.mockRejectedValue(mockError);

    const command = GetPendingTransactions(123);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });
});

describe('GetCompletedTransactions', () => {
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

  it('should create a GetCompletedTransactions command with correct metadata', () => {
    const params = {
      offset: 0,
      limit: 15,
      showEnrichedTransactions: true,
      orderBy: 'id',
      sortOrder: 'DESC'
    };
    const command = GetCompletedTransactions(123, params);

    expect(command.input).toEqual({
      savingsId: 123,
      params
    });
    expect(command.metadata).toEqual({
      commandName: 'GetCompletedTransactions',
      path: '/v1/savingsaccounts/123/transactions',
      method: 'GET'
    });
  });

  it('should execute GET request and return completed transactions data', async () => {
    const mockResponse = {
      totalFilteredRecords: 2,
      pageItems: [
        {
          id: 353478,
          transactionType: {
            id: 3,
            code: 'savingsAccountTransactionType.interestPosting',
            value: 'Interest posting',
            deposit: false,
            dividendPayout: false,
            withdrawal: false,
            interestPosting: true,
            feeDeduction: false,
            initiateTransfer: false,
            approveTransfer: false,
            withdrawTransfer: false,
            rejectTransfer: false,
            overdraftInterest: false,
            writtenoff: false,
            overdraftFee: true,
            withholdTax: false,
            escheat: false,
            amountHold: false,
            amountRelease: false,
            interestpayableAccrued: false,
            overdraftInterestReceivableAccrued: false,
            isDebit: false,
            chargeBack: false,
            isFeeReversal: false
          },
          accountId: 10422,
          accountNo: '000010422',
          enrichedTransactionData: {
            id: '3123244',
            merchantLogoUrl: 'https://plaid-merchant-logos.plaid.com/walmart_1100.png',
            merchantWebsite: 'walmart.com',
            merchantName: 'Walmart',
            paymentChannel: 'in store',
            personalFinanceCategoryIconUrl: 'https://plaid-category-icons.plaid.com/PFC_GENERAL_MERCHANDISE.png',
            personalFinanceCategory: 'GENERAL_MERCHANDISE',
            personalFinanceSubCategory: 'GENERAL_MERCHANDISE_CLOTHING_AND_ACCESSORIES',
            isRecurring: true,
            merchantPhoneNumber: '+18003222726',
            location: {
              address: '13425 Community Rd',
              city: 'Poway',
              region: 'CA',
              postal_code: '92064',
              country: 'US',
              store_number: '1700',
              lat: 32.959068,
              lon: -117.037666
            }
          },
          date: [2024, 1, 31],
          dateTime: '2024-01-31 00:43:27',
          currency: {
            code: 'USD',
            name: 'US Dollar',
            decimalPlaces: 2,
            inMultiplesOf: 1,
            displaySymbol: '$',
            nameCode: 'currency.USD',
            displayLabel: 'US Dollar ($)',
            currencyCodeInDigit: 0,
            isBaseCurrency: false
          },
          paymentDetailData: {
            id: 387833,
            reference: 'Interest Posting For January Month'
          },
          amount: 1.92,
          runningBalance: 1.92,
          accrualRunningBalance: 0,
          interestPayableDerived: 0,
          reversed: false,
          submittedOnDate: [2024, 1, 31],
          interestedPostedAsOn: false,
          bookingDate: [2024, 1, 31],
          subTransactionType: 'NONE',
          status: 'PROCESSED',
          isAlreadyChargeBack: false,
          initiatedAt: '2024-01-31 00:43:27',
          transactionReferenceId: 'daf2d996-56d3-49ed-ba57-8cffb66e6fcc',
          createdBySystem: false
        }
      ]
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetCompletedTransactions(
      123,
      {
        offset: 0,
        limit: 15,
        showEnrichedTransactions: true,
        orderBy: 'id',
        sortOrder: 'DESC'
      }
    );

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/savingsaccounts/123/transactions',
      {
        params: {
          offset: 0,
          limit: 15,
          showEnrichedTransactions: true,
          orderBy: 'id',
          sortOrder: 'DESC'
        }
      }
    );
    expect(result).toEqual(mockResponse);
    expect(result.pageItems[0].enrichedTransactionData?.merchantName).toBe('Walmart');
    expect(config.tenantId).toBe('default-tenant');
  });

  it('should execute GET request with all filter parameters', async () => {
    const mockResponse = {
      totalFilteredRecords: 0,
      pageItems: []
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const params = {
      offset: 0,
      limit: 50,
      showEnrichedTransactions: true,
      subTransactionType: 1,
      statusType: 'PROCESSED',
      transactionType: 3,
      startDate: '24 March 2023',
      endDate: '24 July 2023',
      reference: 'For donation',
      paymentType: 'CASH',
      fromAmount: 20.5,
      toAmount: 100,
      isCardTransaction: true,
      showInterestAccruals: false,
      orderBy: 'id',
      sortOrder: 'ASC',
      getCardData: false
    };

    const command = GetCompletedTransactions(123, params);

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/savingsaccounts/123/transactions',
      { params }
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle axios errors', async () => {
    const mockError: MockAxiosError = new Error('Request failed');
    mockError.response = {
      status: 404,
      data: {
        message: 'Account not found',
        developerMessage: 'Savings account with ID 123 does not exist'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.get.mockRejectedValue(mockError);

    const command = GetCompletedTransactions(123);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should not override tenantId if not provided in configuration', async () => {
    const mockResponse = {
      totalFilteredRecords: 0,
      pageItems: []
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetCompletedTransactions(123);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await command.execute(config);

    expect(config.tenantId).toBe('default-tenant');
  });

  it('should work without params', async () => {
    const mockResponse = {
      totalFilteredRecords: 1,
      pageItems: [
        {
          id: 353479,
          transactionType: {
            id: 1,
            code: 'savingsAccountTransactionType.deposit',
            value: 'Deposit'
          },
          date: '2024-01-31',
          currency: {
            code: 'USD',
            name: 'US Dollar',
            decimalPlaces: 2,
            inMultiplesOf: 1,
            displaySymbol: '$',
            nameCode: 'currency.USD',
            displayLabel: 'US Dollar ($)'
          },
          amount: 100.00,
          runningBalance: 100.00,
          reversed: false,
          submittedOnDate: '2024-01-31',
          interestedPostedAsOn: false
        }
      ]
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetCompletedTransactions(123);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/savingsaccounts/123/transactions',
      { params: undefined }
    );
    expect(result).toEqual(mockResponse);
  });
});

describe('GetRecentTransactions', () => {
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

  it('should create a GetRecentTransactions command with correct metadata', () => {
    const params = {
      offset: 0,
      limit: 50,
      orderBy: 'createdAt' as const,
      sortOrder: 'DESC' as const
    };
    const command = GetRecentTransactions(101, params);

    expect(command.input).toEqual({
      savingsId: 101,
      params
    });
    expect(command.metadata).toEqual({
      commandName: 'GetRecentTransactions',
      path: '/v1/savingsaccounts/101/unifiedtransactions',
      method: 'GET'
    });
  });

  it('should execute GET request and return recent transactions data', async () => {
    const mockResponse = {
      totalFilteredRecords: 1,
      pageItems: [
        {
          type: 'SAVINGS_TX',
          transactionId: 456370,
          transactionType: 'INTEREST_POSTING',
          subTransactionType: 'TRANSFER_AUTHORIZATION',
          submittedOnDate: [2024, 6, 6],
          createdAt: {
            date: [2025, 6, 25],
            time: {
              hour: 14,
              minute: 11,
              second: 25,
              nano: 329650000
            }
          },
          paymentDetailData: {
            creditor: {
              name: 'testName'
            },
            debtor: {
              name: 'Testing Associated'
            }
          },
          transactionAmount: 1024.22,
          bookingDate: [2024, 6, 6],
          status: 'PROCESSED',
          transactionDate: [2024, 5, 31],
          reference: 'TXN-2024-001234',
          cardNumber: '****1234',
          cardId: 5678,
          cardToken: 'd51ca3b1-b88b-47f7-9e6f-536fdf1287c0',
          cardAuthorizationId: 287
        }
      ]
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetRecentTransactions(
      101,
      {
        offset: 0,
        limit: 50,
        orderBy: 'createdAt',
        sortOrder: 'DESC'
      }
    );

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/savingsaccounts/101/unifiedtransactions',
      {
        params: {
          offset: 0,
          limit: 50,
          orderBy: 'createdAt',
          sortOrder: 'DESC'
        }
      }
    );
    expect(result).toEqual(mockResponse);
    expect(result.pageItems[0].cardNumber).toBe('****1234');
    expect(result.pageItems[0].transactionAmount).toBe(1024.22);
    expect(config.tenantId).toBe('default-tenant');
  });

  it('should execute GET request with transaction type enums', async () => {
    const mockResponse = {
      totalFilteredRecords: 2,
      pageItems: [
        {
          type: 'SAVINGS_TX',
          transactionId: 456371,
          transactionType: 'DEPOSIT',
          submittedOnDate: [2024, 6, 7],
          createdAt: {
            date: [2024, 6, 7],
            time: { hour: 10, minute: 0, second: 0, nano: 0 }
          },
          transactionAmount: 500.00,
          status: 'PROCESSED'
        },
        {
          type: 'SAVINGS_TX',
          transactionId: 456372,
          transactionType: 'WITHDRAWAL',
          submittedOnDate: [2024, 6, 8],
          createdAt: {
            date: [2024, 6, 8],
            time: { hour: 15, minute: 30, second: 0, nano: 0 }
          },
          transactionAmount: 200.00,
          status: 'PROCESSED'
        }
      ]
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const params = {
      offset: 0,
      limit: 50,
      transactionType: [
        SavingsTransactionType.DEPOSIT,
        SavingsTransactionType.WITHDRAWAL
      ],
      subTransactionType: [
        SubTransactionType.ACH,
        SubTransactionType.CARD_TRANSACTION
      ]
    };

    const command = GetRecentTransactions(101, params);

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/savingsaccounts/101/unifiedtransactions',
      { params }
    );
    expect(result).toEqual(mockResponse);
    expect(result.totalFilteredRecords).toBe(2);
  });

  it('should execute GET request with all filter parameters', async () => {
    const mockResponse = {
      totalFilteredRecords: 0,
      pageItems: []
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const params = {
      offset: 0,
      limit: 50,
      orderBy: 'transactionAmount' as const,
      sortOrder: 'ASC' as const,
      type: ['SAVINGS_TX', 'AUTHORIZED_TX'],
      transactionType: [SavingsTransactionType.DEPOSIT],
      subTransactionType: [SubTransactionType.ACH],
      cardId: [1234, 5678],
      status: ['PROCESSED', 'PROCESSING'],
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      reference: 'TXN-2024-001234'
    };

    const command = GetRecentTransactions(101, params);

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/savingsaccounts/101/unifiedtransactions',
      { params }
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle axios errors', async () => {
    const mockError: MockAxiosError = new Error('Request failed');
    mockError.response = {
      status: 404,
      data: {
        message: 'Account not found',
        developerMessage: 'Savings account with ID 101 does not exist'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.get.mockRejectedValue(mockError);

    const command = GetRecentTransactions(101);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });

  it('should work without params', async () => {
    const mockResponse = {
      totalFilteredRecords: 1,
      pageItems: [
        {
          type: 'SAVINGS_TX',
          transactionId: 456373,
          transactionType: 'DEPOSIT',
          submittedOnDate: [2024, 6, 9],
          createdAt: {
            date: [2024, 6, 9],
            time: { hour: 12, minute: 0, second: 0, nano: 0 }
          },
          transactionAmount: 1000.00,
          status: 'PROCESSED'
        }
      ]
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetRecentTransactions(101);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/savingsaccounts/101/unifiedtransactions',
      { params: undefined }
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle card transaction data correctly', async () => {
    const mockResponse = {
      totalFilteredRecords: 1,
      pageItems: [
        {
          type: 'AUTHORIZED_TX',
          transactionId: 456374,
          transactionType: 'PAYMENT_AMOUNT',
          subTransactionType: 'CARD_TRANSACTION',
          submittedOnDate: [2024, 6, 10],
          createdAt: {
            date: [2024, 6, 10],
            time: { hour: 16, minute: 45, second: 30, nano: 123456789 }
          },
          paymentDetailData: {
            creditor: { name: 'Merchant ABC' },
            debtor: { name: 'John Doe' }
          },
          transactionAmount: 75.50,
          status: 'PROCESSED',
          cardNumber: '****9876',
          cardId: 9999,
          cardToken: 'abc123-def456-ghi789',
          cardAuthorizationId: 555
        }
      ]
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetRecentTransactions(101, {
      type: ['AUTHORIZED_TX'],
      cardId: [9999]
    });

    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(result.pageItems[0].cardNumber).toBe('****9876');
    expect(result.pageItems[0].cardId).toBe(9999);
    expect(result.pageItems[0].cardToken).toBe('abc123-def456-ghi789');
    expect(result.pageItems[0].cardAuthorizationId).toBe(555);
  });
});

describe('GetTransactionById', () => {
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

  it('should create a GetTransactionById command with correct metadata', () => {
    const command = GetTransactionById(12, 19, { associations: 'includeEnrichedData' });

    expect(command.input).toEqual({
      savingsAccountId: 12,
      transactionId: 19,
      params: { associations: 'includeEnrichedData' }
    });
    expect(command.metadata).toEqual({
      commandName: 'GetTransactionById',
      path: '/v1/savingsaccounts/12/transactions/19',
      method: 'GET'
    });
  });

  it('should execute GET request and return transaction details', async () => {
    const mockResponse = {
      id: 19,
      transactionType: {
        id: 2,
        code: 'savingsAccountTransactionType.withdrawal',
        value: 'Withdrawal',
        withdrawal: true,
        isDebit: true
      },
      accountId: 12,
      accountNo: '000000012',
      enrichedTransactionData: {
        id: '3123244',
        merchantName: 'Walmart',
        merchantWebsite: 'walmart.com'
      },
      date: [2023, 7, 4],
      dateTime: '2023-07-04 08:44:07',
      currency: {
        code: 'USD',
        name: 'US Dollar',
        decimalPlaces: 2,
        inMultiplesOf: 0,
        displaySymbol: '$',
        nameCode: 'currency.USD',
        displayLabel: 'US Dollar ($)'
      },
      paymentDetailData: {
        id: 7,
        paymentType: {
          id: 1,
          name: 'INTERNAL'
        },
        reference: 'Transfer to Rakesh Ranjan Behera'
      },
      amount: 0.1,
      runningBalance: 10002.17,
      reversed: false,
      submittedOnDate: [2023, 7, 4],
      interestedPostedAsOn: false,
      bookingDate: [2023, 7, 4],
      subTransactionType: 'NONE',
      status: 'PROCESSED',
      transferData: {
        id: 4,
        clientId: 12,
        amount: 0.1,
        currency: 'USD',
        currencyData: {
          code: 'USD',
          name: 'US Dollar',
          decimalPlaces: 2,
          displaySymbol: '$',
          nameCode: 'US Dollar'
        },
        correlationId: '0fae0009-4feb-4981-a07a-4cb8ff6f89de',
        creditor: {
          name: 'Rakesh Ranjan Behera',
          country: 'US',
          accountType: 'SAVINGS'
        },
        debtor: {
          identifier: 'id:12',
          name: 'Alexa Smart',
          country: 'US',
          accountType: 'SAVINGS'
        },
        createdAt: '2023-07-04 08:44:07',
        executedAt: '2023-07-04 08:44:08',
        externalId: '1688478247957GW',
        reference: ['internal tran'],
        status: 'EXECUTION_SUCCESS',
        transactionId: '0fae0009-4feb-4981-a07a-4cb8ff6f89de',
        type: 'CREDIT',
        valueDate: '2023-07-04',
        paymentType: 'INTERNAL',
        debtorAccountNumber: '000000012',
        debtorAccountId: 12,
        statementDescription: 'Transfer to Rakesh Ranjan Behera',
        stopFutureDebit: false
      },
      enrichedData: {
        categories: [],
        hasMatchingTransaction: false,
        isRecurring: false,
        isPotentialDuplicate: false
      },
      media: {}
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetTransactionById(12, 19, { associations: 'includeEnrichedData' });
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/savingsaccounts/12/transactions/19',
      { params: { associations: 'includeEnrichedData' } }
    );
    expect(result).toEqual(mockResponse);
    expect(result.transferData?.status).toBe('EXECUTION_SUCCESS');
    expect(result.enrichedData?.isRecurring).toBe(false);
  });

  it('should work without params', async () => {
    const mockResponse = {
      id: 19,
      transactionType: {
        id: 2,
        code: 'savingsAccountTransactionType.withdrawal',
        value: 'Withdrawal'
      },
      date: [2023, 7, 4],
      currency: {
        code: 'USD',
        name: 'US Dollar',
        decimalPlaces: 2,
        inMultiplesOf: 0,
        displaySymbol: '$',
        nameCode: 'currency.USD',
        displayLabel: 'US Dollar ($)'
      },
      amount: 0.1,
      runningBalance: 10002.17,
      reversed: false,
      submittedOnDate: [2023, 7, 4],
      interestedPostedAsOn: false
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetTransactionById(12, 19);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/savingsaccounts/12/transactions/19',
      { params: undefined }
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle axios errors', async () => {
    const mockError: MockAxiosError = new Error('Request failed');
    mockError.response = {
      status: 404,
      data: {
        message: 'Transaction not found',
        developerMessage: 'Transaction with ID 19 does not exist'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.get.mockRejectedValue(mockError);

    const command = GetTransactionById(12, 19);
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });
});

describe('GetBankDetailsFromRoutingCode', () => {
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

  it('should create a GetBankDetailsFromRoutingCode command with correct metadata', () => {
    const command = GetBankDetailsFromRoutingCode('273976369', { scheme: 'ACH' });

    expect(command.input).toEqual({
      routingNumber: '273976369',
      params: { scheme: 'ACH' }
    });
    expect(command.metadata).toEqual({
      commandName: 'GetBankDetailsFromRoutingCode',
      path: '/v1/bankdetails/routing/273976369',
      method: 'GET'
    });
  });

  it('should execute GET request and return bank details', async () => {
    const mockResponse = {
      bankName: 'VERIDIAN CREDIT UNION',
      achLocation: {
        address: '1827 ANSBOROUGH',
        city: 'WATERLOO',
        state: 'IA',
        postalCode: '50702',
        postalExtension: 0
      },
      scheme: 'ACH'
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetBankDetailsFromRoutingCode('273976369', { scheme: 'ACH' });
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/bankdetails/routing/273976369',
      { params: { scheme: 'ACH' } }
    );
    expect(result).toEqual(mockResponse);
    expect(result.bankName).toBe('VERIDIAN CREDIT UNION');
    expect(result.achLocation.city).toBe('WATERLOO');
    expect(result.scheme).toBe('ACH');
  });

  it('should work with WIRE scheme', async () => {
    const mockResponse = {
      bankName: 'VERIDIAN CREDIT UNION',
      achLocation: {
        address: '1827 ANSBOROUGH',
        city: 'WATERLOO',
        state: 'IA',
        postalCode: '50702',
        postalExtension: 0
      },
      scheme: 'WIRE'
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetBankDetailsFromRoutingCode('273976369', { scheme: 'WIRE' });
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/bankdetails/routing/273976369',
      { params: { scheme: 'WIRE' } }
    );
    expect(result.scheme).toBe('WIRE');
  });

  it('should work without params', async () => {
    const mockResponse = {
      bankName: 'VERIDIAN CREDIT UNION',
      achLocation: {
        address: '1827 ANSBOROUGH',
        city: 'WATERLOO',
        state: 'IA',
        postalCode: '50702',
        postalExtension: 0
      },
      scheme: 'ACH'
    };

    mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

    const command = GetBankDetailsFromRoutingCode('273976369');
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    const result = await command.execute(config);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(
      '/v1/bankdetails/routing/273976369',
      { params: undefined }
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle axios errors', async () => {
    const mockError: MockAxiosError = new Error('Request failed');
    mockError.response = {
      status: 404,
      data: {
        message: 'Routing number not found',
        developerMessage: 'Routing number 273976369 does not exist'
      }
    };
    mockError.isAxiosError = true;

    mockAxiosInstance.get.mockRejectedValue(mockError);

    const command = GetBankDetailsFromRoutingCode('273976369');
    const config = {
      baseUrl: 'https://api.example.com',
      tenantId: 'default-tenant'
    };

    await expect(command.execute(config)).rejects.toThrow();
  });
});
