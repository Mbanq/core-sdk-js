import { z } from 'zod';
import { createCommandError } from '../utils/errorHandler';

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

const currencySchema = z.object({
  code: z.string(),
  name: z.string(),
  decimalPlaces: z.number(),
  inMultiplesOf: z.number(),
  displaySymbol: z.string(),
  nameCode: z.string(),
  displayLabel: z.string(),
  currencyCodeInDigit: z.number().optional(),
  isBaseCurrency: z.boolean().optional()
});

const accountTypeSchema = z.object({
  id: z.number(),
  code: z.string(),
  value: z.string()
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

const subStatusSchema = z.object({
  id: z.number(),
  code: z.string(),
  value: z.string(),
  none: z.boolean(),
  inactive: z.boolean(),
  dormant: z.boolean(),
  escheat: z.boolean(),
  block: z.boolean(),
  blockCredit: z.boolean(),
  blockDebit: z.boolean()
});

const depositTypeSchema = z.object({
  id: z.number(),
  code: z.string(),
  value: z.string()
});

const savingsAccountsSchema = z.object({
  id: z.number(),
  accountNo: z.string(),
  productId: z.number(),
  productName: z.string(),
  shortProductName: z.string(),
  status: statusSchema,
  currency: currencySchema,
  accountBalance: z.number(),
  accountType: accountTypeSchema,
  timeline: timelineSchema,
  subStatus: subStatusSchema,
  lastActiveTransactionDate: z.array(z.number()).optional(),
  depositType: depositTypeSchema,
  availableBalance: z.number(),
  allowPrepaidCard: z.boolean(),
  primaryAccount: z.record(z.any())
});

export const SavingAccountShape = {
  id: z.number(),
  accountNo: z.string(),
  depositType: depositTypeSchema,
  clientId: z.number(),
  clientName: z.string(),
  savingsProductId: z.number(),
  savingsProductName: z.string(),
  fieldOfficerId: z.number(),
  status: statusSchema,
  subStatus: subStatusSchema,
  timeline: timelineSchema,
  currency: currencySchema,
  nominalAnnualInterestRate: z.number(),
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
  lockinPeriodFrequency: z.number(),
  lockinPeriodFrequencyType: z.object({
    id: z.number(),
    code: z.string(),
    value: z.string()
  }),
  withdrawalFeeForTransfers: z.boolean(),
  allowOverdraft: z.boolean(),
  enforceMinRequiredBalance: z.boolean(),
  onHoldFunds: z.number(),
  withHoldTax: z.boolean(),
  lastActiveTransactionDate: z.array(z.number()),
  isDormancyTrackingActive: z.boolean(),
  savingsAmountOnHold: z.number(),
  summary: z.object({
    currency: currencySchema,
    totalDeposits: z.number(),
    totalInterestEarned: z.number(),
    totalInterestPosted: z.number(),
    accountBalance: z.number(),
    totalOverdraftInterestDerived: z.number(),
    interestNotPosted: z.number(),
    lastInterestCalculationDate: z.array(z.number()),
    availableBalance: z.number()
  }),
  isLinkedToFloatingInterestRates: z.boolean(),
  interestRateDifferential: z.number(),
  overdraftInterestRateDifferential: z.number(),
  floatingRateId: z.number(),
  isBaseLendingRate: z.boolean(),
  isFloatingInterestRateCalculationAllowed: z.boolean(),
  bankDetails: z.object({
    routingNumber: z.string(),
    name: z.string(),
    swiftCode: z.string(),
    address: z.string(),
    city: z.string(),
    postcode: z.string()
  }),
  skipCollectTransferCharge: z.boolean(),
  cardRestricted: z.boolean(),
  overdraftLimit: z.number(),
  minRequiredBalance: z.number(),
  minBalanceForInterestCalculation: z.number(),
  minOverdraftForInterestCalculation: z.number(),
  overdraftMinimumDue: z.number(),
  currentFloatingInterestPeriod: z.object({
    fromDate: z.array(z.number()),
    interestRate: z.number(),
    isDifferentialToBLR: z.boolean()
  }),
  floatingRateName: z.string(),
  floatingRateDifferential: z.number(),
  parentAccount: z.object({
    withdrawalFeeForTransfers: z.boolean(),
    allowOverdraft: z.boolean(),
    enforceMinRequiredBalance: z.boolean(),
    withHoldTax: z.boolean(),
    isDormancyTrackingActive: z.boolean(),
    isLinkedToFloatingInterestRates: z.boolean(),
    isBaseLendingRate: z.boolean(),
    skipCollectTransferCharge: z.boolean(),
    cardRestricted: z.boolean(),
    allowPrepaidCard: z.boolean(),
    prepaidAccount: z.boolean()
  }),
  allowPrepaidCard: z.boolean(),
  prepaidAccount: z.boolean(),
  prepaidLimitAmount: z.number()
};

export const SavingAccountSchema = z.object(SavingAccountShape);

export const ListAccountsOfClientResponseShape = {
  savingsAccounts: z.array(savingsAccountsSchema)
};

export const ListAccountsOfClientResponseSchema = z.object(ListAccountsOfClientResponseShape);

export const ListAccountFilterKeySchema = z.enum([
  'showReservedAccount'
]);

export const ListAccountsRequestShape = {
  tenantId: z.string().optional(),
  showReservedAccount: z.boolean().optional().default(false)
};

export const ListAccountsRequestSchema = z.object(ListAccountsRequestShape);

export type ListAccountFilterKey = z.infer<typeof ListAccountFilterKeySchema>;
export const validateListAccountFilterKey = (key: string): ListAccountFilterKey => {
  return ListAccountFilterKeySchema.parse(key);
};
export const validateListAccountFilters = (filters: Record<string, any>): void => {
  try {
    for (const [key, value] of Object.entries(filters)) {
      // Validate filter key
      validateListAccountFilterKey(key);

      // Skip validation for undefined/null values
      if (value === undefined || value === null) continue;

      // Use Zod validation for specific fields
      switch (key) {
        case 'showReservedAccount':
          z.boolean().parse(value);
          break;
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createCommandError({
        message: `Validation error: ${error.errors.map(e => e.message).join(', ')}`,
        code: 'validation_error'
      });
    }
    throw error;
  }
};

export const UpdateAccountRequestShape = {
  clientId: z.number(),
  productId: z.number(),
  submittedOnDate: z.string(),
  nominalAnnualInterestRate: z.string(),
  minRequiredOpeningBalance: z.string(),
  lockinPeriodFrequency: z.string(),
  withdrawalFeeForTransfers: z.boolean(),
  allowOverdraft: z.boolean(),
  overdraftLimit: z.number(),
  minOverdraftForInterestCalculation: z.number(),
  enforceMinRequiredBalance: z.boolean(),
  minRequiredBalance: z.number(),
  withHoldTax: z.boolean(),
  interestCompoundingPeriodType: z.number(),
  interestPostingPeriodType: z.number(),
  interestCalculationType: z.number(),
  interestCalculationDaysInYearType: z.number(),
  fieldOfficerId: z.number(),
  lockinPeriodFrequencyType: z.number(),
  locale: z.string(),
  dateFormat: z.string(),
  monthDayFormat: z.string(),
  charges: z.array(z.any())
};
export const UpdateAccountRequestSchema = z.object(UpdateAccountRequestShape);

export type ListAccountsOfClientResponse = z.infer<typeof ListAccountsOfClientResponseSchema>;
export type ListAccountsOfClientRequest = z.infer<typeof ListAccountsRequestSchema>;
export type SavingAccount = z.infer<typeof SavingAccountSchema>;
export type UpdateAccountRequest = z.infer<typeof UpdateAccountRequestSchema>;
