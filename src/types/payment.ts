import { z } from 'zod';

export const PaymentFilterKeySchema = z.enum([
  'originatorName',
  'originatorAccount',
  'originatorBankRoutingCode',
  'recipientName',
  'recipientAccount',
  'recipientBankRoutingCode',
  'reference',
  'traceNumber',
  'externalId',
  'clientId',
  'dateFormat',
  'locale',
  'originatedBy',
  'paymentRail',
  'paymentType',
  'fromValueDate',
  'toValueDate',
  'fromExecuteDate',
  'toExecuteDate',
  'status',
  'fromReturnDate',
  'toReturnDate',
  'isSettlement',
  'orderBy',
  'sortOrder'
]);

export const PaymentStatusSchema = z.enum([
  'DRAFT',
  'AML_SCREENING',
  'AML_REJECTED',
  'EXECUTION_SCHEDULED',
  'EXECUTION_PROCESSING',
  'EXECUTION_SUCCESS',
  'EXECUTION_FAILURE',
  'RETURNED',
  'CANCELLED',
  'COMPLIANCE_FAILURE',
  'DELETED',
  'UNKNOWN'
]);

export const PaymentRailSchema = z.enum([
  'ACH',
  'SAMEDAYACH',
  'WIRE',
  'SWIFT',
  'INTERNAL',
  'FXPAY',
  'CARD'
]);

export const PaymentTypeSchema = z.enum([
  'CREDIT',
  'DEBIT'
]);

export const SortOrderSchema = z.enum([
  'ASC',
  'DESC'
]);

export type PaymentFilterKey = z.infer<typeof PaymentFilterKeySchema>;
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>;
export type PaymentRailType = z.infer<typeof PaymentRailSchema>;
export type PaymentType = z.infer<typeof PaymentTypeSchema>;
export type SortOrder = z.infer<typeof SortOrderSchema>;

export const VALID_PAYMENT_FILTER_KEYS = PaymentFilterKeySchema.options;
export const VALID_STATUS_VALUES = PaymentStatusSchema.options;
export const VALID_PAYMENT_RAIL_VALUES = PaymentRailSchema.options;
export const VALID_PAYMENT_TYPE_VALUES = PaymentTypeSchema.options;
export const VALID_SORT_ORDER_VALUES = SortOrderSchema.options;

export const validatePaymentFilterKey = (key: string): PaymentFilterKey => {
  return PaymentFilterKeySchema.parse(key);
};

export const validatePaymentStatus = (status: string): PaymentStatus => {
  return PaymentStatusSchema.parse(status);
};

export const validatePaymentRail = (rail: string): PaymentRailType => {
  return PaymentRailSchema.parse(rail);
};

export const validatePaymentType = (type: string): PaymentType => {
  return PaymentTypeSchema.parse(type);
};

export const validateSortOrder = (order: string): SortOrder => {
  return SortOrderSchema.parse(order);
};

// Payment entity schemas
export const PaymentSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  clientId: z.string(),
  currency: z.string().min(3).max(3), // ISO 4217 currency codes are 3 chars
  status: PaymentStatusSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
}).catchall(z.any()); // Allow additional properties

// Address schema for recipient/originator addresses
const AddressSchema = z.object({
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(), // Required for Domestic and Internal WIRE
  country: z.string().optional(), // Required for Domestic and Internal WIRE
  postalCode: z.string().optional()
}).optional();

// Agent schema for banks/financial institutions
const AgentSchema = z.object({
  name: z.string().optional(),
  identifier: z.string().optional(), // Routing code, SWIFT code, etc.
  address: AddressSchema
}).optional();

// Account holder schema
const AccountHolderSchema = z.object({
  name: z.string(),
  identifier: z.string(), // Account number
  accountType: z.enum(['CHECKING', 'SAVINGS']).optional(),
  address: AddressSchema,
  agent: AgentSchema
});

export const CreatePaymentInputSchema = z.object({
  // Core payment fields
  amount: z.number().positive(),
  currency: z.string().min(3).max(3), // ISO 4217 currency codes
  paymentRail: PaymentRailSchema,
  paymentType: PaymentTypeSchema,

  // Originator (sender) details
  debtor: AccountHolderSchema,

  // Recipient (receiver) details
  creditor: AccountHolderSchema,

  // Optional fields
  clientId: z.string().optional(),
  correspondent: AccountHolderSchema.optional(),
  exchangeRate: z.number().positive().optional(),
  externalId: z.string().optional(),
  reference: z.union([z.string(), z.array(z.string())]).optional(),
  paymentRailMetaData: z.record(z.string(), z.any()).optional(),

  // For international transfers
  chargeBearer: z.enum(['OUR', 'BEN', 'SHA']).optional(), // SWIFT charge bearer
  purposeCode: z.string().optional(),

  // Execution details
  valueDate: z.string().optional(), // ISO date format
  executionDate: z.string().optional() // ISO date format
}).catchall(z.any()) // Allow additional properties
  .refine((data) => {
    // Custom validation: For WIRE transfers, recipient address is mandatory
    if ((data.paymentRail === 'WIRE' || data.paymentRail === 'SWIFT') && data.creditor) {
      return data.creditor.address &&
             data.creditor.address.state &&
             data.creditor.address.country;
    }
    return true;
  }, {
    message: 'For WIRE transfers, recipient address with state and country is mandatory'
  });

export const UpdatePaymentInputSchema = z.object({
  amount: z.number().positive().optional(),
  correspondent: z.object({
    name: z.string().optional(),
    identifier: z.string().optional(),
    accountType: z.string().optional()
  }).optional(),
  creditor: z.object({
    name: z.string().optional(),
    identifier: z.string().optional(),
    accountType: z.string().optional(),
    agent: z.object({
      name: z.string().optional(),
      identifier: z.string().optional()
    }).optional()
  }).optional(),
  debtor: z.object({
    name: z.string().optional(),
    identifier: z.string().optional(),
    accountType: z.string().optional(),
    agent: z.object({
      name: z.string().optional(),
      identifier: z.string().optional()
    }).optional()
  }).optional(),
  exchangeRate: z.number().positive().optional(),
  externalId: z.string().optional(),
  errorCode: z.string().optional(),
  errorMessage: z.string().optional(),
  reference: z.union([z.string(), z.array(z.string())]).optional(),
  paymentRailMetaData: z.record(z.string(), z.any()).optional(),
  status: PaymentStatusSchema.optional()
}).catchall(z.any()); // Allow additional properties

export const PaymentResponseSchema = z.object({
  totalFilteredRecords: z.number(),
  pageItems: z.array(PaymentSchema)
});

// Type inference from Zod schemas
export type Payment = z.infer<typeof PaymentSchema>;
export type CreatePaymentInput = z.infer<typeof CreatePaymentInputSchema>;
export type UpdatePaymentInput = z.infer<typeof UpdatePaymentInputSchema>;
export type PaymentResponse = z.infer<typeof PaymentResponseSchema>;

// Validation functions for payment data
export const validatePayment = (payment: unknown): Payment => {
  return PaymentSchema.parse(payment);
};

export const validateCreatePaymentInput = (input: unknown): CreatePaymentInput => {
  return CreatePaymentInputSchema.parse(input);
};

export const validateUpdatePaymentInput = (input: unknown): UpdatePaymentInput => {
  return UpdatePaymentInputSchema.parse(input);
};

export const validatePaymentResponse = (response: unknown): PaymentResponse => {
  return PaymentResponseSchema.parse(response);
};
