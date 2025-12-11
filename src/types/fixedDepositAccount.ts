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

// Schema for interest rate charts in Update requests (includes id)
const updateChartSchema = z.object({
  id: z.number(),
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

// Request schema for updating a fixed deposit account
export const UpdateFixedDepositAccountRequestShape = {
  clientId: z.number(),
  productId: z.number(),
  submittedOnDate: z.string(),
  nominalAnnualInterestRate: z.number().optional(),
  depositAmount: z.union([z.string(), z.number()]).optional(),
  depositPeriod: z.number(),
  withHoldTax: z.boolean().optional(),
  interestCompoundingPeriodType: z.number().optional(),
  interestPostingPeriodType: z.number().optional(),
  interestCalculationType: z.number().optional(),
  interestCalculationDaysInYearType: z.number().optional(),
  depositPeriodFrequencyId: z.number(),
  preClosurePenalApplicable: z.boolean().optional(),
  minDepositTerm: z.number().optional(),
  minDepositTermTypeId: z.number().optional(),
  transferInterestToSavings: z.union([z.string(), z.boolean()]).optional(),
  locale: z.string(),
  dateFormat: z.string(),
  monthDayFormat: z.string().optional(),
  charges: z.array(chargeSchema).optional(),
  charts: z.array(updateChartSchema).optional()
};

export const UpdateFixedDepositAccountRequestSchema = z.object(UpdateFixedDepositAccountRequestShape);

// Response schema for updating a fixed deposit account
export const UpdateFixedDepositAccountResponseShape = {
  id: z.string(),
  officeId: z.number(),
  clientId: z.number(),
  savingsId: z.string(),
  resourceId: z.string(),
  changes: z.object({
    submittedOnDate: z.string().optional(),
    nominalAnnualInterestRate: z.number().optional(),
    depositAmount: z.union([z.string(), z.number()]).optional(),
    depositPeriod: z.number().optional(),
    withHoldTax: z.boolean().optional(),
    interestCompoundingPeriodType: z.number().optional(),
    interestPostingPeriodType: z.number().optional(),
    interestCalculationType: z.number().optional(),
    interestCalculationDaysInYearType: z.number().optional(),
    depositPeriodFrequencyId: z.number().optional(),
    preClosurePenalApplicable: z.boolean().optional(),
    minDepositTerm: z.number().optional(),
    minDepositTermTypeId: z.number().optional(),
    transferInterestToSavings: z.union([z.string(), z.boolean()]).optional(),
    locale: z.string().optional(),
    dateFormat: z.string().optional(),
    monthDayFormat: z.string().optional(),
    charges: z.array(chargeSchema).optional(),
    charts: z.array(updateChartSchema).optional()
  }).optional()
};

export const UpdateFixedDepositAccountResponseSchema = z.object(UpdateFixedDepositAccountResponseShape);

// Export types
export type CreateFixedDepositAccountRequest = z.infer<typeof CreateFixedDepositAccountRequestSchema>;
export type CreateFixedDepositAccountResponse = z.infer<typeof CreateFixedDepositAccountResponseSchema>;
export type UpdateFixedDepositAccountRequest = z.infer<typeof UpdateFixedDepositAccountRequestSchema>;
export type UpdateFixedDepositAccountResponse = z.infer<typeof UpdateFixedDepositAccountResponseSchema>;
export type ChartSlab = z.infer<typeof chartSlabSchema>;
export type Chart = z.infer<typeof chartSchema>;
export type Charge = z.infer<typeof chargeSchema>;

// Schemas for GetFixedDepositAccount response
const codeValueSchema = z.object({
  id: z.number(),
  code: z.string(),
  value: z.string()
});

const statusSchema = z.object({
  id: z.number(),
  code: z.string(),
  value: z.string(),
  submittedAndPendingApproval: z.boolean(),
  approved: z.boolean(),
  rejected: z.boolean(),
  withdrawnByApplicant: z.boolean(),
  active: z.boolean(),
  closed: z.boolean(),
  prematureClosed: z.boolean(),
  transferInProgress: z.boolean(),
  transferOnHold: z.boolean(),
  matured: z.boolean()
});

const timelineSchema = z.object({
  submittedOnDate: z.array(z.number()),
  submittedByUsername: z.string(),
  submittedByFirstname: z.string(),
  submittedByLastname: z.string(),
  approvedOnDate: z.array(z.number()).optional(),
  approvedByUsername: z.string().optional(),
  approvedByFirstname: z.string().optional(),
  approvedByLastname: z.string().optional(),
  activatedOnDate: z.array(z.number()).optional(),
  activatedByUsername: z.string().optional(),
  activatedByFirstname: z.string().optional(),
  activatedByLastname: z.string().optional()
});

const currencySchema = z.object({
  code: z.string(),
  name: z.string(),
  decimalPlaces: z.number(),
  displaySymbol: z.string(),
  nameCode: z.string(),
  displayLabel: z.string()
});

const summarySchema = z.object({
  currency: currencySchema,
  totalDeposits: z.number(),
  totalWithdrawals: z.number(),
  totalWithdrawalFees: z.number(),
  totalAnnualFees: z.number(),
  totalInterestEarned: z.number(),
  totalInterestPosted: z.number(),
  accountBalance: z.number(),
  totalFeeCharge: z.number(),
  totalPenaltyCharge: z.number(),
  totalOverdraftInterestDerived: z.number(),
  totalWithholdTax: z.number(),
  interestNotPosted: z.number(),
  availableBalance: z.number()
});

const accountChargeSchema = z.object({
  id: z.number(),
  chargeId: z.number(),
  accountId: z.number(),
  name: z.string(),
  chargeTimeType: codeValueSchema,
  dueDate: z.array(z.number()).optional(),
  chargeCalculationType: codeValueSchema,
  percentage: z.number(),
  amountPercentageAppliedTo: z.number(),
  currency: currencySchema,
  amount: z.number(),
  amountPaid: z.number(),
  amountWaived: z.number(),
  amountWrittenOff: z.number(),
  amountOutstanding: z.number(),
  amountOrPercentage: z.number(),
  minCap: z.number(),
  maxCap: z.number(),
  penalty: z.boolean(),
  isActive: z.boolean(),
  totalDeferredChargeAmount: z.number(),
  numberOfExemptedFee: z.number(),
  collectOnlyTotalDeferCharge: z.boolean(),
  reverseOnTransferFail: z.boolean()
});

const accountChartSlabSchema = z.object({
  id: z.number(),
  description: z.string().optional(),
  periodType: codeValueSchema,
  fromPeriod: z.number(),
  toPeriod: z.number().optional(),
  annualInterestRate: z.number(),
  currency: currencySchema
});

const accountChartSchema = z.object({
  id: z.number(),
  fromDate: z.array(z.number()),
  isPrimaryGroupingByAmount: z.boolean(),
  accountId: z.number(),
  accountNumber: z.string(),
  chartSlabs: z.array(accountChartSlabSchema),
  periodTypes: z.array(codeValueSchema)
});

export const FixedDepositAccountShape = {
  id: z.string(),
  preClosurePenalApplicable: z.boolean(),
  minDepositTerm: z.number(),
  minDepositTermType: codeValueSchema,
  depositAmount: z.number(),
  maturityAmount: z.number(),
  maturityDate: z.array(z.number()),
  depositPeriod: z.number(),
  depositPeriodFrequency: codeValueSchema,
  activationCharge: z.number(),
  transferInterestToSavings: z.boolean(),
  accountNo: z.string(),
  clientId: z.number(),
  clientName: z.string(),
  depositProductId: z.number(),
  depositProductName: z.string(),
  fieldOfficerId: z.number(),
  status: statusSchema,
  timeline: timelineSchema,
  currency: currencySchema,
  nominalAnnualInterestRate: z.number(),
  interestCompoundingPeriodType: codeValueSchema,
  interestPostingPeriodType: codeValueSchema,
  minRequiredOpeningBalance: z.number(),
  withdrawalFeeForTransfers: z.boolean(),
  depositType: codeValueSchema,
  minBalanceForInterestCalculation: z.number(),
  withHoldTax: z.boolean(),
  summary: summarySchema,
  charges: z.array(accountChargeSchema),
  accountChart: accountChartSchema
};

export const FixedDepositAccountSchema = z.object(FixedDepositAccountShape);

export type FixedDepositAccount = z.infer<typeof FixedDepositAccountSchema>;
