import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  MarkAsSuccess,
  MarkAsProcessing,
  MarkAsReturned,
  LogFailTransfer, MarkAsFail, UpdateTraceNumber, GetTransfers, CreateTransfer, GetTransfer
} from '../../../src/commands/rest/transfer';
import { isCommandError } from '../../../src/utils/errorHandler';
import newDate from '../../../src/utils/newDate';
import * as baseRequestModule from '../../../src/utils/baseRequest';
import axios from 'axios';
import { PaymentRail } from '../../../src/types/transfer';

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

describe('GetTransfers', () => {
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

  const mockConfig = {
    secret: 'your_secret',
    signee: 'your_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://your.api.url'
  };

  it('should get ach transfer with status EXECUTION_SCHEDULED', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 1,
        pageItems: [{
          amlNotifyProceeded: false,
          amount: 97,
          beneficiaryRefId: 0,
          client: {
            accountNo: '000000002',
            activeDepositAccount: 0,
            displayName: 'chomreun chhoeung',
            id: 2,
            identifiers: [
              {
                clientId: 2,
                documentKey: '213123',
                documentType: {
                  id: 2,
                  isMasked: false,
                  name: 'Id'
                },
                expiryDate: [
                  2025,
                  1,
                  1
                ],
                id: 1818,
                issuedBy: '',
                status: 'clientIdentifierStatusType.active'
              }
            ],
            legalForm: {
              code: 'legalFormType.person',
              value: '1'
            },
            mobileCountryCode: '+1',
            ofLoanActive: 0,
            ofLoanCycle: 0,
            verificationStatus: {
              id: 2,
              value: 'PENDING'
            }
          },
          clientId: 2,
          correlationId: '6491b76b-e5b6-483a-8d14-867a71eedadd',
          correspondent: {
            address: [
              'Line1',
              'Line2'
            ]
          },
          createdAt: '2024-12-11 05:40:07',
          createdBySystem: false,
          creditor: {
            accountEntity: 'PERSONAL',
            accountType: 'SAVINGS',
            address: [
              'Line1',
              'Line2'
            ],
            agent: {},
            country: 'US',
            identifier: 'ACH://321070007/009876383',
            name: 'Yiv Yath'
          },
          creditorAccountId: 0,
          creditorAccountNumber: '009876383',
          creditorSavingsAccountTransactionId: 0,
          debtor: {
            accountType: 'SAVINGS',
            address: [
              'Line1',
              'Line2',
              'Los Angeles AS 15417 US'
            ],
            agent: {
              country: 'US'
            },
            country: 'US',
            identifier: 'ID:2',
            name: 'chomreun chhoeung'
          },
          debtorAccountId: 2,
          debtorAccountNumber: '000000002',
          debtorSavingsAccountTransactionId: 409938,
          executedAt: '2024-12-11 05:40:07',
          externalId: '173389200711388',
          id: 7256,
          inOrOut: 'OUT',
          isManualAllocation: false,
          paymentType: 'ACH',
          reference: [
            'payment 10'
          ],
          statementDescription: 'ACH out Yiv Yath 6383 payment 10',
          status: 'EXECUTION_SCHEDULED',
          transactionId: '6491b76b-e5b6-483a-8d14-867a71eedadd',
          type: 'CREDIT',
          valueDate: '2024-12-11'
        }]
      }
    };

    mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

    const command = GetTransfers({
      transferStatus: 'EXECUTION_SCHEDULED',
      executedAt: newDate().toISOString(true).slice(0, 10),
      queryLimit: 200,
      paymentType: 'ACH'
    });

    const result = await command.execute(mockConfig);

    expect(result?.[0]).toEqual({
      amlNotifyProceeded: false,
      amount: 97,
      beneficiaryRefId: 0,
      client: {
        accountNo: '000000002',
        activeDepositAccount: 0,
        displayName: 'chomreun chhoeung',
        id: 2,
        identifiers: [
          {
            clientId: 2,
            documentKey: '213123',
            documentType: {
              id: 2,
              isMasked: false,
              name: 'Id'
            },
            expiryDate: [
              2025,
              1,
              1
            ],
            id: 1818,
            issuedBy: '',
            status: 'clientIdentifierStatusType.active'
          }
        ],
        legalForm: {
          code: 'legalFormType.person',
          value: '1'
        },
        mobileCountryCode: '+1',
        ofLoanActive: 0,
        ofLoanCycle: 0,
        verificationStatus: {
          id: 2,
          value: 'PENDING'
        }
      },
      clientId: 2,
      correlationId: '6491b76b-e5b6-483a-8d14-867a71eedadd',
      correspondent: {
        address: [
          'Line1',
          'Line2'
        ]
      },
      createdAt: '2024-12-11 05:40:07',
      createdBySystem: false,
      creditor: {
        accountEntity: 'PERSONAL',
        accountType: 'SAVINGS',
        address: [
          'Line1',
          'Line2'
        ],
        agent: {},
        country: 'US',
        identifier: 'ACH://321070007/009876383',
        name: 'Yiv Yath'
      },
      creditorAccountId: 0,
      creditorAccountNumber: '009876383',
      creditorSavingsAccountTransactionId: 0,
      debtor: {
        accountType: 'SAVINGS',
        address: [
          'Line1',
          'Line2',
          'Los Angeles AS 15417 US'
        ],
        agent: {
          country: 'US'
        },
        country: 'US',
        identifier: 'ID:2',
        name: 'chomreun chhoeung'
      },
      debtorAccountId: 2,
      debtorAccountNumber: '000000002',
      debtorSavingsAccountTransactionId: 409938,
      executedAt: '2024-12-11 05:40:07',
      externalId: '173389200711388',
      id: 7256,
      inOrOut: 'OUT',
      isManualAllocation: false,
      paymentType: 'ACH',
      reference: [
        'payment 10'
      ],
      statementDescription: 'ACH out Yiv Yath 6383 payment 10',
      status: 'EXECUTION_SCHEDULED',
      transactionId: '6491b76b-e5b6-483a-8d14-867a71eedadd',
      type: 'CREDIT',
      valueDate: '2024-12-11'
    });
  });

  it('should throw CommandError on API error', async () => {
    const axiosError = new Error('Request failed with status code 400') as MockAxiosError;
    axiosError.response = {
      status: 400,
      data: {
        developerMessage: 'The request was invalid. This typically will happen due to validation errors which are provided.'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.get.mockRejectedValueOnce(axiosError);

    const command = GetTransfers({
      transferStatus: 'EXECUTION_FAILURE',
      executedAt: 'ABC',
      queryLimit: 200,
      paymentType: 'ACH'
    });

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('Request failed with status code 400');
        expect((error.originalError as MockAxiosError)?.response?.data?.developerMessage).toBe('The request was invalid. This typically will happen due to validation errors which are provided.');
      }
    }
  });

  it('should use custom tenantId when provided', async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: {
        pageItems: [{
          type: 'CREDIT',
          paymentType: 'ACH',
          currency: 'USD',
          amount: 100.50,
          externalId: 'ext-123',
          reference: ['ref-123']
        }],
        totalFilteredRecords: 1
      }
    });

    const params = {
      executedAt: '2023-01-01',
      paymentType: 'ACH' as PaymentRail,
      transferStatus: 'COMPLETED',
      tenantId: 'custom-tenant'
    };

    const command = GetTransfers(params);
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });

  it('should use default values when optional parameters are undefined', async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: {
        pageItems: [{
          type: 'CREDIT',
          paymentType: 'ACH',
          currency: 'USD',
          amount: 100.50,
          externalId: 'ext-default-123',
          reference: ['ref-default-123']
        }],
        totalFilteredRecords: 1
      }
    });

    const params = {
      executedAt: '2025-08-14',
      paymentType: 'ACH' as PaymentRail,
      tenantId: 'test-tenant'
    };

    const command = GetTransfers(params);
    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/transfers', {
      params: expect.objectContaining({
        paymentType: 'ACH',
        status: 'EXECUTION_SCHEDULED',
        toExecuteDate: expect.any(String),
        locale: 'en',
        dateFormat: 'yyyy-MM-dd',
        associateClientData: true,
        limit: 200,
        offset: 0
      })
    });

    expect(result).toEqual([{
      type: 'CREDIT',
      paymentType: 'ACH',
      currency: 'USD',
      amount: 100.50,
      externalId: 'ext-default-123',
      reference: ['ref-default-123']
    }]);
  });
});

