import { type Command, type Config } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';
import {
  GetClientAddressResponse,
  CreateClientAddressRequest,
  CreateClientAddressResponse,
  UpdateClientAddressRequest,
  UpdateClientAddressResponse
} from '../../types/clientAddress';

const generateUrlWithQuery = (path: string, type: number): string => {
  const searchParams = new URLSearchParams();
  searchParams.append('type', type.toString());
  return `${path}?${searchParams.toString()}`;
};

export const GetClientAddress = (clientId: number, configuration?: { tenantId?: string }):
  Command<{ clientId: number; configuration?: { tenantId?: string } }, GetClientAddressResponse> => {
  const path = `/v1/client/${clientId}/addresses`;
  return {
    input: { clientId },
    metadata: {
      commandName: 'GetClientAddress',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.get<GetClientAddressResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}

export const CreateClientAddress = (
  clientId: number,
  type: number,
  params: CreateClientAddressRequest,
  configuration?: { tenantId?: string }):
  Command<{
    clientId: number;
    type: number;
    params: CreateClientAddressRequest;
    configuration?: { tenantId?: string }
  }, CreateClientAddressResponse> => {
  const path = `/v1/client/${clientId}/addresses`;
  const urlPath = generateUrlWithQuery(path, type);
  return {
    input: { clientId, type, params },
    metadata: {
      commandName: 'CreateClientAddress',
      path: urlPath,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.post<CreateClientAddressResponse>(urlPath, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}

export const UpdateClientAddress = (
  clientId: number,
  type: number,
  params: UpdateClientAddressRequest,
  configuration?: { tenantId?: string }):
  Command<{
    clientId: number;
    type: number;
    params: UpdateClientAddressRequest,
    configuration?: { tenantId?: string }
  }, UpdateClientAddressResponse> => {
  const path = `/v1/client/${clientId}/addresses`;
  const urlPath = generateUrlWithQuery(path, type);
  return {
    input: { clientId, type, params },
    metadata: {
      commandName: 'UpdateClientAddress',
      path: urlPath,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.put<UpdateClientAddressResponse>(urlPath, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}

export const SetClientAddressStatus = (
  clientId: number,
  type: number,
  params: { addressId: number, isActive: boolean },
  configuration?: { tenantId?: string }
): Command<{
  clientId: number,
  type: number,
  params: { addressId: number, isActive: boolean },
  configuration?: { tenantId?: string }
}, UpdateClientAddressResponse> => {
  const path = `/v1/client/${clientId}/addresses`;
  const urlPath = generateUrlWithQuery(path, type);
  return {
    input: { clientId, type, params },
    metadata: {
      commandName: 'SetClientAddressStatus',
      path: urlPath,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.put<UpdateClientAddressResponse>(urlPath, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}