import { GraphQL } from '.';
import { Command } from '../../types/config';
import { CreatePaymentInput, ProcessOutput, PaymentRailSchema, PaymentTypeSchema } from '../../types/payment';
import { z } from 'zod';

// Function to build GraphQL mutation string dynamically
const buildCreatePaymentMutation = (input: CreatePaymentInput): string => {
  // Define enum fields that should not be quoted
  const enumFields = new Set([
    'recipientType', 'accountType',
    'accountEntity', 'recipientAccountType'
  ]);

  const formatValue = (value: any, fieldName?: string): string => {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'string') {
      // Check if this field should be treated as an enum (no quotes)
      if (fieldName && enumFields.has(fieldName)) {
        return value;
      }
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    if (typeof value === 'number' || typeof value === 'boolean') return value.toString();
    if (typeof value === 'object' && value !== null) {
      const entries = Object.entries(value)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => `${k}: ${formatValue(v, k)}`)
        .join(', ');
      return `{ ${entries} }`;
    }
    return 'null';
  };

  return `
mutation {
  createPayment(input: ${formatValue(input, 'input')}) {
    id
    resourceId
  }
}`;
};

export const CreatePaymentGQL = (params: { input: CreatePaymentInput; tenantId?: string; }): Command<{
  input: CreatePaymentInput;
  tenantId?: string;
}, { createPayment: ProcessOutput }> => {
  const graphqlRequest = GraphQL({
    command: buildCreatePaymentMutation(params.input),
    variables: {},
    tenantId: params.tenantId
  });

  return {
    input: params,
    metadata: {
      commandName: 'CreatePaymentGQL',
      path: '/graphql',
      method: 'POST'
    },
    execute: graphqlRequest.execute
  };
};

export const CreatePaymentParamsShape = {
  // Core required fields
  paymentRail: PaymentRailSchema,
  originatorAccountId: z.string().min(1, 'originatorAccountId is required'),
  amount: z.number().positive('amount must be positive'),

  // Optional core fields
  paymentType: PaymentTypeSchema.optional(),
  reference: z.string().optional(),
  correlationId: z.string().optional(),
  tenantId: z.string().optional(),

  // Recipient fields (all optional - validation handled by refine)
  recipientAccountId: z.string().optional(),
  recipientName: z.string().optional(),
  recipientType: z.enum(['INDIVIDUAL', 'BUSINESS']).optional(),
  recipientAccountNumber: z.string().optional(),
  recipientRoutingNumber: z.string().optional(),
  recipientAccountType: z.enum(['CHECKING', 'SAVINGS']).optional(),
  recipientCardId: z.string().optional(),
  recipientId: z.string().optional(),
  recipientAccountEntity: z.enum(['PERSONAL', 'BUSINESS']).optional(),

  // Address fields
  recipientAddress: z.object({
    line1: z.string().optional(),
    line2: z.string().optional(),
    city: z.string().optional(),
    stateCode: z.string().optional(),
    countryCode: z.string().optional(),
    postalCode: z.string().optional()
  }).optional(),

  // Payment rail specific fields
  isPushTransfer: z.boolean().optional(),
  paymentRailMetaData: z.record(z.string(), z.any()).optional()
};

