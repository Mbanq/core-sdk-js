import baseRequest from '../../utils/baseRequest';
import type { Command, Config } from '../../types';
import { handleAxiosError, createCommandError } from '../../utils/errorHandler';
import {
  CreatePaymentInputSchema,
  UpdatePaymentInputSchema,
  PaymentResponseSchema,
  PaymentFiltersSchema,
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
      // Validate input using Zod schema
      CreatePaymentInputSchema.parse(params.payment);

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
      // Validate input using Zod schema
      UpdatePaymentInputSchema.parse(params.payment);

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

export const GetPayments = (params: PaymentFilters & { tenantId?: string }): Command<PaymentFilters & { tenantId?: string }, PaymentResponse> => {
  return {
    input: params,
    metadata: {
      commandName: 'GetPayments',
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
