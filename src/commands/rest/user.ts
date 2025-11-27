import { Command, Config } from '../../types';
import { UserDetail, EnableSelfServiceAccessRequest, EnableSelfServiceAccessResponse } from '../../types/user';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

export const GetUserDetail = (
  params?: { tenantId?: string }
): Command<{ tenantId?: string }, UserDetail> => {
  return {
    input: params || {},
    metadata: {
      commandName: 'GetUserDetail',
      path: `/v1/userdetails`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params?.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<UserDetail>(`/v1/userdetails`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const EnableSelfServiceAccess = (
  requestData: EnableSelfServiceAccessRequest,
  params?: { tenantId?: string }
): Command<{ tenantId?: string }, EnableSelfServiceAccessResponse> => {
  return {
    input: params || {},
    metadata: {
      commandName: 'EnableSelfServiceAccess',
      path: `/v1/users`,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params?.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<EnableSelfServiceAccessResponse>(
          `/v1/users`,
          requestData
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

