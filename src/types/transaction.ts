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

// Completed Transactions Types
const locationSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postal_code: z.string().optional(),
  country: z.string().optional(),
  store_number: z.string().optional(),
  lat: z.number().optional(),
  lon: z.number().optional()
});

const enrichedTransactionDataSchema = z.object({
  id: z.string().optional(),
  merchantLogoUrl: z.string().optional(),
  merchantWebsite: z.string().optional(),
  merchantName: z.string().optional(),
  paymentChannel: z.string().optional(),
  personalFinanceCategoryIconUrl: z.string().optional(),
  personalFinanceCategory: z.string().optional(),
  personalFinanceSubCategory: z.string().optional(),
  isRecurring: z.boolean().optional(),
  merchantPhoneNumber: z.string().optional(),
  location: locationSchema.optional()
});

const completedTransactionSchema = z.object({
  id: z.number(),
  transactionType: z.object({
    id: z.number(),
    code: z.string(),
    value: z.string(),
    deposit: z.boolean().optional(),
    dividendPayout: z.boolean().optional(),
    withdrawal: z.boolean().optional(),
    interestPosting: z.boolean().optional(),
    feeDeduction: z.boolean().optional(),
    initiateTransfer: z.boolean().optional(),
    approveTransfer: z.boolean().optional(),
    withdrawTransfer: z.boolean().optional(),
    rejectTransfer: z.boolean().optional(),
    overdraftInterest: z.boolean().optional(),
    writtenoff: z.boolean().optional(),
    overdraftFee: z.boolean().optional(),
    withholdTax: z.boolean().optional(),
    escheat: z.boolean().optional(),
    amountHold: z.boolean().optional(),
    amountRelease: z.boolean().optional(),
    interestpayableAccrued: z.boolean().optional(),
    overdraftInterestReceivableAccrued: z.boolean().optional(),
    isDebit: z.boolean().optional(),
    chargeBack: z.boolean().optional(),
    isFeeReversal: z.boolean().optional()
  }),
  accountId: z.number().optional(),
  accountNo: z.string().optional(),
  enrichedTransactionData: enrichedTransactionDataSchema.optional(),
  date: z.union([z.string(), z.array(z.number())]),
  dateTime: z.string().optional(),
  currency: z.object({
    code: z.string(),
    name: z.string(),
    decimalPlaces: z.number(),
    inMultiplesOf: z.number(),
    displaySymbol: z.string(),
    nameCode: z.string(),
    displayLabel: z.string(),
    currencyCodeInDigit: z.number().optional(),
    isBaseCurrency: z.boolean().optional()
  }),
  paymentDetailData: z.object({
    id: z.number(),
    paymentType: z.object({
      id: z.number(),
      name: z.string()
    }).optional(),
    reference: z.string().optional(),
    accountNumber: z.string().optional(),
    checkNumber: z.string().optional(),
    routingCode: z.string().optional(),
    receiptNumber: z.string().optional(),
    bankNumber: z.string().optional()
  }).optional(),
  amount: z.number(),
  runningBalance: z.number(),
  accrualRunningBalance: z.number().optional(),
  interestPayableDerived: z.number().optional(),
  reversed: z.boolean(),
  submittedOnDate: z.union([z.string(), z.array(z.number())]),
  interestedPostedAsOn: z.boolean(),
  bookingDate: z.union([z.string(), z.array(z.number())]).optional(),
  submittedByUsername: z.string().optional(),
  isReversal: z.boolean().optional(),
  originalTransactionId: z.number().optional(),
  lienTransaction: z.boolean().optional(),
  releaseTransactionId: z.number().optional(),
  reasonForBlock: z.string().optional(),
  refNo: z.string().optional(),
  subTransactionType: z.string().optional(),
  status: z.string().optional(),
  isAlreadyChargeBack: z.boolean().optional(),
  initiatedAt: z.string().optional(),
  transactionReferenceId: z.string().optional(),
  createdBySystem: z.boolean().optional(),
  transfer: transferSchema.optional()
});

export const GetCompletedTransactionsResponseShape = {
  totalFilteredRecords: z.number(),
  pageItems: z.array(completedTransactionSchema)
};

export const GetCompletedTransactionsResponseSchema = z.object(GetCompletedTransactionsResponseShape);

