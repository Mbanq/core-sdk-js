import { aV as UpdateRecipientRequest, Z as Recipient, X as ProcessOutput } from '../user-gu209TVJ.js';
export { i as CreateClient, d as CreateClientIdentifier, C as CreatePayment, A as CreateRecipient, x as CreateTransfer, q as DeleteAccount, k as DeleteClient, D as DeletePayment, B as DeleteRecipient, m as GetAccount, n as GetAccountsOfClient, g as GetClient, j as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, z as GetRecipient, E as GetRecipients, l as GetStatusOfVerifyClient, y as GetTransfer, v as GetTransfers, H as GetUserDetail, F as GraphQL, o as ListAccountsOfClient, L as ListClientDocument, u as LogFailTransfer, s as MarkAsFail, t as MarkAsProcessing, r as MarkAsReturned, M as MarkAsSuccess, S as SendAuthorizationToCore, p as UpdateAccount, b as UpdateCardID, h as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment, w as UpdateTraceNumber, f as UploadClientIdentifierDocument, V as VerifyWithActivateClients } from '../user-gu209TVJ.js';
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
