export { createClient } from './client/index.js';
export { ay as AccountDetailsDataZod, aL as AccountTypeSchema, az as AddressZod, aV as AgentSchema, A as ApproveRejectClientDocument, ax as BankInformationZod, aU as ClientSchema, j as CreateClient, d as CreateClientIdentifier, C as CreatePayment, K as CreatePaymentInput, ab as CreatePaymentInputShape, a7 as CreatePaymentInputZod, E as CreateRecipient, a0 as CreateRecipientRequest, av as CreateRecipientRequestShape, ar as CreateRecipientRequestZod, y as CreateTransfer, R as CreateTransferInput, aN as CreateTransferInputShape, aC as CreateTransferInputZod, aT as CreateTransferOutputShape, aI as CreateTransferOutputZod, r as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, F as DeleteRecipient, n as GetAccount, o as GetAccountsOfClient, h as GetClient, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, B as GetRecipient, H as GetRecipients, m as GetStatusOfVerifyClient, z as GetTransfer, Q as GetTransferInput, aO as GetTransferInputShape, aD as GetTransferInputZod, w as GetTransfers, J as GetUserDetail, I as GraphQL, p as ListAccountsOfClient, ag as ListAccountsOfClientResponseShape, ah as ListAccountsOfClientResponseZod, ai as ListAccountsRequestShape, aj as ListAccountsRequestZod, L as ListClientDocument, v as LogFailTransfer, t as MarkAsFail, u as MarkAsProcessing, X as MarkAsReturnInput, aP as MarkAsReturnInputShape, aE as MarkAsReturnInputZod, s as MarkAsReturned, M as MarkAsSuccess, aW as PartySchema, P as Payment, _ as PaymentRail, a4 as PaymentRailZod, O as PaymentResponse, a9 as PaymentResponseZod, aa as PaymentShape, a3 as PaymentStatusZod, a5 as PaymentTypeZod, Z as ProcessOutput, aR as ProcessOutputShape, aG as ProcessOutputZod, $ as Recipient, a2 as RecipientFilterKey, at as RecipientFilterKeyZod, a1 as RecipientRequest, aw as RecipientRequestShape, as as RecipientRequestZod, au as RecipientShape, aq as RecipientZod, aA as RecipientsZod, af as SavingAccount, ae as SavingAccountShape, ad as SavingAccountZod, S as SendAuthorizationToCore, a6 as SortOrderZod, T as Transfer, aJ as TransferPaymentRailZod, aK as TransferPaymentTypeZod, W as TransferResponse, aS as TransferResponseShape, aH as TransferResponseZod, aM as TransferShape, aB as TransferZod, q as UpdateAccount, ak as UpdateAccountRequest, am as UpdateAccountRequestShape, al as UpdateAccountRequestZod, b as UpdateCardID, i as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment, N as UpdatePaymentInput, ac as UpdatePaymentInputShape, a8 as UpdatePaymentInputZod, x as UpdateTraceNumber, Y as UpdateTraceNumbersInput, aQ as UpdateTraceNumbersInputShape, aF as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, an as UserDetail, ao as UserDetailSchema, ap as UserDetailShape, V as VerifyWithActivateClients } from './user-RDPW38ut.js';
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
