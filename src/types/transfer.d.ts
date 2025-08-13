export type PaymentRail = 'ACH' | 'SAMEDAYACH';
export type PaymentType = 'CREDIT' | 'DEBIT';
export type AccountType = 'CHECKING' | 'SAVINGS';

export interface Transfer {
  type: string;
  paymentType: PaymentRail;
  paymentSubType?: string;
  currency: string;
  fileUrl?: string;
  amount: number;
  externalId: string;
  reference: Array<string>;
  rawPaymentDetails?: any;
  statementDescription?: string;
  settlementDate?: string;
  errorCode?: string;
  errorMessage?: string;
  createdAt?: string;
  client?: {
    id: number,
    accountNo: string,
    displayName: string,
    legalForm: {
      code: string,
      value: string
    },
    identifiers: Array<any>,
    ofLoanCycle: number,
    ofLoanActive: number,
    activeDepositAccount: number
  }
}

export interface GetTransferInput {
  transferStatus?: string;
  executedAt: string;
  queryLimit?: number;
  paymentType: PaymentRail;
  tenantId?: string;
  accountType?: string;
}

export type CreateTransferInput = {
  type: PaymentType;
  fileUrl: string;
  paymentType: PaymentRail;
  currency: 'USD';
  amount: number;
  debtor: {
    identifier: string;
    name: string;
    accountType: AccountType;
  };
  creditor: {
    identifier: string;
    name: string;
    accountType: AccountType;
    agent: {
      name: string;
      identifier: string;
    };
  };
  reference: string[];
};

export interface TransferResponse {
  totalFilteredRecords: number;
  pageItems: Array<Transfer>;
}

export interface MarkAsReturnInput {
  paymentType: PaymentRail;
  externalId: string,
  returnFileUrl: string,
  errorCode: string,
  errorMessage: string,
  returnDate?: string,
  traceNumbers?: {
    incomingReturnFile?: string;
    outgoingReturnFile?: string;
  },
  rawReturnDetails?: any;
  tenantId?: string;
}

export interface UpdateTraceNumbersInput {
  externalId: string;
  traceNumbers: {
    traceMapping: string,
    CoreFileKey?: string,
    CoreBatch?: number,
    CoreSeq?: number,
  },
  tenantId?: string
}

export interface ProcessOutput {
  id: string;
  clientId: number;
  resourceId: number;
  resourceIdentifier: string;
}

export interface CreateTransferOutput extends ProcessOutput {
  data: { amount: number }
}
