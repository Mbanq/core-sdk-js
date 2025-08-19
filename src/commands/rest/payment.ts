import baseRequest from '../../utils/baseRequest';
import type { Command, Config } from '../../types';
import { handleAxiosError, createCommandError } from '../../utils/errorHandler';
import {
  validatePaymentFilterKey,
  validatePaymentStatus,
  validatePaymentRail,
  validatePaymentType,
  validateSortOrder,
  validateCreatePaymentInput,
  validateUpdatePaymentInput,
  validatePayment,
  type Payment,
  type CreatePaymentInput,
  type UpdatePaymentInput,
  type PaymentResponse
} from '../../types/payment';
import { ZodError } from 'zod';

const validateFilterKey = (key: string): void => {
  try {
    validatePaymentFilterKey(key);
  } catch (error) {
    if (error instanceof ZodError) {
      throw createCommandError({
        message: `Invalid filter key: '${key}'. ${error.message}`,
        code: 'invalid_filter_key'
      });
    }
    throw error;
  }
};

const validateFilterValue = (key: string, value: any): void => {
  try {
    switch (key) {
      case 'status':
        validatePaymentStatus(value);
        break;
      case 'paymentRail':
        validatePaymentRail(value);
        break;
      case 'paymentType':
        validatePaymentType(value);
        break;
      case 'sortOrder':
        validateSortOrder(value);
        break;
      default:
        break;
    }
  } catch (error) {
    if (error instanceof ZodError) {
      throw createCommandError({
        message: `Invalid value for '${key}': '${value}'. ${error.message}`,
        code: `invalid_${key}_value`
      });
    }
    throw error;
  }
};

export const CreatePayment = (params: { payment: CreatePaymentInput, tenantId?: string }): Command<{ payment: CreatePaymentInput, tenantId?: string }, Payment> => {
  return {
    input: params,
    metadata: {
      commandName: 'CreatePayment',
      path: '/v1/transfers',
      method: 'POST'
    },
    execute: async (config: Config) => {
      // Validate input using Zod
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
        const response = await axiosInstance.post<Payment>('/v1/transfers', params.payment);
        return validatePayment(response.data);
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetPayment = (params: { id: string, tenantId?: string }): Command<{ id: string; tenantId?: string }, Payment> => {
  return {
    input: params,
    metadata: {
      commandName: 'GetPayment',
      path: `/v1/transfers/${params.id}`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<Payment>(`/v1/transfers/${params.id}`);
        return validatePayment(response.data);
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdatePayment = (params: { id: string, payment: UpdatePaymentInput, tenantId?: string }): Command<{ id: string, payment: UpdatePaymentInput, tenantId?: string }, Payment> => {
  return {
    input: params,
    metadata: {
      commandName: 'UpdatePayment',
      path: `/v1/transfers/${params.id}`,
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
        const response = await axiosInstance.put<Payment>(`/v1/transfers/${params.id}`, params.payment);
        return validatePayment(response.data);
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

const createPaymentQuery = (filters: Record<string, any>, limit?: number, offset?: number, tenantId?: string) => {
  const buildCommand = (): Command<any, Array<Payment>> => {
    const queryParams = {
      ...filters,
      limit: limit || 200,
      offset: offset || 0
    };

    return {
      input: { filters, limit, offset, tenantId },
      metadata: {
        commandName: 'GetPayments',
        path: '/v1/transfers',
        method: 'GET'
      },
      execute: async (config: Config) => {
        if (tenantId) {
          config.tenantId = tenantId;
        }
        const axiosInstance = await baseRequest(config);

        try {
          const response = await axiosInstance.get<PaymentResponse>('/v1/transfers', { params: queryParams });
          return response.data.pageItems;
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
    execute: buildCommand
  };

  return queryMethods;
};

export const GetPayments = (params?: { tenantId?: string }) => {
  return {
    list: () => createPaymentQuery({}, undefined, undefined, params?.tenantId)
  };
};

export const DeletePayment = (params: { id: string, tenantId?: string }): Command<{ id: string, tenantId?: string }, void> => {
  return {
    input: params,
    metadata: {
      commandName: 'DeletePayment',
      path: `/v1/transfers/${params.id}`,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        await axiosInstance.delete(`/v1/transfers/${params.id}`);
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
