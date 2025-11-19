import { type Command, type Config } from '../../types';
import {
  ClientIdentifierRequest,
  ClientIdentifierResponse,
  validateClientIdentifierRequest
} from '../../types/clientIdentifier';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

export const GetPermittedDocumentTypes = (params: { tenantId?: string; clientId: number }): Command<{ tenantId?: string; clientId: number }, any> => {
  const path = `/v1/clients/${params.clientId}/identifiers/template`;
  return {
    input: params,
    metadata: {
      commandName: 'GetPermittedDocumentTypes',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.get<ClientIdentifierResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}

export const CreateClientIdentifier = (params:
  { tenatId?: string; clientId: number; input: ClientIdentifierRequest }
): Command<{ tenantId?: string; clientId: number; input: ClientIdentifierRequest}, ClientIdentifierResponse> => {
  validateClientIdentifierRequest(params.input);
  const path = `/v1/clients/${params.clientId}/identifiers`;
  return {
    input: params,
    metadata: {
      commandName: 'CreateClientIdentifier',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ClientIdentifierResponse>(path, params.input);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}

export const UpdateClientIdentifier = (
  params: { tenantId?: string; clientId: number; identifierId: string; updates: ClientIdentifierRequest }
): Command<{ tenantId?: string; clientId: number; identifierId: string; updates: ClientIdentifierRequest }, ClientIdentifierResponse> => {
  validateClientIdentifierRequest(params.updates);
  const path = `/v1/clients/${params.clientId}/identifiers/${params.identifierId}`
  return {
    input: params,
    metadata: {
      commandName: 'UpdateClientIdentifier',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ClientIdentifierResponse>(path, { ...params.updates });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};