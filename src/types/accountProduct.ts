import { z } from 'zod';

const ChargeShape = {
    id: z.number().optional(),
    isMandatory: z.boolean().optional()
};

// Base shape containing all possible fields for account product operations
const BaseAccountProductShape = {
    currencyCode: z.string(),
    digitsAfterDecimal: z.number(),
    interestCompoundingPeriodType: z.number(),
    interestPostingPeriodType: z.number(),
    interestCalculationType: z.number(),
    interestCalculationDaysInYearType: z.number(),
    accountingRule: z.number(),
    name: z.string(),
    shortName: z.string(),
    description: z.string(),
    nominalAnnualInterestRate: z.string(),
    inMultiplesOf: z.string(),
    minRequiredOpeningBalance: z.string(),
    withdrawalFeeForTransfers: z.boolean(),
    allowOverdraft: z.boolean(),
    enforceMinRequiredBalance: z.boolean(),
    withHoldTax: z.boolean(),
    isDormancyTrackingActive: z.boolean(),
    isUsedForSuspenseAccounting: z.boolean(),
    isLinkedWithFundSourceAccount: z.boolean(),
    skipCollectTransferCharge: z.boolean(),
    isReservedProduct: z.boolean(),
    isLinkedToFloatingInterestRates: z.boolean(),
    floatingRateId: z.number(),
    minDifferentialRate: z.string(),
    interestRateDifferential: z.string(),
    defaultDifferentialRate: z.string(),
    maxDifferentialRate: z.string(),
    isFloatingInterestRateCalculationAllowed: z.boolean(),
    paymentChannelToFundSourceMappings: z.string(),
    feeToIncomeAccountMappings: z.string(),
    penaltyToIncomeAccountMappings: z.string(),
    charges: z.array(z.object(ChargeShape)),
    locale: z.string(),
    dateFormat: z.string(),
    startDate: z.string(),
    endDate: z.string()
};

// Create schema: Start with all fields optional, then mark specific fields as required
export const CreateAccountProductRequestSchema = z.object(BaseAccountProductShape)
    .partial()
    .required({
        currencyCode: true,
        digitsAfterDecimal: true,
        interestCompoundingPeriodType: true,
        interestPostingPeriodType: true,
        interestCalculationType: true,
        interestCalculationDaysInYearType: true,
        accountingRule: true,
        name: true,
        shortName: true,
        description: true,
        locale: true
    });

export const CreateAccountProductResponseShape = {
    resourceId: z.string(),
    id: z.string()
};

export const CreateAccountProductResponseSchema = z.object(CreateAccountProductResponseShape);

export type CreateAccountProductRequest = z.infer<typeof CreateAccountProductRequestSchema>;
export type CreateAccountProductResponse = z.infer<typeof CreateAccountProductResponseSchema>;

// Update schema: all fields are optional
export const UpdateAccountProductRequestSchema = z.object(BaseAccountProductShape).partial();

export const UpdateAccountProductResponseShape = {
    id: z.string(),
    resourceId: z.string(),
    changes: z.record(z.unknown()).optional()
};

export const UpdateAccountProductResponseSchema = z.object(UpdateAccountProductResponseShape);

export type UpdateAccountProductRequest = z.infer<typeof UpdateAccountProductRequestSchema>;
export type UpdateAccountProductResponse = z.infer<typeof UpdateAccountProductResponseSchema>;

export const AccountProductItemShape = {
    id: z.number(),
    name: z.string(),
    shortName: z.string(),
    description: z.string(),
    currency: z.object({
        code: z.string(),
        name: z.string(),
        decimalPlaces: z.number(),
        displaySymbol: z.string(),
        nameCode: z.string(),
        displayLabel: z.string()
    }),
    interestCompoundingPeriodType: z.object({
        id: z.number(),
        code: z.string(),
        value: z.string()
    }),
    interestPostingPeriodType: z.object({
        id: z.number(),
        code: z.string(),
        value: z.string()
    }),
    interestCalculationType: z.object({
        id: z.number(),
        code: z.string(),
        value: z.string()
    }),
    interestCalculationDaysInYearType: z.object({
        id: z.number(),
        code: z.string(),
        value: z.string()
    }),
    withdrawalFeeForTransfers: z.boolean(),
    allowOverdraft: z.boolean(),
    minRequiredBalance: z.number(),
    enforceMinRequiredBalance: z.boolean(),
    withHoldTax: z.boolean(),
    accountingRule: z.object({
        id: z.number(),
        code: z.string(),
        value: z.string()
    }),
    charges: z.array(z.object(ChargeShape)),
    isDormancyTrackingActive: z.boolean(),
    isLinkedToFloatingInterestRates: z.boolean(),
    isFloatingInterestRateCalculationAllowed: z.boolean(),
    isUsedForSuspenseAccounting: z.boolean(),
    isLinkedWithFundSourceAccount: z.boolean(),
    isSkipCollectTransferCharge: z.boolean(),
    isReservedProduct: z.boolean()
};

export const AccountProductItemSchema = z.object(AccountProductItemShape);

export const GetAllAccountProductsResponseSchema = z.array(AccountProductItemSchema);

export type AccountProductItem = z.infer<typeof AccountProductItemSchema>;
export type GetAllAccountProductsResponse = z.infer<typeof GetAllAccountProductsResponseSchema>;
export type GetAccountProductByIdResponse = AccountProductItem;
