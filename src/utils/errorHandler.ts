import axios, { AxiosError } from 'axios';
import type { ApiError } from '../types/error';

export const createCommandError = ({ message, statusCode, code, requestId, originalError }: Omit<ApiError, 'name'>): ApiError => ({
  name: 'CommandError',
  message,
  statusCode,
  code,
  requestId,
  originalError
});

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

  const cleaned = { ...error } as Record<string, unknown>;

  if (cleaned.config && typeof cleaned.config === 'object') {
    const config = cleaned.config as Record<string, unknown>;
    if (config.httpsAgent && typeof config.httpsAgent === 'object') {
      const httpsAgent = config.httpsAgent as Record<string, unknown>;
      delete httpsAgent.sockets;
      delete httpsAgent.freeSockets;
      delete httpsAgent._sessionCache;
    }
  }

  return cleaned as unknown as Error;
};

export const handleAxiosError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message;
    const defaultMessage = error.response?.status
      ? `Request failed with status code ${error.response.status}`
      : error.message || 'Request failed';

    throw createCommandError({
      message: responseMessage || defaultMessage,
      statusCode: error.response?.status,
      code: error.code,
      requestId: error.response?.headers?.['x-request-id'] as string,
      originalError: cleanAxiosError(error)
    });
  }
  throw error;
};
