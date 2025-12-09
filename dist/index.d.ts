export { createClient } from './client/index.js';
export { a$ as AccountDetailsDataZod, bc as AccountTypeSchema, b0 as AddressZod, bm as AgentSchema, A as ApproveRejectClientDocument, a_ as BankInformationZod, B as BlockAccount, bl as ClientSchema, s as CloseAccount, u as CreateAccountProduct, r as CreateAndActivateAccount, a3 as CreateCardProduct, j as CreateClient, a6 as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, ah as CreatePaymentInput, aE as CreatePaymentInputShape, aA as CreatePaymentInputZod, T as CreateRecipient, at as CreateRecipientRequest, aY as CreateRecipientRequestShape, aU as CreateRecipientRequestZod, P as CreateTransfer, am as CreateTransferInput, be as CreateTransferInputShape, b3 as CreateTransferInputZod, bk as CreateTransferOutputShape, b9 as CreateTransferOutputZod, q as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, W as DeleteRecipient, a0 as DeleteSelfServiceUser, z as DownloadAccountStatement, ad as EnableDisableConfiguration, _ as EnableSelfServiceAccess, y as GenerateAccountStatement, n as GetAccount, E as GetAccountDocumentsDetails, x as GetAccountProductById, o as GetAccountsOfClient, w as GetAllAccountProducts, a2 as GetCardProduct, h as GetClient, a5 as GetClientAddress, aa as GetClientClassification, k as GetClients, af as GetCompletedTransactions, ac as GetConfigurationByName, ab as GetConfigurations, G as GetPayment, a as GetPayments, ae as GetPendingTransactions, c as GetPermittedDocumentTypes, R as GetRecipient, X as GetRecipients, m as GetStatusOfVerifyClient, Q as GetTransfer, al as GetTransferInput, bf as GetTransferInputShape, b4 as GetTransferInputZod, N as GetTransfers, Z as GetUserDetail, Y as GraphQL, H as HoldAmount, aJ as ListAccountsOfClientResponseShape, aK as ListAccountsOfClientResponseZod, aL as ListAccountsRequestShape, aM as ListAccountsRequestZod, a1 as ListCardProduct, L as ListClientDocument, K as LogFailTransfer, I as MarkAsFail, J as MarkAsProcessing, ao as MarkAsReturnInput, bg as MarkAsReturnInputShape, b5 as MarkAsReturnInputZod, F as MarkAsReturned, M as MarkAsSuccess, bn as PartySchema, ag as Payment, ar as PaymentRail, ax as PaymentRailZod, aj as PaymentResponse, aC as PaymentResponseZod, aD as PaymentShape, aw as PaymentStatusZod, ay as PaymentTypeZod, aq as ProcessOutput, bi as ProcessOutputShape, b7 as ProcessOutputZod, as as Recipient, av as RecipientFilterKey, aW as RecipientFilterKeyZod, au as RecipientRequest, aZ as RecipientRequestShape, aV as RecipientRequestZod, aX as RecipientShape, aT as RecipientZod, b1 as RecipientsZod, aI as SavingAccount, aH as SavingAccountShape, aG as SavingAccountZod, t as ScheduleAccountClosure, S as SendAuthorizationToCore, a8 as SetClientAddressStatus, az as SortOrderZod, a9 as SwitchClientClassification, ak as Transfer, ba as TransferPaymentRailZod, bb as TransferPaymentTypeZod, an as TransferResponse, bj as TransferResponseShape, b8 as TransferResponseZod, bd as TransferShape, b2 as TransferZod, p as UpdateAccount, v as UpdateAccountProduct, aN as UpdateAccountRequest, aP as UpdateAccountRequestShape, aO as UpdateAccountRequestZod, b as UpdateCardID, a4 as UpdateCardProduct, i as UpdateClient, a7 as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, ai as UpdatePaymentInput, aF as UpdatePaymentInputShape, aB as UpdatePaymentInputZod, $ as UpdateSelfServiceUser, O as UpdateTraceNumber, ap as UpdateTraceNumbersInput, bh as UpdateTraceNumbersInputShape, b6 as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, aQ as UserDetail, aR as UserDetailSchema, aS as UserDetailShape, V as VerifyWithActivateClients } from './transaction-BlR5omob.js';
import { M as Middleware } from './config.d-io5V_aK4.js';
export { a as Command, C as Config } from './config.d-io5V_aK4.js';
import 'zod';
import 'buffer';
import 'graphql';
import 'axios';

interface MetricsClient {
    incrementCounter: (counterName: string) => void;
    recordError?: (error: Error) => void;
}
declare const createMetricsMiddleware: (metricsClient: MetricsClient) => Middleware;

interface Logger {
    info: (message: string, ...args: unknown[]) => void;
    error: (message: string, ...args: unknown[]) => void;
    warn?: (message: string, ...args: unknown[]) => void;
    log?: (message: string, ...args: unknown[]) => void;
}
declare const createLoggingMiddleware: (logger?: Logger) => Middleware;

interface ApiError {
  name: string;
  message: string;
  statusCode?: number;
  code?: string;
  requestId?: string;
  originalError?: Error;
}

declare const createCommandError: ({ message, statusCode, code, requestId, originalError }: Omit<ApiError, "name">) => ApiError;
declare const isCommandError: (error: unknown) => error is ApiError;

export { type ApiError, type Logger, type MetricsClient, Middleware, createCommandError, createLoggingMiddleware, createMetricsMiddleware, isCommandError };
