import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  CreatePayment,
  GetPayment,
  UpdatePayment,
  DeletePayment,
  GetPayments
} from '../../../src/commands/rest/payment';
import { isCommandError } from '../../../src/utils/errorHandler';
import * as baseRequestModule from '../../../src/utils/baseRequest';
import * as paymentTypes from '../../../src/types/payment';
import axios from 'axios';

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

describe('CreatePayment', () => {
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

  const validPaymentData = {
    amount: 100.50,
    currency: 'USD',
    paymentRail: 'ACH' as const,
    paymentType: 'CREDIT' as const,
    originator: {
      accountId: '123456789'
    },
    recipient: {
      name: 'Jane Smith',
      accountNumber: '987654321',
      accountType: 'SAVINGS' as const,
      recipientType: 'INDIVIDUAL' as const,
      address: {
        line1: '789 Oak Ave',
        city: 'Another Town',
        stateCode: 'CA',
        countryCode: 'US',
        postalCode: '54321'
      },
      bankInformation: {
        routingNumber: '321070007'
      }
    }
  };

  it('should create payment successfully', async () => {
    const mockResponse = {
      data: {
        id: 123,
        clientId: 4742,
        amount: 100.50,
        correlationId: '46005ded-a9e8-41fe-b26e-831e02c79715',
        paymentType: 'DEBIT',
        paymentRail: 'CARD',
        recipient: {
          cardId: '437',
          recipientType: 'INDIVIDUAL',
          address: { countryCode: 'US' },
          name: 'Test Recipient'
        },
        originator: {
          accountId: '4193',
          recipientType: 'INDIVIDUAL',
          address: {
            line1: 'Test Address',
            stateCode: 'NY',
            countryCode: 'US',
            postalCode: '12345'
          },
          name: 'Test Originator'
        },
        executedAt: '2023-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
        externalId: '1755660740713zV',
        status: 'DRAFT',
        paymentRailMetaData: { externalCardName: 'Test Card', externalCardLastDigit: '1234' },
        currencyData: {
          code: 'USD',
          name: 'US Dollar',
          decimalPlaces: 2,
          displaySymbol: '$',
          nameCode: 'US Dollar',
          currencyCodeInDigit: 0,
          isBaseCurrency: false
        },
        currency: 'USD'
      }
    };

    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const command = CreatePayment(validPaymentData);

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/payments', validPaymentData);
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw CommandError for invalid payment data', async () => {
    const invalidPaymentData = {
      amount: -100,
      currency: 'INVALID'
    };

    const command = CreatePayment(invalidPaymentData as any);

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.code).toBe('invalid_payment_input');
        expect(error.message).toContain('Invalid payment data');
      }
    }
  });

  it('should throw CommandError on API error', async () => {
    const axiosError = new Error('Request failed with status code 400') as MockAxiosError;
    axiosError.response = {
      status: 400,
      data: {
        message: 'Bad Request',
        developerMessage: 'Invalid payment data provided'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.post.mockRejectedValue(axiosError);

    const command = CreatePayment(validPaymentData);

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(400);
      }
    }
  });

  it('should rethrow non-ZodError from validation', async () => {
    const nonZodError = new Error('Database connection failed');

    // Spy on validateCreatePaymentInput and make it throw a non-ZodError
    const validateSpy = vi.spyOn(paymentTypes, 'validateCreatePaymentInput').mockImplementation(() => {
      throw nonZodError;
    });

    const command = CreatePayment(validPaymentData);

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBe(nonZodError);
      expect(error.message).toBe('Database connection failed');
    }

    validateSpy.mockRestore();
  });

  it('should have correct metadata', () => {
    const command = CreatePayment(validPaymentData);

    expect(command.metadata.commandName).toBe('CreatePayment');
    expect(command.metadata.path).toBe('/v1/payments');
    expect(command.metadata.method).toBe('POST');
  });
});

