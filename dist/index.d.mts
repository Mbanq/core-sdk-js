export { createClient } from './client/index.mjs';
export { aK as AccountDetailsDataZod, aX as AccountTypeSchema, aL as AddressZod, b5 as AgentSchema, A as ApproveRejectClientDocument, aJ as BankInformationZod, b4 as ClientSchema, s as CreateAndActivateAccount, T as CreateCardProduct, j as CreateClient, Y as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, a0 as CreatePaymentInput, an as CreatePaymentInputShape, aj as CreatePaymentInputZod, F as CreateRecipient, ac as CreateRecipientRequest, aH as CreateRecipientRequestShape, aD as CreateRecipientRequestZod, z as CreateTransfer, a5 as CreateTransferInput, aZ as CreateTransferInputShape, aO as CreateTransferInputZod, b3 as CreateTransferOutputShape, aU as CreateTransferOutputZod, r as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, H as DeleteRecipient, P as DeleteSelfServiceUser, N as EnableSelfServiceAccess, n as GetAccount, o as GetAccountsOfClient, R as GetCardProduct, h as GetClient, X as GetClientAddress, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, E as GetRecipient, I as GetRecipients, m as GetStatusOfVerifyClient, B as GetTransfer, a4 as GetTransferInput, a_ as GetTransferInputShape, aP as GetTransferInputZod, x as GetTransfers, K as GetUserDetail, J as GraphQL, p as ListAccountsOfClient, as as ListAccountsOfClientResponseShape, at as ListAccountsOfClientResponseZod, au as ListAccountsRequestShape, av as ListAccountsRequestZod, Q as ListCardProduct, L as ListClientDocument, w as LogFailTransfer, u as MarkAsFail, v as MarkAsProcessing, a7 as MarkAsReturnInput, a$ as MarkAsReturnInputShape, aQ as MarkAsReturnInputZod, t as MarkAsReturned, M as MarkAsSuccess, b6 as PartySchema, $ as Payment, aa as PaymentRail, ag as PaymentRailZod, a2 as PaymentResponse, al as PaymentResponseZod, am as PaymentShape, af as PaymentStatusZod, ah as PaymentTypeZod, a9 as ProcessOutput, b1 as ProcessOutputShape, aS as ProcessOutputZod, ab as Recipient, ae as RecipientFilterKey, aF as RecipientFilterKeyZod, ad as RecipientRequest, aI as RecipientRequestShape, aE as RecipientRequestZod, aG as RecipientShape, aC as RecipientZod, aM as RecipientsZod, ar as SavingAccount, aq as SavingAccountShape, ap as SavingAccountZod, S as SendAuthorizationToCore, _ as SetClientAddressStatus, ai as SortOrderZod, a3 as Transfer, aV as TransferPaymentRailZod, aW as TransferPaymentTypeZod, a6 as TransferResponse, b2 as TransferResponseShape, aT as TransferResponseZod, aY as TransferShape, aN as TransferZod, q as UpdateAccount, aw as UpdateAccountRequest, ay as UpdateAccountRequestShape, ax as UpdateAccountRequestZod, b as UpdateCardID, W as UpdateCardProduct, i as UpdateClient, Z as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, a1 as UpdatePaymentInput, ao as UpdatePaymentInputShape, ak as UpdatePaymentInputZod, O as UpdateSelfServiceUser, y as UpdateTraceNumber, a8 as UpdateTraceNumbersInput, b0 as UpdateTraceNumbersInputShape, aR as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, az as UserDetail, aA as UserDetailSchema, aB as UserDetailShape, V as VerifyWithActivateClients } from './clientAddress-C12-tOoG.mjs';
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
