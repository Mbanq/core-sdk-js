export { createClient } from './client/index.mjs';
export { av as AccountDetailsDataZod, aI as AccountTypeSchema, aw as AddressZod, aS as AgentSchema, au as BankInformationZod, aR as ClientSchema, i as CreateClient, d as CreateClientIdentifier, C as CreatePayment, H as CreatePaymentInput, a8 as CreatePaymentInputShape, a4 as CreatePaymentInputZod, z as CreateRecipient, Z as CreateRecipientRequest, as as CreateRecipientRequestShape, ao as CreateRecipientRequestZod, w as CreateTransfer, N as CreateTransferInput, aK as CreateTransferInputShape, az as CreateTransferInputZod, aQ as CreateTransferOutputShape, aF as CreateTransferOutputZod, p as DeleteAccount, k as DeleteClient, D as DeletePayment, A as DeleteRecipient, m as GetAccount, n as GetAccountsOfClient, g as GetClient, j as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, y as GetRecipient, B as GetRecipients, l as GetStatusOfVerifyClient, x as GetTransfer, K as GetTransferInput, aL as GetTransferInputShape, aA as GetTransferInputZod, u as GetTransfers, F as GetUserDetail, E as GraphQL, L as ListAccountsOfClient, ad as ListAccountsOfClientResponseShape, ae as ListAccountsOfClientResponseZod, af as ListAccountsRequestShape, ag as ListAccountsRequestZod, t as LogFailTransfer, r as MarkAsFail, s as MarkAsProcessing, Q as MarkAsReturnInput, aM as MarkAsReturnInputShape, aB as MarkAsReturnInputZod, q as MarkAsReturned, M as MarkAsSuccess, aT as PartySchema, P as Payment, X as PaymentRail, a1 as PaymentRailZod, J as PaymentResponse, a6 as PaymentResponseZod, a7 as PaymentShape, a0 as PaymentStatusZod, a2 as PaymentTypeZod, W as ProcessOutput, aO as ProcessOutputShape, aD as ProcessOutputZod, Y as Recipient, $ as RecipientFilterKey, aq as RecipientFilterKeyZod, _ as RecipientRequest, at as RecipientRequestShape, ap as RecipientRequestZod, ar as RecipientShape, an as RecipientZod, ax as RecipientsZod, ac as SavingAccount, ab as SavingAccountShape, aa as SavingAccountZod, S as SendAuthorizationToCore, a3 as SortOrderZod, T as Transfer, aG as TransferPaymentRailZod, aH as TransferPaymentTypeZod, O as TransferResponse, aP as TransferResponseShape, aE as TransferResponseZod, aJ as TransferShape, ay as TransferZod, o as UpdateAccount, ah as UpdateAccountRequest, aj as UpdateAccountRequestShape, ai as UpdateAccountRequestZod, b as UpdateCardID, h as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment, I as UpdatePaymentInput, a9 as UpdatePaymentInputShape, a5 as UpdatePaymentInputZod, v as UpdateTraceNumber, R as UpdateTraceNumbersInput, aN as UpdateTraceNumbersInputShape, aC as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, ak as UserDetail, al as UserDetailSchema, am as UserDetailShape, V as VerifyWithActivateClients } from './user-fScJMdzW.mjs';
import { M as Middleware } from './config.d-io5V_aK4.mjs';
export { a as Command, C as Config } from './config.d-io5V_aK4.mjs';
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
