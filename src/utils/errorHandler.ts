import type { ApiError } from '../types/error';
import axios from 'axios';

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
    error.name === 'CommandError'
  );
};

const cleanAxiosError = (error: any): any => {
  if (!error || typeof error !== 'object') return error;

  const cleaned = { ...error };

  if (cleaned.config?.httpsAgent) {
    delete cleaned.config.httpsAgent.sockets;
    delete cleaned.config.httpsAgent.freeSockets;
    delete cleaned.config.httpsAgent._sessionCache;
  }

  return cleaned;
};

export const handleAxiosError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw createCommandError({
      message: error.response?.data?.message || error.message,
      statusCode: error.response?.status,
      originalError: cleanAxiosError(error)
    });
  }
  throw error;
};