describe('MarkAsSuccess', () => {
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

  const mockConfig = {
    secret: 'your_secret',
    signee: 'your_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://your.api.url'
  };

  it('should able to mark as success', { timeout: 2900000 }, async () => {
    const mockResponse = {
      data: {
        id: '1714',
        clientId: 12,
        resourceId: 1714,
        resourceIdentifier: '1675760578633zE'
      }
    };

    mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

    const command = MarkAsSuccess({
      externalId: '1675760578633zE',
      paymentType: 'ACH'
    });

    const result = await command.execute(mockConfig);
    expect(result).toEqual({
      id: '1714',
      clientId: 12,
      resourceId: 1714,
      resourceIdentifier: '1675760578633zE'
    });
  });

  it('should throw CommandError on API error', { timeout: 29000 }, async () => {
    const axiosError = {
      response: {
        status: 403,
        data: {
          message: 'Request failed with status code 403',
          developerMessage: 'Request was understood but caused a domain rule violation.'
        }
      },
      message: 'Request failed with status code 403'
    };

    mockAxiosInstance.post.mockRejectedValueOnce(axiosError);

    const command = MarkAsSuccess({
      externalId: '1675760578633zE',
      paymentType: 'ACH'
    });

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe('Request failed with status code 403');
        expect((error.originalError as MockAxiosError)?.response?.data?.developerMessage).toBe('Request was understood but caused a domain rule violation.');
      }
    }
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = { data: { id: 123, status: 'SUCCESS' } };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const params = {
      externalId: 'ext-123',
      paymentType: 'ACH' as PaymentRail,
      tenantId: 'custom-tenant'
    };

    const command = MarkAsSuccess(params);
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });

  it('should use default paymentType when not provided', async () => {
    const mockResponse = {
      data: {
        id: '1715',
        clientId: 13,
        resourceId: 1715,
        resourceIdentifier: 'default-payment-test'
      }
    };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const params = {
      externalId: 'ext-default-payment-123'
    };

    const command = MarkAsSuccess(params);
    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
      '/v1/external-transfers?command=MARK_AS_SUCCESS',
      expect.objectContaining({
        externalId: 'ext-default-payment-123',
        paymentType: 'ACH'
      })
    );

    expect(result).toEqual({
      id: '1715',
      clientId: 13,
      resourceId: 1715,
      resourceIdentifier: 'default-payment-test'
    });
  });
});