export const CreatePaymentParamsSchema = z.object(CreatePaymentParamsShape).refine((data) => {
  // INTERNAL transfer validation
  if (data.paymentRail === 'INTERNAL') {
    return data.recipientAccountId ? data.recipientAccountId.length > 0 : false;
  }
  return true;
}, {
  message: 'recipientAccountId is required for INTERNAL transfers'
}).refine((data) => {
  // ACH/SAMEDAYACH transfer validation
  if (data.paymentRail === 'ACH' || data.paymentRail === 'SAMEDAYACH') {
    return !!(data.recipientName && data.recipientAccountNumber &&
              data.recipientRoutingNumber && data.recipientAccountType);
  }
  return true;
}, {
  message: 'recipientName, recipientAccountNumber, recipientRoutingNumber, and recipientAccountType are required for ACH transfers'
}).refine((data) => {
  // ACH routing number length validation
  if ((data.paymentRail === 'ACH' || data.paymentRail === 'SAMEDAYACH') && data.recipientRoutingNumber) {
    return data.recipientRoutingNumber.length === 9;
  }
  return true;
}, {
  message: 'recipientRoutingNumber must be exactly 9 digits for ACH transfers'
}).refine((data) => {
  // WIRE/SWIFT transfer validation
  if (data.paymentRail === 'WIRE' || data.paymentRail === 'SWIFT') {
    return !!(data.recipientName && data.recipientAccountNumber &&
              data.recipientRoutingNumber && data.recipientAccountType);
  }
  return true;
}, {
  message: 'recipientName, recipientAccountNumber, recipientRoutingNumber, and recipientAccountType are required for WIRE transfers'
}).refine((data) => {
  // WIRE/SWIFT address validation
  if (data.paymentRail === 'WIRE' || data.paymentRail === 'SWIFT') {
    return !!(data.recipientAddress?.stateCode && data.recipientAddress?.countryCode);
  }
  return true;
}, {
  message: 'recipientAddress with stateCode and countryCode is required for WIRE transfers'
}).refine((data) => {
  // CARD transfer validation
  if (data.paymentRail === 'CARD') {
    return data.recipientCardId ? data.recipientCardId.length > 0 : false;
  }
  return true;
}, {
  message: 'recipientCardId is required for CARD transfers'
}).refine((data) => {
  // FXPAY transfer validation
  if (data.paymentRail === 'FXPAY') {
    return !!(data.recipientId && data.recipientName && data.recipientAccountNumber &&
              data.recipientAccountType && data.recipientAccountEntity);
  }
  return true;
}, {
  message: 'recipientId, recipientName, recipientAccountNumber, recipientAccountType, and recipientAccountEntity are required for FXPAY transfers'
});

export type CreatePaymentParams = z.infer<typeof CreatePaymentParamsSchema>;

// Enum values that users should use for input parameters
export const RECIPIENT_TYPES = ['INDIVIDUAL', 'BUSINESS'] as const;
export const ACCOUNT_TYPES = ['CHECKING', 'SAVINGS'] as const;
export const ACCOUNT_ENTITIES = ['PERSONAL', 'BUSINESS'] as const;
export const PAYMENT_TYPES = ['CREDIT', 'DEBIT'] as const;
export const PAYMENT_RAILS = ['INTERNAL', 'ACH', 'SAMEDAYACH', 'WIRE', 'SWIFT', 'CARD', 'FXPAY'] as const;

export type RecipientType = typeof RECIPIENT_TYPES[number];
export type AccountType = typeof ACCOUNT_TYPES[number];
export type AccountEntity = typeof ACCOUNT_ENTITIES[number];
export type PaymentType = typeof PAYMENT_TYPES[number];
export type PaymentRail = typeof PAYMENT_RAILS[number];

/**
 * Create a payment with unified parameters for all payment rails
 *
 * @example
 * // ACH Transfer
 * CreatePayment({
 *   paymentRail: 'ACH',
 *   paymentType: 'CREDIT', // Use enum: 'CREDIT' | 'DEBIT'
 *   originatorAccountId: '950023',
 *   recipientName: 'John Doe',
 *   recipientAccountNumber: '123456789',
 *   recipientRoutingNumber: '021000021',
 *   recipientAccountType: 'CHECKING', // Use enum: 'CHECKING' | 'SAVINGS'
 *   recipientType: 'INDIVIDUAL', // Use enum: 'INDIVIDUAL' | 'BUSINESS'
 *   amount: 500.00
 * });
 *
 * @example
 * // FXPAY Transfer
 * CreatePayment({
 *   paymentRail: 'FXPAY',
 *   originatorAccountId: '950023',
 *   recipientId: 'recipient123',
 *   recipientName: 'Global Corp',
 *   recipientAccountNumber: '987654321',
 *   recipientAccountType: 'SAVINGS', // Use enum: 'CHECKING' | 'SAVINGS'
 *   recipientType: 'BUSINESS', // Use enum: 'INDIVIDUAL' | 'BUSINESS'
 *   recipientAccountEntity: 'BUSINESS', // Use enum: 'PERSONAL' | 'BUSINESS'
 *   amount: 1500.00
 * });
 */
