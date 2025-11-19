import baseRequest from '../../utils/baseRequest';
import type { Command, Config } from '../../types';
import { handleAxiosError, createCommandError } from '../../utils/errorHandler';
import { z } from 'zod';
import {
  PaymentFiltersSchema,
  validateCreatePaymentInput,
  validateUpdatePaymentInput,
  type Payment,
  type CreatePaymentInput,
  type UpdatePaymentInput,
  type PaymentResponse,
  type PaymentFilters,
  ProcessOutput
} from '../../types/payment';

export const CreatePayment = (params: { payment: CreatePaymentInput, tenantId?: string }): Command<{ payment: CreatePaymentInput, tenantId?: string }, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'CreatePayment',
      path: '/v1/payments',
      method: 'POST'
    },
    execute: async (config: Config) => {
      // Validate input using validation function
      try {
        validateCreatePaymentInput(params.payment);
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

      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>('/v1/payments', params.payment);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetPayment = (params: { id: number, tenantId?: string }): Command<{ id: number; tenantId?: string }, Payment> => {
  return {
    input: params,
    metadata: {
      commandName: 'GetPayment',
      path: `/v1/payments/${params.id}`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<any>(`/v1/payments/${params.id}`);
        // The API returns a single payment object, not a PaymentResponse
        const paymentData = response.data;
        return paymentData;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdatePayment = (params: { id: number, payment: UpdatePaymentInput, tenantId?: string }): Command<{ id: number, payment: UpdatePaymentInput, tenantId?: string }, Payment> => {
  return {
    input: params,
    metadata: {
      commandName: 'UpdatePayment',
      path: `/v1/payments/${params.id}`,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      // Validate input using validation function
      try {
        validateUpdatePaymentInput(params.payment);
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

      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<Payment>(`/v1/payments/${params.id}`, params.payment);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const ListPayments = (params: PaymentFilters & { tenantId?: string }): Command<PaymentFilters & { tenantId?: string }, PaymentResponse> => {
  return {
    input: params,
    metadata: {
      commandName: 'ListPayments',
      path: '/v1/payments',
      method: 'GET'
    },
    execute: async (config: Config) => {
      // Validate input using Zod schema
      const validatedParams = PaymentFiltersSchema.parse(params);

      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      // Always include default query parameters
      const defaultParams = {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC'
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
        const queryParams = {
          ...defaultParams,
          ...applyDefaultDateFormat(validatedParams as Record<string, any>)
        };

        if (params.limit === 0) {
          // Fetch all records using pagination
          const allPayments: Array<Payment> = [];
          const pageLimit = 200;
          let currentOffset = params.offset || 0;
          let totalFilteredRecords = 0;

          do {
            const paginationParams = {
              ...queryParams,
              limit: pageLimit,
              offset: currentOffset
            };

            const response = await axiosInstance.get<PaymentResponse>('/v1/payments', { params: paginationParams });
            const { totalFilteredRecords: total, pageItems } = response.data;

            allPayments.push(...pageItems);
            totalFilteredRecords = total;
            currentOffset += pageLimit;
          } while (currentOffset < totalFilteredRecords);

          return { totalFilteredRecords, pageItems: allPayments };
        } else {
          const response = await axiosInstance.get<PaymentResponse>('/v1/payments', { params: queryParams });
          return response.data;
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetPayments = (params: PaymentFilters, configuration: { tenantId?: string } = {}): Command<{params: PaymentFilters, configuration: { tenantId?: string }}, PaymentResponse> => {
  return {
    input: { params, configuration },
    metadata: {
      commandName: 'GetPayments',
      path: '/v1/payments',
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (configuration.tenantId) {
        config.tenantId = configuration.tenantId;
      }
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

        const response = await axiosInstance.get<PaymentResponse>('/v1/payments', { params: queryParams });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const DeletePayment = (params: { id: number, tenantId?: string }): Command<{ id: number, tenantId?: string }, void> => {
  return {
    input: params,
    metadata: {
      commandName: 'DeletePayment',
      path: `/v1/payments/${params.id}`,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        await axiosInstance.delete(`/v1/payments/${params.id}`);
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
