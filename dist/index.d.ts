export { createClient } from './client/index.js';
export { au as AccountDetailsDataZod, aH as AccountTypeSchema, av as AddressZod, aR as AgentSchema, at as BankInformationZod, aQ as ClientSchema, e as CreateClient, j as CreateClientIdentifier, C as CreatePayment, F as CreatePaymentInput, a7 as CreatePaymentInputShape, a3 as CreatePaymentInputZod, y as CreateRecipient, Y as CreateRecipientRequest, ar as CreateRecipientRequestShape, an as CreateRecipientRequestZod, v as CreateTransfer, K as CreateTransferInput, aJ as CreateTransferInputShape, ay as CreateTransferInputZod, aP as CreateTransferOutputShape, aE as CreateTransferOutputZod, o as DeleteAccount, g as DeleteClient, D as DeletePayment, z as DeleteRecipient, l as GetAccount, m as GetAccountsOfClient, c as GetClient, f as GetClients, G as GetPayment, a as GetPayments, i as GetPermittedDocumentTypes, x as GetRecipient, A as GetRecipients, h as GetStatusOfVerifyClient, w as GetTransfer, J as GetTransferInput, aK as GetTransferInputShape, az as GetTransferInputZod, t as GetTransfers, E as GetUserDetail, B as GraphQL, L as ListAccountsOfClient, ac as ListAccountsOfClientResponseShape, ad as ListAccountsOfClientResponseZod, ae as ListAccountsRequestShape, af as ListAccountsRequestZod, s as LogFailTransfer, q as MarkAsFail, r as MarkAsProcessing, O as MarkAsReturnInput, aL as MarkAsReturnInputShape, aA as MarkAsReturnInputZod, p as MarkAsReturned, M as MarkAsSuccess, aS as PartySchema, P as Payment, W as PaymentRail, a0 as PaymentRailZod, I as PaymentResponse, a5 as PaymentResponseZod, a6 as PaymentShape, $ as PaymentStatusZod, a1 as PaymentTypeZod, R as ProcessOutput, aN as ProcessOutputShape, aC as ProcessOutputZod, X as Recipient, _ as RecipientFilterKey, ap as RecipientFilterKeyZod, Z as RecipientRequest, as as RecipientRequestShape, ao as RecipientRequestZod, aq as RecipientShape, am as RecipientZod, aw as RecipientsZod, ab as SavingAccount, aa as SavingAccountShape, a9 as SavingAccountZod, S as SendAuthorizationToCore, a2 as SortOrderZod, T as Transfer, aF as TransferPaymentRailZod, aG as TransferPaymentTypeZod, N as TransferResponse, aO as TransferResponseShape, aD as TransferResponseZod, aI as TransferShape, ax as TransferZod, n as UpdateAccount, ag as UpdateAccountRequest, ai as UpdateAccountRequestShape, ah as UpdateAccountRequestZod, b as UpdateCardID, d as UpdateClient, k as UpdateClientIdentifier, U as UpdatePayment, H as UpdatePaymentInput, a8 as UpdatePaymentInputShape, a4 as UpdatePaymentInputZod, u as UpdateTraceNumber, Q as UpdateTraceNumbersInput, aM as UpdateTraceNumbersInputShape, aB as UpdateTraceNumbersInputZod, aj as UserDetail, ak as UserDetailSchema, al as UserDetailShape, V as VerifyWithActivateClients } from './user-Bi5spwoF.js';
import { M as Middleware } from './config.d-io5V_aK4.js';
export { a as Command, C as Config } from './config.d-io5V_aK4.js';
import 'zod';
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
