import { z } from 'zod';

// Enums
export const PaymentRailSchema = z.enum(['ACH', 'SAMEDAYACH']);
export const PaymentTypeSchema = z.enum(['CREDIT', 'DEBIT']);
export const AccountTypeSchema = z.enum(['CHECKING', 'SAVINGS']);

// Types
export type PaymentRail = z.infer<typeof PaymentRailSchema>;
export type PaymentType = z.infer<typeof PaymentTypeSchema>;
export type AccountType = z.infer<typeof AccountTypeSchema>;

// Base schemas
export const RawPaymentDetailsSchema = z.record(z.union([z.string(), z.number(), z.boolean()]));

export const ClientIdentifierSchema = z.object({
  type: z.string(),
  value: z.string()
});

export const AgentSchema = z.object({
  name: z.string(),
  identifier: z.string()
});

export const PartySchema = z.object({
  identifier: z.string(),
  name: z.string(),
  accountType: AccountTypeSchema
});

export const TraceNumbersSchema = z.object({
  incomingReturnFile: z.string().optional(),
  outgoingReturnFile: z.string().optional()
});

export const TraceNumbersInputSchema = z.object({
  traceMapping: z.string(),
  CoreFileKey: z.string().optional(),
  CoreBatch: z.number().optional(),
  CoreSeq: z.number().optional()
});

export const ClientSchema = z.object({
  id: z.number(),
  accountNo: z.string(),
  displayName: z.string(),
  legalForm: z.object({
    code: z.string(),
    value: z.string()
  }),
  identifiers: z.array(ClientIdentifierSchema),
  ofLoanCycle: z.number(),
  ofLoanActive: z.number(),
  activeDepositAccount: z.number()
});

// Complex shapes
export const TransferShape = {
  type: z.string(),
  paymentType: PaymentRailSchema,
  paymentSubType: z.string().optional(),
  currency: z.string(),
  fileUrl: z.string().optional(),
  amount: z.number(),
  externalId: z.string(),
  reference: z.array(z.string()),
  rawPaymentDetails: RawPaymentDetailsSchema.optional(),
  statementDescription: z.string().optional(),
  settlementDate: z.string().optional(),
  errorCode: z.string().optional(),
  errorMessage: z.string().optional(),
  createdAt: z.string().optional(),
  client: ClientSchema.optional()
};

export const CreateTransferInputShape = {
  type: PaymentTypeSchema,
  fileUrl: z.string(),
  paymentType: PaymentRailSchema,
  currency: z.literal('USD'),
  amount: z.number(),
  debtor: PartySchema,
  creditor: PartySchema.extend({
    agent: AgentSchema
  }),
  reference: z.array(z.string())
};

export const GetTransferInputShape = {
  transferStatus: z.string().optional(),
  executedAt: z.string(),
  queryLimit: z.number().optional(),
  paymentType: PaymentRailSchema,
  tenantId: z.string().optional(),
  accountType: z.string().optional()
};

export const MarkAsReturnInputShape = {
  paymentType: PaymentRailSchema,
  externalId: z.string(),
  returnFileUrl: z.string(),
  errorCode: z.string(),
  errorMessage: z.string(),
  returnDate: z.string().optional(),
  traceNumbers: TraceNumbersSchema.optional(),
  rawReturnDetails: RawPaymentDetailsSchema.optional(),
  tenantId: z.string().optional()
};

export const UpdateTraceNumbersInputShape = {
  externalId: z.string(),
  traceNumbers: TraceNumbersInputSchema,
  tenantId: z.string().optional()
};

export const ProcessOutputShape = {
  id: z.string(),
  clientId: z.number(),
  resourceId: z.number(),
  resourceIdentifier: z.string()
};

export const TransferResponseShape = {
  totalFilteredRecords: z.number(),
  pageItems: z.array(z.object(TransferShape))
};

export const CreateTransferOutputShape = {
  ...ProcessOutputShape,
  data: z.object({
    amount: z.number()
  })
};

// Schemas
export const TransferSchema = z.object(TransferShape);
export const CreateTransferInputSchema = z.object(CreateTransferInputShape);
export const GetTransferInputSchema = z.object(GetTransferInputShape);
export const MarkAsReturnInputSchema = z.object(MarkAsReturnInputShape);
export const UpdateTraceNumbersInputSchema = z.object(UpdateTraceNumbersInputShape);
export const ProcessOutputSchema = z.object(ProcessOutputShape);
export const TransferResponseSchema = z.object(TransferResponseShape);
export const CreateTransferOutputSchema = z.object(CreateTransferOutputShape);

// Legacy type exports for compatibility
export type Transfer = z.infer<typeof TransferSchema>;
export type CreateTransferInput = z.infer<typeof CreateTransferInputSchema>;
export type GetTransferInput = z.infer<typeof GetTransferInputSchema>;
export type MarkAsReturnInput = z.infer<typeof MarkAsReturnInputSchema>;
export type UpdateTraceNumbersInput = z.infer<typeof UpdateTraceNumbersInputSchema>;
export type ProcessOutput = z.infer<typeof ProcessOutputSchema>;
export type TransferResponse = z.infer<typeof TransferResponseSchema>;
export type CreateTransferOutput = z.infer<typeof CreateTransferOutputSchema>;
