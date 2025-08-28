import { ProcessOutput } from '../../types';
import { ListAccountsOfClientRequest, validateListAccountFilterKey, validateListAccountFilters, SavingAccount, UpdateAccountRequest } from '../../types/account';
import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

export const GetAccount = (params: { id: number, tenantId?: string }): Command<{ id: number; tenantId?: string }, SavingAccount> => {
  return {
    input: params,
    metadata: {
      commandName: 'GetAccount',
      path: `/v1/savingaccounts/${params.id}`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<SavingAccount>(`/v1/savingaccounts/${params.id}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateAccount = (params: {
  clientId: number;
  accountId: string;
  updates: UpdateAccountRequest;
  tenantId?: string;
}): Command<{
  clientId: number;
  accountId: string;
  updates: UpdateAccountRequest;
  tenantId?: string;
}, any> => {
  return {
    input: params,
    metadata: {
      commandName: 'UpdateAccount',
      path: `/v1/savingsaccounts/${params.accountId}`,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put(`/v1/savingsaccounts/${params.accountId}`, { ...params.updates, clientId: params.clientId });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const DeleteAccount = (params: { accountId: string, tenantId?: string }): Command<{ accountId: string, tenantId?: string }, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'DeleteAccount',
      path: `/v1/savingsaccounts/${params.accountId}`,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.delete(`/v1/savingsaccounts/${params.accountId}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

const listAccountQuery = (filters: Record<string, any>, clientId: number, tenantId?: string) => {
  const buildCommand = (): Command<any, ListAccountsOfClientRequest> => {

    return {
      input: { filters, tenantId },
      metadata: {
        commandName: 'ListAccountsOfClient',
        path: `/v1/clients/${clientId}/accounts`,
        method: 'GET'
      },
      execute: async (config: Config) => {
        if (tenantId) {
          config.tenantId = tenantId;
        }
        const axiosInstance = await baseRequest(config);

        try {
          const response = await axiosInstance.get<ListAccountsOfClientRequest>(`/v1/clients/${clientId}/accounts`, { params: filters });
          return response.data;
        } catch (error) {
          handleAxiosError(error);
        }
      }
    };
  };

  const queryMethods = {
    where: (field: string) => {
      validateListAccountFilterKey(field);
      return {
        eq: (value: any) => {
          // Validate using the new Zod-based filters
          validateListAccountFilters({ [field]: value });
          return listAccountQuery({ ...filters, [field]: value }, clientId, tenantId);
        }
      };
    },
    execute: buildCommand
  };

  return queryMethods;
};

export const ListAccountsOfClient = (params?: { clientId: number, tenantId?: string }) => {
  return {
    list: () => listAccountQuery({}, params?.clientId || 0, params?.tenantId)
  };
};

export const GetAccountsOfClient = (clientId: number, params: ListAccountsOfClientRequest, configuration: { tenantId?: string }): Command<{params: ListAccountsOfClientRequest, configuration: { tenantId?: string }}, ListAccountsOfClientRequest> => {
  return {
    input: { params, configuration },
    metadata: {
      commandName: 'ListAccountsOfClient',
      path: `/v1/clients/${clientId}/accounts`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (configuration.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<ListAccountsOfClientRequest>(`/v1/clients/${clientId}/accounts`, { params });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
