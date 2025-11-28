import { aX as UpdateRecipientRequest, $ as Recipient, Z as ProcessOutput } from '../user-RDPW38ut.js';
export { A as ApproveRejectClientDocument, j as CreateClient, d as CreateClientIdentifier, C as CreatePayment, E as CreateRecipient, y as CreateTransfer, r as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, F as DeleteRecipient, n as GetAccount, o as GetAccountsOfClient, h as GetClient, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, B as GetRecipient, H as GetRecipients, m as GetStatusOfVerifyClient, z as GetTransfer, w as GetTransfers, J as GetUserDetail, I as GraphQL, p as ListAccountsOfClient, L as ListClientDocument, v as LogFailTransfer, t as MarkAsFail, u as MarkAsProcessing, s as MarkAsReturned, M as MarkAsSuccess, S as SendAuthorizationToCore, q as UpdateAccount, b as UpdateCardID, i as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment, x as UpdateTraceNumber, f as UploadClientIdentifierDocument, V as VerifyWithActivateClients } from '../user-RDPW38ut.js';
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
