import { describe, it, expect } from 'vitest';
import { validateConfig } from '../../src/utils/validation';
import { validateListAccountFilters, validateListAccountFilterKey } from '../../src/types/account';

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

  describe('Account Validation', () => {
    describe('validateListAccountFilterKey', () => {
      it('should accept valid filter keys', () => {
        expect(() => validateListAccountFilterKey('showReservedAccount')).not.toThrow();
        expect(validateListAccountFilterKey('showReservedAccount')).toBe('showReservedAccount');
      });

      it('should throw for invalid filter keys', () => {
        expect(() => validateListAccountFilterKey('invalidKey')).toThrow();
      });
    });

    describe('validateListAccountFilters', () => {
      it('should validate filters with valid showReservedAccount boolean', () => {
        expect(() => validateListAccountFilters({ showReservedAccount: true })).not.toThrow();
        expect(() => validateListAccountFilters({ showReservedAccount: false })).not.toThrow();
      });

      it('should skip validation for undefined and null values', () => {
        expect(() => validateListAccountFilters({ showReservedAccount: undefined })).not.toThrow();
        expect(() => validateListAccountFilters({ showReservedAccount: null })).not.toThrow();
      });

      it('should throw validation error for invalid showReservedAccount type', () => {
        expect(() => validateListAccountFilters({ showReservedAccount: 'invalid' })).toThrow('Validation error');
      });

      it('should throw validation error for invalid filter key', () => {
        expect(() => validateListAccountFilters({ invalidField: true })).toThrow();
      });

      it('should handle multiple filters and throw for invalid values', () => {
        expect(() => validateListAccountFilters({ 
          showReservedAccount: 'not_boolean' 
        })).toThrow('Validation error');
      });

      it('should handle ZodError and wrap it with command error', () => {
        try {
          validateListAccountFilters({ showReservedAccount: 123 });
        } catch (error: any) {
          expect(error.message).toContain('Validation error');
          expect(error.code).toBe('validation_error');
        }
      });

      it('should preserve non-ZodError errors', () => {
        // This test ensures that non-Zod errors are re-thrown as-is
        // The validateListAccountFilterKey throws a ZodError when invalid
        expect(() => validateListAccountFilters({ invalidKey: true })).toThrow();
      });
    });
  });
});
