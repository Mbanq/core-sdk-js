import { C as Command, U as UpdateClientRequest, P as ProcessOutput, c as UpdateClientIdentifierRequest, i as UpdateClientIdentifierResponse, b as CreateClientRequest, j as CreateClientResponse, L as ListClientsRequest, k as ListClientsResponse, l as GraphQLRequest } from './client-DhU5QMWd.js';

interface SimpleCard {
  internalCardId: string,
  cardType?: string,
  tenantIdentifier?: string,
  status?: string
}

interface AuthorizationRequest {
  card: SimpleCard,
  payload: any,
  tenantId?: string,
  skipNotification?: boolean,
  flag?: string
}

interface CardUpdate {
  clientId: number,
  businessCardIDURL: string,
  businessCardIDQRCode: string
  tenantId?: string
}

declare const SendAuthorizationToCore: (params: AuthorizationRequest) => Command<AuthorizationRequest, any>;
declare const UpdateCardID: (params: CardUpdate) => Command<CardUpdate, void>;

declare const GetClient: (params: {
    clientId: number;
    tenantId?: string;
    riskRating?: boolean;
    clientAddress?: boolean;
    clientIdentifier?: boolean;
    staffInSelectedOfficeOnly?: boolean;
    checkIdentitiesExpiration?: boolean;
    clientAccountAssociate?: boolean;
}) => Command<{
    clientId: number;
    tenantId?: string;
    riskRating?: boolean;
    clientAddress?: boolean;
    clientIdentifier?: boolean;
    staffInSelectedOfficeOnly?: boolean;
    checkIdentitiesExpiration?: boolean;
    clientAccountAssociate?: boolean;
}, any>;
declare const UpdateClient: (params: {
    tenantId?: string;
    clientId: number;
    updates: UpdateClientRequest;
}) => Command<{
    tenantId?: string;
    clientId: number;
    updates: UpdateClientRequest;
}, ProcessOutput>;
declare const UpdateClientIdentifier: (params: {
    tenantId?: string;
    clientId: number;
    identifierId: string;
    updates: UpdateClientIdentifierRequest;
}) => Command<{
    tenantId?: string;
    clientId: number;
    identifierId: string;
    updates: UpdateClientIdentifierRequest;
}, UpdateClientIdentifierResponse>;
declare const CreateClient: (params: {
    tenantId?: string;
    clientData: CreateClientRequest;
}) => Command<{
    tenantId?: string;
    clientData: CreateClientRequest;
}, CreateClientResponse>;
declare const GetClients: (params: ListClientsRequest, configuration: {
    tenantId?: string;
}) => Command<{
    params: ListClientsRequest;
    configuration: {
        tenantId?: string;
    };
}, ListClientsResponse>;
declare const DeleteClient: (params: {
    clientId: number;
    tenantId?: string;
}) => Command<{
    clientId: number;
    tenantId?: string;
}, ProcessOutput>;

declare const GraphQL: (request: GraphQLRequest) => Command<GraphQLRequest, any>;

export { CreateClient as C, DeleteClient as D, GetClient as G, SendAuthorizationToCore as S, UpdateCardID as U, UpdateClient as a, UpdateClientIdentifier as b, GetClients as c, GraphQL as d };
