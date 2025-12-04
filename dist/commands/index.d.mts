import { bb as UpdateRecipientRequest, af as Recipient, ad as ProcessOutput } from '../clientAddress-CXh-iNRJ.mjs';
export { A as ApproveRejectClientDocument, B as BlockAccount, s as CloseAccount, r as CreateAndActivateAccount, Z as CreateCardProduct, j as CreateClient, a0 as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, K as CreateRecipient, F as CreateTransfer, q as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, N as DeleteRecipient, W as DeleteSelfServiceUser, R as EnableSelfServiceAccess, u as GenerateAccountStatement, n as GetAccount, o as GetAccountsOfClient, Y as GetCardProduct, h as GetClient, $ as GetClientAddress, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, J as GetRecipient, O as GetRecipients, m as GetStatusOfVerifyClient, I as GetTransfer, z as GetTransfers, Q as GetUserDetail, P as GraphQL, H as HoldAmount, X as ListCardProduct, L as ListClientDocument, y as LogFailTransfer, w as MarkAsFail, x as MarkAsProcessing, v as MarkAsReturned, M as MarkAsSuccess, t as ScheduleAccountClosure, S as SendAuthorizationToCore, a2 as SetClientAddressStatus, p as UpdateAccount, b as UpdateCardID, _ as UpdateCardProduct, i as UpdateClient, a1 as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, T as UpdateSelfServiceUser, E as UpdateTraceNumber, f as UploadClientIdentifierDocument, V as VerifyWithActivateClients } from '../clientAddress-CXh-iNRJ.mjs';
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