describe('MarkAsProcessing', () => {
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

  const mockConfig = {
    secret: 'your_secret',
    signee: 'your_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://your.api.url'
  };

  it('should able to mark as processing', { timeout: 2900000 }, async () => {
    const mockResponse = {
      data: {
        id: '7252',
        clientId: 2,
        resourceId: 7252,
        resourceIdentifier: '1732882362138Dc'
      }
    };

    mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

    const command = MarkAsProcessing({
      externalId: '1732882362138Dc',
      fileUrl: 's3://ach-payment/123456',
      paymentType: 'ACH',
      traceNumbers: {
        outgoingTransfer: '84106760000024'
      }
    });

    const result = await command.execute(mockConfig);
    expect(result).toEqual({
      id: '7252',
      clientId: 2,
      resourceId: 7252,
      resourceIdentifier: '1732882362138Dc'
    });
  });

  it('should throw CommandError on API error', { timeout: 29000 }, async () => {
    const axiosError = {
      response: {
        status: 400,
        data: {
          message: 'Request failed with status code 400',
          developerMessage: 'The request was invalid. This typically will happen due to validation errors which are provided.'
        }
      },
      message: 'Request failed with status code 400'
    };

    mockAxiosInstance.post.mockRejectedValueOnce(axiosError);

    const command = MarkAsProcessing({
      externalId: '1732882362138Dc',
      fileUrl: 's3://ach-payment/123456',
      paymentType: 'ACH',
      traceNumbers: {
        outgoingTransfer: '84106760000024'
      }
    });

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('Request failed with status code 400');
        expect((error.originalError as MockAxiosError)?.response?.data?.developerMessage).toBe('The request was invalid. This typically will happen due to validation errors which are provided.');
      }
    }
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = { data: { id: 123, status: 'PROCESSING' } };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const params = {
      externalId: '1732882362138Dc',
      fileUrl: 's3://ach-payment/123456',
      paymentType: 'ACH' as const,
      traceNumbers: {
        outgoingTransfer: '84106760000024'
      },
      tenantId: 'custom-tenant'
    };

    const command = MarkAsProcessing(params);
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });
});

