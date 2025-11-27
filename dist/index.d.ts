export { createClient } from './client/index.js';
export { aw as AccountDetailsDataZod, aJ as AccountTypeSchema, ax as AddressZod, aT as AgentSchema, av as BankInformationZod, aS as ClientSchema, i as CreateClient, d as CreateClientIdentifier, C as CreatePayment, I as CreatePaymentInput, a9 as CreatePaymentInputShape, a5 as CreatePaymentInputZod, A as CreateRecipient, _ as CreateRecipientRequest, at as CreateRecipientRequestShape, ap as CreateRecipientRequestZod, x as CreateTransfer, O as CreateTransferInput, aL as CreateTransferInputShape, aA as CreateTransferInputZod, aR as CreateTransferOutputShape, aG as CreateTransferOutputZod, q as DeleteAccount, k as DeleteClient, D as DeletePayment, B as DeleteRecipient, m as GetAccount, n as GetAccountsOfClient, g as GetClient, j as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, z as GetRecipient, E as GetRecipients, l as GetStatusOfVerifyClient, y as GetTransfer, N as GetTransferInput, aM as GetTransferInputShape, aB as GetTransferInputZod, v as GetTransfers, H as GetUserDetail, F as GraphQL, o as ListAccountsOfClient, ae as ListAccountsOfClientResponseShape, af as ListAccountsOfClientResponseZod, ag as ListAccountsRequestShape, ah as ListAccountsRequestZod, L as ListClientDocument, u as LogFailTransfer, s as MarkAsFail, t as MarkAsProcessing, R as MarkAsReturnInput, aN as MarkAsReturnInputShape, aC as MarkAsReturnInputZod, r as MarkAsReturned, M as MarkAsSuccess, aU as PartySchema, P as Payment, Y as PaymentRail, a2 as PaymentRailZod, K as PaymentResponse, a7 as PaymentResponseZod, a8 as PaymentShape, a1 as PaymentStatusZod, a3 as PaymentTypeZod, X as ProcessOutput, aP as ProcessOutputShape, aE as ProcessOutputZod, Z as Recipient, a0 as RecipientFilterKey, ar as RecipientFilterKeyZod, $ as RecipientRequest, au as RecipientRequestShape, aq as RecipientRequestZod, as as RecipientShape, ao as RecipientZod, ay as RecipientsZod, ad as SavingAccount, ac as SavingAccountShape, ab as SavingAccountZod, S as SendAuthorizationToCore, a4 as SortOrderZod, T as Transfer, aH as TransferPaymentRailZod, aI as TransferPaymentTypeZod, Q as TransferResponse, aQ as TransferResponseShape, aF as TransferResponseZod, aK as TransferShape, az as TransferZod, p as UpdateAccount, ai as UpdateAccountRequest, ak as UpdateAccountRequestShape, aj as UpdateAccountRequestZod, b as UpdateCardID, h as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment, J as UpdatePaymentInput, aa as UpdatePaymentInputShape, a6 as UpdatePaymentInputZod, w as UpdateTraceNumber, W as UpdateTraceNumbersInput, aO as UpdateTraceNumbersInputShape, aD as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, al as UserDetail, am as UserDetailSchema, an as UserDetailShape, V as VerifyWithActivateClients } from './user-gu209TVJ.js';
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
