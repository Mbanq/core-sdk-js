import { z, ZodError } from 'zod';
import { createCommandError } from '../utils/errorHandler';

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

// Additional filter value schemas
export const OriginatorNameSchema = z.string().min(1);
export const OriginatorAccountSchema = z.string().min(1);
export const OriginatorBankRoutingCodeSchema = z.string().min(1);
export const RecipientNameSchema = z.string().min(1);
export const RecipientAccountSchema = z.string().min(1);
export const RecipientBankRoutingCodeSchema = z.string().min(1);
export const ReferenceSchema = z.string().min(1);
export const TraceNumberSchema = z.string().min(1);
export const ExternalIdSchema = z.string().min(1);
export const ClientIdSchema = z.union([z.string(), z.number()]);
export const DateFormatSchema = z.string();
export const LocaleSchema = z.string();
export const OriginatedBySchema = z.string();
export const ValueDateSchema = z.string(); // ISO date format
export const ExecuteDateSchema = z.string(); // ISO date format
export const ReturnDateSchema = z.string(); // ISO date format
export const IsSettlementSchema = z.boolean();
export const OrderBySchema = z.string();

// Type inference for new schemas
export type OriginatorName = z.infer<typeof OriginatorNameSchema>;
export type OriginatorAccount = z.infer<typeof OriginatorAccountSchema>;
export type OriginatorBankRoutingCode = z.infer<typeof OriginatorBankRoutingCodeSchema>;
export type RecipientName = z.infer<typeof RecipientNameSchema>;
export type RecipientAccount = z.infer<typeof RecipientAccountSchema>;
export type RecipientBankRoutingCode = z.infer<typeof RecipientBankRoutingCodeSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;
export type TraceNumber = z.infer<typeof TraceNumberSchema>;
export type ExternalId = z.infer<typeof ExternalIdSchema>;
export type ClientId = z.infer<typeof ClientIdSchema>;
export type DateFormat = z.infer<typeof DateFormatSchema>;
export type Locale = z.infer<typeof LocaleSchema>;
export type OriginatedBy = z.infer<typeof OriginatedBySchema>;
export type ValueDate = z.infer<typeof ValueDateSchema>;
export type ExecuteDate = z.infer<typeof ExecuteDateSchema>;
export type ReturnDate = z.infer<typeof ReturnDateSchema>;
export type IsSettlement = z.infer<typeof IsSettlementSchema>;
export type OrderBy = z.infer<typeof OrderBySchema>;

// Validation functions for new filter types
export const validateOriginatorName = (name: string): OriginatorName => {
  return OriginatorNameSchema.parse(name);
};

export const validateOriginatorAccount = (account: string): OriginatorAccount => {
  return OriginatorAccountSchema.parse(account);
};

export const validateOriginatorBankRoutingCode = (code: string): OriginatorBankRoutingCode => {
  return OriginatorBankRoutingCodeSchema.parse(code);
};

export const validateRecipientName = (name: string): RecipientName => {
  return RecipientNameSchema.parse(name);
};

export const validateRecipientAccount = (account: string): RecipientAccount => {
  return RecipientAccountSchema.parse(account);
};

export const validateRecipientBankRoutingCode = (code: string): RecipientBankRoutingCode => {
  return RecipientBankRoutingCodeSchema.parse(code);
};

export const validateReference = (reference: string): Reference => {
  return ReferenceSchema.parse(reference);
};

export const validateTraceNumber = (trace: string): TraceNumber => {
  return TraceNumberSchema.parse(trace);
};

export const validateExternalId = (id: string): ExternalId => {
  return ExternalIdSchema.parse(id);
};

export const validateClientId = (id: string | number): ClientId => {
  return ClientIdSchema.parse(id);
};

export const validateDateFormat = (format: string): DateFormat => {
  return DateFormatSchema.parse(format);
};

export const validateLocale = (locale: string): Locale => {
  return LocaleSchema.parse(locale);
};

export const validateOriginatedBy = (originatedBy: string): OriginatedBy => {
  return OriginatedBySchema.parse(originatedBy);
};

export const validateValueDate = (date: string): ValueDate => {
  return ValueDateSchema.parse(date);
};

export const validateExecuteDate = (date: string): ExecuteDate => {
  return ExecuteDateSchema.parse(date);
};

export const validateReturnDate = (date: string): ReturnDate => {
  return ReturnDateSchema.parse(date);
};

export const validateIsSettlement = (settlement: boolean): IsSettlement => {
  return IsSettlementSchema.parse(settlement);
};

export const validateOrderBy = (orderBy: string): OrderBy => {
  return OrderBySchema.parse(orderBy);
};

