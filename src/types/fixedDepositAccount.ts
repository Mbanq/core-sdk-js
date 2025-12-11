import { z } from 'zod';

// Schema for chart slabs (interest rate periods)
const chartSlabSchema = z.object({
  periodType: z.number().optional(),
  fromPeriod: z.number().optional(),
  toPeriod: z.number().optional(),
  annualInterestRate: z.number().optional(),
  description: z.string().optional()
});

// Schema for interest rate charts
const chartSchema = z.object({
  fromDate: z.array(z.number()).optional(),
  dateFormat: z.string().optional(),
  locale: z.string().optional(),
  chartSlabs: z.array(chartSlabSchema).optional(),
  isActiveChart: z.string().optional()
});

// Schema for charges
const chargeSchema = z.object({
  chargeId: z.number(),
  amount: z.number().optional(),
  dueDate: z.string().optional(),
  feeInterval: z.number().optional()
});

// Request schema for creating a fixed deposit account
export const CreateFixedDepositAccountRequestShape = {
  productId: z.number(),
  nominalAnnualInterestRate: z.number().optional(),
  minRequiredOpeningBalance: z.number().optional(),
  interestCompoundingPeriodType: z.number().optional(),
  interestPostingPeriodType: z.number().optional(),
  interestCalculationType: z.number().optional(),
  interestCalculationDaysInYearType: z.number().optional(),
  preClosurePenalApplicable: z.boolean().optional(),
  minDepositTerm: z.number().optional(),
  minDepositTermTypeId: z.number().optional(),
  transferInterestToSavings: z.union([z.string(), z.boolean()]).optional(),
  depositAmount: z.string(),
  depositPeriod: z.string(),
  depositPeriodFrequencyId: z.number(),
  isConsent: z.boolean(),
  submittedOnDate: z.string(),
  locale: z.string(),
  dateFormat: z.string(),
  monthDayFormat: z.string().optional(),
  clientId: z.number(),
  charges: z.array(chargeSchema).optional(),
  charts: z.array(chartSchema).optional()
};

export const CreateFixedDepositAccountRequestSchema = z.object(CreateFixedDepositAccountRequestShape);

// Response schema for creating a fixed deposit account
export const CreateFixedDepositAccountResponseShape = {
  id: z.number().optional(),
  officeId: z.number(),
  clientId: z.number(),
  savingsId: z.number(),
  resourceId: z.number()
};

export const CreateFixedDepositAccountResponseSchema = z.object(CreateFixedDepositAccountResponseShape);

// Export types
export type CreateFixedDepositAccountRequest = z.infer<typeof CreateFixedDepositAccountRequestSchema>;
export type CreateFixedDepositAccountResponse = z.infer<typeof CreateFixedDepositAccountResponseSchema>;
export type ChartSlab = z.infer<typeof chartSlabSchema>;
export type Chart = z.infer<typeof chartSchema>;
export type Charge = z.infer<typeof chargeSchema>;
