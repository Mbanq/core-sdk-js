import { describe, it, expect, vi } from 'vitest';
import { createCommandError, isCommandError, handleAxiosError } from '../../src/utils/errorHandler';
import axios, { AxiosError } from 'axios';

describe('Error Handler Utils', () => {
  describe('createCommandError', () => {
    it('should create command error with all properties', () => {
      const originalError = new Error('Original error');
      const error = createCommandError({
        message: 'Test error',
        statusCode: 500,
        code: 'test_error',
        requestId: 'req-123',
        originalError
      });

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('CommandError');
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.code).toBe('test_error');
      expect(error.requestId).toBe('req-123');
      expect(error.originalError).toBe(originalError);
    });

    it('should create command error with minimal properties', () => {
      const error = createCommandError({
        message: 'Simple error'
      });

      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('CommandError');
      expect(error.message).toBe('Simple error');
      expect(error.statusCode).toBeUndefined();
      expect(error.code).toBeUndefined();
      expect(error.requestId).toBeUndefined();
      expect(error.originalError).toBeUndefined();
    });
  });

  describe('isCommandError', () => {
    it('should return true for command error', () => {
      const error = createCommandError({
        message: 'Test error'
      });

      expect(isCommandError(error)).toBe(true);
    });

    it('should return false for regular error', () => {
      const error = new Error('Regular error');

      expect(isCommandError(error)).toBe(false);
    });

    it('should return false for null', () => {
      expect(isCommandError(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isCommandError(undefined)).toBe(false);
    });

    it('should return false for string', () => {
      expect(isCommandError('error string')).toBe(false);
    });

    it('should return false for object without name property', () => {
      const error = { message: 'Some error' };

      expect(isCommandError(error)).toBe(false);
    });

    it('should return false for object with wrong name', () => {
      const error = { name: 'SomeOtherError', message: 'Some error' };

      expect(isCommandError(error)).toBe(false);
    });
  });

  describe('handleAxiosError', () => {
    it('should handle axios error with response data message', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 404,
          data: {
            message: 'Resource not found'
          }
        },
        message: 'Request failed'
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      expect(() => handleAxiosError(axiosError)).toThrow();

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Resource not found');
          expect(error.statusCode).toBe(404);
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle axios error without response data message', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 500,
          data: {}
        },
        message: 'Network Error'
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      expect(() => handleAxiosError(axiosError)).toThrow();

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Request failed with status code 500');
          expect(error.statusCode).toBe(500);
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle axios error without response', () => {
      const axiosError = {
        isAxiosError: true,
        message: 'Connection timeout'
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      expect(() => handleAxiosError(axiosError)).toThrow();

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Connection timeout');
          expect(error.statusCode).toBeUndefined();
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should convert non-axios errors to CommandError', () => {
      const regularError = new Error('Regular error');
      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);

      expect(() => handleAxiosError(regularError)).toThrow('Regular error');

      try {
        handleAxiosError(regularError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Regular error');
          expect(error.code).toBe('UNKNOWN_ERROR');
          expect(error.originalError).toBe(regularError);
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should clean axios error in originalError', () => {
      const axiosError = {
        isAxiosError: true,
        message: 'Test error',
        config: {
          httpsAgent: {
            sockets: {},
            freeSockets: {},
            _sessionCache: {}
          }
        }
      } as any;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error) && error.originalError) {
          const originalError = error.originalError as any;
          expect(originalError.config.httpsAgent.sockets).toBeUndefined();
          expect(originalError.config.httpsAgent.freeSockets).toBeUndefined();
          expect(originalError.config.httpsAgent._sessionCache).toBeUndefined();
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle axios error with falsy message', () => {
      const axiosError = {
        isAxiosError: true,
        message: '',
        response: undefined
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Request failed');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle cleanAxiosError with non-object error', () => {
      const axiosError = {
        isAxiosError: true,
        message: 'Test error'
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.originalError).toBeDefined();
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle axios error with config but no httpsAgent', () => {
      const axiosError = {
        isAxiosError: true,
        message: 'Test error',
        config: {
          url: 'https://example.com'
        }
      } as any;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.originalError).toBeDefined();
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle cleanAxiosError with null error', () => {
      const axiosError = {
        isAxiosError: true,
        message: 'Test error',
        config: null
      } as any;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.originalError).toBeDefined();
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle axios error that is not an object for cleanAxiosError', () => {
      const axiosError = Object.assign(() => { }, {
        isAxiosError: true,
        message: 'Function error'
      }) as any;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.originalError).toBeDefined();
        }
      }

      isAxiosErrorSpy.mockRestore();
    });
  });

  describe('createCommandError with ensureString', () => {
    it('should handle null message', () => {
      const error = createCommandError({
        message: null as any
      });

      expect(error.message).toBe('Unknown error');
    });

    it('should handle undefined message', () => {
      const error = createCommandError({
        message: undefined as any
      });

      expect(error.message).toBe('Unknown error');
    });

    it('should handle object with message property', () => {
      const error = createCommandError({
        message: { message: 'Error from object' } as any
      });

      expect(error.message).toBe('Error from object');
    });

    it('should handle object without message property', () => {
      const error = createCommandError({
        message: { code: 'ERROR_CODE', details: 'Some details' } as any
      });

      expect(error.message).toContain('code');
      expect(error.message).toContain('ERROR_CODE');
    });

    it('should handle non-serializable object', () => {
      const circular: any = { prop: 'value' };
      circular.self = circular;

      const error = createCommandError({
        message: circular as any
      });

      expect(error.message).toBeTruthy();
      expect(typeof error.message).toBe('string');
    });

    it('should handle number message', () => {
      const error = createCommandError({
        message: 404 as any
      });

      expect(error.message).toBe('404');
    });

    it('should handle boolean message', () => {
      const error = createCommandError({
        message: false as any
      });

      expect(error.message).toBe('false');
    });
  });

  describe('handleAxiosError with various response formats', () => {
    it('should handle response with error property', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: {
            error: 'Bad request error'
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Bad request error');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle response with userMessage property', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 403,
          data: {
            userMessage: 'Access forbidden'
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Access forbidden');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle response with defaultUserMessage property', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 500,
          data: {
            defaultUserMessage: 'Internal server error occurred'
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Internal server error occurred');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle response with errors array', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 422,
          data: {
            errors: [
              { message: 'Field is required' },
              { defaultUserMessage: 'Invalid format' }
            ]
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toContain('Field is required');
          expect(error.message).toContain('Invalid format');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle response with errors array containing objects', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 422,
          data: {
            errors: [
              { code: 'VALIDATION_ERROR', field: 'email' }
            ]
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBeTruthy();
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle string response data', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: 'Bad request - invalid input'
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Bad request - invalid input');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle error with errorCode in response', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 401,
          data: {
            message: 'Unauthorized',
            errorCode: 'AUTH_FAILED'
          }
        },
        code: 'ERR_BAD_REQUEST'
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.code).toBe('AUTH_FAILED');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle error with code in response', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: {
            message: 'Validation failed',
            code: 'VALIDATION_ERROR'
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.code).toBe('VALIDATION_ERROR');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle error with error_code in response', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 429,
          data: {
            message: 'Too many requests',
            error_code: 'RATE_LIMIT_EXCEEDED'
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.code).toBe('RATE_LIMIT_EXCEEDED');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle non-Error thrown value', () => {
      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);

      try {
        handleAxiosError('string error');
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('string error');
          expect(error.code).toBe('UNKNOWN_ERROR');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle number thrown value', () => {
      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);

      try {
        handleAxiosError(500);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('500');
          expect(error.code).toBe('UNKNOWN_ERROR');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle object thrown value', () => {
      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);

      try {
        handleAxiosError({ message: 'Custom error object' });
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Custom error object');
          expect(error.code).toBe('UNKNOWN_ERROR');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle response data with object message property via safeStringify', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: {
            message: { nested: 'error message' }
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBeTruthy();
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle response data with object error property via safeStringify', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: {
            error: { code: 'ERR_001', details: 'Error details' }
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBeTruthy();
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle response data with non-serializable object via safeStringify', () => {
      const circular: any = { prop: 'value' };
      circular.self = circular;

      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: {
            message: circular
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBeTruthy();
          expect(typeof error.message).toBe('string');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle response data with number type via safeStringify', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: {
            message: 12345
          }
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('12345');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle response data that is not string or object', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: 123
        }
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBe('Request failed with status code 400');
        }
      }

      isAxiosErrorSpy.mockRestore();
    });

    it('should handle response data as number without status', () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          data: 404
        },
        message: 'Not found'
      } as AxiosError;

      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(true);

      try {
        handleAxiosError(axiosError);
      } catch (error) {
        expect(isCommandError(error)).toBe(true);
        if (isCommandError(error)) {
          expect(error.message).toBeTruthy();
        }
      }

      isAxiosErrorSpy.mockRestore();
    });
  });
});
