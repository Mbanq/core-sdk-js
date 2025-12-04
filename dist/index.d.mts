export { createClient } from './client/index.mjs';
export { aO as AccountDetailsDataZod, a$ as AccountTypeSchema, aP as AddressZod, b9 as AgentSchema, A as ApproveRejectClientDocument, aN as BankInformationZod, B as BlockAccount, b8 as ClientSchema, s as CloseAccount, r as CreateAndActivateAccount, Z as CreateCardProduct, j as CreateClient, a0 as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, a4 as CreatePaymentInput, ar as CreatePaymentInputShape, an as CreatePaymentInputZod, K as CreateRecipient, ag as CreateRecipientRequest, aL as CreateRecipientRequestShape, aH as CreateRecipientRequestZod, F as CreateTransfer, a9 as CreateTransferInput, b1 as CreateTransferInputShape, aS as CreateTransferInputZod, b7 as CreateTransferOutputShape, aY as CreateTransferOutputZod, q as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, N as DeleteRecipient, W as DeleteSelfServiceUser, R as EnableSelfServiceAccess, u as GenerateAccountStatement, n as GetAccount, o as GetAccountsOfClient, Y as GetCardProduct, h as GetClient, $ as GetClientAddress, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, J as GetRecipient, O as GetRecipients, m as GetStatusOfVerifyClient, I as GetTransfer, a8 as GetTransferInput, b2 as GetTransferInputShape, aT as GetTransferInputZod, z as GetTransfers, Q as GetUserDetail, P as GraphQL, H as HoldAmount, aw as ListAccountsOfClientResponseShape, ax as ListAccountsOfClientResponseZod, ay as ListAccountsRequestShape, az as ListAccountsRequestZod, X as ListCardProduct, L as ListClientDocument, y as LogFailTransfer, w as MarkAsFail, x as MarkAsProcessing, ab as MarkAsReturnInput, b3 as MarkAsReturnInputShape, aU as MarkAsReturnInputZod, v as MarkAsReturned, M as MarkAsSuccess, ba as PartySchema, a3 as Payment, ae as PaymentRail, ak as PaymentRailZod, a6 as PaymentResponse, ap as PaymentResponseZod, aq as PaymentShape, aj as PaymentStatusZod, al as PaymentTypeZod, ad as ProcessOutput, b5 as ProcessOutputShape, aW as ProcessOutputZod, af as Recipient, ai as RecipientFilterKey, aJ as RecipientFilterKeyZod, ah as RecipientRequest, aM as RecipientRequestShape, aI as RecipientRequestZod, aK as RecipientShape, aG as RecipientZod, aQ as RecipientsZod, av as SavingAccount, au as SavingAccountShape, at as SavingAccountZod, t as ScheduleAccountClosure, S as SendAuthorizationToCore, a2 as SetClientAddressStatus, am as SortOrderZod, a7 as Transfer, aZ as TransferPaymentRailZod, a_ as TransferPaymentTypeZod, aa as TransferResponse, b6 as TransferResponseShape, aX as TransferResponseZod, b0 as TransferShape, aR as TransferZod, p as UpdateAccount, aA as UpdateAccountRequest, aC as UpdateAccountRequestShape, aB as UpdateAccountRequestZod, b as UpdateCardID, _ as UpdateCardProduct, i as UpdateClient, a1 as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, a5 as UpdatePaymentInput, as as UpdatePaymentInputShape, ao as UpdatePaymentInputZod, T as UpdateSelfServiceUser, E as UpdateTraceNumber, ac as UpdateTraceNumbersInput, b4 as UpdateTraceNumbersInputShape, aV as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, aD as UserDetail, aE as UserDetailSchema, aF as UserDetailShape, V as VerifyWithActivateClients } from './clientAddress-CXh-iNRJ.mjs';
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
