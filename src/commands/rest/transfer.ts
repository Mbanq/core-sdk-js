import {
  CreateTransferInput,
  CreateTransferOutput,
  GetTransferInput,
  MarkAsReturnInput,
  PaymentRail,
  ProcessOutput, Transfer, TransferResponse,
  UpdateTraceNumbersInput
} from '../../types/transfer';
import baseRequest from '../../utils/baseRequest';
import type { Command, Config } from '../../types';
import { handleAxiosError, createCommandError } from '../../utils/errorHandler';
import axios from 'axios';
import { VALID_PAYMENT_RAIL_VALUES, VALID_PAYMENT_TYPE_VALUES, VALID_SORT_ORDER_VALUES, VALID_STATUS_VALUES } from '../../utils/validation';
import { VALID_PAYMENT_FILTER_KEYS } from '../../types/payment';

const validateFilterKey = (key: string): void => {
  if (!VALID_PAYMENT_FILTER_KEYS.includes(key as any)) {
    throw createCommandError({
      message: `Invalid filter key: '${key}'. Valid keys are: ${VALID_PAYMENT_FILTER_KEYS.join(', ')}`,
      code: 'invalid_filter_key'
    });
  }
};

const validateFilterValue = (key: string, value: any): void => {
  if (key === 'status' && !VALID_STATUS_VALUES.includes(value)) {
    throw createCommandError({
      message: `Invalid status value: '${value}'. Valid statuses are: ${VALID_STATUS_VALUES.join(', ')}`,
      code: 'invalid_status_value'
    });
  }

  if (key === 'paymentRail' && !VALID_PAYMENT_RAIL_VALUES.includes(value)) {
    throw createCommandError({
      message: `Invalid paymentRail value: '${value}'. Valid payment rails are: ${VALID_PAYMENT_RAIL_VALUES.join(', ')}`,
      code: 'invalid_payment_rail_value'
    });
  }

  if (key === 'paymentType' && !VALID_PAYMENT_TYPE_VALUES.includes(value)) {
    throw createCommandError({
      message: `Invalid paymentType value: '${value}'. Valid payment types are: ${VALID_PAYMENT_TYPE_VALUES.join(', ')}`,
      code: 'invalid_payment_type_value'
    });
  }

  if (key === 'sortOrder' && !VALID_SORT_ORDER_VALUES.includes(value)) {
    throw createCommandError({
      message: `Invalid sortOrder value: '${value}'. Valid sort orders are: ${VALID_SORT_ORDER_VALUES.join(', ')}`,
      code: 'invalid_sort_order_value'
    });
  }
};

