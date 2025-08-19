import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  CreatePayment,
  GetPayment,
  UpdatePayment,
  GetPayments,
  DeletePayment
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
    debtor: {
      name: 'John Doe',
      identifier: '123456789',
      accountType: 'CHECKING' as const,
      address: {
        streetAddress: '123 Main St',
        city: 'Anytown',
        state: 'NY',
        country: 'US',
        postalCode: '12345'
      },
      agent: {
        name: 'Bank of Example',
        identifier: '021000021',
        address: {
          streetAddress: '456 Bank St',
          city: 'Banking City',
          state: 'NY',
          country: 'US'
        }
      }
    },
    creditor: {
      name: 'Jane Smith',
      identifier: '987654321',
      accountType: 'SAVINGS' as const,
      address: {
        streetAddress: '789 Oak Ave',
        city: 'Another Town',
        state: 'CA',
        country: 'US',
        postalCode: '54321'
      },
      agent: {
        name: 'Credit Union',
        identifier: '321070007',
        address: {
          streetAddress: '321 Credit Ave',
          city: 'Credit City',
          state: 'CA',
          country: 'US'
        }
      }
    }
  };

  it('should create payment successfully', async () => {
    const mockResponse = {
      data: {
        id: '123',
        amount: 100.50,
        clientId: 'client-123',
        currency: 'USD',
        status: 'DRAFT',
        createdAt: '2023-01-01T00:00:00Z'
      }
    };

    mockAxiosInstance.post.mockResolvedValue(mockResponse);

    const command = CreatePayment({
      payment: validPaymentData
    });

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/transfers', validPaymentData);
    expect(result).toEqual(mockResponse.data);
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = {
      data: {
        id: '123',
        amount: 100.50,
        clientId: 'client-123',
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
    expect(command.metadata.path).toBe('/v1/transfers');
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
        id: '123',
        amount: 100.50,
        clientId: 'client-123',
        currency: 'USD',
        status: 'EXECUTION_SUCCESS',
        createdAt: '2023-01-01T00:00:00Z'
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetPayment({
      id: '123'
    });

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/transfers/123');
    expect(result).toEqual(mockResponse.data);
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = {
      data: {
        id: '123',
        amount: 100.50,
        clientId: 'client-123',
        currency: 'USD'
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetPayment({
      id: '123',
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
      id: 'non-existent-id'
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
      id: '123'
    });

    expect(command.metadata.commandName).toBe('GetPayment');
    expect(command.metadata.path).toBe('/v1/transfers/123');
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
        id: '123',
        amount: 150.75,
        clientId: 'client-123',
        currency: 'USD',
        status: 'CANCELLED',
        updatedAt: '2023-01-02T00:00:00Z'
      }
    };

    mockAxiosInstance.put.mockResolvedValue(mockResponse);

    const command = UpdatePayment({
      id: '123',
      payment: updateData
    });

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.put).toHaveBeenCalledWith('/v1/transfers/123', updateData);
    expect(result).toEqual(mockResponse.data);
  });

  it('should use custom tenantId when provided', async () => {
    const updateData = {
      status: 'CANCELLED' as const
    };

    const mockResponse = {
      data: {
        id: '123',
        amount: 100.50,
        clientId: 'client-123',
        currency: 'USD',
        status: 'CANCELLED'
      }
    };

    mockAxiosInstance.put.mockResolvedValue(mockResponse);

    const command = UpdatePayment({
      id: '123',
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
      id: '123',
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
      id: '123',
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
      id: '123',
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
      id: '123',
      payment: { status: 'CANCELLED' }
    });

    expect(command.metadata.commandName).toBe('UpdatePayment');
    expect(command.metadata.path).toBe('/v1/transfers/123');
    expect(command.metadata.method).toBe('PUT');
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

    const query = GetPayments().list();
    const command = query.execute();
    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/transfers', {
      params: {
        limit: 200,
        offset: 0
      }
    });
    expect(result).toEqual(mockResponse.data.pageItems);
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

    const query = GetPayments()
      .list()
      .where('status')
      .eq('EXECUTION_SUCCESS');
    const command = query.execute();
    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/transfers', {
      params: {
        status: 'EXECUTION_SUCCESS',
        limit: 200,
        offset: 0
      }
    });
    expect(result).toEqual(mockResponse.data.pageItems);
  });

  it('should apply limit and offset correctly', async () => {
    const mockResponse = {
      data: {
        totalFilteredRecords: 100,
        pageItems: []
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const query = GetPayments()
      .list()
      .limit(50)
      .offset(25);
    const command = query.execute();
    await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/transfers', {
      params: {
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

    const query = GetPayments({ tenantId: 'custom-tenant' }).list();
    const command = query.execute();
    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
  });

  it('should throw CommandError for invalid filter key', () => {
    expect(() => {
      GetPayments()
        .list()
        .where('invalidKey');
    }).toThrow();
  });

  it('should throw CommandError for invalid filter value', () => {
    expect(() => {
      GetPayments()
        .list()
        .where('status')
        .eq('INVALID_STATUS');
    }).toThrow();
  });

  it('should validate different filter value types', () => {
    // Test paymentRail validation
    expect(() => {
      GetPayments()
        .list()
        .where('paymentRail')
        .eq('INVALID_RAIL');
    }).toThrow();

    // Test paymentType validation
    expect(() => {
      GetPayments()
        .list()
        .where('paymentType')
        .eq('INVALID_TYPE');
    }).toThrow();

    // Test sortOrder validation
    expect(() => {
      GetPayments()
        .list()
        .where('sortOrder')
        .eq('INVALID_ORDER');
    }).toThrow();

    // Test valid values for coverage
    expect(() => {
      GetPayments()
        .list()
        .where('paymentRail')
        .eq('ACH');
    }).not.toThrow();

    expect(() => {
      GetPayments()
        .list()
        .where('paymentType')
        .eq('CREDIT');
    }).not.toThrow();

    expect(() => {
      GetPayments()
        .list()
        .where('sortOrder')
        .eq('ASC');
    }).not.toThrow();

    // Test unknown filter key that doesn't need validation (default case)
    expect(() => {
      GetPayments()
        .list()
        .where('originatorName')
        .eq('some-value');
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

    const query = GetPayments().list();
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

    const query = GetPayments()
      .list()
      .where('status')
      .eq('EXECUTION_SUCCESS')
      .where('paymentRail')
      .eq('ACH')
      .limit(10);
    const command = query.execute();
    await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/transfers', {
      params: {
        status: 'EXECUTION_SUCCESS',
        paymentRail: 'ACH',
        limit: 10,
        offset: 0
      }
    });
  });

  it('should rethrow non-ZodError from filter key validation', () => {
    const nonZodError = new Error('System error in filter key validation');

    // Spy on validatePaymentFilterKey and make it throw a non-ZodError
    const validateSpy = vi.spyOn(paymentTypes, 'validatePaymentFilterKey').mockImplementation(() => {
      throw nonZodError;
    });

    expect(() => {
      GetPayments()
        .list()
        .where('status');
    }).toThrow('System error in filter key validation');

    validateSpy.mockRestore();
  });

  it('should rethrow non-ZodError from filter value validation', () => {
    const nonZodError = new Error('System error in filter value validation');

    // Spy on validatePaymentStatus and make it throw a non-ZodError
    const validateSpy = vi.spyOn(paymentTypes, 'validatePaymentStatus').mockImplementation(() => {
      throw nonZodError;
    });

    expect(() => {
      GetPayments()
        .list()
        .where('status')
        .eq('DRAFT');
    }).toThrow('System error in filter value validation');

    validateSpy.mockRestore();
  });

  it('should have correct metadata for list command', () => {
    const query = GetPayments().list();
    const command = query.execute();

    expect(command.metadata.commandName).toBe('GetPayments');
    expect(command.metadata.path).toBe('/v1/transfers');
    expect(command.metadata.method).toBe('GET');
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
      id: '123'
    });

    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/transfers/123');
    expect(result).toBeUndefined();
  });

  it('should use custom tenantId when provided', async () => {
    mockAxiosInstance.delete.mockResolvedValue(undefined);

    const command = DeletePayment({
      id: '123',
      tenantId: 'custom-tenant'
    });

    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v1/transfers/123');
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
      id: 'non-existent-id'
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
      id: '123'
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
      id: '123'
    });

    expect(command.metadata.commandName).toBe('DeletePayment');
    expect(command.metadata.path).toBe('/v1/transfers/123');
    expect(command.metadata.method).toBe('DELETE');
  });
});
