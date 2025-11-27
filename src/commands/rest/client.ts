import { AxiosResponse } from 'axios';
import { type Command, type Config, ProcessOutput } from '../../types';
import {
  ClientData, CreateClientRequest, CreateClientResponse, ListClientsRequest, ListClientsResponse, UpdateClientRequest, VerifyWithActivateClient, ResponseVerify, GetStatusOfVerifyClientResponse, CloseClientRequest, CloseClientResponse,
  validateCloseClientRequest
} from '../../types/client';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError, createCommandError } from '../../utils/errorHandler';

export const GetClient = (params: {
  clientId: number;
  tenantId?: string;
  riskRating?: boolean;
  clientAddress?: boolean;
  clientIdentifier?: boolean;
  staffInSelectedOfficeOnly?: boolean;
  checkIdentitiesExpiration?: boolean;
  clientAccountAssociate?: boolean;
}): Command<{
  clientId: number;
  tenantId?: string;
  riskRating?: boolean;
  clientAddress?: boolean;
  clientIdentifier?: boolean;
  staffInSelectedOfficeOnly?: boolean;
  checkIdentitiesExpiration?: boolean;
  clientAccountAssociate?: boolean;
}, any> => {
  return {
    input: params,
    metadata: {
      commandName: 'GetClient',
      path: `/v1/clients/${params.clientId}`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const result: any = {};

        // Always fetch basic client data
        const queryParams = new URLSearchParams();
        if (params.staffInSelectedOfficeOnly) queryParams.append('staffInSelectedOfficeOnly', 'true');
        if (params.checkIdentitiesExpiration) queryParams.append('checkIdentitiesExpiration', 'true');
        if (params.clientAccountAssociate) queryParams.append('clientAccountAssociate', 'true');

        const queryString = queryParams.toString();
        const clientUrl = `/v1/clients/${params.clientId}${queryString ? `?${queryString}` : ''}`;

        const clientResponse = await axiosInstance.get(clientUrl);
        result.clientData = clientResponse;

        // Fetch optional data based on parameters
        if (params.riskRating) {
          const riskRatingResponse = await axiosInstance.get(`/v1/clients/${params.clientId}/riskrating`);
          result.riskRatingData = riskRatingResponse;
        }

        if (params.clientAddress) {
          const addressResponse = await axiosInstance.get(`/v1/client/${params.clientId}/addresses`);
          result.clientAddressData = addressResponse;
        }

        if (params.clientIdentifier) {
          const identifierResponse = await axiosInstance.get(`/v1/clients/${params.clientId}/identifiers?unmaskValue=true`);
          result.clientIdentifierData = identifierResponse;
        }

        return result;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateClient = (
  params: { tenantId?: string; clientId: number; updates: UpdateClientRequest }
): Command<{ tenantId?: string; clientId: number; updates: UpdateClientRequest }, ProcessOutput> => {
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

export const CreateClient = (
  params: { tenantId?: string; clientData: CreateClientRequest }
): Command<{ tenantId?: string; clientData: CreateClientRequest }, CreateClientResponse> => {
  return {
    input: params,
    metadata: {
      commandName: 'CreateClient',
      path: '/v1/clients',
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<CreateClientResponse>('/v1/clients', params.clientData);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetClients = (params: ListClientsRequest, configuration: { tenantId?: string }): Command<{ params: ListClientsRequest, configuration: { tenantId?: string } }, ListClientsResponse> => {
  return {
    input: { params, configuration },
    metadata: {
      commandName: 'GetClients',
      path: `/v1/clients`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (configuration.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      const allClients: Array<ClientData> = [];
      const limit = params.limit || 200;
      let offset = params.offset || 0;
      let totalFilteredRecords = 0;

      const newParams = {
        ...params,
        limit,
        offset
      };

      try {
        if (params.limit === 0) {
          do {
            const response = await axiosInstance.get<ListClientsResponse>(`/v1/clients`, { params: newParams });
            const { totalFilteredRecords: total, pageItems } = response.data;
            allClients.push(...pageItems);
            totalFilteredRecords = total;
            offset += limit;
          } while (offset < totalFilteredRecords);
          return { totalFilteredRecords, pageItems: allClients };
        } else {
          const response = await axiosInstance.get<ListClientsResponse>('/v1/clients', { params: newParams });
          return response.data;
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const DeleteClient = (params: { clientId: number, tenantId?: string }): Command<{ clientId: number, tenantId?: string }, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'DeleteClient',
      path: `/v1/clients/${params.clientId}`,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.delete(`/v1/clients/${params.clientId}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const VerifyWithActivateClients = (params: { tenantId?: string; param: VerifyWithActivateClient }): Command<{ tenantId?: string; param: VerifyWithActivateClient }, ProcessOutput | ResponseVerify> => {
  const path = `/v1/clients/${params.param.clientId}`;
  return {
    input: params,
    metadata: {
      commandName: 'VerifyWithActivateClients',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        let verify: AxiosResponse<ResponseVerify> | undefined;
        if (!params.param.skipVerify) {
          const requestVerify = {
            kycVerificationType: params.param.kycVerificationType,
            note: params.param.note
          };
          verify = await axiosInstance.post<ResponseVerify>(`/v1/clients/${params.param.clientId}`, requestVerify);
        }

        if (!params.param.skipActivate && ((verify && verify.data.data.clientKycStatus === 'APPROVED' && params.param.autoActivate) || !verify)) {
          const requestActivate = {
            locale: params.param.locale,
            dateFormat: params.param.dateFormat,
            activationDate: params.param.activationDate,
            isActivatedByManualReview: params.param.isActivatedByManualReview,
            manualReviewActivationComments: params.param.manualReviewActivationComments
          };
          const activateClient = await axiosInstance.post<ProcessOutput>(`/v1/clients/${params.param.clientId}`, requestActivate);

          let result: ResponseVerify | ProcessOutput = activateClient.data;
          if (verify) {
            result = { ...activateClient.data, data: { ...verify.data.data } };
          }
          return result;
        }

        if (!verify) {
          throw createCommandError({
            message: 'Verification was skipped but no alternative action was taken',
            code: 'VERIFICATION_SKIPPED'
          });
        }

        return verify.data;

      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetStatusOfVerifyClient = (params: { tenantId?: string; clientId: number }): Command<{ tenantId?: string; clientId: number }, GetStatusOfVerifyClientResponse> => {
  return {
    input: params,
    metadata: {
      commandName: 'GetStatusOfVerifyClient',
      path: `/v1/clients/${params.clientId}/verificationstatus`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<GetStatusOfVerifyClientResponse>(`/v1/clients/${params.clientId}/verificationstatus`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CloseClient = (params: { tenantId?: string; clientId: number; data: CloseClientRequest }): Command<{ tenantId?: string; clientId: number; data: CloseClientRequest }, CloseClientResponse> => {
  validateCloseClientRequest(params.data);
  const path = `/v1/clients/${params.clientId}?command=close`;
  return {
    input: params,
    metadata: {
      commandName: 'CloseClient',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<CloseClientResponse>(path, params.data);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
