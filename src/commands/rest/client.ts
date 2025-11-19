import { type Command, type Config, ProcessOutput } from '../../types';
import { ClientData, CreateClientRequest, CreateClientResponse, ListClientsRequest, ListClientsResponse, UpdateClientRequest, UpdateClientIdentifierRequest, UpdateClientIdentifierResponse, validateClientFilterKey, validateClientFilters } from '../../types/client';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError, createCommandError } from '../../utils/errorHandler';

export const GetClient = (params: {
  clientId: number;
  tenantId?: string;
  riskRating?: boolean;
  clientAddress?: boolean;
  clientIdentifier?: boolean;
  staffInSelectedOfficeOnly?: boolean;
  checkIdentitiesExpiration?: boolean;
  clientAccountAssociate?: boolean;
}): Command<{
  clientId: number;
  tenantId?: string;
  riskRating?: boolean;
  clientAddress?: boolean;
  clientIdentifier?: boolean;
  staffInSelectedOfficeOnly?: boolean;
  checkIdentitiesExpiration?: boolean;
  clientAccountAssociate?: boolean;
}, any> => {
  return {
    input: params,
    metadata: {
      commandName: 'GetClient',
      path: `/v1/clients/${params.clientId}`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const result: any = {};

        // Always fetch basic client data
        const queryParams = new URLSearchParams();
        if (params.staffInSelectedOfficeOnly) queryParams.append('staffInSelectedOfficeOnly', 'true');
        if (params.checkIdentitiesExpiration) queryParams.append('checkIdentitiesExpiration', 'true');
        if (params.clientAccountAssociate) queryParams.append('clientAccountAssociate', 'true');

        const queryString = queryParams.toString();
        const clientUrl = `/v1/clients/${params.clientId}${queryString ? `?${queryString}` : ''}`;

        const clientResponse = await axiosInstance.get(clientUrl);
        result.clientData = clientResponse;

        // Fetch optional data based on parameters
        if (params.riskRating) {
          const riskRatingResponse = await axiosInstance.get(`/v1/clients/${params.clientId}/riskrating`);
          result.riskRatingData = riskRatingResponse;
        }

        if (params.clientAddress) {
          const addressResponse = await axiosInstance.get(`/v1/client/${params.clientId}/addresses`);
          result.clientAddressData = addressResponse;
        }

        if (params.clientIdentifier) {
          const identifierResponse = await axiosInstance.get(`/v1/clients/${params.clientId}/identifiers?unmaskValue=true`);
          result.clientIdentifierData = identifierResponse;
        }

        return result;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateClient = (
  params: { tenantId?: string; clientId: number; updates: UpdateClientRequest }
): Command<{ tenantId?: string; clientId: number; updates: UpdateClientRequest }, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'UpdateClient',
      path: `/v1/clients/${params.clientId}`,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ProcessOutput>(`/v1/clients/${params.clientId}`, { ...params.updates });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CreateClient = (
  params: { tenantId?: string; clientData: CreateClientRequest }
): Command<{ tenantId?: string; clientData: CreateClientRequest }, CreateClientResponse> => {
  return {
    input: params,
    metadata: {
      commandName: 'CreateClient',
      path: '/v1/clients',
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<CreateClientResponse>('/v1/clients', params.clientData);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

const createClientQuery = (filters: Record<string, any>, limit?: number, offset?: number, tenantId?: string) => {
  // Validate parameters
  if (limit !== undefined && limit !== 0 && limit <= 0) {
    throw createCommandError({
      message: `Invalid limit: ${limit}. Limit must be positive or 0 for fetching all records.`,
      code: 'invalid_limit'
    });
  }

  if (offset !== undefined && offset < 0) {
    throw createCommandError({
      message: `Invalid offset: ${offset}. Offset must be non-negative.`,
      code: 'invalid_offset'
    });
  }

  const buildCommand = (): Command<any, ListClientsResponse> => {
    const queryParams = {
      ...filters,
      limit: limit || 200,
      offset: offset || 0
    };

    return {
      input: { filters, limit, offset, tenantId },
      metadata: {
        commandName: 'ListClients',
        path: '/v1/clients',
        method: 'GET'
      },
      execute: async (config: Config) => {
        if (tenantId) {
          config.tenantId = tenantId;
        }
        const axiosInstance = await baseRequest(config);

        try {
          // If limit is 0, fetch all records using pagination
          if (limit === 0) {
            const allClients: Array<ClientData> = [];
            const pageLimit = 200;
            let currentOffset = offset || 0;
            let totalFilteredRecords = 0;

            do {
              const paginationParams = {
                ...filters,
                limit: pageLimit,
                offset: currentOffset
              };

              const response = await axiosInstance.get<ListClientsResponse>('/v1/clients', { params: paginationParams });
              const { totalFilteredRecords: total, pageItems } = response.data;

              allClients.push(...pageItems);
              totalFilteredRecords = total;
              currentOffset += pageLimit;
            } while (currentOffset < totalFilteredRecords);

            return { totalFilteredRecords, pageItems: allClients };
          } else {
            // Regular paginated request
            const response = await axiosInstance.get<ListClientsResponse>('/v1/clients', { params: queryParams });
            return response.data;
          }
        } catch (error) {
          handleAxiosError(error);
        }
      }
    };
  };

  const queryMethods = {
    where: (field: string) => {
      validateClientFilterKey(field);
      return {
        eq: (value: any) => {
          // Validate using the new Zod-based filters
          validateClientFilters({ [field]: value });
          return createClientQuery({ ...filters, [field]: value }, limit, offset, tenantId);
        }
      };
    },
    limit: (value: number) => createClientQuery(filters, value, offset, tenantId),
    offset: (value: number) => createClientQuery(filters, limit, value, tenantId),
    all: () => createClientQuery(filters, 0, offset, tenantId), // Set limit to 0 to fetch all records
    execute: buildCommand
  };

  return queryMethods;
};

export const ListClients = (params?: { tenantId?: string }) => {
  return {
    list: () => createClientQuery({}, undefined, undefined, params?.tenantId)
  };
};

export const GetClients = (params: ListClientsRequest, configuration: { tenantId?: string }): Command<{params: ListClientsRequest, configuration: { tenantId?: string }}, ListClientsResponse> => {
  return {
    input: { params, configuration },
    metadata: {
      commandName: 'GetClients',
      path: `/v1/clients`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      if (configuration.tenantId) {
        config.tenantId = configuration.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      const allClients: Array<ClientData> = [];
      const limit = params.limit || 200;
      let offset = params.offset || 0;
      let totalFilteredRecords = 0;

      const newParams = {
        ...params,
        limit,
        offset
      };

      try {
        if (params.limit === 0) {
          do {
            const response = await axiosInstance.get<ListClientsResponse>(`/v1/clients`, { params: newParams });
            const { totalFilteredRecords: total, pageItems } = response.data;
            allClients.push(...pageItems);
            totalFilteredRecords = total;
            offset += limit;
          } while (offset < totalFilteredRecords);
          return { totalFilteredRecords, pageItems: allClients };
        } else {
          const response = await axiosInstance.get<ListClientsResponse>('/v1/clients', { params: newParams });
          return response.data;
        }
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const DeleteClient = (params: { clientId: number, tenantId?: string }): Command<{ clientId: number, tenantId?: string }, ProcessOutput> => {
  return {
    input: params,
    metadata: {
      commandName: 'DeleteClient',
      path: `/v1/clients/${params.clientId}`,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.delete(`/v1/clients/${params.clientId}`);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