describe('MarkAsReturned', () => {
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

  const mockConfig = {
    secret: 'your_secret',
    signee: 'your_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://your.api.url'
  };

  it('should able to mark as returned', { timeout: 2900000 }, async () => {
    const mockResponse = {
      data: {
        id: '7254',
        clientId: 2,
        resourceId: 7254,
        resourceIdentifier: '1733283259824WR'
      }
    };

    mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

    const command = MarkAsReturned({
      paymentType: 'ACH',
      externalId: '1733283259824WR',
      returnFileUrl: 's3://ach-494813966229/outgoingReturn/ReturnGen_v1_20230623171602.achreturns',
      errorCode: 'R01',
      errorMessage: 'Insufficient Funds',
      returnDate: '2024-12-12',
      traceNumbers: {
        incomingReturnFile: '84106760000026',
        outgoingReturnFile: '84106760000027'
      },
      rawReturnDetails: {}
    });

    const result = await command.execute(mockConfig);
    expect(result).toEqual({
      id: '7254',
      clientId: 2,
      resourceId: 7254,
      resourceIdentifier: '1733283259824WR'
    });
  });

  it('should throw CommandError on API error', { timeout: 29000 }, async () => {
    const axiosError = {
      response: {
        status: 403,
        data: {
          message: 'Request failed with status code 403',
          developerMessage: 'Request was understood but caused a domain rule violation.'
        }
      },
      message: 'Request failed with status code 403'
    };

    mockAxiosInstance.post.mockRejectedValueOnce(axiosError);

    const command = MarkAsReturned({
      paymentType: 'ACH',
      externalId: '1733283259824WR',
      returnFileUrl: 's3://ach-494813966229/outgoingReturn/ReturnGen_v1_20230623171602.achreturns',
      errorCode: 'R01',
      errorMessage: 'Insufficient Funds',
      returnDate: '2024-12-12',
      traceNumbers: {
        incomingReturnFile: '84106760000026',
        outgoingReturnFile: '84106760000027'
      },
      rawReturnDetails: {}
    });

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe('Request failed with status code 403');
        expect((error.originalError as MockAxiosError)?.response?.data?.developerMessage).toBe('Request was understood but caused a domain rule violation.');
      }
    }
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = { data: { id: 123, status: 'RETURNED' } };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const params = {
      paymentType: 'ACH' as const,
      externalId: 'ext-123',
      returnFileUrl: 's3://return-files/return-123.csv',
      errorCode: 'R01',
      errorMessage: 'Insufficient Funds',
      tenantId: 'custom-tenant'
    };

    const command = MarkAsReturned(params);
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });
});

describe('LogFailTransfer', () => {
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

  const mockConfig = {
    secret: 'your_secret',
    signee: 'your_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://your.api.url'
  };

  it('should log fail transfer', async () => {
    const mockResponse = {
      data: {
        id: 1234,
        resourceId: 1234,
        resourceIdentifier: 'test-resource'
      }
    };

    mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

    const command = LogFailTransfer({
      payload: {
        type: 'DEBIT',
        paymentType: 'ACH',
        currency: 'USD',
        amount: 100,
        externalId: '6491b76b-e5b6-483a-8d14-867a71eedadd',
        reference: ['test reference'],
        fileUrl: 's3://ach-local/fail-inbound-transfer-to-non-existing-account-000000099_1610507709557.ach',
        errorCode: 'R04',
        errorMessage: 'At least one party of the transfer must reference an internal account'
      }
    });

    const result = await command.execute(mockConfig);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('resourceId');
    expect(result).toHaveProperty('resourceIdentifier');
  });

  it('should throw CommandError on API error', { timeout: 29000 }, async () => {
    const axiosError = new Error('Request failed with status code 403') as MockAxiosError;
    axiosError.response = {
      status: 403,
      data: {
        message: 'Request failed with status code 403',
        developerMessage: 'Request was understood but caused a domain rule violation.'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.post.mockRejectedValueOnce(axiosError);

    const command = LogFailTransfer({
      payload: {
        type: 'DEBIT',
        paymentType: 'ACH',
        currency: 'USD',
        amount: 100,
        externalId: '6491b76b-e5b6-483a-8d14-867a71eedadd',
        reference: ['test reference'],
        fileUrl: 's3://ach-local/fail-inbound-transfer-to-non-existing-account-000000099_1610507709557.ach',
        errorCode: 'R04',
        errorMessage: 'At least one party of the transfer must reference an internal account'
      }
    });

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.message).toBe('LogFailTransfer command failed');
        expect((error.originalError as MockAxiosError)?.response?.data?.developerMessage).toBe('Request was understood but caused a domain rule violation.');
      }
    }
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = { data: { id: 123, status: 'FAILED' } };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const params = {
      payload: {
        type: 'CREDIT',
        paymentType: 'ACH' as const,
        currency: 'USD',
        amount: 100.50,
        externalId: 'ext-123',
        reference: ['ref-123'],
        errorCode: 'E001',
        errorMessage: 'Processing failed'
      },
      tenantId: 'custom-tenant'
    };

    const command = LogFailTransfer(params);
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });

  it('should rethrow non-axios errors unchanged', async () => {
    const nonAxiosError = new Error('Database connection failed');
    
    vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);
    mockAxiosInstance.post.mockRejectedValueOnce(nonAxiosError);

    const command = LogFailTransfer({
      payload: {
        type: 'DEBIT',
        paymentType: 'ACH',
        currency: 'USD',
        amount: 100,
        externalId: '6491b76b-e5b6-483a-8d14-867a71eedadd',
        reference: ['test reference'],
        fileUrl: 's3://ach-local/fail-inbound-transfer-to-non-existing-account-000000099_1610507709557.ach',
        errorCode: 'R04',
        errorMessage: 'At least one party of the transfer must reference an internal account'
      }
    });

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBe(nonAxiosError);
      expect(error.message).toBe('Database connection failed');
    }
  });
});

