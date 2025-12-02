export { createClient } from './client/index.js';
export { aF as AccountDetailsDataZod, aS as AccountTypeSchema, aG as AddressZod, b0 as AgentSchema, A as ApproveRejectClientDocument, aE as BankInformationZod, a$ as ClientSchema, R as CreateCardProduct, j as CreateClient, d as CreateClientIdentifier, C as CreatePayment, X as CreatePaymentInput, ai as CreatePaymentInputShape, ae as CreatePaymentInputZod, E as CreateRecipient, a7 as CreateRecipientRequest, aC as CreateRecipientRequestShape, ay as CreateRecipientRequestZod, y as CreateTransfer, a0 as CreateTransferInput, aU as CreateTransferInputShape, aJ as CreateTransferInputZod, a_ as CreateTransferOutputShape, aP as CreateTransferOutputZod, r as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, F as DeleteRecipient, O as DeleteSelfServiceUser, K as EnableSelfServiceAccess, n as GetAccount, o as GetAccountsOfClient, Q as GetCardProduct, h as GetClient, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, B as GetRecipient, H as GetRecipients, m as GetStatusOfVerifyClient, z as GetTransfer, $ as GetTransferInput, aV as GetTransferInputShape, aK as GetTransferInputZod, w as GetTransfers, J as GetUserDetail, I as GraphQL, p as ListAccountsOfClient, an as ListAccountsOfClientResponseShape, ao as ListAccountsOfClientResponseZod, ap as ListAccountsRequestShape, aq as ListAccountsRequestZod, P as ListCardProduct, L as ListClientDocument, v as LogFailTransfer, t as MarkAsFail, u as MarkAsProcessing, a2 as MarkAsReturnInput, aW as MarkAsReturnInputShape, aL as MarkAsReturnInputZod, s as MarkAsReturned, M as MarkAsSuccess, b1 as PartySchema, W as Payment, a5 as PaymentRail, ab as PaymentRailZod, Z as PaymentResponse, ag as PaymentResponseZod, ah as PaymentShape, aa as PaymentStatusZod, ac as PaymentTypeZod, a4 as ProcessOutput, aY as ProcessOutputShape, aN as ProcessOutputZod, a6 as Recipient, a9 as RecipientFilterKey, aA as RecipientFilterKeyZod, a8 as RecipientRequest, aD as RecipientRequestShape, az as RecipientRequestZod, aB as RecipientShape, ax as RecipientZod, aH as RecipientsZod, am as SavingAccount, al as SavingAccountShape, ak as SavingAccountZod, S as SendAuthorizationToCore, ad as SortOrderZod, _ as Transfer, aQ as TransferPaymentRailZod, aR as TransferPaymentTypeZod, a1 as TransferResponse, aZ as TransferResponseShape, aO as TransferResponseZod, aT as TransferShape, aI as TransferZod, q as UpdateAccount, ar as UpdateAccountRequest, at as UpdateAccountRequestShape, as as UpdateAccountRequestZod, b as UpdateCardID, T as UpdateCardProduct, i as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment, Y as UpdatePaymentInput, aj as UpdatePaymentInputShape, af as UpdatePaymentInputZod, N as UpdateSelfServiceUser, x as UpdateTraceNumber, a3 as UpdateTraceNumbersInput, aX as UpdateTraceNumbersInputShape, aM as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, au as UserDetail, av as UserDetailSchema, aw as UserDetailShape, V as VerifyWithActivateClients } from './cardProduct-CUtYMnwz.js';
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
