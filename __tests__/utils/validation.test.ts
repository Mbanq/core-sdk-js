import { describe, it, expect } from 'vitest';
import { validateConfig } from '../../src/utils/validation';

describe('Validation Utils', () => {
  describe('validateConfig', () => {
    it('should return no errors for valid config', () => {
      const config = {
        baseUrl: 'https://api.example.com',
        secret: 'test-secret',
        signee: 'test-signee',
        tenantId: 'test-tenant'
      };

      const errors = validateConfig(config);

      expect(errors).toEqual([]);
    });

    it('should return error when baseUrl is missing', () => {
      const config = {
        secret: 'test-secret'
      };

      const errors = validateConfig(config);

      expect(errors).toContain('baseUrl is required');
    });

    it('should return error when baseUrl is not a string', () => {
      const config = {
        baseUrl: 123 as unknown as string
      };

      const errors = validateConfig(config);

      expect(errors).toContain('baseUrl must be a string');
    });

    it('should return error when baseUrl is invalid URL', () => {
      const config = {
        baseUrl: 'invalid-url'
      };

      const errors = validateConfig(config);

      expect(errors).toContain('baseUrl must be a valid URL');
    });

    it('should return error when timeout is negative', () => {
      const config = {
        baseUrl: 'https://api.example.com',
        axiosConfig: {
          timeout: -1000
        }
      };

      const errors = validateConfig(config);

      expect(errors).toContain('timeout must be a positive number');
    });

    it('should return error when timeout is not a number', () => {
      const config = {
        baseUrl: 'https://api.example.com',
        axiosConfig: {
          timeout: 'invalid' as unknown as number
        }
      };

      const errors = validateConfig(config);

      expect(errors).toContain('timeout must be a positive number');
    });

    it('should allow valid timeout', () => {
      const config = {
        baseUrl: 'https://api.example.com',
        axiosConfig: {
          timeout: 5000
        }
      };

      const errors = validateConfig(config);

      expect(errors).toEqual([]);
    });

    it('should return multiple errors for multiple invalid fields', () => {
      const config = {
        baseUrl: 'invalid-url',
        axiosConfig: {
          timeout: -1000
        }
      };

      const errors = validateConfig(config);

      expect(errors).toContain('baseUrl must be a valid URL');
      expect(errors).toContain('timeout must be a positive number');
      expect(errors).toHaveLength(2);
    });

    it('should handle missing axiosConfig gracefully', () => {
      const config = {
        baseUrl: 'https://api.example.com'
      };

      const errors = validateConfig(config);

      expect(errors).toEqual([]);
    });

    it('should handle undefined timeout in axiosConfig', () => {
      const config = {
        baseUrl: 'https://api.example.com',
        axiosConfig: {
          timeout: undefined
        }
      };

      const errors = validateConfig(config);

      expect(errors).toEqual([]);
    });

    it('should allow zero timeout', () => {
      const config = {
        baseUrl: 'https://api.example.com',
        axiosConfig: {
          timeout: 0
        }
      };

      const errors = validateConfig(config);

      expect(errors).toEqual([]);
    });
  });
});