describe('MarkAsFail', () => {
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

  const mockConfig = {
    secret: 'your_secret',
    signee: 'your_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://your.api.url'
  };

  it('should able to mark as fail', { timeout: 2900000 }, async () => {
    const mockResponse = {
      data: {
        id: '7252',
        clientId: 2,
        resourceId: 7252,
        resourceIdentifier: '1732882362138Dc'
      }
    };

    mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

    const command = MarkAsFail({
      externalId: '1732882362138Dc',
      errorMessage: 'Testing',
      paymentType: 'ACH'
    });

    const result = await command.execute(mockConfig);
    expect(result).toEqual({
      id: '7252',
      clientId: 2,
      resourceId: 7252,
      resourceIdentifier: '1732882362138Dc'
    });
  });

  it('should throw CommandError on API error', { timeout: 29000 }, async () => {
    const axiosError = new Error('Request failed with status code 403') as MockAxiosError;
    axiosError.response = {
      status: 403,
      data: {
        message: 'Request failed with status code 403',
        developerMessage: 'Request was understood but caused a domain rule violation.'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.post.mockRejectedValueOnce(axiosError);

    const command = MarkAsFail({
      externalId: '1732882362138Dc',
      errorMessage: 'Testing',
      paymentType: 'ACH'
    });

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe('Request failed with status code 403');
        expect((error.originalError as MockAxiosError)?.response?.data?.developerMessage).toBe('Request was understood but caused a domain rule violation.');
      }
    }
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = { data: { id: 123, status: 'FAILED' } };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const params = {
      externalId: 'ext-123',
      errorMessage: 'Payment processing failed',
      paymentType: 'ACH' as const,
      tenantId: 'custom-tenant'
    };

    const command = MarkAsFail(params);
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });
});

