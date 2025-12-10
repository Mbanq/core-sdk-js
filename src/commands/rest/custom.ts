import { CustomCreateInput, CustomGetInput, CustomUpdateInput } from '../../types/custom';
import { Command, Config, ProcessOutput } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

export const CustomUpdate = (params: CustomUpdateInput): Command<{ params: CustomUpdateInput }, ProcessOutput> => {
  const path = params.url;

  return {
    input: { params },
    metadata: {
      commandName: params.commandName || 'CustomUpdate',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ProcessOutput>(path, { ...params.updates }, { params: params.params });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CustomCreate = (params: CustomCreateInput): Command<{ params: CustomCreateInput }, ProcessOutput> => {
  const path = params.url;

  return {
    input: { params },
    metadata: {
      commandName: params.commandName || 'CustomCreate',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ProcessOutput>(path, params.data, { params: params.params });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CustomGet = (params: CustomGetInput): Command<{ params: CustomGetInput }, any> => {
  const path = params.url;

  return {
    input: { params },
    metadata: {
      commandName: params.commandName || 'CustomGet',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<any>(path, {
          params: params.params
        });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
