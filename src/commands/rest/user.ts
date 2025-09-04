import { Command, Config } from '../../types/config';
import { UserDetail } from '../../types/user';
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
        const response = await axiosInstance.post<UserDetail>(`/v1/userdetails`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