describe('UpdateTraceNumber', () => {
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

  const mockConfig = {
    secret: 'your_secret',
    signee: 'your_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://your.api.url'
  };

  it('should able to update trace number', { timeout: 2900000 }, async () => {
    const mockResponse = {
      data: {
        id: '7252',
        resourceId: 7252,
        resourceIdentifier: '1732882362138Dc',
        data: {
          traceNumbers: {
            traceMapping: '1234567890'
          }
        }
      }
    };

    mockAxiosInstance.put.mockResolvedValueOnce(mockResponse);

    const command = UpdateTraceNumber({
      externalId: '1732882362138Dc',
      traceNumbers: {
        traceMapping: '1234567890'
      }
    });

    const result = await command.execute(mockConfig);
    expect(result).toEqual({
      id: '7252',
      resourceId: 7252,
      resourceIdentifier: '1732882362138Dc',
      data: {
        traceNumbers: {
          traceMapping: '1234567890'
        }
      }
    });
  });

  it('should throw CommandError on API error', { timeout: 29000 }, async () => {
    const axiosError = new Error('Request failed with status code 404') as MockAxiosError;
    axiosError.response = {
      status: 404,
      data: {
        message: 'Request failed with status code 404',
        developerMessage: 'The requested resource is not available.'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.put.mockRejectedValueOnce(axiosError);

    const command = UpdateTraceNumber({
      externalId: '1732882362138Dc2321',
      traceNumbers: {
        traceMapping: '1234567890'
      }
    });

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe('Request failed with status code 404');
        expect((error.originalError as MockAxiosError)?.response?.data?.developerMessage).toBe('The requested resource is not available.');
      }
    }
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = { data: { id: 123, status: 'UPDATED' } };
    mockAxiosInstance.put.mockResolvedValue(mockResponse);

    const params = {
      externalId: 'ext-123',
      traceNumbers: {
        traceMapping: 'mapping-123',
        CoreFileKey: 'file-key-123',
        CoreBatch: 1001,
        CoreSeq: 42
      },
      tenantId: 'custom-tenant'
    };

    const command = UpdateTraceNumber(params);
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });
});

describe('CreateTransfer', () => {
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

  const mockConfig = {
    secret: 'your_secret',
    signee: 'your_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://your.api.url'
  };

  it('should create transfer successfully', async () => {
    const mockResponse = {
      data: {
        id: '123',
        clientId: 456,
        resourceId: 789,
        resourceIdentifier: 'transfer-123',
        data: { amount: 100.50 }
      }
    };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const transferData = {
      type: 'CREDIT' as const,
      fileUrl: 'https://example.com/file.csv',
      paymentType: 'ACH' as const,
      currency: 'USD' as const,
      amount: 100.50,
      debtor: {
        identifier: '123456789',
        name: 'John Doe',
        accountType: 'CHECKING' as const
      },
      creditor: {
        identifier: '987654321',
        name: 'Jane Smith',
        accountType: 'SAVINGS' as const,
        agent: {
          name: 'Test Bank',
          identifier: '021000021'
        }
      },
      reference: ['payment-ref-123']
    };

    const params = {
      transfer: transferData,
      tenantId: 'test-tenant'
    };

    const command = CreateTransfer(params);
    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/transfers', transferData);
    expect(result).toEqual({
      id: '123',
      clientId: 456,
      resourceId: 789,
      resourceIdentifier: 'transfer-123',
      data: { amount: 100.50 }
    });
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = { data: { id: '123' } };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const params = {
      transfer: {
        type: 'CREDIT' as const,
        fileUrl: 'https://example.com/file.csv',
        paymentType: 'ACH' as const,
        currency: 'USD' as const,
        amount: 100,
        debtor: {
          identifier: '123',
          name: 'John Doe',
          accountType: 'CHECKING' as const
        },
        creditor: {
          identifier: '456',
          name: 'Jane Smith',
          accountType: 'SAVINGS' as const,
          agent: {
            name: 'Test Bank',
            identifier: '021000021'
          }
        },
        reference: ['payment-ref-123']
      },
      tenantId: 'custom-tenant'
    };

    const command = CreateTransfer(params);
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });

  it('should handle errors properly', async () => {
    const mockError = new Error('Transfer creation failed');
    mockAxiosInstance.post.mockRejectedValue(mockError);

    const params = {
      transfer: {
        type: 'CREDIT' as const,
        fileUrl: 'https://example.com/file.csv',
        paymentType: 'ACH' as const,
        currency: 'USD' as const,
        amount: 100,
        debtor: {
          identifier: '123',
          name: 'John Doe',
          accountType: 'CHECKING' as const
        },
        creditor: {
          identifier: '456',
          name: 'Jane Smith',
          accountType: 'SAVINGS' as const,
          agent: {
            name: 'Test Bank',
            identifier: '021000021'
          }
        },
        reference: ['payment-ref-123']
      },
      tenantId: 'test-tenant'
    };

    const command = CreateTransfer(params);

    await expect(command.execute(mockConfig)).rejects.toThrow('Transfer creation failed');
  });

  it('should have correct metadata', () => {
    const params = {
      transfer: {
        type: 'CREDIT' as const,
        fileUrl: 'https://example.com/file.csv',
        paymentType: 'ACH' as const,
        currency: 'USD' as const,
        amount: 100,
        debtor: {
          identifier: '123',
          name: 'John Doe',
          accountType: 'CHECKING' as const
        },
        creditor: {
          identifier: '456',
          name: 'Jane Smith',
          accountType: 'SAVINGS' as const,
          agent: {
            name: 'Test Bank',
            identifier: '021000021'
          }
        },
        reference: ['payment-ref-123']
      },
      tenantId: 'test-tenant'
    };

    const command = CreateTransfer(params);

    expect(command.metadata.commandName).toBe('CreateTransfer');
    expect(command.metadata.path).toBe('/v1/transfers');
    expect(command.metadata.method).toBe('POST');
  });

  it('should not modify config tenantId when params.tenantId is not provided', async () => {
    const mockResponse = {
      data: {
        id: '456',
        clientId: 789,
        resourceId: 456,
        resourceIdentifier: 'transfer-no-tenant',
        data: { amount: 200.75 }
      }
    };
    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const transferData = {
      type: 'CREDIT' as const,
      fileUrl: 'https://example.com/file.csv',
      paymentType: 'ACH' as const,
      currency: 'USD' as const,
      amount: 200.75,
      debtor: {
        identifier: '123456789',
        name: 'John Doe',
        accountType: 'CHECKING' as const
      },
      creditor: {
        identifier: '987654321',
        name: 'Jane Smith',
        accountType: 'SAVINGS' as const,
        agent: {
          name: 'Test Bank',
          identifier: '021000021'
        }
      },
      reference: ['payment-ref-456']
    };

    const params = {
      transfer: transferData,
      tenantId: ''
    };

    const command = CreateTransfer(params);
    const originalTenantId = mockConfig.tenantId;
    await command.execute(mockConfig);

    expect(mockConfig.tenantId).toBe(originalTenantId);
    expect(baseRequestModule.default).toHaveBeenCalledWith(mockConfig);
  });
});

