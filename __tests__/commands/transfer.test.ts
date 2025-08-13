import { describe, it, expect } from 'vitest';
import {
  MarkAsSuccess,
  MarkAsProcessing,
  MarkAsReturned,
  LogFailTransfer, MarkAsFail, UpdateTraceNumber
} from '../../src';
import { GetAchTransfers, isCommandError } from '../../src';
import newDate from '../../src/utils/newDate';

describe('GetAchTransfers', () => {
  const mockConfig = {
    secret: process.env.SECRET!,
    signee: process.env.SIGNEE!,
    tenantId: process.env.TENANT_ID!,
    baseUrl: process.env.BASE_URL!
  };

  it('should get ach transfer with status EXECUTION_SCHEDULED', { timeout: 2900000 }, async () => {
    const command = GetAchTransfers({
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

  it('should throw CommandError on API error', { timeout: 29000 }, async () => {
    const command = GetAchTransfers({
      transferStatus: 'EXECUTION_FAILURE',
      executedAt: 'ABC',
      queryLimit: 200,
      paymentType: 'ACH'
    });

    try {
      await command.execute(mockConfig);
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('Request failed with status code 400');
        expect(error.originalError?.response.data.developerMessage).toBe('The request was invalid. This typically will happen due to validation errors which are provided.');
      }
    }
  });
});

describe('MarkAsSuccess', () => {
  const mockConfig = {
    secret: process.env.SECRET!,
    signee: process.env.SIGNEE!,
    tenantId: process.env.TENANT_ID!,
    baseUrl: process.env.BASE_URL!
  };

  it('should able to mark as success', { timeout: 2900000 }, async () => {
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

    const command = MarkAsSuccess({
      externalId: '1675760578633zE',
      paymentType: 'ACH'
    });

    try {
      await command.execute(mockConfig);
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe('Request failed with status code 403');
        expect(error.originalError?.response.data.developerMessage).toBe('Request was understood but caused a domain rule violation.');
      }
    }
  });
});

describe('MarkAsProcessing', () => {
  const mockConfig = {
    secret: process.env.SECRET!,
    signee: process.env.SIGNEE!,
    tenantId: process.env.TENANT_ID!,
    baseUrl: process.env.BASE_URL!
  };

  it('should able to mark as processing', { timeout: 2900000 }, async () => {
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
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('Request failed with status code 400');
        expect(error.originalError?.response.data.developerMessage).toBe('The request was invalid. This typically will happen due to validation errors which are provided.');
      }
    }
  });
});

describe('MarkAsReturned', () => {
  const mockConfig = {
    secret: process.env.SECRET!,
    signee: process.env.SIGNEE!,
    tenantId: process.env.TENANT_ID!,
    baseUrl: process.env.BASE_URL!
  };

  it('should able to mark as returned', { timeout: 2900000 }, async () => {
    const command = MarkAsReturned({
      paymentType: 'ACH',
      externalId: '1733283259824WR',
      returnFileUrl: 's3://ach-494813966229/outgoingReturn/ReturnGen_v1_20230623171602.achreturns',
      errorCode: 'R01',
      errorMessage: 'Insufficient Funds',
      returnDate: new Date('2024-12-12'),
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

    const command = MarkAsReturned({
      paymentType: 'ACH',
      externalId: '1733283259824WR',
      returnFileUrl: 's3://ach-494813966229/outgoingReturn/ReturnGen_v1_20230623171602.achreturns',
      errorCode: 'R01',
      errorMessage: 'Insufficient Funds',
      returnDate: new Date('2024-12-12'),
      traceNumbers: {
        incomingReturnFile: '84106760000026',
        outgoingReturnFile: '84106760000027'
      },
      rawReturnDetails: {}
    });

    try {
      await command.execute(mockConfig);
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe('Request failed with status code 403');
        expect(error.originalError?.response.data.developerMessage).toBe('Request was understood but caused a domain rule violation.');
      }
    }
  });
});

describe('LogFailTransfer', () => {
  const mockConfig = {
    secret: process.env.SECRET!,
    signee: process.env.SIGNEE!,
    tenantId: process.env.TENANT_ID!,
    baseUrl: process.env.BASE_URL!
  };

  it('should able to log failure', { timeout: 2900000 }, async () => {
    const command = LogFailTransfer({
      payload: {
        amount: 15,
        creditor: {
          identifier: 'ACCOUNT:000000099',
          name: 'Alexa Smart'
        },
        debtor: {
          identifier: 'ACH://121042884'
        },
        type: 'CREDIT',
        paymentType: 'ACH',
        fileUrl: 's3://ach-local/fail-inbound-transfer-to-non-existing-account-000000099_1610507709557.ach',
        returnFileUrl: 's3://ach-local/fail-inbound-transfer-to-non-existing-account-000000099_1610507709557_returned.ach',
        returnDate: '2021-01-13',
        errorCode: 'R04',
        errorMessage: 'At least one party of the transfer must reference an internal account',
        traceNumbers: {
          incomingTransfer: '12341234222'
        }
      }
    });

    const result = await command.execute(mockConfig);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('resourceId');
    expect(result).toHaveProperty('resourceIdentifier');
  });

  it('should throw CommandError on API error', { timeout: 29000 }, async () => {

    const command = LogFailTransfer({
      payload: {
        amount: 15,
        type: 'CREDIT',
        paymentType: 'ACH',
        fileUrl: 's3://ach-local/fail-inbound-transfer-to-non-existing-account-000000099_1610507709557.ach',
        returnFileUrl: 's3://ach-local/fail-inbound-transfer-to-non-existing-account-000000099_1610507709557_returned.ach',
        returnDate: '2021-01-13',
        errorCode: 'R04',
        errorMessage: 'At least one party of the transfer must reference an internal account',
        traceNumbers: {
          incomingTransfer: '12341234222'
        }
      }
    });

    try {
      await command.execute(mockConfig);
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe('Request failed with status code 403');
        expect(error.originalError?.response.data.developerMessage).toBe('Request was understood but caused a domain rule violation.');
      }
    }
  });
});

describe('MarkAsFail', () => {
  const mockConfig = {
    secret: process.env.SECRET!,
    signee: process.env.SIGNEE!,
    tenantId: process.env.TENANT_ID!,
    baseUrl: process.env.BASE_URL!
  };

  it('should able to mark as fail', { timeout: 2900000 }, async () => {
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

    const command = MarkAsFail({
      externalId: '1732882362138Dc',
      errorMessage: 'Testing',
      paymentType: 'ACH'
    });

    try {
      await command.execute(mockConfig);
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe('Request failed with status code 403');
        expect(error.originalError?.response.data.developerMessage).toBe('Request was understood but caused a domain rule violation.');
      }
    }
  });
});

describe('UpdateTraceNumber', () => {
  const mockConfig = {
    secret: process.env.SECRET!,
    signee: process.env.SIGNEE!,
    tenantId: process.env.TENANT_ID!,
    baseUrl: process.env.BASE_URL!
  };

  it('should able to update trace number', { timeout: 2900000 }, async () => {
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

    const command = UpdateTraceNumber({
      externalId: '1732882362138Dc2321',
      traceNumbers: {
        traceMapping: '1234567890'
      }
    });

    try {
      await command.execute(mockConfig);
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe('Request failed with status code 404');
        expect(error.originalError?.response.data.developerMessage).toBe('The requested resource is not available.');
      }
    }
  });
});
