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
 * @param configuration The configuration object containing the tenant id.
 * @returns A promise that resolves to the classification for the given client.
 */
export const GetClientClassification = (clientId: number, configuration?: { tenantId: string }): Command<{ clientId: number, configuration?: { tenantId: string } }, ClientClassificationResponse> => {
  const path = `/v1/clients/${clientId}/classifications`
  return {
    input: { clientId, configuration },
    metadata: {
      commandName: 'GetClientClassification',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.get<ClientClassificationResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}
/**
 * Switches the client classification for the given client id.
 * @param clientId the id of the client to switch the classification for
 * @param configuration the configuration object containing the tenant id
 * @returns a promise that resolves to the response from the server
 */
export const SwitchClientClassification = (clientId: number, params: SwitchClientClassificationRequest, configuration?: { tenantId: string }): Command<{ clientId: number, params: SwitchClientClassificationRequest, configuration?: { tenantId: string } }, SwitchClientClassificationResponse> => {
  const path = `/v1/clients/${clientId}?command=switchclassification`;
  return {
    input: { clientId, params, configuration },
    metadata: {
      commandName: 'SwitchClientClassification',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.post<SwitchClientClassificationResponse>(path, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}

/**
 * Cancels the switch client classification for the given client id.
 * @param clientId the id of the client to cancel the switch classification for
 * @param params object containing the switch classification request id
 * @param configuration the configuration object containing the tenant id
 * @returns a promise that resolves to the response from the server
 */
export const CancelSwitchClientClassification = (clientId: number, params: { switchClassificationRequestId: number }, configuration?: { tenantId: string }): Command<{ clientId: number, params: { switchClassificationRequestId: number }, configuration?: { tenantId: string } }, SwitchClientClassificationResponse> => {
  // this function cannot be tested right now.
  const path = `/v1/clients/${clientId}?command=cancelSwitchclassification`;
  return {
    input: { clientId, params, configuration },
    metadata: {
      commandName: 'CancelSwitchClientClassification',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (configuration?.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.post<SwitchClientClassificationResponse>(path, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}
