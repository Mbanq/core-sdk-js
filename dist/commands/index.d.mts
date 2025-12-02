import { b6 as UpdateRecipientRequest, aa as Recipient, a8 as ProcessOutput } from '../clientAddress-BGKZaMi3.mjs';
export { A as ApproveRejectClientDocument, R as CreateCardProduct, j as CreateClient, X as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, E as CreateRecipient, y as CreateTransfer, r as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, F as DeleteRecipient, O as DeleteSelfServiceUser, K as EnableSelfServiceAccess, n as GetAccount, o as GetAccountsOfClient, Q as GetCardProduct, h as GetClient, W as GetClientAddress, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, B as GetRecipient, H as GetRecipients, m as GetStatusOfVerifyClient, z as GetTransfer, w as GetTransfers, J as GetUserDetail, I as GraphQL, p as ListAccountsOfClient, P as ListCardProduct, L as ListClientDocument, v as LogFailTransfer, t as MarkAsFail, u as MarkAsProcessing, s as MarkAsReturned, M as MarkAsSuccess, S as SendAuthorizationToCore, Z as SetClientAddressStatus, q as UpdateAccount, b as UpdateCardID, T as UpdateCardProduct, i as UpdateClient, Y as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, N as UpdateSelfServiceUser, x as UpdateTraceNumber, f as UploadClientIdentifierDocument, V as VerifyWithActivateClients } from '../clientAddress-BGKZaMi3.mjs';
import { a as Command } from '../config.d-io5V_aK4.mjs';
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
