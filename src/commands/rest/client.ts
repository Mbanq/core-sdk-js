import { type Command, type Config, ProcessOutput } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

interface ClientData {
  id: number;
  accountNo: string;
  displayName: string;
  legalForm: {
    code: string;
    value: string;
  };
  [key: string]: string | number | boolean | object;
}

interface RiskRatingData {
  riskScore: number;
  rating: string;
  [key: string]: string | number | boolean;
}

interface ClientAddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  [key: string]: string | number | boolean;
}

interface ClientIdentifierData {
  type: string;
  value: string;
  [key: string]: string | number | boolean;
}

interface ClientResponse {
  clientData?: ClientData;
  riskRatingData?: RiskRatingData;
  clientAddressData?: ClientAddressData;
  clientIdentifierData?: ClientIdentifierData;
}

export const GetClientData = (params: { clientId: number; tenantId?: string; riskRating?: boolean; clientAddress?: boolean; clientIdentifier?: boolean; }): Command<{ clientId: number; tenantId?: string; riskRating?: boolean; clientAddress?: boolean; clientIdentifier?: boolean; }, ClientResponse> => {
  return {
    input: params,
    metadata: {
      commandName: 'GetClientData',
      path: `/v1/clients/${params.clientId}`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      const result: ClientResponse = {
        clientData: undefined,
        riskRatingData: undefined,
        clientAddressData: undefined,
        clientIdentifierData: undefined
      };
      try {
        result.clientData = await axiosInstance.get(`/v1/clients/${params.clientId}`);
        if (params.riskRating) {
          result.riskRatingData = await axiosInstance.get(`/v1/clients/${params.clientId}/riskrating`);
        }
        if (params.clientAddress) {
          result.clientAddressData = await axiosInstance.get(`/v1/client/${params.clientId}/addresses`);
        }
        if (params.clientIdentifier) {
          result.clientIdentifierData = await axiosInstance.get(`/v1/clients/${params.clientId}/identifiers?unmaskValue=true`);
        }
        return result;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateClient = (
  params: { tenantId?: string; clientId: number; updates: object }
): Command<{ tenantId?: string; clientId: number; updates: object }, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'UpdateClient',
      path: `/v1/clients/${params.clientId}`,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ProcessOutput>(`/v1/clients/${params.clientId}`, { ...params.updates });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateClientIdentifier = (
  params: { tenantId?: string; clientId: number; identifierId: string; updates: object }
): Command<{ tenantId?: string; clientId: number; identifierId: string; updates: object }, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'UpdateClientIdentifier',
      path: `/v1/clients/${params.clientId}/identifiers/${params.identifierId}`,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ProcessOutput>(`/v1/clients/${params.clientId}/identifiers/${params.identifierId}`, { ...params.updates });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
