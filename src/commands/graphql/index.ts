import { print } from 'graphql';
import { Command, Config } from '../../types';
import baseRequest from '../../utils/baseRequest';
import { createCommandError } from '../../utils/errorHandler';
import { GraphQLRequest, GraphQLResponse } from '../../types/config';

export const GraphQL = (request: GraphQLRequest): Command<GraphQLRequest, any> => {
  return {
    input: request,
    metadata: {
      commandName: request.operationName || 'GraphQL',
      path: '/graphql',
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (request.tenantId) {
        config.tenantId = request.tenantId;
      }
      const axiosInstance = await baseRequest(config);
      const graphqlPath = config.graphqlPath || '/graphql';

      try {
        const query = typeof request.command === 'string' ? request.command : print(request.command);

        const { data } = await axiosInstance.post<GraphQLResponse<any>>(
          graphqlPath,
          {
            query,
            variables: request.variables,
            operationName: request.operationName
          }
        );

        if (data.errors?.length) {
          throw createCommandError({
            message: data.errors[0].message,
            code: 'graphql_error',
            originalError: data.errors[0] as Error
          });
        }

        if (!data.data) {
          throw createCommandError({
            message: 'No data returned from GraphQL query',
            code: 'graphql_no_data'
          });
        }

        return data.data;
      } catch (error) {
        if ((error as Error).name === 'CommandError') {
          throw error;
        }
        throw createCommandError({
          message: (error as Error).message,
          code: 'graphql_request_failed',
          originalError: error as Error
        });
      }
    }
  };
};

export * from './recipient';
export * from './payment';
