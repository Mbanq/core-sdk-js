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
