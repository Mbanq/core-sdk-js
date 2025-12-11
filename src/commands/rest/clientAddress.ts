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

export const GetClientAddress = (clientId: number):
  Command<{ clientId: number }, GetClientAddressResponse> => {
  const path = `/v1/client/${clientId}/addresses`;
  return {
    input: { clientId },
    metadata: {
      commandName: 'GetClientAddress',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.get<GetClientAddressResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CreateClientAddress = (
  clientId: number,
  type: number,
  params: CreateClientAddressRequest
):
  Command<{
    clientId: number;
    type: number;
    params: CreateClientAddressRequest
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
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.post<CreateClientAddressResponse>(urlPath, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateClientAddress = (
  clientId: number,
  type: number,
  params: UpdateClientAddressRequest
):
  Command<{
    clientId: number;
    type: number;
    params: UpdateClientAddressRequest
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
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.put<UpdateClientAddressResponse>(urlPath, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const SetClientAddressStatus = (
  clientId: number,
  type: number,
  params: { addressId: number, isActive: boolean }
): Command<{
  clientId: number,
  type: number,
  params: { addressId: number, isActive: boolean }
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
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.put<UpdateClientAddressResponse>(urlPath, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
