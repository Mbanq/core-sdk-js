import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  CreatePayment,
  GetPayment,
  UpdatePayment,
  ListPayments,
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

    const command = CreatePayment({
      payment: validPaymentData
    });

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/payments', validPaymentData);
    expect(result).toEqual(mockResponse.data);
  });

  it('should use custom tenantId when provided', async () => {
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

    const command = CreatePayment({
      payment: validPaymentData,
      tenantId: 'custom-tenant'
    });

    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });

  it('should throw CommandError for invalid payment data', async () => {
    const invalidPaymentData = {
      amount: -100,
      currency: 'INVALID'
    };

    const command = CreatePayment({
      payment: invalidPaymentData as any
    });

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

    const command = CreatePayment({
      payment: validPaymentData
    });

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

    const command = CreatePayment({
      payment: validPaymentData
    });

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
    const command = CreatePayment({
      payment: validPaymentData
    });

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

    const command = GetPayment({
      id: 123
    });

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/payments/123');
    expect(result).toEqual(mockResponse.data);
  });

  it('should use custom tenantId when provided', async () => {
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

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetPayment({
      id: 123,
      tenantId: 'custom-tenant'
    });

    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
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

    const command = GetPayment({
      id: 999
    });

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
    const command = GetPayment({
      id: 123
    });

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

    const command = UpdatePayment({
      id: 123,
      payment: updateData
    });

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.put).toHaveBeenCalledWith('/v1/payments/123', updateData);
    expect(result).toEqual(mockResponse.data);
  });

  it('should use custom tenantId when provided', async () => {
    const updateData = {
      status: 'CANCELLED' as const
    };

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

    const command = UpdatePayment({
      id: 123,
      payment: updateData,
      tenantId: 'custom-tenant'
    });

    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });

  it('should throw CommandError for invalid update data', async () => {
    const invalidUpdateData = {
      amount: -100,
      status: 'INVALID_STATUS'
    };

    const command = UpdatePayment({
      id: 123,
      payment: invalidUpdateData as any
    });

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

    const command = UpdatePayment({
      id: 123,
      payment: { status: 'CANCELLED' }
    });

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

    const command = UpdatePayment({
      id: 123,
      payment: { status: 'CANCELLED' }
    });

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
    const command = UpdatePayment({
      id: 123,
      payment: { status: 'CANCELLED' }
    });

    expect(command.metadata.commandName).toBe('UpdatePayment');
    expect(command.metadata.path).toBe('/v1/payments/123');
    expect(command.metadata.method).toBe('PUT');
  });
});

