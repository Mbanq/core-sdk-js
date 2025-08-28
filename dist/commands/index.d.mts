export { f as CreateClient, C as CreatePayment, k as DeleteAccount, D as DeleteClient, m as DeletePayment, h as GetAccount, i as GetAccountsOfClient, c as GetClient, g as GetClients, G as GetPayment, a as GetPayments, l as GraphQL, L as ListAccountsOfClient, S as SendAuthorizationToCore, j as UpdateAccount, b as UpdateCardID, d as UpdateClient, e as UpdateClientIdentifier, U as UpdatePayment } from '../index-D3PYCZYG.mjs';
import { H as PaymentRail, a as Command, F as ProcessOutput, I as MarkAsReturnInput, T as Transfer, J as GetTransferInput, K as UpdateTraceNumbersInput, N as CreateTransferInput, O as CreateTransferOutput } from '../client-z_1PDcj6.mjs';
import 'graphql';
import 'axios';
import 'zod';

interface CustomUpdateInput {
  commandName?: string;
  url: string;
  tenantId?: string;
  updates: object;
  params?: Record<string, any>;
}

interface CustomCreateInput {
  commandName?: string;
  url: string;
  tenantId?: string;
  data: object;
  params?: Record<string, any>;
}

interface CustomGetInput {
  commandName?: string;
  url: string;
  tenantId?: string;
  params?: Record<string, any>;
}

declare const CreateTransfer: (params: {
    transfer: CreateTransferInput;
    tenantId: string;
}) => Command<{
    transfer: CreateTransferInput;
    tenantId: string;
}, CreateTransferOutput>;
declare const GetTransfer: (params: {
    id: number;
    tenantId: string;
}) => Command<{
    id: number;
    tenantId: string;
}, any>;
declare const GetTransfers: (params: GetTransferInput) => Command<GetTransferInput, Array<Transfer>>;
declare const MarkAsSuccess: (params: {
    externalId: string;
    paymentType?: PaymentRail;
    tenantId?: string;
}) => Command<{
    externalId: string;
    paymentType?: PaymentRail;
    tenantId?: string;
}, ProcessOutput>;
declare const MarkAsProcessing: (params: {
    externalId: string;
    fileUrl: string;
    paymentType: PaymentRail;
    traceNumbers: {
        outgoingTransfer: string;
    };
    tenantId?: string;
}) => Command<{
    externalId: string;
    fileUrl: string;
    paymentType: PaymentRail;
    traceNumbers: {
        outgoingTransfer: string;
    };
    tenantId?: string;
}, ProcessOutput>;
declare const MarkAsReturned: (params: MarkAsReturnInput) => Command<MarkAsReturnInput, ProcessOutput>;
declare const LogFailTransfer: (params: {
    payload: Transfer;
    tenantId?: string;
}) => Command<{
    payload: Transfer;
    tenantId?: string;
}, ProcessOutput>;
declare const MarkAsFail: (params: {
    externalId: string;
    errorMessage: string;
    paymentType: PaymentRail;
    tenantId?: string;
}) => Command<{
    externalId: string;
    errorMessage: string;
    paymentType: PaymentRail;
    tenantId?: string;
}, ProcessOutput>;
declare const UpdateTraceNumber: (params: UpdateTraceNumbersInput) => Command<UpdateTraceNumbersInput, ProcessOutput>;

declare const CustomUpdate: (params: CustomUpdateInput) => Command<CustomUpdateInput, ProcessOutput>;
declare const CustomCreate: (params: CustomCreateInput) => Command<CustomCreateInput, ProcessOutput>;
declare const CustomGet: (params: CustomGetInput) => Command<CustomGetInput, any>;

export { CreateTransfer, CustomCreate, CustomGet, CustomUpdate, GetTransfer, GetTransfers, LogFailTransfer, MarkAsFail, MarkAsProcessing, MarkAsReturned, MarkAsSuccess, UpdateTraceNumber };
