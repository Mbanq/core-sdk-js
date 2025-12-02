export { createClient } from './client/index.mjs';
export { aJ as AccountDetailsDataZod, aW as AccountTypeSchema, aK as AddressZod, b4 as AgentSchema, A as ApproveRejectClientDocument, aI as BankInformationZod, b3 as ClientSchema, R as CreateCardProduct, j as CreateClient, X as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, $ as CreatePaymentInput, am as CreatePaymentInputShape, ai as CreatePaymentInputZod, E as CreateRecipient, ab as CreateRecipientRequest, aG as CreateRecipientRequestShape, aC as CreateRecipientRequestZod, y as CreateTransfer, a4 as CreateTransferInput, aY as CreateTransferInputShape, aN as CreateTransferInputZod, b2 as CreateTransferOutputShape, aT as CreateTransferOutputZod, r as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, F as DeleteRecipient, O as DeleteSelfServiceUser, K as EnableSelfServiceAccess, n as GetAccount, o as GetAccountsOfClient, Q as GetCardProduct, h as GetClient, W as GetClientAddress, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, B as GetRecipient, H as GetRecipients, m as GetStatusOfVerifyClient, z as GetTransfer, a3 as GetTransferInput, aZ as GetTransferInputShape, aO as GetTransferInputZod, w as GetTransfers, J as GetUserDetail, I as GraphQL, p as ListAccountsOfClient, ar as ListAccountsOfClientResponseShape, as as ListAccountsOfClientResponseZod, at as ListAccountsRequestShape, au as ListAccountsRequestZod, P as ListCardProduct, L as ListClientDocument, v as LogFailTransfer, t as MarkAsFail, u as MarkAsProcessing, a6 as MarkAsReturnInput, a_ as MarkAsReturnInputShape, aP as MarkAsReturnInputZod, s as MarkAsReturned, M as MarkAsSuccess, b5 as PartySchema, _ as Payment, a9 as PaymentRail, af as PaymentRailZod, a1 as PaymentResponse, ak as PaymentResponseZod, al as PaymentShape, ae as PaymentStatusZod, ag as PaymentTypeZod, a8 as ProcessOutput, b0 as ProcessOutputShape, aR as ProcessOutputZod, aa as Recipient, ad as RecipientFilterKey, aE as RecipientFilterKeyZod, ac as RecipientRequest, aH as RecipientRequestShape, aD as RecipientRequestZod, aF as RecipientShape, aB as RecipientZod, aL as RecipientsZod, aq as SavingAccount, ap as SavingAccountShape, ao as SavingAccountZod, S as SendAuthorizationToCore, Z as SetClientAddressStatus, ah as SortOrderZod, a2 as Transfer, aU as TransferPaymentRailZod, aV as TransferPaymentTypeZod, a5 as TransferResponse, b1 as TransferResponseShape, aS as TransferResponseZod, aX as TransferShape, aM as TransferZod, q as UpdateAccount, av as UpdateAccountRequest, ax as UpdateAccountRequestShape, aw as UpdateAccountRequestZod, b as UpdateCardID, T as UpdateCardProduct, i as UpdateClient, Y as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, a0 as UpdatePaymentInput, an as UpdatePaymentInputShape, aj as UpdatePaymentInputZod, N as UpdateSelfServiceUser, x as UpdateTraceNumber, a7 as UpdateTraceNumbersInput, a$ as UpdateTraceNumbersInputShape, aQ as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, ay as UserDetail, az as UserDetailSchema, aA as UserDetailShape, V as VerifyWithActivateClients } from './clientAddress-BGKZaMi3.mjs';
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
