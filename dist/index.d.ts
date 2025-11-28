export { createClient } from './client/index.js';
export { aB as AccountDetailsDataZod, aO as AccountTypeSchema, aC as AddressZod, aY as AgentSchema, A as ApproveRejectClientDocument, aA as BankInformationZod, aX as ClientSchema, j as CreateClient, d as CreateClientIdentifier, C as CreatePayment, Q as CreatePaymentInput, ae as CreatePaymentInputShape, aa as CreatePaymentInputZod, E as CreateRecipient, a3 as CreateRecipientRequest, ay as CreateRecipientRequestShape, au as CreateRecipientRequestZod, y as CreateTransfer, Y as CreateTransferInput, aQ as CreateTransferInputShape, aF as CreateTransferInputZod, aW as CreateTransferOutputShape, aL as CreateTransferOutputZod, r as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, F as DeleteRecipient, O as DeleteSelfServiceUser, K as EnableSelfServiceAccess, n as GetAccount, o as GetAccountsOfClient, h as GetClient, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, B as GetRecipient, H as GetRecipients, m as GetStatusOfVerifyClient, z as GetTransfer, X as GetTransferInput, aR as GetTransferInputShape, aG as GetTransferInputZod, w as GetTransfers, J as GetUserDetail, I as GraphQL, p as ListAccountsOfClient, aj as ListAccountsOfClientResponseShape, ak as ListAccountsOfClientResponseZod, al as ListAccountsRequestShape, am as ListAccountsRequestZod, L as ListClientDocument, v as LogFailTransfer, t as MarkAsFail, u as MarkAsProcessing, _ as MarkAsReturnInput, aS as MarkAsReturnInputShape, aH as MarkAsReturnInputZod, s as MarkAsReturned, M as MarkAsSuccess, aZ as PartySchema, P as Payment, a1 as PaymentRail, a7 as PaymentRailZod, T as PaymentResponse, ac as PaymentResponseZod, ad as PaymentShape, a6 as PaymentStatusZod, a8 as PaymentTypeZod, a0 as ProcessOutput, aU as ProcessOutputShape, aJ as ProcessOutputZod, a2 as Recipient, a5 as RecipientFilterKey, aw as RecipientFilterKeyZod, a4 as RecipientRequest, az as RecipientRequestShape, av as RecipientRequestZod, ax as RecipientShape, at as RecipientZod, aD as RecipientsZod, ai as SavingAccount, ah as SavingAccountShape, ag as SavingAccountZod, S as SendAuthorizationToCore, a9 as SortOrderZod, W as Transfer, aM as TransferPaymentRailZod, aN as TransferPaymentTypeZod, Z as TransferResponse, aV as TransferResponseShape, aK as TransferResponseZod, aP as TransferShape, aE as TransferZod, q as UpdateAccount, an as UpdateAccountRequest, ap as UpdateAccountRequestShape, ao as UpdateAccountRequestZod, b as UpdateCardID, i as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment, R as UpdatePaymentInput, af as UpdatePaymentInputShape, ab as UpdatePaymentInputZod, N as UpdateSelfServiceUser, x as UpdateTraceNumber, $ as UpdateTraceNumbersInput, aT as UpdateTraceNumbersInputShape, aI as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, aq as UserDetail, ar as UserDetailSchema, as as UserDetailShape, V as VerifyWithActivateClients } from './user-B1TYQI_2.js';
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
