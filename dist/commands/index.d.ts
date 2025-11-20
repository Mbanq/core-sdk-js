import { aU as UpdateRecipientRequest, Y as Recipient, W as ProcessOutput } from '../user-XhKoh-nv.js';
export { i as CreateClient, d as CreateClientIdentifier, C as CreatePayment, z as CreateRecipient, w as CreateTransfer, p as DeleteAccount, k as DeleteClient, D as DeletePayment, A as DeleteRecipient, m as GetAccount, n as GetAccountsOfClient, g as GetClient, j as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, y as GetRecipient, B as GetRecipients, l as GetStatusOfVerifyClient, x as GetTransfer, u as GetTransfers, F as GetUserDetail, E as GraphQL, L as ListAccountsOfClient, t as LogFailTransfer, r as MarkAsFail, s as MarkAsProcessing, q as MarkAsReturned, M as MarkAsSuccess, S as SendAuthorizationToCore, o as UpdateAccount, b as UpdateCardID, h as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment, v as UpdateTraceNumber, f as UploadClientIdentifierDocument, V as VerifyWithActivateClients } from '../user-XhKoh-nv.js';
import { a as Command } from '../config.d-io5V_aK4.js';
import 'zod';
import 'buffer';
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
