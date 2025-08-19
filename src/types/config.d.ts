import type { DocumentNode } from 'graphql';
import type { AxiosInstance } from 'axios';

export interface Config {
  credential?: Credential;
  secret?: string;
  baseUrl: string;
  tenantId: string;
  signee?: string;
  bearerToken?: string;
  graphqlPath?: string;
  middlewares?: Middleware[];
  logger?: (instance: AxiosInstance) => void;
  traceId?: string;
  axiosConfig?: {
    timeout?: number;
    headers?: Record<string, string>;
    keepAlive?: boolean;
  };
}

export interface Credential {
  client_secret: string,
  grant_type: string,
  client_id: string,
  username: string,
  password: string
}

export interface Middleware {
  before?: (command: Command<any, any>) => Promise<void>;
  after?: (command: Command<any, any>, response: any) => Promise<void>;
  onError?: (command: Command<any, any>, error: Error) => Promise<void>;
}

export interface Command<TInput, TOutput> {
  input: TInput;
  metadata: {
    commandName: string;
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  };
  execute: (config: Config) => Promise<TOutput | undefined>;
}

export interface GraphQLRequest {
  command: string | DocumentNode;
  tenantId?: string;
  variables?: any;
  operationName?: string;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
    extensions?: Record<string, any>;
  }>;
}
