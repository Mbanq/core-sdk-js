export { createClient } from './client/index.mjs';
export { aL as AccountDetailsDataZod, aY as AccountTypeSchema, aM as AddressZod, b6 as AgentSchema, A as ApproveRejectClientDocument, aK as BankInformationZod, B as BlockAccount, b5 as ClientSchema, s as CloseAccount, r as CreateAndActivateAccount, W as CreateCardProduct, j as CreateClient, Z as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, a1 as CreatePaymentInput, ao as CreatePaymentInputShape, ak as CreatePaymentInputZod, H as CreateRecipient, ad as CreateRecipientRequest, aI as CreateRecipientRequestShape, aE as CreateRecipientRequestZod, z as CreateTransfer, a6 as CreateTransferInput, a_ as CreateTransferInputShape, aP as CreateTransferInputZod, b4 as CreateTransferOutputShape, aV as CreateTransferOutputZod, q as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, I as DeleteRecipient, Q as DeleteSelfServiceUser, O as EnableSelfServiceAccess, n as GetAccount, o as GetAccountsOfClient, T as GetCardProduct, h as GetClient, Y as GetClientAddress, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, F as GetRecipient, J as GetRecipients, m as GetStatusOfVerifyClient, E as GetTransfer, a5 as GetTransferInput, a$ as GetTransferInputShape, aQ as GetTransferInputZod, x as GetTransfers, N as GetUserDetail, K as GraphQL, at as ListAccountsOfClientResponseShape, au as ListAccountsOfClientResponseZod, av as ListAccountsRequestShape, aw as ListAccountsRequestZod, R as ListCardProduct, L as ListClientDocument, w as LogFailTransfer, u as MarkAsFail, v as MarkAsProcessing, a8 as MarkAsReturnInput, b0 as MarkAsReturnInputShape, aR as MarkAsReturnInputZod, t as MarkAsReturned, M as MarkAsSuccess, b7 as PartySchema, a0 as Payment, ab as PaymentRail, ah as PaymentRailZod, a3 as PaymentResponse, am as PaymentResponseZod, an as PaymentShape, ag as PaymentStatusZod, ai as PaymentTypeZod, aa as ProcessOutput, b2 as ProcessOutputShape, aT as ProcessOutputZod, ac as Recipient, af as RecipientFilterKey, aG as RecipientFilterKeyZod, ae as RecipientRequest, aJ as RecipientRequestShape, aF as RecipientRequestZod, aH as RecipientShape, aD as RecipientZod, aN as RecipientsZod, as as SavingAccount, ar as SavingAccountShape, aq as SavingAccountZod, S as SendAuthorizationToCore, $ as SetClientAddressStatus, aj as SortOrderZod, a4 as Transfer, aW as TransferPaymentRailZod, aX as TransferPaymentTypeZod, a7 as TransferResponse, b3 as TransferResponseShape, aU as TransferResponseZod, aZ as TransferShape, aO as TransferZod, p as UpdateAccount, ax as UpdateAccountRequest, az as UpdateAccountRequestShape, ay as UpdateAccountRequestZod, b as UpdateCardID, X as UpdateCardProduct, i as UpdateClient, _ as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, a2 as UpdatePaymentInput, ap as UpdatePaymentInputShape, al as UpdatePaymentInputZod, P as UpdateSelfServiceUser, y as UpdateTraceNumber, a9 as UpdateTraceNumbersInput, b1 as UpdateTraceNumbersInputShape, aS as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, aA as UserDetail, aB as UserDetailSchema, aC as UserDetailShape, V as VerifyWithActivateClients } from './clientAddress-CpbODQpK.mjs';
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
