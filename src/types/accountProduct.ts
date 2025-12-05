import { z } from 'zod';

export const CreateAccountProductRequestShape = {
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
    inMultiplesOf: z.string().optional(),
    isLinkedToFloatingInterestRates: z.boolean().optional(),
    floatingRateId: z.number().optional(),
    minDifferentialRate: z.string().optional(),
    interestRateDifferential: z.string().optional(),
    defaultDifferentialRate: z.string().optional(),
    maxDifferentialRate: z.string().optional(),
    isFloatingInterestRateCalculationAllowed: z.boolean().optional(),
    minRequiredOpeningBalance: z.string().optional(),
    paymentChannelToFundSourceMappings: z.string().optional(),
    feeToIncomeAccountMappings: z.string().optional(),
    penaltyToIncomeAccountMappings: z.string().optional(),
    charges: z.array(z.object({
        id: z.number().optional(),
        isMandatory: z.boolean().optional()
    })).optional(),
    locale: z.string(),
    dateFormat: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional()
};

export const CreateAccountProductRequestSchema = z.object(CreateAccountProductRequestShape);

export const CreateAccountProductResponseShape = {
    resourceId: z.string(),
    id: z.string()
};

export const CreateAccountProductResponseSchema = z.object(CreateAccountProductResponseShape);

export type CreateAccountProductRequest = z.infer<typeof CreateAccountProductRequestSchema>;
export type CreateAccountProductResponse = z.infer<typeof CreateAccountProductResponseSchema>;

export const UpdateAccountProductRequestShape = {
    name: z.string().optional(),
    shortName: z.string().optional(),
    description: z.string().optional(),
    currencyCode: z.string().optional(),
    digitsAfterDecimal: z.number().optional(),
    inMultiplesOf: z.string().optional(),
    nominalAnnualInterestRate: z.string().optional(),
    minRequiredOpeningBalance: z.string().optional(),
    withdrawalFeeForTransfers: z.boolean().optional(),
    interestCompoundingPeriodType: z.number().optional(),
    interestPostingPeriodType: z.number().optional(),
    interestCalculationType: z.number().optional(),
    interestCalculationDaysInYearType: z.number().optional(),
    accountingRule: z.number().optional(),
    allowOverdraft: z.boolean().optional(),
    enforceMinRequiredBalance: z.boolean().optional(),
    withHoldTax: z.boolean().optional(),
    isDormancyTrackingActive: z.boolean().optional(),
    isUsedForSuspenseAccounting: z.boolean().optional(),
    isLinkedWithFundSourceAccount: z.boolean().optional(),
    skipCollectTransferCharge: z.boolean().optional(),
    isReservedProduct: z.boolean().optional(),
    isLinkedToFloatingInterestRates: z.boolean().optional(),
    floatingRateId: z.number().optional(),
    interestRateDifferential: z.string().optional(),
    isFloatingInterestRateCalculationAllowed: z.boolean().optional(),
    minDifferentialRate: z.string().optional(),
    defaultDifferentialRate: z.string().optional(),
    maxDifferentialRate: z.string().optional(),
    paymentChannelToFundSourceMappings: z.string().optional(),
    feeToIncomeAccountMappings: z.string().optional(),
    penaltyToIncomeAccountMappings: z.string().optional(),
    charges: z.array(z.object({
        id: z.number().optional(),
        isMandatory: z.boolean().optional()
    })).optional(),
    locale: z.string().optional(),
    dateFormat: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional()
};

export const UpdateAccountProductRequestSchema = z.object(UpdateAccountProductRequestShape);

export const UpdateAccountProductResponseShape = {
    id: z.string(),
    resourceId: z.string(),
    changes: z.object({
        name: z.string().optional(),
        shortName: z.string().optional(),
        nominalAnnualInterestRate: z.number().optional(),
        locale: z.string().optional(),
        minRequiredOpeningBalance: z.number().optional(),
        charges: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        paymentChannelToFundSourceMappings: z.string().optional(),
        penaltyToIncomeAccountMappings: z.string().optional(),
        feeToIncomeAccountMappings: z.string().optional()
    }).optional()
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
    charges: z.array(z.any()),
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
