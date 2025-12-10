import { Recipient, RecipientRequest, Recipients, CreateRecipientRequest } from '../../types/recipient';
import { ProcessOutput } from '../../types';
import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

export const GetRecipient = (clientId: number, id: number): Command<{ clientId: number; id: number }, Recipient> => {
  const path = `/v1/clients/${clientId}/recipients/${id}`;

  return {
    input: { clientId, id },
    metadata: {
      commandName: 'GetRecipient',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<Recipient>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CreateRecipient = (
  clientId: number,
  recipient: CreateRecipientRequest
): Command<{
  clientId: number;
  recipient: CreateRecipientRequest;
}, Recipient> => {
  const path = `/v1/clients/${clientId}/recipients`;

  return {
    input: { clientId, recipient },
    metadata: {
      commandName: 'CreateRecipient',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<Recipient>(path, recipient);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const DeleteRecipient = (clientId: number, recipientId: number): Command<{ clientId: number; recipientId: number }, ProcessOutput> => {
  const path = `/v1/clients/${clientId}/recipients/${recipientId}`;

  return {
    input: { clientId, recipientId },
    metadata: {
      commandName: 'DeleteRecipient',
      path,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.delete(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetRecipients = (clientId: number, params: RecipientRequest): Command<{ clientId: number; params: RecipientRequest }, Recipients> => {
  const path = `/v1/clients/${clientId}/recipients`;

  return {
    input: { clientId, params },
    metadata: {
      commandName: 'GetRecipients',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      if (!params.limit || params.limit <= 0) {
        params.limit = 20; // Default limit
      }

      if (!params.name) {
        params.name = '';
      }

      try {
        const response = await axiosInstance.get<Recipients>(path, { params });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
