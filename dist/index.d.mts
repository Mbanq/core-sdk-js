export { createClient } from './client/index.mjs';
export { aP as AccountDetailsDataZod, b0 as AccountTypeSchema, aQ as AddressZod, ba as AgentSchema, A as ApproveRejectClientDocument, aO as BankInformationZod, B as BlockAccount, b9 as ClientSchema, s as CloseAccount, r as CreateAndActivateAccount, _ as CreateCardProduct, j as CreateClient, a1 as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, a5 as CreatePaymentInput, as as CreatePaymentInputShape, ao as CreatePaymentInputZod, N as CreateRecipient, ah as CreateRecipientRequest, aM as CreateRecipientRequestShape, aI as CreateRecipientRequestZod, I as CreateTransfer, aa as CreateTransferInput, b2 as CreateTransferInputShape, aT as CreateTransferInputZod, b8 as CreateTransferOutputShape, aZ as CreateTransferOutputZod, q as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, O as DeleteRecipient, X as DeleteSelfServiceUser, v as DownloadAccountStatement, T as EnableSelfServiceAccess, u as GenerateAccountStatement, n as GetAccount, o as GetAccountsOfClient, Z as GetCardProduct, h as GetClient, a0 as GetClientAddress, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, K as GetRecipient, P as GetRecipients, m as GetStatusOfVerifyClient, J as GetTransfer, a9 as GetTransferInput, b3 as GetTransferInputShape, aU as GetTransferInputZod, E as GetTransfers, R as GetUserDetail, Q as GraphQL, H as HoldAmount, ax as ListAccountsOfClientResponseShape, ay as ListAccountsOfClientResponseZod, az as ListAccountsRequestShape, aA as ListAccountsRequestZod, Y as ListCardProduct, L as ListClientDocument, z as LogFailTransfer, x as MarkAsFail, y as MarkAsProcessing, ac as MarkAsReturnInput, b4 as MarkAsReturnInputShape, aV as MarkAsReturnInputZod, w as MarkAsReturned, M as MarkAsSuccess, bb as PartySchema, a4 as Payment, af as PaymentRail, al as PaymentRailZod, a7 as PaymentResponse, aq as PaymentResponseZod, ar as PaymentShape, ak as PaymentStatusZod, am as PaymentTypeZod, ae as ProcessOutput, b6 as ProcessOutputShape, aX as ProcessOutputZod, ag as Recipient, aj as RecipientFilterKey, aK as RecipientFilterKeyZod, ai as RecipientRequest, aN as RecipientRequestShape, aJ as RecipientRequestZod, aL as RecipientShape, aH as RecipientZod, aR as RecipientsZod, aw as SavingAccount, av as SavingAccountShape, au as SavingAccountZod, t as ScheduleAccountClosure, S as SendAuthorizationToCore, a3 as SetClientAddressStatus, an as SortOrderZod, a8 as Transfer, a_ as TransferPaymentRailZod, a$ as TransferPaymentTypeZod, ab as TransferResponse, b7 as TransferResponseShape, aY as TransferResponseZod, b1 as TransferShape, aS as TransferZod, p as UpdateAccount, aB as UpdateAccountRequest, aD as UpdateAccountRequestShape, aC as UpdateAccountRequestZod, b as UpdateCardID, $ as UpdateCardProduct, i as UpdateClient, a2 as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, a6 as UpdatePaymentInput, at as UpdatePaymentInputShape, ap as UpdatePaymentInputZod, W as UpdateSelfServiceUser, F as UpdateTraceNumber, ad as UpdateTraceNumbersInput, b5 as UpdateTraceNumbersInputShape, aW as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, aE as UserDetail, aF as UserDetailSchema, aG as UserDetailShape, V as VerifyWithActivateClients } from './clientAddress-0zJS1h3A.mjs';
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