// Sub Transaction Type Enum
export enum SubTransactionType {
  NONE = 0,
  CARD_TRANSACTION = 1,
  SETTLEMENT_RETURN_CREDIT = 2,
  LOAN_DISBURSEMENT = 3,
  LOAN_REPAYMENT = 4,
  CARD_AUTHORIZE_PAYMENT = 5,
  DOMESTIC_ATM_WITHDRAWAL_FEE = 6,
  INTERNATIONAL_ATM_WITHDRAWAL_FEE = 7,
  INTERNATIONAL_TRANSACTION_FEE = 8,
  EXTERNAL_CARD_PUSH_TRANSACTION_FEE = 9,
  EXTERNAL_CARD_PULL_TRANSACTION_FEE = 10,
  MERCHANT_CREDIT = 11,
  MERCHANT_CREDIT_REVERSAL = 12,
  MCC_CHARGE = 13,
  TRANSFER_FEE = 14,
  EXTERNAL_CARD_CHARGE_BACK = 15,
  EXTERNAL_CARD = 16,
  CREDIT_CARD_DUE_PAYMENT = 17,
  TRANSFER_RETURN_FEE = 18,
  ACH = 19,
  SWIFT = 20,
  WIRE = 21,
  OPERATIONAL_ACCOUNT_LOAN_TRANSACTION = 22,
  OPERATIONAL_ACCOUNT_SAVINGS_TRANSACTION = 23,
  SAVINGS_ACCOUNT_WAIVE_CHARGE_TRANSACTION = 24,
  DOMESTIC_ATM_WITHDRAWAL_FEE_REVERSAL = 25,
  INTERNATIONAL_ATM_WITHDRAWAL_FEE_REVERSAL = 26,
  INTERNATIONAL_TRANSACTION_FEE_REVERSAL = 27,
  FEE_OTHER = 28,
  FEE_OTHER_REVERSAL = 29
}

// Transaction Type Enum
export enum TransactionType {
  INVALID = 0,
  DEPOSIT = 1,
  WITHDRAWAL = 2,
  INTEREST_POSTING = 3,
  WITHDRAWAL_FEE = 4,
  ANNUAL_FEE = 5,
  WAIVE_CHARGES = 6,
  PAY_CHARGE = 7,
  DIVIDEND_PAYOUT = 8,
  INITIATE_TRANSFER = 12,
  APPROVE_TRANSFER = 13,
  WITHDRAW_TRANSFER = 14,
  REJECT_TRANSFER = 15,
  WRITTEN_OFF = 16,
  OVERDRAFT_INTEREST = 17,
  WITHHOLD_TAX = 18,
  ESCHEAT = 19,
  AMOUNT_HOLD = 20,
  AMOUNT_RELEASE = 21,
  INTEREST_PAYABLE_ACCRUED = 22,
  OVERDRAFT_INTEREST_RECEIVABLE_ACCRUED = 23,
  PAY_CHARGE_REVERSAL = 24,
  CHARGE_BACK = 25,
  FUNDS_ALLOCATION = 30,
  FUNDS_DEALLOCATION = 31
}

export const GetCompletedTransactionsRequestShape = {
  offset: z.number().optional(),
  limit: z.number().optional(),
  showEnrichedTransactions: z.boolean().default(true),
  subTransactionType: z.nativeEnum(SubTransactionType).optional(),
  statusType: z.string().optional(),
  transactionType: z.nativeEnum(TransactionType).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  reference: z.string().optional(),
  paymentType: z.string().optional(),
  fromAmount: z.number().optional(),
  toAmount: z.number().optional(),
  isCardTransaction: z.boolean().optional(),
  showInterestAccruals: z.boolean().default(false).optional(),
  orderBy: z.string().optional(),
  sortOrder: z.string().optional(),
  getCardData: z.boolean().optional()
};

export const GetCompletedTransactionsRequestSchema = z.object(GetCompletedTransactionsRequestShape);

export type GetCompletedTransactionsResponse = z.infer<typeof GetCompletedTransactionsResponseSchema>;
export type GetCompletedTransactionsRequest = z.infer<typeof GetCompletedTransactionsRequestSchema>;
export type CompletedTransaction = z.infer<typeof completedTransactionSchema>;
