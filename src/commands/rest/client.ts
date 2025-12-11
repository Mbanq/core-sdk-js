import { AxiosResponse } from 'axios';
import { ProcessOutput } from '../../types';
import {
  ClientData,
  CreateClientRequest,
  CreateClientResponse,
  ListClientsRequest,
  ListClientsResponse,
  UpdateClientRequest,
  VerifyWithActivateClient,
  ResponseVerify,
  GetStatusOfVerifyClientResponse,
  CloseClientRequest,
  CloseClientResponse,
  validateCloseClientRequest
} from '../../types/client';
import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError, createCommandError } from '../../utils/errorHandler';

export const GetClient = (params: {
  clientId: number;
  riskRating?: boolean;
  clientAddress?: boolean;
  clientIdentifier?: boolean;
  staffInSelectedOfficeOnly?: boolean;
  checkIdentitiesExpiration?: boolean;
  clientAccountAssociate?: boolean;
}): Command<{ params: typeof params }, any> => {
  const queryParams = new URLSearchParams();
  if (params.staffInSelectedOfficeOnly) queryParams.append('staffInSelectedOfficeOnly', 'true');
  if (params.checkIdentitiesExpiration) queryParams.append('checkIdentitiesExpiration', 'true');
  if (params.clientAccountAssociate) queryParams.append('clientAccountAssociate', 'true');

  const queryString = queryParams.toString();
  const clientUrl = `/v1/clients/${params.clientId}${queryString ? `?${queryString}` : ''}`;

  return {
    input: { params },
    metadata: {
      commandName: 'GetClient',
      path: clientUrl,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const result: any = {};

        // Always fetch basic client data
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
  clientId: number,
  updates: UpdateClientRequest
): Command<{ clientId: number; updates: UpdateClientRequest }, ProcessOutput> => {
  const path = `/v1/clients/${clientId}`;

  return {
    input: { clientId, updates },
    metadata: {
      commandName: 'UpdateClient',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ProcessOutput>(path, { ...updates });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CreateClient = (
  clientData: CreateClientRequest
): Command<{ clientData: CreateClientRequest }, CreateClientResponse> => {
  const path = '/v1/clients';

  return {
    input: { clientData },
    metadata: {
      commandName: 'CreateClient',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<CreateClientResponse>(path, clientData);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetClients = (params: ListClientsRequest): Command<{ params: ListClientsRequest }, ListClientsResponse> => {
  const path = `/v1/clients`;

  return {
    input: { params },
    metadata: {
      commandName: 'GetClients',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
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
            const response = await axiosInstance.get<ListClientsResponse>(path, { params: newParams });
            const { totalFilteredRecords: total, pageItems } = response.data;
            allClients.push(...pageItems);
            totalFilteredRecords = total;
            offset += limit;
          } while (offset < totalFilteredRecords);
          return { totalFilteredRecords, pageItems: allClients };
        } else {
          const response = await axiosInstance.get<ListClientsResponse>(path, { params: newParams });
          return response.data;
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const DeleteClient = (clientId: number): Command<{ clientId: number }, ProcessOutput> => {
  const path = `/v1/clients/${clientId}`;

  return {
    input: { clientId },
    metadata: {
      commandName: 'DeleteClient',
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

export const VerifyWithActivateClients = (param: VerifyWithActivateClient): Command<{ param: VerifyWithActivateClient }, ProcessOutput | ResponseVerify> => {
  const path = `/v1/clients/${param.clientId}`;

  return {
    input: { param },
    metadata: {
      commandName: 'VerifyWithActivateClients',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        let verify: AxiosResponse<ResponseVerify> | undefined;
        if (!param.skipVerify) {
          const requestVerify = {
            kycVerificationType: param.kycVerificationType,
            note: param.note
          };
          verify = await axiosInstance.post<ResponseVerify>(path, requestVerify);
        }

        if (!param.skipActivate && ((verify && verify.data.data.clientKycStatus === 'APPROVED' && param.autoActivate) || !verify)) {
          const requestActivate = {
            locale: param.locale,
            dateFormat: param.dateFormat,
            activationDate: param.activationDate,
            isActivatedByManualReview: param.isActivatedByManualReview,
            manualReviewActivationComments: param.manualReviewActivationComments
          };
          const activateClient = await axiosInstance.post<ProcessOutput>(path, requestActivate);

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

export const GetStatusOfVerifyClient = (clientId: number): Command<{ clientId: number }, GetStatusOfVerifyClientResponse> => {
  const path = `/v1/clients/${clientId}/verificationstatus`;

  return {
    input: { clientId },
    metadata: {
      commandName: 'GetStatusOfVerifyClient',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<GetStatusOfVerifyClientResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CloseClient = (clientId: number, data: CloseClientRequest): Command<{ clientId: number; data: CloseClientRequest }, CloseClientResponse> => {
  validateCloseClientRequest(data);
  const path = `/v1/clients/${clientId}?command=close`;

  return {
    input: { clientId, data },
    metadata: {
      commandName: 'CloseClient',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<CloseClientResponse>(path, data);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
