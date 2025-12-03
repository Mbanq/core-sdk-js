import { b7 as UpdateRecipientRequest, ab as Recipient, a9 as ProcessOutput } from '../clientAddress-C12-tOoG.mjs';
export { A as ApproveRejectClientDocument, s as CreateAndActivateAccount, T as CreateCardProduct, j as CreateClient, Y as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, F as CreateRecipient, z as CreateTransfer, r as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, H as DeleteRecipient, P as DeleteSelfServiceUser, N as EnableSelfServiceAccess, n as GetAccount, o as GetAccountsOfClient, R as GetCardProduct, h as GetClient, X as GetClientAddress, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, E as GetRecipient, I as GetRecipients, m as GetStatusOfVerifyClient, B as GetTransfer, x as GetTransfers, K as GetUserDetail, J as GraphQL, p as ListAccountsOfClient, Q as ListCardProduct, L as ListClientDocument, w as LogFailTransfer, u as MarkAsFail, v as MarkAsProcessing, t as MarkAsReturned, M as MarkAsSuccess, S as SendAuthorizationToCore, _ as SetClientAddressStatus, q as UpdateAccount, b as UpdateCardID, W as UpdateCardProduct, i as UpdateClient, Z as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, O as UpdateSelfServiceUser, y as UpdateTraceNumber, f as UploadClientIdentifierDocument, V as VerifyWithActivateClients } from '../clientAddress-C12-tOoG.mjs';
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