describe('GetPayment', () => {
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

  it('should get payment by ID successfully', async () => {
    const mockResponse = {
      data: {
        id: 123,
        clientId: 4742,
        amount: 100.50,
        correlationId: '46005ded-a9e8-41fe-b26e-831e02c79715',
        paymentType: 'DEBIT',
        paymentRail: 'CARD',
        recipient: {
          cardId: '437',
          recipientType: 'INDIVIDUAL',
          address: { countryCode: 'US' },
          name: 'Test Recipient'
        },
        originator: {
          accountId: '4193',
          recipientType: 'INDIVIDUAL',
          address: {
            line1: 'Test Address',
            stateCode: 'NY',
            countryCode: 'US',
            postalCode: '12345'
          },
          name: 'Test Originator'
        },
        executedAt: '2023-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
        externalId: '1755660740713zV',
        status: 'EXECUTION_SUCCESS',
        paymentRailMetaData: { externalCardName: 'Test Card', externalCardLastDigit: '1234' },
        currencyData: {
          code: 'USD',
          name: 'US Dollar',
          decimalPlaces: 2,
          displaySymbol: '$',
          nameCode: 'US Dollar',
          currencyCodeInDigit: 0,
          isBaseCurrency: false
        },
        currency: 'USD'
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetPayment(123);

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/payments/123');
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw CommandError on API error', async () => {
    const axiosError = new Error('Request failed with status code 404') as MockAxiosError;
    axiosError.response = {
      status: 404,
      data: {
        message: 'Not Found',
        developerMessage: 'Payment not found'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.get.mockRejectedValue(axiosError);

    const command = GetPayment(999);

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(404);
      }
    }
  });

  it('should have correct metadata', () => {
    const command = GetPayment(123);

    expect(command.metadata.commandName).toBe('GetPayment');
    expect(command.metadata.path).toBe('/v1/payments/123');
    expect(command.metadata.method).toBe('GET');
  });
});

describe('UpdatePayment', () => {
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

  it('should update payment successfully', async () => {
    const updateData = {
      status: 'CANCELLED' as const,
      amount: 150.75
    };

    const mockResponse = {
      data: {
        id: 123,
        clientId: 4742,
        amount: 150.75,
        correlationId: '46005ded-a9e8-41fe-b26e-831e02c79715',
        paymentType: 'DEBIT',
        paymentRail: 'CARD',
        recipient: {
          cardId: '437',
          recipientType: 'INDIVIDUAL',
          address: { countryCode: 'US' },
          name: 'Test Recipient'
        },
        originator: {
          accountId: '4193',
          recipientType: 'INDIVIDUAL',
          address: {
            line1: 'Test Address',
            stateCode: 'NY',
            countryCode: 'US',
            postalCode: '12345'
          },
          name: 'Test Originator'
        },
        executedAt: '2023-01-01T00:00:00Z',
        createdAt: '2023-01-01T00:00:00Z',
        externalId: '1755660740713zV',
        status: 'CANCELLED',
        paymentRailMetaData: { externalCardName: 'Test Card', externalCardLastDigit: '1234' },
        currencyData: {
          code: 'USD',
          name: 'US Dollar',
          decimalPlaces: 2,
          displaySymbol: '$',
          nameCode: 'US Dollar',
          currencyCodeInDigit: 0,
          isBaseCurrency: false
        },
        currency: 'USD'
      }
    };

    mockAxiosInstance.put.mockResolvedValue(mockResponse);

    const command = UpdatePayment(123, updateData);

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.put).toHaveBeenCalledWith('/v1/payments/123', updateData);
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw CommandError for invalid update data', async () => {
    const invalidUpdateData = {
      amount: -100,
      status: 'INVALID_STATUS'
    };

    const command = UpdatePayment(123, invalidUpdateData as any);

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.code).toBe('invalid_payment_update_input');
        expect(error.message).toContain('Invalid payment update data');
      }
    }
  });

  it('should throw CommandError on API error', async () => {
    const axiosError = new Error('Request failed with status code 403') as MockAxiosError;
    axiosError.response = {
      status: 403,
      data: {
        message: 'Forbidden',
        developerMessage: 'Payment cannot be updated in current status'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.put.mockRejectedValue(axiosError);

    const command = UpdatePayment(123, { status: 'CANCELLED' });

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(403);
      }
    }
  });

  it('should rethrow non-ZodError from validation', async () => {
    const nonZodError = new Error('Network timeout');

    // Spy on validateUpdatePaymentInput and make it throw a non-ZodError
    const validateSpy = vi.spyOn(paymentTypes, 'validateUpdatePaymentInput').mockImplementation(() => {
      throw nonZodError;
    });

    const command = UpdatePayment(123, { status: 'CANCELLED' });

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(error).toBe(nonZodError);
      expect(error.message).toBe('Network timeout');
    }

    validateSpy.mockRestore();
  });

  it('should have correct metadata', () => {
    const command = UpdatePayment(123, { status: 'CANCELLED' });

    expect(command.metadata.commandName).toBe('UpdatePayment');
    expect(command.metadata.path).toBe('/v1/payments/123');
    expect(command.metadata.method).toBe('PUT');
  });
});

describe('DeletePayment', () => {
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

  it('should delete payment by ID successfully', async () => {
    mockAxiosInstance.delete.mockResolvedValue(undefined);

    const command = DeletePayment(123);

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/payments/123');
    expect(result).toBeUndefined();
  });

  it('should throw CommandError on API error', async () => {
    const axiosError = new Error('Request failed with status code 404') as MockAxiosError;
    axiosError.response = {
      status: 404,
      data: {
        message: 'Not Found',
        developerMessage: 'Payment not found'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.delete.mockRejectedValue(axiosError);

    const command = DeletePayment(999);

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(404);
      }
    }
  });

  it('should throw CommandError on forbidden error', async () => {
    const axiosError = new Error('Request failed with status code 403') as MockAxiosError;
    axiosError.response = {
      status: 403,
      data: {
        message: 'Forbidden',
        developerMessage: 'Payment cannot be deleted in current status'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.delete.mockRejectedValue(axiosError);

    const command = DeletePayment(123);

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(403);
      }
    }
  });

  it('should have correct metadata', () => {
    const command = DeletePayment(123);

    expect(command.metadata.commandName).toBe('DeletePayment');
    expect(command.metadata.path).toBe('/v1/payments/123');
    expect(command.metadata.method).toBe('DELETE');
  });
});

