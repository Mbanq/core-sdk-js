import axios, { AxiosError } from 'axios';
import type { ApiError } from '../types/error';

/**
 * Safely converts any value to a string for error messages
 */
const ensureString = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (value === null || value === undefined) {
    return 'Unknown error';
  }

  if (typeof value === 'object') {
    try {
      // Try to extract message from object
      if ('message' in value && typeof value.message === 'string') {
        return value.message;
      }
      // Otherwise stringify the object
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  return String(value);
};

export const createCommandError = ({ message, statusCode, code, requestId, originalError }: Omit<ApiError, 'name'>): ApiError => {
  // Create an actual Error instance instead of a plain object
  const error = new Error(ensureString(message)) as ApiError;

  // Add ApiError properties
  error.name = 'CommandError';
  error.statusCode = statusCode;
  error.code = code;
  error.requestId = requestId;
  error.originalError = originalError;

  return error;
};

export const isCommandError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    (error as ApiError).name === 'CommandError'
  );
};

const cleanAxiosError = (error: Error | AxiosError): Error => {
  if (!error || typeof error !== 'object') return error;

  // Don't spread the error - work with it directly to preserve Error prototype
  try {
    // Clean up circular references and large objects from httpsAgent
    if ('config' in error && error.config && typeof error.config === 'object') {
      const config = error.config as any;
      if (config.httpsAgent && typeof config.httpsAgent === 'object') {
        // Delete problematic properties that cause serialization issues
        delete config.httpsAgent.sockets;
        delete config.httpsAgent.freeSockets;
        delete config.httpsAgent._sessionCache;
      }
    }
  } catch (err) {
    // If cleaning fails, just return the original error
    // Better to have the full error than to break error handling
  }

  return error;
};

/**
 * Safely converts a value to a string, handling objects and arrays
 */
const safeStringify = (value: unknown): string | undefined => {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object') {
    try {
      // Try to extract common error message patterns from objects
      if ('message' in value && typeof value.message === 'string') {
        return value.message;
      }
      if ('error' in value && typeof value.error === 'string') {
        return value.error;
      }
      // If it's an object without a clear message, stringify it
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  return String(value);
};

export const handleAxiosError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    // Extract error details from various possible response formats
    const responseData = error.response?.data;
    // Status can be in error.response.status OR directly in error.status (serialized errors)
    const status = error.response?.status || (error as any).status;

    // Try to extract error message from different possible formats
    let errorMessage: string;
    let errorCode: string | undefined;

    if (responseData) {
      // Handle different API error response formats
      if (typeof responseData === 'string') {
        errorMessage = responseData;
      } else if (typeof responseData === 'object') {
        // Common formats: { message: '...' }, { error: '...' }, { errors: [...] }
        const possibleMessages = [
          safeStringify(responseData.message),
          safeStringify(responseData.error),
          safeStringify(responseData.userMessage),
          safeStringify(responseData.defaultUserMessage)
        ].filter(Boolean);

        // Handle errors array
        if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
          const errorMessages = responseData.errors
            .map((e: any) => safeStringify(e.message) || safeStringify(e.defaultUserMessage) || safeStringify(e))
            .filter(Boolean)
            .join(', ');
          if (errorMessages) {
            possibleMessages.push(errorMessages);
          }
        }

        errorMessage = possibleMessages[0] ||
          (status ? `Request failed with status code ${status}` : 'Request failed');

        // Extract error code if available
        errorCode =
          responseData.errorCode ||
          responseData.code ||
          responseData.error_code ||
          error.code;
      } else {
        errorMessage = status
          ? `Request failed with status code ${status}`
          : error.message || 'Request failed';
      }
    } else if (error.request && !error.response) {
      // Network error - request was made but no response received
      errorMessage = 'Network error: No response received from server';
      errorCode = 'NETWORK_ERROR';
    } else {
      // No response data, use error message or status
      errorMessage = error.message ||
        (status ? `Request failed with status code ${status}` : 'Request failed');
      errorCode = error.code;
    }

    throw createCommandError({
      message: errorMessage,
      statusCode: status,
      code: errorCode || error.code,
      requestId: error.response?.headers?.['x-request-id'] as string,
      originalError: cleanAxiosError(error)
    });
  }

  // If it's not an Axios error, convert it to a CommandError
  // This ensures all errors have proper string messages
  if (error instanceof Error) {
    throw createCommandError({
      message: error.message,
      code: 'UNKNOWN_ERROR',
      originalError: error
    });
  }

  // If it's not even an Error object, convert it to a string
  throw createCommandError({
    message: ensureString(error),
    code: 'UNKNOWN_ERROR'
  });
};

