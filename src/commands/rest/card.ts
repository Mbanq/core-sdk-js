import { ProcessOutput } from '../../types';
import { AuthorizationRequest, CardUpdate } from '../../types/card';
import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

export const SendAuthorizationToCore = (params: AuthorizationRequest): Command<{ params: AuthorizationRequest }, any> => {
  const query = params.skipNotification && '?skipNotification=true' || '';
  const type = params.card.cardType === 'CREDIT' ? 'creditcards' : 'cards';
  const path = `/${type}/${params.card.internalCardId}/authorization${query}`;
  const enrichedParams = {
    ...params.payload,
    query,
    flag: params.flag
  };

  return {
    input: { params },
    metadata: {
      commandName: 'SendAuthorizationToCore',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(path, enrichedParams);
        return response;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateCardID = (params: CardUpdate): Command<{ params: CardUpdate }, void> => {
  const path = `/clients/${params.clientId}`;

  return {
    input: { params },
    metadata: {
      commandName: 'UpdateCardID',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        await axiosInstance.put<ProcessOutput>(path, {
          businessCardIDURL: params.businessCardIDURL,
          businessCardIDQRCode: params.businessCardIDQRCode
        });
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