describe('GetPayments', () => {
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

  it('should fetch payments with regular pagination', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 5,
        pageItems: [
          {
            id: 1,
            clientId: 4742,
            amount: 100,
            correlationId: 'correlation-1',
            paymentType: 'DEBIT',
            paymentRail: 'CARD',
            recipient: {
              recipientType: 'INDIVIDUAL',
              address: { countryCode: 'US' },
              name: 'Recipient 1'
            },
            originator: {
              recipientType: 'INDIVIDUAL',
              address: { countryCode: 'US' },
              name: 'Originator 1'
            },
            executedAt: '2023-01-01T00:00:00Z',
            createdAt: '2023-01-01T00:00:00Z',
            externalId: 'ext-1',
            status: 'EXECUTION_SUCCESS',
            currencyData: {
              code: 'USD',
              name: 'US Dollar',
              decimalPlaces: 2,
              displaySymbol: '$',
              nameCode: 'US Dollar',
              currencyCodeInDigit: 0,
              isBaseCurrency: false
            },
            currency: 'USD'
          }
        ]
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetPayments(
      { limit: 10, offset: 0 }
    );

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/payments', {
      params: {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC',
        limit: 10,
        offset: 0
      }
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should fetch all payments when limit is 0', async () => {
    const firstPageResponse = {
      data: {
        totalFilteredRecords: 3,
        pageItems: [
          {
            id: 1,
            clientId: 4742,
            amount: 100,
            correlationId: 'correlation-1',
            paymentType: 'DEBIT',
            paymentRail: 'CARD',
            recipient: {
              recipientType: 'INDIVIDUAL',
              address: { countryCode: 'US' },
              name: 'Recipient 1'
            },
            originator: {
              recipientType: 'INDIVIDUAL',
              address: { countryCode: 'US' },
              name: 'Originator 1'
            },
            executedAt: '2023-01-01T00:00:00Z',
            createdAt: '2023-01-01T00:00:00Z',
            externalId: 'ext-1',
            status: 'EXECUTION_SUCCESS',
            currencyData: {
              code: 'USD',
              name: 'US Dollar',
              decimalPlaces: 2,
              displaySymbol: '$',
              nameCode: 'US Dollar',
              currencyCodeInDigit: 0,
              isBaseCurrency: false
            },
            currency: 'USD'
          },
          {
            id: 2,
            clientId: 4743,
            amount: 200,
            correlationId: 'correlation-2',
            paymentType: 'CREDIT',
            paymentRail: 'ACH',
            recipient: {
              recipientType: 'INDIVIDUAL',
              address: { countryCode: 'US' },
              name: 'Recipient 2'
            },
            originator: {
              recipientType: 'INDIVIDUAL',
              address: { countryCode: 'US' },
              name: 'Originator 2'
            },
            executedAt: '2023-01-02T00:00:00Z',
            createdAt: '2023-01-02T00:00:00Z',
            externalId: 'ext-2',
            status: 'DRAFT',
            currencyData: {
              code: 'USD',
              name: 'US Dollar',
              decimalPlaces: 2,
              displaySymbol: '$',
              nameCode: 'US Dollar',
              currencyCodeInDigit: 0,
              isBaseCurrency: false
            },
            currency: 'USD'
          }
        ]
      }
    };

    mockAxiosInstance.get.mockResolvedValue(firstPageResponse);

    const command = GetPayments(
      { limit: 0 }
    );

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/payments', {
      params: {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC',
        limit: 20,
        offset: 0
      }
    });
    expect(result).toEqual({
      totalFilteredRecords: 3,
      pageItems: firstPageResponse.data.pageItems
    });
  });

  it('should use default limit of 20 when not specified', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 1,
        pageItems: []
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetPayments({});
    await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/payments', {
      params: {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC',
        limit: 20,
        offset: 0
      }
    });
  });

  it('should handle API errors', async () => {
    const axiosError = new Error('Request failed with status code 400') as MockAxiosError;
    axiosError.response = {
      status: 400,
      data: {
        message: 'Bad Request',
        developerMessage: 'Invalid parameters'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.get.mockRejectedValue(axiosError);

    const command = GetPayments(
      { limit: 10 }
    );

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(400);
      }
    }
  });

  it('should have correct metadata', () => {
    const command = GetPayments({});

    expect(command.metadata.commandName).toBe('GetPayments');
    expect(command.metadata.path).toBe('/v1/payments');
    expect(command.metadata.method).toBe('GET');
  });

  it('should automatically set dateFormat param when any params fromValueDate, toValueDate, fromExecuteDate, toExecuteDate, fromReturnDate, toReturnDate are set', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 1,
        pageItems: []
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetPayments(
      { limit: 10, fromValueDate: '2023-01-01' }
    );

    await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/payments', {
      params: {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC',
        limit: 10,
        offset: 0,
        fromValueDate: '2023-01-01',
        dateFormat: 'yyyy-MM-dd'
      }
    });
  });
});
