import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GetUserDetail } from '../../../src/commands/rest/user';
import { isCommandError } from '../../../src/utils/errorHandler';
import * as baseRequestModule from '../../../src/utils/baseRequest';
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

describe('GetUserDetail', () => {
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

  it('should get user details successfully', async () => {
    const mockResponse = {
      data: {
        username: 'john.doe',
        userId: 12345,
        accessToken: 'mock-access-token',
        authenticated: true,
        officeId: 1,
        officeName: 'Main Office',
        roles: [
          {
            id: 1,
            name: 'Admin',
            description: 'Administrator role',
            disabled: false,
            isSelfService: false,
            position: 1
          }
        ],
        permissions: ['READ_USERS', 'WRITE_USERS'],
        shouldRenewPassword: false,
        isTwoFactorAuthenticationRequired: false,
        isSelfServiceUser: false
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetUserDetail();
    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/userdetails');
    expect(result).toEqual(mockResponse.data);
    expect(result.username).toBe('john.doe');
    expect(result.userId).toBe(12345);
    expect(result.authenticated).toBe(true);
  });

  it('should get user details without parameters', async () => {
    const mockResponse = {
      data: {
        username: 'jane.doe',
        userId: 67890,
        accessToken: 'mock-access-token-2',
        authenticated: true,
        officeId: 2,
        officeName: 'Branch Office',
        roles: [],
        permissions: [],
        shouldRenewPassword: true,
        isTwoFactorAuthenticationRequired: true,
        isSelfServiceUser: true
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetUserDetail();
    const result = await command.execute(mockConfig);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/userdetails');
    expect(result).toEqual(mockResponse.data);
  });

  it('should use custom tenantId when provided', async () => {
    const mockResponse = {
      data: {
        username: 'test.user',
        userId: 999,
        accessToken: 'test-token',
        authenticated: true,
        officeId: 1,
        officeName: 'Test Office',
        roles: [],
        permissions: [],
        shouldRenewPassword: false,
        isTwoFactorAuthenticationRequired: false,
        isSelfServiceUser: false
      }
    };

    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const command = GetUserDetail({
      tenantId: 'custom-tenant'
    });

    const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
    await command.execute(mockConfig);

    expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/userdetails');
  });

  it('should throw CommandError on API error', async () => {
    const axiosError = new Error('Request failed with status code 401') as MockAxiosError;
    axiosError.response = {
      status: 401,
      data: {
        message: 'Unauthorized',
        developerMessage: 'Authentication failed'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.get.mockRejectedValue(axiosError);

    const command = GetUserDetail();

    try {
      await command.execute(mockConfig);
      expect.fail('Should have thrown an error');
    } catch (error) {
      expect(isCommandError(error)).toBe(true);
      if (isCommandError(error)) {
        expect(error.statusCode).toBe(401);
      }
    }
  });

  it('should throw CommandError on forbidden error', async () => {
    const axiosError = new Error('Request failed with status code 403') as MockAxiosError;
    axiosError.response = {
      status: 403,
      data: {
        message: 'Forbidden',
        developerMessage: 'Insufficient permissions'
      }
    };
    axiosError.isAxiosError = true;

    vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);
    mockAxiosInstance.get.mockRejectedValue(axiosError);

    const command = GetUserDetail();

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

  it('should throw CommandError on server error', async () => {
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

    const command = GetUserDetail();

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

  it('should have correct metadata', () => {
    const command = GetUserDetail();

    expect(command.metadata.commandName).toBe('GetUserDetail');
    expect(command.metadata.path).toBe('/v1/userdetails');
    expect(command.metadata.method).toBe('GET');
  });

  it('should handle empty input parameters', () => {
    const command = GetUserDetail({});

    expect(command.input).toEqual({});
    expect(command.metadata.commandName).toBe('GetUserDetail');
  });

  it('should handle undefined input parameters', () => {
    const command = GetUserDetail(undefined);

    expect(command.input).toEqual({});
    expect(command.metadata.commandName).toBe('GetUserDetail');
  });
});