describe('GetTransfer', () => {
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

  const mockConfig = {
    secret: 'your_secret',
    signee: 'your_signee',
    tenantId: 'your_tenant_id',
    baseUrl: 'https://your.api.url'
  };

  it('should get transfer by ID successfully', async () => {
    const mockResponse = {
      data: {
        id: 123,
        status: 'COMPLETED',
        amount: 100.50,
        currency: 'USD',
        createdAt: '2023-01-01T12:00:00Z'
      }
    };
    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const params = {
      id: 123,
      tenantId: 'test-tenant'
    };

    const command = GetTransfer(params);
    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/transfers/123');
    expect(result).toEqual({
      id: 123,
      status: 'COMPLETED',
      amount: 100.50,
      currency: 'USD',
      createdAt: '2023-01-01T12:00:00Z'
    });
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = { data: { id: 123 } };
    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const params = {
      id: 123,
      tenantId: 'custom-tenant'
    };

    const command = GetTransfer(params);
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });

  it('should handle errors properly', async () => {
    const mockError = new Error('Transfer not found');
    mockAxiosInstance.get.mockRejectedValue(mockError);

    const params = {
      id: 999,
      tenantId: 'test-tenant'
    };

    const command = GetTransfer(params);

    await expect(command.execute(mockConfig)).rejects.toThrow('Transfer not found');
  });

  it('should have correct metadata', () => {
    const params = {
      id: 123,
      tenantId: 'test-tenant'
    };

    const command = GetTransfer(params);

    expect(command.metadata.commandName).toBe('GetTransfer');
    expect(command.metadata.path).toBe('/v1/transfers/123');
    expect(command.metadata.method).toBe('GET');
  });

  it('should not modify config tenantId when params.tenantId is falsy', async () => {
    const mockResponse = {
      data: {
        id: 456,
        status: 'COMPLETED',
        amount: 75.25,
        currency: 'USD',
        createdAt: '2023-01-01T12:00:00Z'
      }
    };
    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const params = {
      id: 456,
      tenantId: ''
    };

    const command = GetTransfer(params);
    const originalTenantId = mockConfig.tenantId;
    const result = await command.execute(mockConfig);

    expect(mockConfig.tenantId).toBe(originalTenantId);
    expect(baseRequestModule.default).toHaveBeenCalledWith(mockConfig);
    expect(result).toEqual({
      id: 456,
      status: 'COMPLETED',
      amount: 75.25,
      currency: 'USD',
      createdAt: '2023-01-01T12:00:00Z'
    });
  });
});

