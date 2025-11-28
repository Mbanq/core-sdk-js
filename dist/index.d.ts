export { createClient } from './client/index.js';
export { ax as AccountDetailsDataZod, aK as AccountTypeSchema, ay as AddressZod, aU as AgentSchema, aw as BankInformationZod, aT as ClientSchema, j as CreateClient, d as CreateClientIdentifier, C as CreatePayment, J as CreatePaymentInput, aa as CreatePaymentInputShape, a6 as CreatePaymentInputZod, B as CreateRecipient, $ as CreateRecipientRequest, au as CreateRecipientRequestShape, aq as CreateRecipientRequestZod, y as CreateTransfer, Q as CreateTransferInput, aM as CreateTransferInputShape, aB as CreateTransferInputZod, aS as CreateTransferOutputShape, aH as CreateTransferOutputZod, r as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, E as DeleteRecipient, n as GetAccount, o as GetAccountsOfClient, h as GetClient, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, A as GetRecipient, F as GetRecipients, m as GetStatusOfVerifyClient, z as GetTransfer, O as GetTransferInput, aN as GetTransferInputShape, aC as GetTransferInputZod, w as GetTransfers, I as GetUserDetail, H as GraphQL, p as ListAccountsOfClient, af as ListAccountsOfClientResponseShape, ag as ListAccountsOfClientResponseZod, ah as ListAccountsRequestShape, ai as ListAccountsRequestZod, L as ListClientDocument, v as LogFailTransfer, t as MarkAsFail, u as MarkAsProcessing, W as MarkAsReturnInput, aO as MarkAsReturnInputShape, aD as MarkAsReturnInputZod, s as MarkAsReturned, M as MarkAsSuccess, aV as PartySchema, P as Payment, Z as PaymentRail, a3 as PaymentRailZod, N as PaymentResponse, a8 as PaymentResponseZod, a9 as PaymentShape, a2 as PaymentStatusZod, a4 as PaymentTypeZod, Y as ProcessOutput, aQ as ProcessOutputShape, aF as ProcessOutputZod, _ as Recipient, a1 as RecipientFilterKey, as as RecipientFilterKeyZod, a0 as RecipientRequest, av as RecipientRequestShape, ar as RecipientRequestZod, at as RecipientShape, ap as RecipientZod, az as RecipientsZod, ae as SavingAccount, ad as SavingAccountShape, ac as SavingAccountZod, S as SendAuthorizationToCore, a5 as SortOrderZod, T as Transfer, aI as TransferPaymentRailZod, aJ as TransferPaymentTypeZod, R as TransferResponse, aR as TransferResponseShape, aG as TransferResponseZod, aL as TransferShape, aA as TransferZod, q as UpdateAccount, aj as UpdateAccountRequest, al as UpdateAccountRequestShape, ak as UpdateAccountRequestZod, b as UpdateCardID, i as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment, K as UpdatePaymentInput, ab as UpdatePaymentInputShape, a7 as UpdatePaymentInputZod, x as UpdateTraceNumber, X as UpdateTraceNumbersInput, aP as UpdateTraceNumbersInputShape, aE as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, am as UserDetail, an as UserDetailSchema, ao as UserDetailShape, V as VerifyWithActivateClients } from './user-DbIejCT0.js';
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
