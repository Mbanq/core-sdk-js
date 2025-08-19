import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { v4 as uuidv4 } from 'uuid';
import baseRequest from '../../src/utils/baseRequest';
import * as generateTokenModule from '../../src/utils/generateToken';
import type { Config } from '../../src/types/config';

vi.mock('axios');
vi.mock('uuid');
vi.mock('https');
vi.mock('../../src/utils/generateToken');

interface MockAxiosInstance {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
}

interface MockAxios {
  create: ReturnType<typeof vi.fn>;
}

const mockAxios = axios as unknown as MockAxios;
const mockUuidv4 = uuidv4 as ReturnType<typeof vi.fn>;
const mockHttpsAgent = https.Agent as unknown as ReturnType<typeof vi.fn>;

describe('baseRequest', () => {
  let mockAxiosInstance: MockAxiosInstance;
  let mockConfig: Config;

  beforeEach(() => {
    mockAxiosInstance = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn()
    };

    mockAxios.create.mockReturnValue(mockAxiosInstance as unknown as AxiosInstance);
    mockUuidv4.mockReturnValue('test-uuid-1234');
    mockHttpsAgent.mockImplementation(() => ({} as https.Agent));

    vi.spyOn(generateTokenModule, 'generateTokenWithJWT').mockReturnValue('mock-jwt-token');
    vi.spyOn(generateTokenModule, 'getAccessTokenWithCredential').mockResolvedValue('mock-access-token');

    mockConfig = {
      baseUrl: 'https://api.example.com',
      tenantId: 'test-tenant',
      secret: 'test-secret',
      signee: 'test-signee'
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create axios instance with default configuration', async () => {
    const result = await baseRequest(mockConfig);

    expect(mockAxios.create).toHaveBeenCalledWith({
      timeout: 29000,
      baseURL: 'https://api.example.com',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'JWT-Token': 'mock-jwt-token',
        Authorization: undefined,
        'trace-id': 'RequestUUID=test-uuid-1234',
        tenantId: 'test-tenant'
      },
      httpsAgent: expect.any(Object)
    });

    expect(result).toBe(mockAxiosInstance);
  });

  it('should use custom timeout from axiosConfig', async () => {
    const configWithCustomTimeout = {
      ...mockConfig,
      axiosConfig: {
        timeout: 15000
      }
    };

    await baseRequest(configWithCustomTimeout);

    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        timeout: 15000
      })
    );
  });

  it('should use custom traceId when provided', async () => {
    const configWithTraceId = {
      ...mockConfig,
      traceId: 'custom-trace-id'
    };

    await baseRequest(configWithTraceId);

    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          'trace-id': 'custom-trace-id'
        })
      })
    );
  });

  it('should generate JWT token when secret is provided', async () => {
    await baseRequest(mockConfig);

    expect(generateTokenModule.generateTokenWithJWT).toHaveBeenCalledWith('test-secret', 'test-signee');
    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          'JWT-Token': 'mock-jwt-token'
        })
      })
    );
  });

  it('should not include JWT-Token header when secret is not provided', async () => {
    const configWithoutSecret = {
      ...mockConfig,
      secret: undefined
    };

    await baseRequest(configWithoutSecret);

    expect(generateTokenModule.generateTokenWithJWT).not.toHaveBeenCalled();
    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          'JWT-Token': undefined
        })
      })
    );
  });

  it('should use credential-based authentication when credential is provided', async () => {
    const configWithCredential = {
      ...mockConfig,
      secret: undefined,
      credential: {
        client_secret: 'test-client-secret',
        grant_type: 'password',
        client_id: 'test-client-id',
        username: 'test-user',
        password: 'test-password'
      }
    };

    await baseRequest(configWithCredential);

    expect(generateTokenModule.getAccessTokenWithCredential).toHaveBeenCalledWith(
      '',
      'https://api.example.com',
      'test-tenant',
      configWithCredential.credential
    );

    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer mock-access-token'
        })
      })
    );
  });

  it('should configure https agent with correct options', async () => {
    const configWithKeepAlive = {
      ...mockConfig,
      axiosConfig: {
        keepAlive: true
      }
    };

    await baseRequest(configWithKeepAlive);

    expect(mockHttpsAgent).toHaveBeenCalledWith({
      rejectUnauthorized: true,
      keepAlive: true
    });
  });

  it('should call logger function when provided', async () => {
    const mockLogger = vi.fn();
    const configWithLogger = {
      ...mockConfig,
      logger: mockLogger
    };

    await baseRequest(configWithLogger);

    expect(mockLogger).toHaveBeenCalledWith(mockAxiosInstance);
  });

  it('should handle default signee when not provided', async () => {
    const configWithoutSignee = {
      ...mockConfig,
      signee: undefined
    };

    await baseRequest(configWithoutSignee);

    expect(generateTokenModule.generateTokenWithJWT).toHaveBeenCalledWith('test-secret', '');
  });

  it('should generate UUID for trace-id when not provided', async () => {
    const configWithoutTraceId = {
      ...mockConfig,
      traceId: undefined
    };

    await baseRequest(configWithoutTraceId);

    expect(mockUuidv4).toHaveBeenCalled();
    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          'trace-id': 'RequestUUID=test-uuid-1234'
        })
      })
    );
  });

  it('should handle both JWT and credential authentication', async () => {
    const configWithBoth = {
      ...mockConfig,
      credential: {
        client_secret: 'test-client-secret',
        grant_type: 'password',
        client_id: 'test-client-id',
        username: 'test-user',
        password: 'test-password'
      }
    };

    await baseRequest(configWithBoth);

    expect(generateTokenModule.generateTokenWithJWT).toHaveBeenCalledWith('test-secret', 'test-signee');
    expect(generateTokenModule.getAccessTokenWithCredential).toHaveBeenCalled();

    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          'JWT-Token': 'mock-jwt-token',
          Authorization: 'Bearer mock-access-token'
        })
      })
    );
  });

  it('should use bearer token when provided with Bearer prefix', async () => {
    const configWithBearerToken = {
      ...mockConfig,
      secret: undefined,
      bearerToken: 'Bearer abc123token'
    };

    await baseRequest(configWithBearerToken);

    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer abc123token'
        })
      })
    );
  });

  it('should automatically add Bearer prefix when bearerToken is provided without it', async () => {
    const configWithBearerToken = {
      ...mockConfig,
      secret: undefined,
      bearerToken: 'abc123token'
    };

    await baseRequest(configWithBearerToken);

    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer abc123token'
        })
      })
    );
  });

  it('should prioritize bearerToken over credential authentication', async () => {
    const configWithBoth = {
      ...mockConfig,
      secret: undefined,
      bearerToken: 'token123',
      credential: {
        client_secret: 'test-client-secret',
        grant_type: 'password',
        client_id: 'test-client-id',
        username: 'test-user',
        password: 'test-password'
      }
    };

    await baseRequest(configWithBoth);

    expect(generateTokenModule.getAccessTokenWithCredential).not.toHaveBeenCalled();
    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer token123'
        })
      })
    );
  });

  it('should handle empty bearerToken gracefully', async () => {
    const configWithEmptyBearerToken = {
      ...mockConfig,
      secret: undefined,
      bearerToken: ''
    };

    await baseRequest(configWithEmptyBearerToken);

    expect(mockAxios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: ''
        })
      })
    );
  });

  it('should return the created axios instance', async () => {
    const result = await baseRequest(mockConfig);

    expect(result).toBe(mockAxiosInstance);
    expect(typeof result.get).toBe('function');
    expect(typeof result.post).toBe('function');
    expect(typeof result.put).toBe('function');
    expect(typeof result.delete).toBe('function');
  });
});
