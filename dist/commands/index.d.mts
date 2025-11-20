import { aT as UpdateRecipientRequest, X as Recipient, R as ProcessOutput } from '../user-Db1Hv2n2.mjs';
export { e as CreateClient, j as CreateClientIdentifier, C as CreatePayment, y as CreateRecipient, v as CreateTransfer, o as DeleteAccount, g as DeleteClient, D as DeletePayment, z as DeleteRecipient, l as GetAccount, m as GetAccountsOfClient, c as GetClient, f as GetClients, G as GetPayment, a as GetPayments, i as GetPermittedDocumentTypes, x as GetRecipient, A as GetRecipients, h as GetStatusOfVerifyClient, w as GetTransfer, t as GetTransfers, E as GetUserDetail, B as GraphQL, L as ListAccountsOfClient, s as LogFailTransfer, q as MarkAsFail, r as MarkAsProcessing, p as MarkAsReturned, M as MarkAsSuccess, S as SendAuthorizationToCore, n as UpdateAccount, b as UpdateCardID, d as UpdateClient, k as UpdateClientIdentifier, U as UpdatePayment, u as UpdateTraceNumber, V as VerifyWithActivateClients } from '../user-Db1Hv2n2.mjs';
import { a as Command } from '../config.d-io5V_aK4.mjs';
import 'zod';
import 'graphql';
import 'axios';

interface CustomUpdateInput {
  commandName?: string;
  url: string;
  tenantId?: string;
  updates: object;
  params?: Record<string, any>;
}

interface CustomCreateInput {
  commandName?: string;
  url: string;
  tenantId?: string;
  data: object;
  params?: Record<string, any>;
}

interface CustomGetInput {
  commandName?: string;
  url: string;
  tenantId?: string;
  params?: Record<string, any>;
}

declare const UpdateRecipientGQL: (params: {
    id: number;
    input: UpdateRecipientRequest;
    tenantId?: string;
}) => Command<{
    id: number;
    input: UpdateRecipientRequest;
    tenantId?: string;
}, {
    updateRecipient: Recipient;
}>;

declare const CustomUpdate: (params: CustomUpdateInput) => Command<CustomUpdateInput, ProcessOutput>;
declare const CustomCreate: (params: CustomCreateInput) => Command<CustomCreateInput, ProcessOutput>;
declare const CustomGet: (params: CustomGetInput) => Command<CustomGetInput, any>;

export { CustomCreate, CustomGet, CustomUpdate, UpdateRecipientGQL as UpdateRecipient };
