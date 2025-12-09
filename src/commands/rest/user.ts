import { Command, Config } from '../../types';
import { UserDetail, EnableSelfServiceAccessRequest, EnableSelfServiceAccessResponse, UpdateSelfServiceUserRequest, UpdateSelfServiceUserResponse, DeleteSelfServiceUserResponse } from '../../types/user';
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

export const UpdateSelfServiceUser = (
  requestData: UpdateSelfServiceUserRequest,
  params?: { tenantId?: string }
): Command<{ tenantId?: string }, UpdateSelfServiceUserResponse> => {
  const { userId, ...updateData } = requestData;

  return {
    input: params || {},
    metadata: {
      commandName: 'UpdateSelfServiceUser',
      path: `/v1/users/${userId}`,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params?.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<UpdateSelfServiceUserResponse>(
          `/v1/users/${userId}`,
          { ...updateData, isSelfServiceUser: true }
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const DeleteSelfServiceUser = (userId: number, params: { tenantId?: string }): Command<{ tenantId?: string }, DeleteSelfServiceUserResponse> => {
  return {
    input: params,
    metadata: {
      commandName: 'DeleteSelfServiceUser',
      path: `/v1/users/${userId}`,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.delete<DeleteSelfServiceUserResponse>(`/v1/users/${userId}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
