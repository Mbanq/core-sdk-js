import { z } from 'zod';

// Nested schemas for transfer details
const agentSchema = z.object({
    identifier: z.string().optional(),
    name: z.string().optional(),
    country: z.string(),
    address: z.array(z.string()).optional()
});

const creditorDebtorSchema = z.object({
    identifier: z.string(),
    name: z.string(),
    city: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string(),
    stateOrProvince: z.string().optional(),
    agent: agentSchema.optional(),
    address: z.array(z.string()).optional(),
    accountType: z.string().optional()
});

const businessFunctionCodeSchema = z.object({
    businessFunctionCode: z.string(),
    transactionTypeCode: z.string()
});

const receiverDepositoryInstitutionSchema = z.object({
    receiverABANumber: z.string(),
    receiverShortName: z.string()
});

const personalSchema = z.object({
    identificationCode: z.string()
});

const financialInstitutionSchema = z.object({
    identificationCode: z.string().optional()
});

const typeSubTypeSchema = z.object({
    typeCode: z.string(),
    subTypeCode: z.string()
});

const paymentRailMetaDataSchema = z.object({
    businessFunctionCode: businessFunctionCodeSchema.optional(),
    receiverDepositoryInstitution: receiverDepositoryInstitutionSchema.optional(),
    originator: z.object({
        personal: personalSchema.optional()
    }).optional(),
    beneficiary: z.object({
        personal: personalSchema.optional()
    }).optional(),
    beneficiaryFI: z.object({
        financialInstitution: financialInstitutionSchema.optional()
    }).optional(),
    beneficiaryIntermediaryFI: z.object({
        financialInstitution: financialInstitutionSchema.optional()
    }).optional(),
    typeSubType: typeSubTypeSchema.optional(),
    fiPaymentMethodToBeneficiary: z.record(z.any()).optional()
});

const transferSchema = z.object({
    id: z.number(),
    amount: z.number(),
    correlationId: z.string(),
    creditor: creditorDebtorSchema,
    debtor: creditorDebtorSchema,
    createdAt: z.string(),
    executedAt: z.string(),
    externalId: z.string(),
    reference: z.array(z.string()),
    status: z.string(),
    transactionId: z.string(),
    type: z.string(),
    valueDate: z.string(),
    paymentType: z.string(),
    debtorAccountNumber: z.string(),
    debtorAccountId: z.number(),
    creditorAccountNumber: z.string(),
    paymentRailMetaData: paymentRailMetaDataSchema.optional(),
    traceNumbers: z.record(z.any()).optional(),
    statementDescription: z.string(),
    stopFutureDebit: z.boolean(),
    createdBySystem: z.boolean()
});

const pendingTransactionSchema = z.object({
    id: z.number(),
    transfer: transferSchema,
    typeOf: z.string(),
    valueDate: z.string(),
    amount: z.number(),
    pendingAmount: z.number(),
    createdAt: z.string(),
    manual: z.boolean(),
    active: z.boolean(),
    type: z.string()
});

export const GetPendingTransactionsResponseShape = {
    totalFilteredRecords: z.number(),
    pageItems: z.array(pendingTransactionSchema)
};

export const GetPendingTransactionsResponseSchema = z.object(GetPendingTransactionsResponseShape);

export const GetPendingTransactionsRequestShape = {
    offset: z.number().optional(),
    limit: z.number().optional(),
    orderBy: z.string().optional(),
    sortOrder: z.string().optional()
};

export const GetPendingTransactionsRequestSchema = z.object(GetPendingTransactionsRequestShape);

export type GetPendingTransactionsResponse = z.infer<typeof GetPendingTransactionsResponseSchema>;
export type GetPendingTransactionsRequest = z.infer<typeof GetPendingTransactionsRequestSchema>;
export type PendingTransaction = z.infer<typeof pendingTransactionSchema>;
export type Transfer = z.infer<typeof transferSchema>;
