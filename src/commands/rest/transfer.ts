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
import newDate from '../../utils/newDate';
import { handleAxiosError } from '../../utils/errorHandler';

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

export const GetTransfers = (params: GetTransferInput): Command<GetTransferInput, Array<Transfer>> => {
  const enrichedParams = {
    paymentType: params.paymentType || 'ACH',
    status: params.transferStatus || 'EXECUTION_SCHEDULED',
    toExecuteDate: params.executedAt || newDate().toISOString(true).slice(0, 10),
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
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      const allTransfers: Array<Transfer> = [];
      const limit = params.queryLimit || 200;
      let offset = 0;
      let totalFilteredRecords = 0;

      const newParams = {
        ...enrichedParams,
        limit,
        offset
      };

      try {
        do {
          const response = await axiosInstance.get<TransferResponse>(`/v1/transfers`, { params: newParams });
          const { totalFilteredRecords: total, pageItems } = response.data;
          allTransfers.push(...pageItems);
          totalFilteredRecords = total;
          offset += limit;

        } while (offset < totalFilteredRecords);
        return allTransfers;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const MarkAsSuccess = (
  params: { externalId: string; paymentType?: 'ACH' | 'SAMEDAYACH', tenantId?: string }
): Command<{ externalId: string; paymentType?: 'ACH' | 'SAMEDAYACH', tenantId?: string }, ProcessOutput> => {
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
        handleAxiosError(error);
      }
    }
  };
};

export const MarkAsFail = (
  params: { externalId: string, errorMessage: string, paymentType: 'ACH' | 'SAMEDAYACH', tenantId?: string }
): Command<{ externalId: string, errorMessage: string, paymentType: 'ACH' | 'SAMEDAYACH', tenantId?: string }, ProcessOutput> => {

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
