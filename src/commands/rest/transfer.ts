import axios from 'axios';
import {
  CreateTransferInputSchema,
  PaymentRail,
  CreateTransferInput,
  CreateTransferOutput,
  GetTransferInput,
  MarkAsReturnInput,
  ProcessOutput,
  Transfer,
  TransferResponse,
  UpdateTraceNumbersInput
} from '../../types/transfer';
import { Command, Config } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError, createCommandError } from '../../utils/errorHandler';
import newDate from '../../utils/newDate';

export const CreateTransfer = (transfer: CreateTransferInput): Command<{ transfer: CreateTransferInput }, CreateTransferOutput> => {
  const path = `/v1/transfers`;

  return {
    input: { transfer },
    metadata: {
      commandName: 'CreateTransfer',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      // Validate input using Zod schema
      CreateTransferInputSchema.parse(transfer);

      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<CreateTransferOutput>(path, transfer);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetTransfer = (id: number): Command<{ id: number }, any> => {
  const path = `/v1/transfers/${id}`;

  return {
    input: { id },
    metadata: {
      commandName: 'GetTransfer',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<any>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetTransfers = (params: GetTransferInput): Command<{ params: GetTransferInput }, Array<Transfer>> => {
  const path = `/v1/transfers`;
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
    input: { params },
    metadata: {
      commandName: 'GetTransfers',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
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
          const response = await axiosInstance.get<TransferResponse>(path, { params: newParams });
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
  externalId: string,
  paymentType?: PaymentRail
): Command<{ externalId: string; paymentType?: PaymentRail }, ProcessOutput> => {
  const path = `/v1/external-transfers?command=MARK_AS_SUCCESS`;
  const enrichedParams = {
    externalId,
    paymentType: paymentType || 'ACH'
  };

  return {
    input: { externalId, paymentType },
    metadata: {
      commandName: 'MarkAsSuccess',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(path, enrichedParams);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const MarkAsProcessing = (
  externalId: string,
  fileUrl: string,
  paymentType: PaymentRail,
  traceNumbers: {
    outgoingTransfer: string;
  }
): Command<{
  externalId: string;
  fileUrl: string;
  paymentType: PaymentRail;
  traceNumbers: {
    outgoingTransfer: string;
  }
}, ProcessOutput> => {
  const path = `/v1/external-transfers?command=MARK_AS_PROCESSING`;

  return {
    input: { externalId, fileUrl, paymentType, traceNumbers },
    metadata: {
      commandName: 'MarkAsProcessing',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(path, { externalId, fileUrl, paymentType, traceNumbers });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const MarkAsReturned = (
  params: MarkAsReturnInput
): Command<{ params: MarkAsReturnInput }, ProcessOutput> => {
  const path = `/v1/external-transfers?command=MARK_AS_RETURN`;

  return {
    input: { params },
    metadata: {
      commandName: 'MarkAsReturned',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(path, { ...params });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const LogFailTransfer = (
  payload: Transfer
): Command<{ payload: Transfer }, ProcessOutput> => {
  const path = `/v1/external-transfers?command=LOG_FAILURE`;
  const enrichedParams = {
    ...payload
  };

  return {
    input: { payload },
    metadata: {
      commandName: 'LogFailTransfer',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(path, enrichedParams);
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
  externalId: string,
  errorMessage: string,
  paymentType: PaymentRail
): Command<{ externalId: string; errorMessage: string; paymentType: PaymentRail }, ProcessOutput> => {
  const path = `/v1/external-transfers?command=MARK_AS_FAIL`;

  return {
    input: { externalId, errorMessage, paymentType },
    metadata: {
      commandName: 'MarkAsFail',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(path, { externalId, errorMessage, paymentType });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateTraceNumber = (
  params: UpdateTraceNumbersInput
): Command<{ params: UpdateTraceNumbersInput }, ProcessOutput> => {
  const path = `/v1/external-transfers/${params.externalId}`;
  const enrichedParams = {
    traceNumbers: params.traceNumbers
  };

  return {
    input: { params },
    metadata: {
      commandName: 'UpdateTraceNumber',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ProcessOutput>(path, enrichedParams);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
