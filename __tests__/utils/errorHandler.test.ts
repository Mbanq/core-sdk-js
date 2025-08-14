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

      expect(error).toEqual({
        name: 'CommandError',
        message: 'Test error',
        statusCode: 500,
        code: 'test_error',
        requestId: 'req-123',
        originalError
      });
    });

    it('should create command error with minimal properties', () => {
      const error = createCommandError({
        message: 'Simple error'
      });

      expect(error).toEqual({
        name: 'CommandError',
        message: 'Simple error',
        statusCode: undefined,
        code: undefined,
        requestId: undefined,
        originalError: undefined
      });
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

    it('should rethrow non-axios errors unchanged', () => {
      const regularError = new Error('Regular error');
      const isAxiosErrorSpy = vi.spyOn(axios, 'isAxiosError').mockReturnValue(false);

      expect(() => handleAxiosError(regularError)).toThrow('Regular error');

      try {
        handleAxiosError(regularError);
      } catch (error) {
        expect(error).toBe(regularError);
        expect(isCommandError(error)).toBe(false);
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
      const axiosError = Object.assign(() => {}, {
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
});
