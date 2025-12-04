import { bc as UpdateRecipientRequest, ag as Recipient, ae as ProcessOutput } from '../clientAddress-0zJS1h3A.mjs';
export { A as ApproveRejectClientDocument, B as BlockAccount, s as CloseAccount, r as CreateAndActivateAccount, _ as CreateCardProduct, j as CreateClient, a1 as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, N as CreateRecipient, I as CreateTransfer, q as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, O as DeleteRecipient, X as DeleteSelfServiceUser, v as DownloadAccountStatement, T as EnableSelfServiceAccess, u as GenerateAccountStatement, n as GetAccount, o as GetAccountsOfClient, Z as GetCardProduct, h as GetClient, a0 as GetClientAddress, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, K as GetRecipient, P as GetRecipients, m as GetStatusOfVerifyClient, J as GetTransfer, E as GetTransfers, R as GetUserDetail, Q as GraphQL, H as HoldAmount, Y as ListCardProduct, L as ListClientDocument, z as LogFailTransfer, x as MarkAsFail, y as MarkAsProcessing, w as MarkAsReturned, M as MarkAsSuccess, t as ScheduleAccountClosure, S as SendAuthorizationToCore, a3 as SetClientAddressStatus, p as UpdateAccount, b as UpdateCardID, $ as UpdateCardProduct, i as UpdateClient, a2 as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, W as UpdateSelfServiceUser, F as UpdateTraceNumber, f as UploadClientIdentifierDocument, V as VerifyWithActivateClients } from '../clientAddress-0zJS1h3A.mjs';
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
