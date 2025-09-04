import { b as CreatePaymentInput, a as Command, Y as ProcessOutput, P as Payment, U as UpdatePaymentInput, g as PaymentFilters, c as PaymentResponse, E as UpdateClientRequest, F as ProcessOutput$1, G as UpdateClientIdentifierRequest, Z as UpdateClientIdentifierResponse, D as CreateClientRequest, _ as CreateClientResponse, $ as ListClientsRequest, a0 as ListClientsResponse, v as SavingAccount, a1 as ListAccountsOfClientRequest, z as UpdateAccountRequest, a2 as GraphQLRequest } from './client-CHyhpYj2.mjs';
import { z } from 'zod';

declare const CreatePayment: (params: {
    payment: CreatePaymentInput;
    tenantId?: string;
}) => Command<{
    payment: CreatePaymentInput;
    tenantId?: string;
}, ProcessOutput>;
declare const GetPayment: (params: {
    id: number;
    tenantId?: string;
}) => Command<{
    id: number;
    tenantId?: string;
}, Payment>;
declare const UpdatePayment: (params: {
    id: number;
    payment: UpdatePaymentInput;
    tenantId?: string;
}) => Command<{
    id: number;
    payment: UpdatePaymentInput;
    tenantId?: string;
}, Payment>;
declare const GetPayments: (params: PaymentFilters, configuration?: {
    tenantId?: string;
}) => Command<{
    params: PaymentFilters;
    configuration?: {
        tenantId?: string;
    };
}, PaymentResponse>;
declare const DeletePayment: (params: {
    id: number;
    tenantId?: string;
}) => Command<{
    id: number;
    tenantId?: string;
}, void>;

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
}, ProcessOutput$1>;
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
}, ProcessOutput$1>;

declare const GetAccount: (params: {
    id: number;
    tenantId?: string;
}) => Command<{
    id: number;
    tenantId?: string;
}, SavingAccount>;
declare const UpdateAccount: (params: {
    clientId: number;
    accountId: number;
    updates: UpdateAccountRequest;
    tenantId?: string;
}) => Command<{
    clientId: number;
    accountId: number;
    updates: UpdateAccountRequest;
    tenantId?: string;
}, any>;
declare const DeleteAccount: (params: {
    accountId: number;
    tenantId?: string;
}) => Command<{
    accountId: number;
    tenantId?: string;
}, ProcessOutput$1>;
declare const ListAccountsOfClient: (params?: {
    clientId: number;
    tenantId?: string;
}) => {
    list: () => {
        where: (field: string) => {
            eq: (value: any) => /*elided*/ any;
        };
        execute: () => Command<any, ListAccountsOfClientRequest>;
    };
};
declare const GetAccountsOfClient: (clientId: number, params: ListAccountsOfClientRequest, configuration: {
    tenantId?: string;
}) => Command<{
    params: ListAccountsOfClientRequest;
    configuration: {
        tenantId?: string;
    };
}, ListAccountsOfClientRequest>;

declare const GraphQL: (request: GraphQLRequest) => Command<GraphQLRequest, any>;

declare const UserDetailSchema: z.ZodObject<{
    username: z.ZodString;
    userId: z.ZodNumber;
    accessToken: z.ZodString;
    authenticated: z.ZodBoolean;
    officeId: z.ZodNumber;
    officeName: z.ZodString;
    roles: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
        description: z.ZodString;
        disabled: z.ZodBoolean;
        isSelfService: z.ZodBoolean;
        position: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: number;
        description: string;
        disabled: boolean;
        isSelfService: boolean;
        position: number;
    }, {
        name: string;
        id: number;
        description: string;
        disabled: boolean;
        isSelfService: boolean;
        position: number;
    }>, "many">;
    permissions: z.ZodArray<z.ZodString, "many">;
    shouldRenewPassword: z.ZodBoolean;
    isTwoFactorAuthenticationRequired: z.ZodBoolean;
    isSelfServiceUser: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    officeId: number;
    officeName: string;
    username: string;
    userId: number;
    accessToken: string;
    authenticated: boolean;
    roles: {
        name: string;
        id: number;
        description: string;
        disabled: boolean;
        isSelfService: boolean;
        position: number;
    }[];
    permissions: string[];
    shouldRenewPassword: boolean;
    isTwoFactorAuthenticationRequired: boolean;
    isSelfServiceUser: boolean;
}, {
    officeId: number;
    officeName: string;
    username: string;
    userId: number;
    accessToken: string;
    authenticated: boolean;
    roles: {
        name: string;
        id: number;
        description: string;
        disabled: boolean;
        isSelfService: boolean;
        position: number;
    }[];
    permissions: string[];
    shouldRenewPassword: boolean;
    isTwoFactorAuthenticationRequired: boolean;
    isSelfServiceUser: boolean;
}>;
type UserDetail = z.infer<typeof UserDetailSchema>;

declare const GetUserDetail: (params?: {
    tenantId?: string;
}) => Command<{
    tenantId?: string;
}, UserDetail>;

export { CreatePayment as C, DeleteClient as D, GetPayment as G, ListAccountsOfClient as L, SendAuthorizationToCore as S, UpdatePayment as U, GetPayments as a, UpdateCardID as b, GetClient as c, UpdateClient as d, UpdateClientIdentifier as e, CreateClient as f, GetClients as g, GetAccount as h, GetAccountsOfClient as i, UpdateAccount as j, DeleteAccount as k, GraphQL as l, GetUserDetail as m, DeletePayment as n };