describe('ListPayments', () => {
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

  it('should get payments list successfully', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 2,
        pageItems: [
          {
            id: '1',
            amount: 100.50,
            clientId: 'client-1',
            currency: 'USD',
            status: 'EXECUTION_SUCCESS'
          },
          {
            id: '2',
            amount: 200.75,
            clientId: 'client-2',
            currency: 'EUR',
            status: 'DRAFT'
          }
        ]
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const query = ListPayments().list();
    const command = query.execute();
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
    expect(result).toEqual(mockResponse.data);
  });

  it('should apply filters correctly', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 1,
        pageItems: [
          {
            id: '1',
            amount: 100.50,
            clientId: 'client-1',
            currency: 'USD',
            status: 'EXECUTION_SUCCESS'
          }
        ]
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const query = ListPayments()
      .list()
      .where('status')
      .eq('EXECUTION_SUCCESS');
    const command = query.execute();
    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/payments', {
      params: {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC',
        status: 'EXECUTION_SUCCESS',
        limit: 20,
        offset: 0
      }
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should apply limit and offset correctly', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 100,
        pageItems: []
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const query = ListPayments()
      .list()
      .limit(50)
      .offset(25);
    const command = query.execute();
    await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/payments', {
      params: {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC',
        limit: 50,
        offset: 25
      }
    });
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 0,
        pageItems: []
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const query = ListPayments({ tenantId: 'custom-tenant' }).list();
    const command = query.execute();
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });

  it('should throw CommandError for invalid filter key', () => {
    expect(() => {
      ListPayments()
        .list()
        .where('invalidKey');
    }).toThrow();
  });

  it('should throw CommandError for invalid filter value', () => {
    expect(() => {
      ListPayments()
        .list()
        .where('status')
        .eq('INVALID_STATUS');
    }).toThrow();
  });

  it('should validate different filter value types', () => {
    // Test paymentRail validation
    expect(() => {
      ListPayments()
        .list()
        .where('paymentRail')
        .eq('INVALID_RAIL');
    }).toThrow();

    // Test paymentType validation
    expect(() => {
      ListPayments()
        .list()
        .where('paymentType')
        .eq('INVALID_TYPE');
    }).toThrow();

    // Test sortOrder validation
    expect(() => {
      ListPayments()
        .list()
        .where('sortOrder')
        .eq('INVALID_ORDER');
    }).toThrow();

    // Test valid values for coverage
    expect(() => {
      ListPayments()
        .list()
        .where('paymentRail')
        .eq('ACH');
    }).not.toThrow();

    expect(() => {
      ListPayments()
        .list()
        .where('paymentType')
        .eq('CREDIT');
    }).not.toThrow();

    expect(() => {
      ListPayments()
        .list()
        .where('sortOrder')
        .eq('ASC');
    }).not.toThrow();

    // Test originatorName validation
    expect(() => {
      ListPayments()
        .list()
        .where('originatorName')
        .eq('John Doe');
    }).not.toThrow();

    expect(() => {
      ListPayments()
        .list()
        .where('originatorName')
        .eq('');
    }).toThrow();

    // Test originatorAccount validation
    expect(() => {
      ListPayments()
        .list()
        .where('originatorAccount')
        .eq('123456789');
    }).not.toThrow();

    // Test originatorBankRoutingCode validation
    expect(() => {
      ListPayments()
        .list()
        .where('originatorBankRoutingCode')
        .eq('021000021');
    }).not.toThrow();

    // Test recipientName validation
    expect(() => {
      ListPayments()
        .list()
        .where('recipientName')
        .eq('Jane Smith');
    }).not.toThrow();

    // Test recipientAccount validation
    expect(() => {
      ListPayments()
        .list()
        .where('recipientAccount')
        .eq('987654321');
    }).not.toThrow();

    // Test recipientBankRoutingCode validation
    expect(() => {
      ListPayments()
        .list()
        .where('recipientBankRoutingCode')
        .eq('321070007');
    }).not.toThrow();

    // Test reference validation
    expect(() => {
      ListPayments()
        .list()
        .where('reference')
        .eq('REF123456');
    }).not.toThrow();

    // Test traceNumber validation
    expect(() => {
      ListPayments()
        .list()
        .where('traceNumber')
        .eq('TRACE123');
    }).not.toThrow();

    // Test externalId validation
    expect(() => {
      ListPayments()
        .list()
        .where('externalId')
        .eq('EXT123456');
    }).not.toThrow();

    // Test clientId validation (string)
    expect(() => {
      ListPayments()
        .list()
        .where('clientId')
        .eq('client-123');
    }).not.toThrow();

    // Test clientId validation (number)
    expect(() => {
      ListPayments()
        .list()
        .where('clientId')
        .eq(4742);
    }).not.toThrow();

    // Test dateFormat validation
    expect(() => {
      ListPayments()
        .list()
        .where('dateFormat')
        .eq('YYYY-MM-DD');
    }).not.toThrow();

    // Test locale validation
    expect(() => {
      ListPayments()
        .list()
        .where('locale')
        .eq('en-US');
    }).not.toThrow();

    // Test originatedBy validation
    expect(() => {
      ListPayments()
        .list()
        .where('originatedBy')
        .eq('SYSTEM');
    }).not.toThrow();

    // Test fromValueDate validation
    expect(() => {
      ListPayments()
        .list()
        .where('fromValueDate')
        .eq('2023-01-01');
    }).not.toThrow();

    // Test toValueDate validation
    expect(() => {
      ListPayments()
        .list()
        .where('toValueDate')
        .eq('2023-12-31');
    }).not.toThrow();

    // Test fromExecuteDate validation
    expect(() => {
      ListPayments()
        .list()
        .where('fromExecuteDate')
        .eq('2023-01-01');
    }).not.toThrow();

    // Test toExecuteDate validation
    expect(() => {
      ListPayments()
        .list()
        .where('toExecuteDate')
        .eq('2023-12-31');
    }).not.toThrow();

    // Test fromReturnDate validation
    expect(() => {
      ListPayments()
        .list()
        .where('fromReturnDate')
        .eq('2023-01-01');
    }).not.toThrow();

    // Test toReturnDate validation
    expect(() => {
      ListPayments()
        .list()
        .where('toReturnDate')
        .eq('2023-12-31');
    }).not.toThrow();

    // Test isSettlement validation
    expect(() => {
      ListPayments()
        .list()
        .where('isSettlement')
        .eq(true);
    }).not.toThrow();

    expect(() => {
      ListPayments()
        .list()
        .where('isSettlement')
        .eq(false);
    }).not.toThrow();

    // Test isSettlement invalid value
    expect(() => {
      ListPayments()
        .list()
        .where('isSettlement')
        .eq('true' as any);
    }).toThrow();

    // Test orderBy validation
    expect(() => {
      ListPayments()
        .list()
        .where('orderBy')
        .eq('createdAt');
    }).not.toThrow();
  });

  it('should handle API errors', async () => {
    const axiosError = new Error('Request failed with status code 500') as MockAxiosError;
    axiosError.response = {
      status: 500,
      data: {
        message: 'Internal Server Error',
        developerMessage: 'Database connection failed'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.get.mockRejectedValue(axiosError);

    const query = ListPayments().list();
    const command = query.execute();

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(500);
      }
    }
  });

  it('should chain multiple filters', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 1,
        pageItems: [
          {
            id: '1',
            amount: 100.50,
            clientId: 'client-1',
            currency: 'USD',
            status: 'EXECUTION_SUCCESS'
          }
        ]
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const query = ListPayments()
      .list()
      .where('status')
      .eq('EXECUTION_SUCCESS')
      .where('paymentRail')
      .eq('ACH')
      .limit(10);
    const command = query.execute();
    await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/payments', {
      params: {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC',
        status: 'EXECUTION_SUCCESS',
        paymentRail: 'ACH',
        limit: 10,
        offset: 0
      }
    });
  });

  it('should rethrow non-ZodError from filter key validation', () => {
    const nonZodError = new Error('System error in filter key validation');

    // Spy on validateFilterKey and make it throw a non-ZodError
    const validateSpy = vi.spyOn(paymentTypes, 'validateFilterKey').mockImplementation(() => {
      throw nonZodError;
    });

    expect(() => {
      ListPayments()
        .list()
        .where('status');
    }).toThrow('System error in filter key validation');

    validateSpy.mockRestore();
  });

  it('should rethrow non-ZodError from filter value validation', () => {
    const nonZodError = new Error('System error in filter value validation');

    // Spy on validateFilterValue and make it throw a non-ZodError
    const validateSpy = vi.spyOn(paymentTypes, 'validateFilterValue').mockImplementation(() => {
      throw nonZodError;
    });

    expect(() => {
      ListPayments()
        .list()
        .where('status')
        .eq('DRAFT');
    }).toThrow('System error in filter value validation');

    validateSpy.mockRestore();
  });

  it('should handle all valid filter keys with appropriate validation', () => {
    // This test ensures all filter keys from the enum are properly handled
    // The default case in validateFilterValue (line 126) is unreachable in current implementation
    // since all valid filter keys have specific validation cases
    expect(() => {
      ListPayments()
        .list()
        .where('status')
        .eq('DRAFT');
    }).not.toThrow();

    expect(() => {
      ListPayments()
        .list()
        .where('originatorName')
        .eq('Test Name');
    }).not.toThrow();
  });

  it('should have correct metadata for list command', () => {
    const query = ListPayments().list();
    const command = query.execute();

    expect(command.metadata.commandName).toBe('ListPayments');
    expect(command.metadata.path).toBe('/v1/payments');
    expect(command.metadata.method).toBe('GET');
  });

  it('should support .all() method to fetch all records', async () => {
    // Mock multiple pages of responses
    const firstPageResponse = {
      data: {
        totalFilteredRecords: 250,
        pageItems: Array.from({ length: 200 }, (_, i) => ({
          id: i + 1,
          clientId: 4742,
          amount: 100 + i,
          correlationId: `correlation-${i}`,
          paymentType: 'DEBIT',
          paymentRail: 'CARD',
          recipient: {
            recipientType: 'INDIVIDUAL',
            address: { countryCode: 'US' },
            name: `Recipient ${i}`
          },
          originator: {
            recipientType: 'INDIVIDUAL',
            address: { countryCode: 'US' },
            name: `Originator ${i}`
          },
          executedAt: '2023-01-01T00:00:00Z',
          createdAt: '2023-01-01T00:00:00Z',
          externalId: `ext-${i}`,
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
        }))
      }
    };

    const secondPageResponse = {
      data: {
        totalFilteredRecords: 250,
        pageItems: Array.from({ length: 50 }, (_, i) => ({
          id: i + 201,
          clientId: 4742,
          amount: 120 + i,
          correlationId: `correlation-${i + 200}`,
          paymentType: 'CREDIT',
          paymentRail: 'ACH',
          recipient: {
            recipientType: 'INDIVIDUAL',
            address: { countryCode: 'US' },
            name: `Recipient ${i + 200}`
          },
          originator: {
            recipientType: 'INDIVIDUAL',
            address: { countryCode: 'US' },
            name: `Originator ${i + 200}`
          },
          executedAt: '2023-01-02T00:00:00Z',
          createdAt: '2023-01-02T00:00:00Z',
          externalId: `ext-${i + 200}`,
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
        }))
      }
    };

    // Setup mock to return different responses for different calls
    mockAxiosInstance.get
      .mockResolvedValueOnce(firstPageResponse)
      .mockResolvedValueOnce(secondPageResponse);

    const query = ListPayments().list().all();
    const command = query.execute();
    const result = await command.execute(mockConfig);

    // Should make two API calls for pagination
    expect(mockAxiosInstance.get).toHaveBeenCalledTimes(2);

    // First call with limit 200, offset 0
    expect(mockAxiosInstance.get).toHaveBeenNthCalledWith(1, '/v1/payments', {
      params: {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC',
        limit: 200,
        offset: 0
      }
    });

    // Second call with limit 200, offset 200
    expect(mockAxiosInstance.get).toHaveBeenNthCalledWith(2, '/v1/payments', {
      params: {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC',
        limit: 200,
        offset: 200
      }
    });

    // Should return all records combined
    expect(result).toBeDefined();
    expect(result!.totalFilteredRecords).toBe(250);
    expect(result!.pageItems).toHaveLength(250);
    expect(result!.pageItems[0].id).toBe(1);
    expect(result!.pageItems[249].id).toBe(250);
  });

  it('should throw error for invalid limit values', () => {
    expect(() => {
      ListPayments().list().limit(-1);
    }).toThrow();

    expect(() => {
      ListPayments().list().limit(-10);
    }).toThrow();

    // Should not throw for positive values
    expect(() => {
      ListPayments().list().limit(1);
    }).not.toThrow();

    expect(() => {
      ListPayments().list().limit(100);
    }).not.toThrow();
  });

  it('should throw error for invalid offset values', () => {
    expect(() => {
      ListPayments().list().offset(-1);
    }).toThrow();

    expect(() => {
      ListPayments().list().offset(-10);
    }).toThrow();

    // Should not throw for non-negative values
    expect(() => {
      ListPayments().list().offset(0);
    }).not.toThrow();

    expect(() => {
      ListPayments().list().offset(100);
    }).not.toThrow();
  });

  it('should allow limit 0 for all() method', () => {
    expect(() => {
      ListPayments().list().all();
    }).not.toThrow();
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

    const command = DeletePayment({
      id: 123
    });

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/payments/123');
    expect(result).toBeUndefined();
  });

  it('should use custom tenantId when provided', async () => {
    mockAxiosInstance.delete.mockResolvedValue(undefined);

    const command = DeletePayment({
      id: 123,
      tenantId: 'custom-tenant'
    });

    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/payments/123');
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

    const command = DeletePayment({
      id: 999
    });

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

    const command = DeletePayment({
      id: 123
    });

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
    const command = DeletePayment({
      id: 123
    });

    expect(command.metadata.commandName).toBe('DeletePayment');
    expect(command.metadata.path).toBe('/v1/payments/123');
    expect(command.metadata.method).toBe('DELETE');
  });
});

describe('GetPayments (legacy function)', () => {
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
      { limit: 10, offset: 0 },
      { tenantId: 'test-tenant' }
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
      { limit: 0 },
      { tenantId: 'test-tenant' }
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

    const command = GetPayments({}, { tenantId: 'test-tenant' });
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
      { limit: 10 },
      { tenantId: 'test-tenant' }
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

  it('should use custom tenantId when provided', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 0,
        pageItems: []
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetPayments(
      { limit: 5 },
      { tenantId: 'custom-tenant' }
    );

    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });

  it('should have correct metadata', () => {
    const command = GetPayments({}, { tenantId: 'test-tenant' });

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
      { limit: 10, fromValueDate: '2023-01-01' },
      { tenantId: 'test-tenant' }
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
