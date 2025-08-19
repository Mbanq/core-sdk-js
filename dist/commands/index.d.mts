import { P as PaymentRail, d as ProcessOutput, M as MarkAsReturnInput, T as Transfer, e as GetTransferInput, f as UpdateTraceNumbersInput, C as CreateTransferInput, g as CreateTransferOutput } from '../index-5Sj83ZJ4.mjs';
export { G as GetClientData, c as GraphQL, S as SendAuthorizationToCore, U as UpdateCardID, a as UpdateClient, b as UpdateClientIdentifier } from '../index-5Sj83ZJ4.mjs';
import { C as Command } from '../config.d-CyK6ZM6s.mjs';
import 'graphql';
import 'axios';

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
