import { z } from 'zod';
import {
  validateCreatePaymentInput,
  validateUpdatePaymentInput,
  Payment,
  CreatePaymentInput,
  UpdatePaymentInput,
  PaymentResponse,
  PaymentFilters,
  ProcessOutput
} from '../../types/payment';
import { Command, Config } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError, createCommandError } from '../../utils/errorHandler';

export const CreatePayment = (payment: CreatePaymentInput): Command<{ payment: CreatePaymentInput }, ProcessOutput> => {
  const path = '/v1/payments';

  return {
    input: { payment },
    metadata: {
      commandName: 'CreatePayment',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      // Validate input using validation function
      try {
        validateCreatePaymentInput(payment);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw createCommandError({
            message: `Invalid payment data: ${error.errors.map(e => e.message).join(', ')}`,
            code: 'invalid_payment_input'
          });
        }
        // Re-throw non-Zod errors
        throw error;
      }

      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(path, payment);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetPayment = (id: number): Command<{ id: number }, Payment> => {
  const path = `/v1/payments/${id}`;

  return {
    input: { id },
    metadata: {
      commandName: 'GetPayment',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<any>(path);
        // The API returns a single payment object, not a PaymentResponse
        const paymentData = response.data;
        return paymentData;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdatePayment = (id: number, payment: UpdatePaymentInput): Command<{ id: number; payment: UpdatePaymentInput }, Payment> => {
  const path = `/v1/payments/${id}`;

  return {
    input: { id, payment },
    metadata: {
      commandName: 'UpdatePayment',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      // Validate input using validation function
      try {
        validateUpdatePaymentInput(payment);
      } catch (error) {
        if (error instanceof z.ZodError) {
          throw createCommandError({
            message: `Invalid payment update data: ${error.errors.map(e => e.message).join(', ')}`,
            code: 'invalid_payment_update_input'
          });
        }
        // Re-throw non-Zod errors
        throw error;
      }

      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<Payment>(path, payment);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetPayments = (params: PaymentFilters): Command<{ params: PaymentFilters }, PaymentResponse> => {
  const path = '/v1/payments';

  return {
    input: { params },
    metadata: {
      commandName: 'GetPayments',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      // Always include default query parameters
      const defaultParams = {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC',
        limit: 20,
        offset: 0
      };

      // Apply default date format if needed
      const applyDefaultDateFormat = (inputParams: Record<string, any>) => {
        const dateFilterKeys = [
          'fromValueDate',
          'toValueDate',
          'fromExecuteDate',
          'toExecuteDate',
          'fromReturnDate',
          'toReturnDate'
        ];

        const hasDateFilter = dateFilterKeys.some((k) => inputParams[k] !== undefined);
        const paramsCopy = { ...inputParams };
        if (hasDateFilter && paramsCopy.dateFormat === undefined) {
          paramsCopy.dateFormat = 'yyyy-MM-dd';
        }
        return paramsCopy;
      };

      try {
        const processedParams = applyDefaultDateFormat(params as Record<string, any>);

        // Build queryParams with defaults and user-provided values
        // Use default limit=20 if not provided or if limit=0
        // Use default offset=0 if not provided
        const queryParams = {
          ...defaultParams,
          ...processedParams,
          limit: (processedParams.limit !== undefined && processedParams.limit !== 0) ? processedParams.limit : 20,
          offset: processedParams.offset !== undefined ? processedParams.offset : 0
        };

        const response = await axiosInstance.get<PaymentResponse>(path, { params: queryParams });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const DeletePayment = (id: number): Command<{ id: number }, void> => {
  const path = `/v1/payments/${id}`;

  return {
    input: { id },
    metadata: {
      commandName: 'DeletePayment',
      path,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        await axiosInstance.delete(path);
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