export const CreatePayment = (params: CreatePaymentParams, configuration?: { tenantId?: string }): Command<{ input: CreatePaymentInput, configuration?: { tenantId?: string }; tenantId?: string; }, { createPayment: ProcessOutput }> => {
  const validatedParams = CreatePaymentParamsSchema.parse(params);

  let input: CreatePaymentInput;

  switch (validatedParams.paymentRail) {
    case 'INTERNAL':
      input = {
        paymentRail: 'INTERNAL',
        paymentType: validatedParams.paymentType || 'CREDIT',
        amount: validatedParams.amount,
        originator: {
          accountId: validatedParams.originatorAccountId
        },
        recipient: {
          accountId: validatedParams.recipientAccountId!,
          name: validatedParams.recipientName || '',
          recipientType: validatedParams.recipientType || 'INDIVIDUAL',
          address: validatedParams.recipientAddress
        },
        reference: validatedParams.reference,
        externalId: validatedParams.correlationId
      };
      break;

    case 'ACH':
    case 'SAMEDAYACH':
      input = {
        paymentRail: validatedParams.paymentRail,
        paymentType: validatedParams.paymentType || 'CREDIT',
        amount: validatedParams.amount,
        originator: {
          accountId: validatedParams.originatorAccountId
        },
        recipient: {
          name: validatedParams.recipientName!,
          accountNumber: validatedParams.recipientAccountNumber!,
          accountType: validatedParams.recipientAccountType!,
          recipientType: validatedParams.recipientType || 'INDIVIDUAL',
          bankInformation: {
            routingNumber: validatedParams.recipientRoutingNumber!
          },
          address: validatedParams.recipientAddress
        },
        reference: validatedParams.reference,
        externalId: validatedParams.correlationId
      };
      break;

    case 'WIRE':
    case 'SWIFT':
      input = {
        paymentRail: validatedParams.paymentRail,
        paymentType: validatedParams.paymentType || 'CREDIT',
        amount: validatedParams.amount,
        originator: {
          accountId: validatedParams.originatorAccountId
        },
        recipient: {
          name: validatedParams.recipientName!,
          accountNumber: validatedParams.recipientAccountNumber!,
          accountType: validatedParams.recipientAccountType!,
          recipientType: validatedParams.recipientType || 'INDIVIDUAL',
          bankInformation: {
            routingNumber: validatedParams.recipientRoutingNumber!
          },
          address: validatedParams.recipientAddress!
        },
        reference: validatedParams.reference,
        externalId: validatedParams.correlationId
      };
      break;

    case 'CARD':
      input = {
        paymentRail: 'CARD',
        paymentType: validatedParams.paymentType || (validatedParams.isPushTransfer ? 'CREDIT' : 'DEBIT'),
        amount: validatedParams.amount,
        originator: {
          accountId: validatedParams.originatorAccountId
        },
        recipient: {
          cardId: validatedParams.recipientCardId!,
          name: validatedParams.recipientName || '',
          recipientType: validatedParams.recipientType || 'INDIVIDUAL',
          address: validatedParams.recipientAddress
        },
        reference: validatedParams.reference,
        externalId: validatedParams.correlationId
      };
      break;

    case 'FXPAY':
      input = {
        paymentRail: 'FXPAY',
        paymentType: validatedParams.paymentType || 'CREDIT',
        amount: validatedParams.amount,
        originator: {
          accountId: validatedParams.originatorAccountId
        },
        recipient: {
          recipientId: validatedParams.recipientId!,
          name: validatedParams.recipientName!,
          accountNumber: validatedParams.recipientAccountNumber!,
          accountType: validatedParams.recipientAccountType!,
          recipientType: validatedParams.recipientType || 'INDIVIDUAL',
          accountEntity: validatedParams.recipientAccountEntity!,
          address: validatedParams.recipientAddress
        },
        reference: validatedParams.reference,
        externalId: validatedParams.correlationId,
        paymentRailMetaData: validatedParams.paymentRailMetaData
      };
      break;

    default:
      // TypeScript should never reach this case due to discriminated union
      throw new Error(`Unsupported payment rail: ${(validatedParams as any).paymentRail}`);
  }

  return CreatePaymentGQL({ input, tenantId: configuration?.tenantId });
};

// Validation function for CreatePayment parameters
export const validateCreatePaymentParams = (params: unknown): CreatePaymentParams => {
  return CreatePaymentParamsSchema.parse(params);
};

// Helper function to check if params are valid without throwing
export const isValidCreatePaymentParams = (params: unknown): params is CreatePaymentParams => {
  return CreatePaymentParamsSchema.safeParse(params).success;
};
