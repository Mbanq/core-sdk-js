import { b8 as UpdateRecipientRequest, ac as Recipient, aa as ProcessOutput } from '../clientAddress-CpbODQpK.mjs';
export { A as ApproveRejectClientDocument, B as BlockAccount, s as CloseAccount, r as CreateAndActivateAccount, W as CreateCardProduct, j as CreateClient, Z as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, H as CreateRecipient, z as CreateTransfer, q as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, I as DeleteRecipient, Q as DeleteSelfServiceUser, O as EnableSelfServiceAccess, n as GetAccount, o as GetAccountsOfClient, T as GetCardProduct, h as GetClient, Y as GetClientAddress, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, F as GetRecipient, J as GetRecipients, m as GetStatusOfVerifyClient, E as GetTransfer, x as GetTransfers, N as GetUserDetail, K as GraphQL, R as ListCardProduct, L as ListClientDocument, w as LogFailTransfer, u as MarkAsFail, v as MarkAsProcessing, t as MarkAsReturned, M as MarkAsSuccess, S as SendAuthorizationToCore, $ as SetClientAddressStatus, p as UpdateAccount, b as UpdateCardID, X as UpdateCardProduct, i as UpdateClient, _ as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, P as UpdateSelfServiceUser, y as UpdateTraceNumber, f as UploadClientIdentifierDocument, V as VerifyWithActivateClients } from '../clientAddress-CpbODQpK.mjs';
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
