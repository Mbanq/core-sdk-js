import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { generateTokenWithJWT, getAccessTokenWithCredential } from '../../src/utils/generateToken';
import type { Credential } from '../../src/types/config';

vi.mock('axios');
vi.mock('jsonwebtoken');

const mockAxios = axios as any;
const mockJwt = jwt as any;

describe('generateToken', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('generateTokenWithJWT', () => {
    it('should generate JWT token with correct parameters', () => {
      const mockToken = 'mock-jwt-token-12345';
      mockJwt.sign.mockReturnValue(mockToken);

      const result = generateTokenWithJWT('test-secret', 'test-signee');

      expect(mockJwt.sign).toHaveBeenCalledWith(
        { signee: 'test-signee' },
        'test-secret',
        {
          algorithm: 'HS512',
          expiresIn: '1d'
        }
      );

      expect(result).toBe(mockToken);
    });

    it('should handle empty signee', () => {
      const mockToken = 'mock-jwt-token-empty-signee';
      mockJwt.sign.mockReturnValue(mockToken);

      const result = generateTokenWithJWT('test-secret', '');

      expect(mockJwt.sign).toHaveBeenCalledWith(
        { signee: '' },
        'test-secret',
        {
          algorithm: 'HS512',
          expiresIn: '1d'
        }
      );

      expect(result).toBe(mockToken);
    });

    it('should throw error when secret is missing', () => {
      expect(() => {
        generateTokenWithJWT('', 'test-signee');
      }).toThrow('Missing JWT secret');

      expect(() => {
        generateTokenWithJWT(undefined as any, 'test-signee');
      }).toThrow('Missing JWT secret');

      expect(() => {
        generateTokenWithJWT(null as any, 'test-signee');
      }).toThrow('Missing JWT secret');
    });

    it('should return empty string when jwt.sign returns falsy value', () => {
      mockJwt.sign.mockReturnValue(null);

      const result = generateTokenWithJWT('test-secret', 'test-signee');

      expect(result).toBe('');
    });

    it('should return empty string when jwt.sign returns undefined', () => {
      mockJwt.sign.mockReturnValue(undefined);

      const result = generateTokenWithJWT('test-secret', 'test-signee');

      expect(result).toBe('');
    });

    it('should use HS512 algorithm with 1 day expiration', () => {
      mockJwt.sign.mockReturnValue('token');

      generateTokenWithJWT('secret', 'signee');

      expect(mockJwt.sign).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(String),
        expect.objectContaining({
          algorithm: 'HS512',
          expiresIn: '1d'
        })
      );
    });
  });

  describe('getAccessTokenWithCredential', () => {
    const mockCredential: Credential = {
      client_secret: 'test-client-secret',
      grant_type: 'password',
      client_id: 'test-client-id',
      username: 'test-username',
      password: 'test-password'
    };

    it('should request access token with correct parameters', async () => {
      const mockResponse = {
        data: {
          access_token: 'mock-access-token-12345',
          token_type: 'Bearer',
          expires_in: 3600
        }
      };

      mockAxios.request.mockResolvedValue(mockResponse);

      const result = await getAccessTokenWithCredential(
        'existing-token',
        'https://api.example.com',
        'test-tenant',
        mockCredential
      );

      expect(mockAxios.request).toHaveBeenCalledWith({
        method: 'POST',
        url: 'https://api.example.com/oauth/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          tenantId: 'test-tenant'
        },
        data: mockCredential
      });

      expect(result).toBe('mock-access-token-12345');
    });

    it('should handle different base URLs', async () => {
      const mockResponse = {
        data: {
          access_token: 'token-for-different-url'
        }
      };

      mockAxios.request.mockResolvedValue(mockResponse);

      await getAccessTokenWithCredential(
        '',
        'https://different-api.example.com',
        'different-tenant',
        mockCredential
      );

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://different-api.example.com/oauth/token',
          headers: expect.objectContaining({
            tenantId: 'different-tenant'
          })
        })
      );
    });

    it('should override existing token with new access token', async () => {
      const mockResponse = {
        data: {
          access_token: 'new-access-token'
        }
      };

      mockAxios.request.mockResolvedValue(mockResponse);

      const result = await getAccessTokenWithCredential(
        'old-token',
        'https://api.example.com',
        'test-tenant',
        mockCredential
      );

      expect(result).toBe('new-access-token');
    });

    it('should handle empty existing token', async () => {
      const mockResponse = {
        data: {
          access_token: 'first-access-token'
        }
      };

      mockAxios.request.mockResolvedValue(mockResponse);

      const result = await getAccessTokenWithCredential(
        '',
        'https://api.example.com',
        'test-tenant',
        mockCredential
      );

      expect(result).toBe('first-access-token');
    });

    it('should handle axios request errors', async () => {
      const mockError = new Error('OAuth request failed');
      mockAxios.request.mockRejectedValue(mockError);

      await expect(
        getAccessTokenWithCredential(
          'token',
          'https://api.example.com',
          'test-tenant',
          mockCredential
        )
      ).rejects.toThrow('OAuth request failed');
    });

    it('should return undefined when access_token is missing in response', async () => {
      const mockResponse = {
        data: {}
      };

      mockAxios.request.mockResolvedValue(mockResponse);

      const result = await getAccessTokenWithCredential(
        'token',
        'https://api.example.com',
        'test-tenant',
        mockCredential
      );

      expect(result).toBeUndefined();
    });

    it('should use POST method with correct content type', async () => {
      const mockResponse = {
        data: {
          access_token: 'test-token'
        }
      };

      mockAxios.request.mockResolvedValue(mockResponse);

      await getAccessTokenWithCredential(
        'token',
        'https://api.example.com',
        'test-tenant',
        mockCredential
      );

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        })
      );
    });

    it('should pass credential data correctly', async () => {
      const mockResponse = {
        data: {
          access_token: 'test-token'
        }
      };

      mockAxios.request.mockResolvedValue(mockResponse);

      const customCredential: Credential = {
        client_secret: 'custom-secret',
        grant_type: 'client_credentials',
        client_id: 'custom-client',
        username: 'custom-user',
        password: 'custom-pass'
      };

      await getAccessTokenWithCredential(
        'token',
        'https://api.example.com',
        'test-tenant',
        customCredential
      );

      expect(mockAxios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          data: customCredential
        })
      );
    });
  });
});
