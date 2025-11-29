import { Command, type Config } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';
import {
  CardProducts,
  CardProductDetail,
  CardProductRequest,
  CardProductUpdateRequest,
  CreateCardProductResponse,
} from '../../types/cardProduct';

export const ListCardProduct = (params: { tenantId: string; limit?: number, offset?: number }): Command<{ tenantId: string; limit?: number, offset?: number }, CardProducts> => {
  const path = `/v1/cardproducts`;
  const queryParams = new URLSearchParams();
  if (params.offset) {
    queryParams.append('offset', params.offset.toString());
  }
  queryParams.append('limit', params.offset ? params.offset.toString() : '0');
  const queryString = queryParams.toString();
  const urlPath = queryString ? `${path}?${queryString}` : path;
  return {
    input: params,
    metadata: {
      commandName: 'ListCardProduct',
      path: urlPath,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.get<CardProducts>(urlPath);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const GetCardProduct = (params: { tenantId: string; cardProductId: number }): Command<{ tenantId: string; cardProductId: number }, CardProductDetail> => {
  const path = `/v1/cardproducts/${params.cardProductId}`;
  return {
    input: params,
    metadata: {
      commandName: 'GetCardProduct',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.get<CardProductDetail>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CreateCardProduct = (params: {
  tenantId: string, params: CardProductRequest
}): Command<{ tenantId: string, params: CardProductRequest }, CreateCardProductResponse> => {
  const path = '/v1/cardproducts';
  return {
    input: params,
    metadata: {
      commandName: 'CreateCardProduct',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.post<CreateCardProductResponse>(path, params.params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateCardProduct = (params: {
  tenantId: string, cardProductId: number, params: CardProductUpdateRequest
}): Command<{tenantId: string, cardProductId: number, params: CardProductUpdateRequest}, CreateCardProductResponse> => {
  const path = `/v1/cardproducts/${params.cardProductId}`;
  return {
    input: params,
    metadata: {
      commandName: 'UpdateCardProduct',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.put<CreateCardProductResponse>(path, params.params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
