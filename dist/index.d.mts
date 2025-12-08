export { createClient } from './client/index.mjs';
export { aR as AccountDetailsDataZod, b2 as AccountTypeSchema, aS as AddressZod, bc as AgentSchema, A as ApproveRejectClientDocument, aQ as BankInformationZod, B as BlockAccount, bb as ClientSchema, s as CloseAccount, r as CreateAndActivateAccount, _ as CreateCardProduct, j as CreateClient, a1 as CreateClientAddress, d as CreateClientIdentifier, C as CreatePayment, a7 as CreatePaymentInput, au as CreatePaymentInputShape, aq as CreatePaymentInputZod, N as CreateRecipient, aj as CreateRecipientRequest, aO as CreateRecipientRequestShape, aK as CreateRecipientRequestZod, I as CreateTransfer, ac as CreateTransferInput, b4 as CreateTransferInputShape, aV as CreateTransferInputZod, ba as CreateTransferOutputShape, a$ as CreateTransferOutputZod, q as DeleteAccount, l as DeleteClient, g as DeleteClientDocument, D as DeletePayment, O as DeleteRecipient, X as DeleteSelfServiceUser, v as DownloadAccountStatement, T as EnableSelfServiceAccess, u as GenerateAccountStatement, n as GetAccount, o as GetAccountsOfClient, Z as GetCardProduct, h as GetClient, a0 as GetClientAddress, a5 as GetClientClassification, k as GetClients, G as GetPayment, a as GetPayments, c as GetPermittedDocumentTypes, K as GetRecipient, P as GetRecipients, m as GetStatusOfVerifyClient, J as GetTransfer, ab as GetTransferInput, b5 as GetTransferInputShape, aW as GetTransferInputZod, E as GetTransfers, R as GetUserDetail, Q as GraphQL, H as HoldAmount, az as ListAccountsOfClientResponseShape, aA as ListAccountsOfClientResponseZod, aB as ListAccountsRequestShape, aC as ListAccountsRequestZod, Y as ListCardProduct, L as ListClientDocument, z as LogFailTransfer, x as MarkAsFail, y as MarkAsProcessing, ae as MarkAsReturnInput, b6 as MarkAsReturnInputShape, aX as MarkAsReturnInputZod, w as MarkAsReturned, M as MarkAsSuccess, bd as PartySchema, a6 as Payment, ah as PaymentRail, an as PaymentRailZod, a9 as PaymentResponse, as as PaymentResponseZod, at as PaymentShape, am as PaymentStatusZod, ao as PaymentTypeZod, ag as ProcessOutput, b8 as ProcessOutputShape, aZ as ProcessOutputZod, ai as Recipient, al as RecipientFilterKey, aM as RecipientFilterKeyZod, ak as RecipientRequest, aP as RecipientRequestShape, aL as RecipientRequestZod, aN as RecipientShape, aJ as RecipientZod, aT as RecipientsZod, ay as SavingAccount, ax as SavingAccountShape, aw as SavingAccountZod, t as ScheduleAccountClosure, S as SendAuthorizationToCore, a3 as SetClientAddressStatus, ap as SortOrderZod, a4 as SwitchClientClassification, aa as Transfer, b0 as TransferPaymentRailZod, b1 as TransferPaymentTypeZod, ad as TransferResponse, b9 as TransferResponseShape, a_ as TransferResponseZod, b3 as TransferShape, aU as TransferZod, p as UpdateAccount, aD as UpdateAccountRequest, aF as UpdateAccountRequestShape, aE as UpdateAccountRequestZod, b as UpdateCardID, $ as UpdateCardProduct, i as UpdateClient, a2 as UpdateClientAddress, e as UpdateClientIdentifier, U as UpdatePayment, a8 as UpdatePaymentInput, av as UpdatePaymentInputShape, ar as UpdatePaymentInputZod, W as UpdateSelfServiceUser, F as UpdateTraceNumber, af as UpdateTraceNumbersInput, b7 as UpdateTraceNumbersInputShape, aY as UpdateTraceNumbersInputZod, f as UploadClientIdentifierDocument, aG as UserDetail, aH as UserDetailSchema, aI as UserDetailShape, V as VerifyWithActivateClients } from './clientClassification-dVfNo8ZH.mjs';
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