// Combined Payment Filters Schema
export const PaymentFilterShape = {
  originatorName: OriginatorNameSchema.optional(),
  originatorAccount: OriginatorAccountSchema.optional(),
  originatorBankRoutingCode: OriginatorBankRoutingCodeSchema.optional(),
  recipientName: RecipientNameSchema.optional(),
  recipientAccount: RecipientAccountSchema.optional(),
  recipientBankRoutingCode: RecipientBankRoutingCodeSchema.optional(),
  reference: ReferenceSchema.optional(),
  traceNumber: TraceNumberSchema.optional(),
  externalId: ExternalIdSchema.optional(),
  clientId: ClientIdSchema.optional(),
  dateFormat: DateFormatSchema.optional(),
  locale: LocaleSchema.optional(),
  originatedBy: OriginatedBySchema.optional(),
  paymentRail: PaymentRailSchema.optional(),
  paymentType: PaymentTypeSchema.optional(),
  fromValueDate: ValueDateSchema.optional(),
  toValueDate: ValueDateSchema.optional(),
  fromExecuteDate: ExecuteDateSchema.optional(),
  toExecuteDate: ExecuteDateSchema.optional(),
  status: PaymentStatusSchema.optional(),
  fromReturnDate: ReturnDateSchema.optional(),
  toReturnDate: ReturnDateSchema.optional(),
  isSettlement: IsSettlementSchema.optional(),
  orderBy: OrderBySchema.optional(),
  sortOrder: SortOrderSchema.optional(),
  limit: z.number().min(0).optional().describe('Maximum number of records to return. Defaults to 20 if not specified. Set to 0 to return all records.'),
  offset: z.number().min(0).optional()
};

export const PaymentFiltersSchema = z.object(PaymentFilterShape).partial();

// Type inference for PaymentFilters
export type PaymentFilters = z.infer<typeof PaymentFiltersSchema>;

// Validation function for PaymentFilters
export const validatePaymentFilters = (filters: unknown): PaymentFilters => {
  return PaymentFiltersSchema.parse(filters);
};

export const PaymentShape = {
  id: z.number(),
  clientId: z.number(),
  amount: z.number().positive(),
  correlationId: z.string(),
  paymentType: PaymentTypeSchema,
  paymentRail: PaymentRailSchema,
  recipient: z.object({
    cardId: z.string().optional(),
    recipientType: z.string(),
    address: z.object({
      line1: z.string().optional(),
      line2: z.string().optional(),
      stateCode: z.string().optional(),
      countryCode: z.string(),
      postalCode: z.string().optional()
    }),
    name: z.string()
  }),
  originator: z.object({
    accountId: z.string().optional(),
    recipientType: z.string(),
    address: z.object({
      line1: z.string().optional(),
      line2: z.string().optional(),
      stateCode: z.string().optional(),
      countryCode: z.string(),
      postalCode: z.string().optional()
    }),
    name: z.string()
  }),
  executedAt: z.string(),
  createdAt: z.string(),
  externalId: z.string(),
  status: PaymentStatusSchema,
  paymentRailMetaData: z.record(z.string(), z.any()).optional(),
  currencyData: z.object({
    code: z.string(),
    name: z.string(),
    decimalPlaces: z.number(),
    displaySymbol: z.string(),
    nameCode: z.string(),
    currencyCodeInDigit: z.number(),
    isBaseCurrency: z.boolean()
  }),
  currency: z.string().min(3).max(3)
};

export const PaymentSchema = z.object(PaymentShape).catchall(z.any()); // Allow additional properties

// Address schema for recipient/originator addresses
const AddressSchema = z.object({
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  stateCode: z.string().optional(), // Required for Domestic and Internal WIRE
  countryCode: z.string().optional(), // Required for Domestic and Internal WIRE
  postalCode: z.string().optional()
}).optional();

const OriginatorSchema = z.object({
  accountId: z.string()
});

const AccountHolderSchema = z.object({
  name: z.string(),
  accountId: z.string().optional(),
  recipientId: z.string().optional(),
  accountType: z.enum(['CHECKING', 'SAVINGS']).optional(),
  recipientType: z.enum(['INDIVIDUAL', 'BUSINESS']).optional(),
  accountEntity: z.enum(['PERSONAL', 'BUSINESS']).optional(),
  accountNumber: z.string().optional(),
  bankInformation: z.object({
    routingNumber: z.string()
  }).optional(),
  cardId: z.string().optional(),
  contactNumber: z.string().optional(),
  address: AddressSchema
});

export const CreatePaymentInputShape = {
  // Core payment fields
  amount: z.number().positive(),
  currency: z.string().min(3).max(3), // ISO 4217 currency codes
  paymentRail: PaymentRailSchema,
  paymentType: PaymentTypeSchema,

  // Originator (sender) details
  originator: OriginatorSchema,

  // Recipient (receiver) details
  recipient: AccountHolderSchema,

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
};

