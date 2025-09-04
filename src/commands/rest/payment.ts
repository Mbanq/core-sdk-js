import baseRequest from '../../utils/baseRequest';
import type { Command, Config } from '../../types';
import { handleAxiosError, createCommandError } from '../../utils/errorHandler';
import {
  validateCreatePaymentInput,
  validateUpdatePaymentInput,
  validatePayment,
  type Payment,
  type CreatePaymentInput,
  type UpdatePaymentInput,
  type PaymentResponse,
  type PaymentFilters,
  ProcessOutput,
  validateFilterKey,
  validateFilterValue
} from '../../types/payment';
import { ZodError } from 'zod';

export const CreatePayment = (params: { payment: CreatePaymentInput, tenantId?: string }): Command<{ payment: CreatePaymentInput, tenantId?: string }, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'CreatePayment',
      path: '/v1/payments',
      method: 'POST'
    },
    execute: async (config: Config) => {
      try {
        validateCreatePaymentInput(params.payment);
      } catch (error) {
        if (error instanceof ZodError) {
          throw createCommandError({
            message: `Invalid payment data: ${error.message}`,
            code: 'invalid_payment_input'
          });
        }
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
        const response = await axiosInstance.get<Payment>(`/v1/payments/${params.id}`);
        return validatePayment(response.data);
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
      // Validate input using Zod
      try {
        validateUpdatePaymentInput(params.payment);
      } catch (error) {
        if (error instanceof ZodError) {
          throw createCommandError({
            message: `Invalid payment update data: ${error.message}`,
            code: 'invalid_payment_update_input'
          });
        }
        throw error;
      }

      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<Payment>(`/v1/payments/${params.id}`, params.payment);
        return validatePayment(response.data);
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

const createPaymentQuery = (filters: Record<string, any>, limit?: number, offset?: number, tenantId?: string) => {
  // Validate parameters
  if (limit !== undefined && limit !== 0 && limit <= 0) {
    throw createCommandError({
      message: `Invalid limit: ${limit}. Limit must be positive or 0 for fetching all records.`,
      code: 'invalid_limit'
    });
  }

  if (offset !== undefined && offset < 0) {
    throw createCommandError({
      message: `Invalid offset: ${offset}. Offset must be non-negative.`,
      code: 'invalid_offset'
    });
  }

  const buildCommand = (): Command<any, PaymentResponse> => {
    // Always include default query parameters
    const defaultParams = {
      locale: 'en',
      originatedBy: 'us',
      orderBy: 'id',
      sortOrder: 'DESC'
    };

    const queryParams = {
      ...defaultParams,
      ...filters,
      limit: limit || 20,
      offset: offset || 0
    };

    return {
      input: { filters, limit, offset, tenantId },
      metadata: {
        commandName: 'ListPayments',
        path: '/v1/payments',
        method: 'GET'
      },
      execute: async (config: Config) => {
        if (tenantId) {
          config.tenantId = tenantId;
        }
        const axiosInstance = await baseRequest(config);

        try {
          // If limit is 0, fetch all records using pagination
          if (limit === 0) {
            const allPayments: Array<Payment> = [];
            const pageLimit = 200;
            let currentOffset = offset || 0;
            let totalFilteredRecords = 0;

            do {
              const paginationParams = {
                ...defaultParams,
                ...filters,
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
            // Regular paginated request
            const response = await axiosInstance.get<PaymentResponse>('/v1/payments', { params: queryParams });
            return response.data;
          }
        } catch (error) {
          handleAxiosError(error);
        }
      }
    };
  };

  const queryMethods = {
    where: (field: string) => {
      validateFilterKey(field);
      return {
        eq: (value: any) => {
          validateFilterValue(field, value);
          return createPaymentQuery({ ...filters, [field]: value }, limit, offset, tenantId);
        }
      };
    },
    limit: (value: number) => createPaymentQuery(filters, value, offset, tenantId),
    offset: (value: number) => createPaymentQuery(filters, limit, value, tenantId),
    all: () => createPaymentQuery(filters, 0, offset, tenantId), // Set limit to 0 to fetch all records
    execute: buildCommand
  };

  return queryMethods;
};

export const ListPayments = (params?: { tenantId?: string }) => {
  return {
    list: () => createPaymentQuery({}, undefined, undefined, params?.tenantId)
  };
};

export const GetPayments = (params: PaymentFilters, configuration?: { tenantId?: string }) : Command<{params: PaymentFilters, configuration?: { tenantId?: string }}, PaymentResponse> => {
  return {
    input: { params, configuration },
    metadata: {
      commandName: 'GetPayments',
      path: `/v1/payments`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      const allTransfers: Array<Payment> = [];
      const limit = params.limit || 20;
      let offset = params.offset || 0;
      let totalFilteredRecords = 0;

      // Always include default query parameters
      const defaultParams = {
        locale: 'en',
        originatedBy: 'us',
        orderBy: 'id',
        sortOrder: 'DESC'
      };

      // Extracted helper: If any date-range filters are present and dateFormat
      // isn't provided, set a sensible default so the API receives consistent
      // date strings.
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
        if (params.limit === 0) {
          do {
            const newParams = {
              ...defaultParams,
              ...applyDefaultDateFormat(params as Record<string, any>),
              limit,
              offset
            };
            const response = await axiosInstance.get<PaymentResponse>(`/v1/payments`, { params: newParams });
            const { totalFilteredRecords: total, pageItems } = response.data;
            allTransfers.push(...pageItems);
            totalFilteredRecords = total;
            offset += limit;
          } while (offset < totalFilteredRecords);
          return { totalFilteredRecords, pageItems: allTransfers };
        } else {
          const newParams = {
            ...defaultParams,
            ...applyDefaultDateFormat(params as Record<string, any>),
            limit,
            offset
          };
          const response = await axiosInstance.get<PaymentResponse>('/v1/payments', { params: newParams });
          return response.data;
        }
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
