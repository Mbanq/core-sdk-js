import { ProcessOutput } from '../../types';
import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';
import { Recipient, RecipientRequest, Recipients, CreateRecipientRequest } from '../../types/recipient';

export const GetRecipient = (params: { clientId: number, id: number, tenantId?: string }): Command<{ clientId: number, id: number; tenantId?: string }, Recipient> => {
  return {
    input: params,
    metadata: {
      commandName: 'GetRecipient',
      path: `/v1/clients/${params.clientId}/recipients/${params.id}`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<Recipient>(`/v1/clients/${params.clientId}/recipients/${params.id}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CreateRecipient = (params: {
  clientId: number;
  recipient: CreateRecipientRequest;
  tenantId?: string;
}): Command<{
  clientId: number;
  recipient: CreateRecipientRequest;
  tenantId?: string;
}, Recipient> => {
  return {
    input: params,
    metadata: {
      commandName: 'CreateRecipient',
      path: `/v1/clients/${params.clientId}/recipients`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<Recipient>(`/v1/clients/${params.clientId}/recipients`, params.recipient);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const DeleteRecipient = (params: { clientId: number, recipientId: number, tenantId?: string }): Command<{ clientId: number, recipientId: number, tenantId?: string }, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'DeleteRecipient',
      path: `/v1/clients/${params.clientId}/recipients/${params.recipientId}`,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.delete(`/v1/clients/${params.clientId}/recipients/${params.recipientId}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetRecipients = (clientId: number, params: RecipientRequest, configuration: { tenantId?: string }): Command<{params: RecipientRequest, configuration: { tenantId?: string }}, Recipients> => {
  return {
    input: { params, configuration },
    metadata: {
      commandName: 'GetRecipients',
      path: `/v1/clients/${clientId}/recipients`,
      method: 'GET'
    },

    execute: async (config: Config) => {
      if (configuration.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      if (!params.limit || params.limit <= 0) {
        params.limit = 20; // Default limit
      }

      if (!params.name) {
        params.name = '';
      }

      try {
        const response = await axiosInstance.get<Recipients>(`/v1/clients/${clientId}/recipients`, { params });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
