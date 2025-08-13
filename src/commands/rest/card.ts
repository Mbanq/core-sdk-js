import { Command, type Config, ProcessOutput } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';
import { AuthorizationRequest, CardUpdate } from '../../types/card';

export const SendAuthorizationToCore = (params: AuthorizationRequest): Command<AuthorizationRequest, any> => {
  const query = params.skipNotification && '?skipNotification=true' || '';
  const type = params.card.cardType === 'CREDIT' ? 'creditcards' : 'cards';
  const enrichedParams = {
    ...params.payload,
    query,
    flag: params.flag
  };
  return {
    input: params,
    metadata: {
      commandName: 'SendAuthorizationToCore',
      path: `/${type}/${params.card.internalCardId}/authorization${query}`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(`/${type}/${params.card.internalCardId}/authorization${query}`, enrichedParams);
        return response;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateCardID = (params: CardUpdate): Command<CardUpdate, void> => {
  return {
    input: params,
    metadata: {
      commandName: 'UpdateCardID',
      path: `/clients/${params.clientId}`,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        await axiosInstance.put<ProcessOutput>(`/clients/${params.clientId}`, {
          businessCardIDURL: params.businessCardIDURL,
          businessCardIDQRCode: params.businessCardIDQRCode
        });
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
