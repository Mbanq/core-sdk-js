import { bo as UpdateRecipientRequest, as as Recipient, aq as ProcessOutput } from '../transaction-BlR5omob.js';
export { A as ApproveRejectClientDocument, B as BlockAccount, s as CloseAccount, u as CreateAccountProduct, r as CreateAndActivateAccount, a3 as CreateCardProduct, j as CreateClient, a6 as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, T as CreateRecipient, P as CreateTransfer, q as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, W as DeleteRecipient, a0 as DeleteSelfServiceUser, z as DownloadAccountStatement, ad as EnableDisableConfiguration, _ as EnableSelfServiceAccess, y as GenerateAccountStatement, n as GetAccount, E as GetAccountDocumentsDetails, x as GetAccountProductById, o as GetAccountsOfClient, w as GetAllAccountProducts, a2 as GetCardProduct, h as GetClient, a5 as GetClientAddress, aa as GetClientClassification, k as GetClients, af as GetCompletedTransactions, ac as GetConfigurationByName, ab as GetConfigurations, G as GetPayment, a as GetPayments, ae as GetPendingTransactions, c as GetPermittedDocumentTypes, R as GetRecipient, X as GetRecipients, m as GetStatusOfVerifyClient, Q as GetTransfer, N as GetTransfers, Z as GetUserDetail, Y as GraphQL, H as HoldAmount, a1 as ListCardProduct, L as ListClientDocument, K as LogFailTransfer, I as MarkAsFail, J as MarkAsProcessing, F as MarkAsReturned, M as MarkAsSuccess, t as ScheduleAccountClosure, S as SendAuthorizationToCore, a8 as SetClientAddressStatus, a9 as SwitchClientClassification, p as UpdateAccount, v as UpdateAccountProduct, b as UpdateCardID, a4 as UpdateCardProduct, i as UpdateClient, a7 as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, $ as UpdateSelfServiceUser, O as UpdateTraceNumber, f as UploadClientIdentifierDocument, V as VerifyWithActivateClients } from '../transaction-BlR5omob.js';
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