export const CreatePaymentInputSchema = z.object(CreatePaymentInputShape).catchall(z.any()) // Allow additional properties
  .refine((data) => {
    // Custom validation: For WIRE transfers, recipient address is mandatory
    if ((data.paymentRail === 'WIRE' || data.paymentRail === 'SWIFT') && data.recipient) {
      return data.recipient.name && data.recipient.address &&
             data.recipient.address.stateCode &&
             data.recipient.address.countryCode &&
             data.recipient.accountNumber &&
             data.recipient.accountType &&
             data.recipient.bankInformation;
    }
    return true;
  }, {
    message: 'For WIRE transfers, recipient address with state and country is mandatory'
  }).refine((data) => {
    if (data.paymentRail === 'INTERNAL') {
      return data.originator.accountId && data.recipient.accountId;
    }
    return true;
  }, {
    message: 'For INTERNAL transfers, both originator and recipient accountId are mandatory'
  }).refine((data) => {
    if (data.paymentRail === 'ACH' || data.paymentRail === 'SAMEDAYACH') {
      return data.recipient.name && data.originator.accountId &&
             data.recipient.accountType &&
             data.recipient.recipientType &&
             data.recipient.accountNumber &&
             data.recipient.bankInformation;
    }
    return true;
  }, {
    message: 'For ACH/SAMEDAYACH transfers, originator and recipient accountId, recipient accountType, originator recipientType, recipient accountNumber and recipient bankInformation are mandatory'
  }).refine((data) => {
    if (data.paymentRail === 'CARD' && data.recipient) {
      return data.recipient.cardId;
    }
    return true;
  }, {
    message: 'For CARD payments, recipient cardId is mandatory'
  }).refine((data) => {
    if (data.paymentRail === 'FXPAY') {
      return data.recipient.recipientId &&
             data.recipient.name &&
             data.recipient.accountNumber &&
             data.recipient.accountType &&
             data.recipient.recipientType &&
             data.recipient.accountEntity &&
             data.paymentRailMetaData;
    }
    return true;
  }, {
    message: 'For FXPAY payments, correspondent name and identifier are mandatory'
  });

export const UpdatePaymentInputShape = {
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
};

export const UpdatePaymentInputSchema = z.object(UpdatePaymentInputShape).catchall(z.any()); // Allow additional properties

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

// Generic validation functions for filter keys and values
export const validateFilterKey = (key: string): PaymentFilterKey => {
  try {
    return PaymentFilterKeySchema.parse(key);
  } catch (error) {
    if (error instanceof ZodError) {
      throw createCommandError({
        code: 'INVALID_FILTER_KEY',
        message: `Invalid filter key: ${key}. Valid keys are: ${VALID_PAYMENT_FILTER_KEYS.join(', ')}`,
        statusCode: 400
      });
    }
    throw error;
  }
};

export const validateFilterValue = (key: string, value: any): any => {
  try {
    switch (key) {
      case 'status':
        return PaymentStatusSchema.parse(value);
      case 'paymentRail':
        return PaymentRailSchema.parse(value);
      case 'paymentType':
        return PaymentTypeSchema.parse(value);
      case 'sortOrder':
        return SortOrderSchema.parse(value);
      case 'originatorName':
        return OriginatorNameSchema.parse(value);
      case 'originatorAccount':
        return OriginatorAccountSchema.parse(value);
      case 'originatorBankRoutingCode':
        return OriginatorBankRoutingCodeSchema.parse(value);
      case 'recipientName':
        return RecipientNameSchema.parse(value);
      case 'recipientAccount':
        return RecipientAccountSchema.parse(value);
      case 'recipientBankRoutingCode':
        return RecipientBankRoutingCodeSchema.parse(value);
      case 'reference':
        return ReferenceSchema.parse(value);
      case 'traceNumber':
        return TraceNumberSchema.parse(value);
      case 'externalId':
        return ExternalIdSchema.parse(value);
      case 'clientId':
        return ClientIdSchema.parse(value);
      case 'dateFormat':
        return DateFormatSchema.parse(value);
      case 'locale':
        return LocaleSchema.parse(value);
      case 'originatedBy':
        return OriginatedBySchema.parse(value);
      case 'fromValueDate':
      case 'toValueDate':
        return ValueDateSchema.parse(value);
      case 'fromExecuteDate':
      case 'toExecuteDate':
        return ExecuteDateSchema.parse(value);
      case 'fromReturnDate':
      case 'toReturnDate':
        return ReturnDateSchema.parse(value);
      case 'isSettlement':
        return IsSettlementSchema.parse(value);
      case 'orderBy':
        return OrderBySchema.parse(value);
      default:
        // For unknown keys, just return the value without validation
        return value;
    }
  } catch (error) {
    if (error instanceof ZodError) {
      throw createCommandError({
        code: 'INVALID_FILTER_VALUE',
        message: `Invalid filter value for key '${key}': ${error.errors[0].message}`,
        statusCode: 400
      });
    }
    throw error;
  }
};

export const ProcessOutputSchema = z.object({
  id: z.string(),
  clientId: z.number(),
  resourceId: z.number(),
  resourceIdentifier: z.string()
});

export type ProcessOutput = z.infer<typeof ProcessOutputSchema>;
