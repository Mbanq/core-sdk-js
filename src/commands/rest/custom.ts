import { Command, Config, ProcessOutput } from '../../types';
import { CustomCreateInput, CustomGetInput, CustomUpdateInput } from '../../types/custom';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

export const CustomUpdate = (params: CustomUpdateInput): Command<CustomUpdateInput, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: params.commandName || 'CustomUpdate',
      path: params.url,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ProcessOutput>(params.url, { ...params.updates }, { params: params.params });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CustomCreate = (params: CustomCreateInput): Command<CustomCreateInput, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: params.commandName || 'CustomCreate',
      path: params.url,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(params.url, params.data, { params: params.params });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CustomGet = (params: CustomGetInput): Command<CustomGetInput, any> => {
  return {
    input: params,
    metadata: {
      commandName: params.commandName || 'CustomGet',
      path: params.url,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<any>(params.url, {
          params: params.params
        });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