export const CreateTransfer = (params: { transfer: CreateTransferInput, tenantId: string }): Command<{ transfer: CreateTransferInput, tenantId: string }, CreateTransferOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'CreateTransfer',
      path: `/v1/transfers`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<CreateTransferOutput>(`/v1/transfers`, params.transfer);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetTransfer = (params: { id: number, tenantId: string }): Command<{ id: number; tenantId: string }, any> => {
  return {
    input: params,
    metadata: {
      commandName: 'GetTransfer',
      path: `/v1/transfers/${params.id}`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<any>(`/v1/transfers/${params.id}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

const createPaymentQuery = (filters: Record<string, any>, limit?: number, offset?: number, tenantId?: string) => {
  const buildCommand = (): Command<any, Array<Transfer>> => {
    const params: GetTransferInput = {
      tenantId,
      transferStatus: filters.status || 'EXECUTION_SCHEDULED',
      paymentType: filters.paymentType,
      executedAt: filters.executedAt,
      accountType: filters.accountType,
      queryLimit: limit || 200
    };

    const enrichedParams = {
      paymentType: params.paymentType,
      status: params.transferStatus || 'EXECUTION_SCHEDULED',
      toExecuteDate: params.executedAt,
      locale: 'en',
      dateFormat: 'yyyy-MM-dd',
      associateClientData: true,
      originatedBy: 'us',
      accountType: params.accountType
    };

    return {
      input: params,
      metadata: {
        commandName: 'GetTransfers',
        path: `/v1/transfers`,
        method: 'GET'
      },
      execute: async (config: Config) => {
        if (tenantId) {
          config.tenantId = tenantId;
        }
        const axiosInstance = await baseRequest(config);

        const allTransfers: Array<Transfer> = [];
        const queryLimit = limit || 200;
        let queryOffset = offset || 0;
        let totalFilteredRecords = 0;

        const newParams = {
          ...enrichedParams,
          limit: queryLimit,
          offset: queryOffset
        };

        try {
          do {
            const response = await axiosInstance.get<TransferResponse>(`/v1/transfers`, { params: newParams });
            const { totalFilteredRecords: total, pageItems } = response.data;
            allTransfers.push(...pageItems);
            totalFilteredRecords = total;
            queryOffset += queryLimit;

          } while (queryOffset < totalFilteredRecords && limit === undefined);

          if (limit !== undefined) {
            return allTransfers.slice(0, limit);
          }
          return allTransfers;
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

export const GetTransfers = (params?: { tenantId?: string }) => {
  return {
    list: () => createPaymentQuery({}, undefined, undefined, params?.tenantId)
  };
};

export const MarkAsSuccess = (
  params: { externalId: string; paymentType?: PaymentRail, tenantId?: string }
): Command<{ externalId: string; paymentType?: PaymentRail, tenantId?: string }, ProcessOutput> => {
  const enrichedParams = {
    ...params,
    paymentType: params.paymentType || 'ACH'
  };
  return {
    input: params,
    metadata: {
      commandName: 'MarkAsSuccess',
      path: `/v1/external-transfers?command=MARK_AS_SUCCESS`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(`/v1/external-transfers?command=MARK_AS_SUCCESS`, enrichedParams);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const MarkAsProcessing = (
  params: {
    externalId: string;
    fileUrl: string;
    paymentType: PaymentRail;
    traceNumbers: {
      outgoingTransfer: string;
    },
    tenantId?: string;
  }
): Command<{
  externalId: string;
  fileUrl: string;
  paymentType: PaymentRail;
  traceNumbers: {
    outgoingTransfer: string;
  }
  tenantId?: string;
}, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'MarkAsProcessing',
      path: `/v1/external-transfers?command=MARK_AS_PROCESSING`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(`/v1/external-transfers?command=MARK_AS_PROCESSING`, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const MarkAsReturned = (
  params: MarkAsReturnInput
): Command<MarkAsReturnInput, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'MarkAsReturned',
      path: `/v1/external-transfers?command=MARK_AS_RETURN`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(`/v1/external-transfers?command=MARK_AS_RETURN`, { ...params });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const LogFailTransfer = (
  params: { payload: Transfer, tenantId?: string }
): Command<{ payload: Transfer, tenantId?: string }, ProcessOutput> => {

  const enrichedParams = {
    ...params.payload
  };
  return {
    input: params,
    metadata: {
      commandName: 'LogFailTransfer',
      path: `/v1/external-transfers?command=LOG_FAILURE`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(`/v1/external-transfers?command=LOG_FAILURE`, enrichedParams);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw createCommandError({
            message: 'LogFailTransfer command failed',
            statusCode: error.response?.status,
            code: error.code,
            requestId: error.response?.headers?.['x-request-id'] as string,
            originalError: error
          });
        }
        throw error;
      }
    }
  };
};

export const MarkAsFail = (
  params: { externalId: string, errorMessage: string, paymentType: PaymentRail, tenantId?: string }
): Command<{ externalId: string, errorMessage: string, paymentType: PaymentRail, tenantId?: string }, ProcessOutput> => {

  return {
    input: params,
    metadata: {
      commandName: 'MarkAsFail',
      path: `/v1/external-transfers?command=MARK_AS_FAIL`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(`/v1/external-transfers?command=MARK_AS_FAIL`, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateTraceNumber = (
  params: UpdateTraceNumbersInput
): Command<UpdateTraceNumbersInput, ProcessOutput> => {

  const enrichedParams = {
    traceNumbers: params.traceNumbers
  };
  return {
    input: params,
    metadata: {
      commandName: 'UpdateTraceNumber',
      path: `/v1/external-transfers/${params.externalId}`,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ProcessOutput>(`/v1/external-transfers/${params.externalId}`, enrichedParams);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
