import { Command, type Config } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';
import {
  ClientClassificationResponse,
  SwitchClientClassificationRequest,
  SwitchClientClassificationResponse
} from '../../types/clientClassification';

/**
 * Retrieves the classification for a client.
 * @param clientId The id of the client to retrieve the classification for.
 * @returns A promise that resolves to the classification for the given client.
 */
export const GetClientClassification = (clientId: number): Command<{ clientId: number }, ClientClassificationResponse> => {
  const path = `/v1/clients/${clientId}/classifications`;
  return {
    input: { clientId },
    metadata: {
      commandName: 'GetClientClassification',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.get<ClientClassificationResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
/**
 * Switches the client classification for the given client id.
 * @param clientId the id of the client to switch the classification for
 * @param params the switch classification request parameters
 * @returns a promise that resolves to the response from the server
 */
export const SwitchClientClassification = (clientId: number, params: SwitchClientClassificationRequest): Command<{ clientId: number, params: SwitchClientClassificationRequest }, SwitchClientClassificationResponse> => {
  const path = `/v1/clients/${clientId}?command=switchclassification`;
  return {
    input: { clientId, params },
    metadata: {
      commandName: 'SwitchClientClassification',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.post<SwitchClientClassificationResponse>(path, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

/**
 * Cancels the switch client classification for the given client id.
 * @param clientId the id of the client to cancel the switch classification for
 * @param params object containing the switch classification request id
 * @returns a promise that resolves to the response from the server
 */
export const CancelSwitchClientClassification = (clientId: number, params: { switchClassificationRequestId: number }): Command<{ clientId: number, params: { switchClassificationRequestId: number } }, SwitchClientClassificationResponse> => {
  // this function cannot be tested right now.
  const path = `/v1/clients/${clientId}?command=cancelSwitchclassification`;
  return {
    input: { clientId, params },
    metadata: {
      commandName: 'CancelSwitchClientClassification',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.post<SwitchClientClassificationResponse>(path, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
