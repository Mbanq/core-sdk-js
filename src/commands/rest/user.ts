import { UserDetail, EnableSelfServiceAccessRequest, EnableSelfServiceAccessResponse, UpdateSelfServiceUserRequest, UpdateSelfServiceUserResponse, DeleteSelfServiceUserResponse } from '../../types/user';
import { Command, Config } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

export const GetUserDetail = (): Command<{}, UserDetail> => {
  const path = `/v1/userdetails`;

  return {
    input: {},
    metadata: {
      commandName: 'GetUserDetail',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<UserDetail>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const EnableSelfServiceAccess = (
  requestData: EnableSelfServiceAccessRequest
): Command<{ requestData: EnableSelfServiceAccessRequest }, EnableSelfServiceAccessResponse> => {
  const path = `/v1/users`;

  return {
    input: { requestData },
    metadata: {
      commandName: 'EnableSelfServiceAccess',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<EnableSelfServiceAccessResponse>(
          path,
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
  requestData: UpdateSelfServiceUserRequest
): Command<{ requestData: UpdateSelfServiceUserRequest }, UpdateSelfServiceUserResponse> => {
  const { userId, ...updateData } = requestData;
  const path = `/v1/users/${userId}`;

  return {
    input: { requestData },
    metadata: {
      commandName: 'UpdateSelfServiceUser',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<UpdateSelfServiceUserResponse>(
          path,
          { ...updateData, isSelfServiceUser: true }
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const DeleteSelfServiceUser = (userId: number): Command<{ userId: number }, DeleteSelfServiceUserResponse> => {
  const path = `/v1/users/${userId}`;

  return {
    input: { userId },
    metadata: {
      commandName: 'DeleteSelfServiceUser',
      path,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.delete<DeleteSelfServiceUserResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
