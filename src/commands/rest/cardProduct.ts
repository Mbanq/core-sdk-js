import { Command, type Config } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';
import {
  CardProducts,
  CardProductDetail,
  CardProductRequest,
  CardProductUpdateRequest,
  CreateCardProductResponse
} from '../../types/cardProduct';

export const ListCardProduct = (params: { limit?: number, offset?: number } = {}): Command<{ params: { limit?: number, offset?: number } }, CardProducts> => {
  const path = `/v1/cardproducts`;
  const queryParams = new URLSearchParams();
  queryParams.append('limit', params?.limit?.toString() || '0');
  queryParams.append('offset', params?.offset?.toString() || '0');
  const queryString = queryParams.toString();
  const urlPath = `${path}?${queryString}`;
  return {
    input: { params },
    metadata: {
      commandName: 'ListCardProduct',
      path: urlPath,
      method: 'GET'
    },
    execute: async (config: Config) => {
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

export const GetCardProduct = (cardProductId: number): Command<{ cardProductId: number }, CardProductDetail> => {
  const path = `/v1/cardproducts/${cardProductId}`;
  return {
    input: { cardProductId },
    metadata: {
      commandName: 'GetCardProduct',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
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

export const CreateCardProduct = (params: CardProductRequest): Command<{ params: CardProductRequest }, CreateCardProductResponse> => {
  const path = '/v1/cardproducts';
  return {
    input: { params },
    metadata: {
      commandName: 'CreateCardProduct',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.post<CreateCardProductResponse>(path, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateCardProduct = (
  cardProductId: number,
  params: CardProductUpdateRequest
): Command<{
  cardProductId: number,
  params: CardProductUpdateRequest
}, CreateCardProductResponse> => {
  const path = `/v1/cardproducts/${cardProductId}`;
  return {
    input: { cardProductId, params },
    metadata: {
      commandName: 'UpdateCardProduct',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.put<CreateCardProductResponse>(path, params);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
