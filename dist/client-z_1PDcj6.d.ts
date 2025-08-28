import { DocumentNode } from 'graphql';
import { AxiosInstance } from 'axios';
import z__default, { z } from 'zod';

interface Config {
  credential?: Credential;
  secret?: string;
  baseUrl: string;
  tenantId: string;
  signee?: string;
  bearerToken?: string;
  graphqlPath?: string;
  middlewares?: Middleware[];
  logger?: (instance: AxiosInstance) => void;
  traceId?: string;
  axiosConfig?: {
    timeout?: number;
    headers?: Record<string, string>;
    keepAlive?: boolean;
  };
}

interface Credential {
  client_secret: string,
  grant_type: string,
  client_id: string,
  username: string,
  password: string
}

interface Middleware {
  before?: (command: Command<any, any>) => Promise<void>;
  after?: (command: Command<any, any>, response: any) => Promise<void>;
  onError?: (command: Command<any, any>, error: Error) => Promise<void>;
}

interface Command<TInput, TOutput> {
  input: TInput;
  metadata: {
    commandName: string;
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  };
  execute: (config: Config) => Promise<TOutput | undefined>;
}

interface GraphQLRequest {
  command: string | DocumentNode;
  tenantId?: string;
  variables?: any;
  operationName?: string;
}

type PaymentRail = 'ACH' | 'SAMEDAYACH';
type PaymentType$1 = 'CREDIT' | 'DEBIT';
type AccountType = 'CHECKING' | 'SAVINGS';

interface RawPaymentDetails {
  [key: string]: string | number | boolean;
}

interface ClientIdentifier {
  type: string;
  value: string;
}

interface Transfer {
  type: string;
  paymentType: PaymentRail;
  paymentSubType?: string;
  currency: string;
  fileUrl?: string;
  amount: number;
  externalId: string;
  reference: Array<string>;
  rawPaymentDetails?: RawPaymentDetails;
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
    identifiers: Array<ClientIdentifier>,
    ofLoanCycle: number,
    ofLoanActive: number,
    activeDepositAccount: number
  }
}

interface GetTransferInput {
  transferStatus?: string;
  executedAt: string;
  queryLimit?: number;
  paymentType: PaymentRail;
  tenantId?: string;
  accountType?: string;
}

type CreateTransferInput = {
  type: PaymentType$1;
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

interface MarkAsReturnInput {
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
  rawReturnDetails?: RawPaymentDetails;
  tenantId?: string;
}

interface UpdateTraceNumbersInput {
  externalId: string;
  traceNumbers: {
    traceMapping: string,
    CoreFileKey?: string,
    CoreBatch?: number,
    CoreSeq?: number,
  },
  tenantId?: string
}

interface ProcessOutput {
  id: string;
  clientId: number;
  resourceId: number;
  resourceIdentifier: string;
}

interface CreateTransferOutput extends ProcessOutput {
  data: { amount: number }
}

declare const PaymentFilterKeySchema: z.ZodEnum<["originatorName", "originatorAccount", "originatorBankRoutingCode", "recipientName", "recipientAccount", "recipientBankRoutingCode", "reference", "traceNumber", "externalId", "clientId", "dateFormat", "locale", "originatedBy", "paymentRail", "paymentType", "fromValueDate", "toValueDate", "fromExecuteDate", "toExecuteDate", "status", "fromReturnDate", "toReturnDate", "isSettlement", "orderBy", "sortOrder"]>;
declare const PaymentStatusSchema: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
declare const PaymentRailSchema: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
declare const PaymentTypeSchema: z.ZodEnum<["CREDIT", "DEBIT"]>;
declare const SortOrderSchema: z.ZodEnum<["ASC", "DESC"]>;
type PaymentStatus = z.infer<typeof PaymentStatusSchema>;
type PaymentRailType = z.infer<typeof PaymentRailSchema>;
type PaymentType = z.infer<typeof PaymentTypeSchema>;
declare const PaymentFilterShape: {
    originatorName: z.ZodOptional<z.ZodString>;
    originatorAccount: z.ZodOptional<z.ZodString>;
    originatorBankRoutingCode: z.ZodOptional<z.ZodString>;
    recipientName: z.ZodOptional<z.ZodString>;
    recipientAccount: z.ZodOptional<z.ZodString>;
    recipientBankRoutingCode: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodString>;
    traceNumber: z.ZodOptional<z.ZodString>;
    externalId: z.ZodOptional<z.ZodString>;
    clientId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    dateFormat: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodString>;
    originatedBy: z.ZodOptional<z.ZodString>;
    paymentRail: z.ZodOptional<z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>>;
    paymentType: z.ZodOptional<z.ZodEnum<["CREDIT", "DEBIT"]>>;
    fromValueDate: z.ZodOptional<z.ZodString>;
    toValueDate: z.ZodOptional<z.ZodString>;
    fromExecuteDate: z.ZodOptional<z.ZodString>;
    toExecuteDate: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
    fromReturnDate: z.ZodOptional<z.ZodString>;
    toReturnDate: z.ZodOptional<z.ZodString>;
    isSettlement: z.ZodOptional<z.ZodBoolean>;
    orderBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodEnum<["ASC", "DESC"]>>;
    limit: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
};
declare const PaymentFiltersSchema: z.ZodObject<{
    originatorName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    originatorAccount: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    originatorBankRoutingCode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    recipientName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    recipientAccount: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    recipientBankRoutingCode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    reference: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    traceNumber: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    externalId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    clientId: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    dateFormat: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    locale: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    originatedBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    paymentRail: z.ZodOptional<z.ZodOptional<z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>>>;
    paymentType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["CREDIT", "DEBIT"]>>>;
    fromValueDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    toValueDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    fromExecuteDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    toExecuteDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>>;
    fromReturnDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    toReturnDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isSettlement: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    orderBy: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodOptional<z.ZodOptional<z.ZodEnum<["ASC", "DESC"]>>>;
    limit: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    offset: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    originatorName?: string | undefined;
    originatorAccount?: string | undefined;
    originatorBankRoutingCode?: string | undefined;
    recipientName?: string | undefined;
    recipientAccount?: string | undefined;
    recipientBankRoutingCode?: string | undefined;
    reference?: string | undefined;
    traceNumber?: string | undefined;
    externalId?: string | undefined;
    clientId?: string | number | undefined;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    originatedBy?: string | undefined;
    paymentRail?: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD" | undefined;
    paymentType?: "CREDIT" | "DEBIT" | undefined;
    fromValueDate?: string | undefined;
    toValueDate?: string | undefined;
    fromExecuteDate?: string | undefined;
    toExecuteDate?: string | undefined;
    status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
    fromReturnDate?: string | undefined;
    toReturnDate?: string | undefined;
    isSettlement?: boolean | undefined;
    orderBy?: string | undefined;
    sortOrder?: "ASC" | "DESC" | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}, {
    originatorName?: string | undefined;
    originatorAccount?: string | undefined;
    originatorBankRoutingCode?: string | undefined;
    recipientName?: string | undefined;
    recipientAccount?: string | undefined;
    recipientBankRoutingCode?: string | undefined;
    reference?: string | undefined;
    traceNumber?: string | undefined;
    externalId?: string | undefined;
    clientId?: string | number | undefined;
    dateFormat?: string | undefined;
    locale?: string | undefined;
    originatedBy?: string | undefined;
    paymentRail?: "ACH" | "SAMEDAYACH" | "WIRE" | "SWIFT" | "INTERNAL" | "FXPAY" | "CARD" | undefined;
    paymentType?: "CREDIT" | "DEBIT" | undefined;
    fromValueDate?: string | undefined;
    toValueDate?: string | undefined;
    fromExecuteDate?: string | undefined;
    toExecuteDate?: string | undefined;
    status?: "DRAFT" | "AML_SCREENING" | "AML_REJECTED" | "EXECUTION_SCHEDULED" | "EXECUTION_PROCESSING" | "EXECUTION_SUCCESS" | "EXECUTION_FAILURE" | "RETURNED" | "CANCELLED" | "COMPLIANCE_FAILURE" | "DELETED" | "UNKNOWN" | undefined;
    fromReturnDate?: string | undefined;
    toReturnDate?: string | undefined;
    isSettlement?: boolean | undefined;
    orderBy?: string | undefined;
    sortOrder?: "ASC" | "DESC" | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
}>;
type PaymentFilters = z.infer<typeof PaymentFiltersSchema>;
declare const PaymentShape: {
    id: z.ZodNumber;
    clientId: z.ZodNumber;
    amount: z.ZodNumber;
    correlationId: z.ZodString;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    recipient: z.ZodObject<{
        cardId: z.ZodOptional<z.ZodString>;
        recipientType: z.ZodString;
        address: z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodString;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }>;
    originator: z.ZodObject<{
        accountId: z.ZodOptional<z.ZodString>;
        recipientType: z.ZodString;
        address: z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodString;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }>;
    executedAt: z.ZodString;
    createdAt: z.ZodString;
    externalId: z.ZodString;
    status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    currencyData: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        decimalPlaces: z.ZodNumber;
        displaySymbol: z.ZodString;
        nameCode: z.ZodString;
        currencyCodeInDigit: z.ZodNumber;
        isBaseCurrency: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }>;
    currency: z.ZodString;
};
declare const PaymentSchema: z.ZodObject<{
    id: z.ZodNumber;
    clientId: z.ZodNumber;
    amount: z.ZodNumber;
    correlationId: z.ZodString;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    recipient: z.ZodObject<{
        cardId: z.ZodOptional<z.ZodString>;
        recipientType: z.ZodString;
        address: z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodString;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }>;
    originator: z.ZodObject<{
        accountId: z.ZodOptional<z.ZodString>;
        recipientType: z.ZodString;
        address: z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodString;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }>;
    executedAt: z.ZodString;
    createdAt: z.ZodString;
    externalId: z.ZodString;
    status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    currencyData: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        decimalPlaces: z.ZodNumber;
        displaySymbol: z.ZodString;
        nameCode: z.ZodString;
        currencyCodeInDigit: z.ZodNumber;
        isBaseCurrency: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }>;
    currency: z.ZodString;
}, "strip", z.ZodAny, z.objectOutputType<{
    id: z.ZodNumber;
    clientId: z.ZodNumber;
    amount: z.ZodNumber;
    correlationId: z.ZodString;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    recipient: z.ZodObject<{
        cardId: z.ZodOptional<z.ZodString>;
        recipientType: z.ZodString;
        address: z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodString;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }>;
    originator: z.ZodObject<{
        accountId: z.ZodOptional<z.ZodString>;
        recipientType: z.ZodString;
        address: z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodString;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }>;
    executedAt: z.ZodString;
    createdAt: z.ZodString;
    externalId: z.ZodString;
    status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    currencyData: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        decimalPlaces: z.ZodNumber;
        displaySymbol: z.ZodString;
        nameCode: z.ZodString;
        currencyCodeInDigit: z.ZodNumber;
        isBaseCurrency: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }>;
    currency: z.ZodString;
}, z.ZodAny, "strip">, z.objectInputType<{
    id: z.ZodNumber;
    clientId: z.ZodNumber;
    amount: z.ZodNumber;
    correlationId: z.ZodString;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    recipient: z.ZodObject<{
        cardId: z.ZodOptional<z.ZodString>;
        recipientType: z.ZodString;
        address: z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodString;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        cardId?: string | undefined;
    }>;
    originator: z.ZodObject<{
        accountId: z.ZodOptional<z.ZodString>;
        recipientType: z.ZodString;
        address: z.ZodObject<{
            line1: z.ZodOptional<z.ZodString>;
            line2: z.ZodOptional<z.ZodString>;
            stateCode: z.ZodOptional<z.ZodString>;
            countryCode: z.ZodString;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }, {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        }>;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }, {
        recipientType: string;
        address: {
            countryCode: string;
            line1?: string | undefined;
            line2?: string | undefined;
            stateCode?: string | undefined;
            postalCode?: string | undefined;
        };
        name: string;
        accountId?: string | undefined;
    }>;
    executedAt: z.ZodString;
    createdAt: z.ZodString;
    externalId: z.ZodString;
    status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    currencyData: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        decimalPlaces: z.ZodNumber;
        displaySymbol: z.ZodString;
        nameCode: z.ZodString;
        currencyCodeInDigit: z.ZodNumber;
        isBaseCurrency: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        currencyCodeInDigit: number;
        isBaseCurrency: boolean;
    }>;
    currency: z.ZodString;
}, z.ZodAny, "strip">>;
declare const CreatePaymentInputShape: {
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
};
declare const CreatePaymentInputSchema: z.ZodEffects<z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodAny, z.objectOutputType<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>, z.objectOutputType<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">, z.objectInputType<{
    amount: z.ZodNumber;
    currency: z.ZodString;
    paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
    paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
    debtor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    creditor: z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>;
    clientId: z.ZodOptional<z.ZodString>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        identifier: z.ZodString;
        accountType: z.ZodOptional<z.ZodEnum<["CHECKING", "SAVINGS"]>>;
        address: z.ZodOptional<z.ZodObject<{
            streetAddress: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            postalCode: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }, {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        }>>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                streetAddress: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }, {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name: string;
        identifier: string;
        address?: {
            postalCode?: string | undefined;
            streetAddress?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            country?: string | undefined;
        } | undefined;
        accountType?: "CHECKING" | "SAVINGS" | undefined;
        agent?: {
            address?: {
                postalCode?: string | undefined;
                streetAddress?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                country?: string | undefined;
            } | undefined;
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    chargeBearer: z.ZodOptional<z.ZodEnum<["OUR", "BEN", "SHA"]>>;
    purposeCode: z.ZodOptional<z.ZodString>;
    valueDate: z.ZodOptional<z.ZodString>;
    executionDate: z.ZodOptional<z.ZodString>;
}, z.ZodAny, "strip">>;
declare const UpdatePaymentInputShape: {
    amount: z.ZodOptional<z.ZodNumber>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    debtor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
};
declare const UpdatePaymentInputSchema: z.ZodObject<{
    amount: z.ZodOptional<z.ZodNumber>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    debtor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
}, "strip", z.ZodAny, z.objectOutputType<{
    amount: z.ZodOptional<z.ZodNumber>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    debtor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
}, z.ZodAny, "strip">, z.objectInputType<{
    amount: z.ZodOptional<z.ZodNumber>;
    correspondent: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
    }>>;
    creditor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    debtor: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        identifier: z.ZodOptional<z.ZodString>;
        accountType: z.ZodOptional<z.ZodString>;
        agent: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            identifier: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            identifier?: string | undefined;
        }, {
            name?: string | undefined;
            identifier?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        identifier?: string | undefined;
        accountType?: string | undefined;
        agent?: {
            name?: string | undefined;
            identifier?: string | undefined;
        } | undefined;
    }>>;
    exchangeRate: z.ZodOptional<z.ZodNumber>;
    externalId: z.ZodOptional<z.ZodString>;
    errorCode: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>>;
}, z.ZodAny, "strip">>;
declare const PaymentResponseSchema: z.ZodObject<{
    totalFilteredRecords: z.ZodNumber;
    pageItems: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        clientId: z.ZodNumber;
        amount: z.ZodNumber;
        correlationId: z.ZodString;
        paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
        paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
        recipient: z.ZodObject<{
            cardId: z.ZodOptional<z.ZodString>;
            recipientType: z.ZodString;
            address: z.ZodObject<{
                line1: z.ZodOptional<z.ZodString>;
                line2: z.ZodOptional<z.ZodString>;
                stateCode: z.ZodOptional<z.ZodString>;
                countryCode: z.ZodString;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }>;
        originator: z.ZodObject<{
            accountId: z.ZodOptional<z.ZodString>;
            recipientType: z.ZodString;
            address: z.ZodObject<{
                line1: z.ZodOptional<z.ZodString>;
                line2: z.ZodOptional<z.ZodString>;
                stateCode: z.ZodOptional<z.ZodString>;
                countryCode: z.ZodString;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }>;
        executedAt: z.ZodString;
        createdAt: z.ZodString;
        externalId: z.ZodString;
        status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
        paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        currencyData: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            currencyCodeInDigit: z.ZodNumber;
            isBaseCurrency: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }>;
        currency: z.ZodString;
    }, "strip", z.ZodAny, z.objectOutputType<{
        id: z.ZodNumber;
        clientId: z.ZodNumber;
        amount: z.ZodNumber;
        correlationId: z.ZodString;
        paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
        paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
        recipient: z.ZodObject<{
            cardId: z.ZodOptional<z.ZodString>;
            recipientType: z.ZodString;
            address: z.ZodObject<{
                line1: z.ZodOptional<z.ZodString>;
                line2: z.ZodOptional<z.ZodString>;
                stateCode: z.ZodOptional<z.ZodString>;
                countryCode: z.ZodString;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }>;
        originator: z.ZodObject<{
            accountId: z.ZodOptional<z.ZodString>;
            recipientType: z.ZodString;
            address: z.ZodObject<{
                line1: z.ZodOptional<z.ZodString>;
                line2: z.ZodOptional<z.ZodString>;
                stateCode: z.ZodOptional<z.ZodString>;
                countryCode: z.ZodString;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }>;
        executedAt: z.ZodString;
        createdAt: z.ZodString;
        externalId: z.ZodString;
        status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
        paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        currencyData: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            currencyCodeInDigit: z.ZodNumber;
            isBaseCurrency: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }>;
        currency: z.ZodString;
    }, z.ZodAny, "strip">, z.objectInputType<{
        id: z.ZodNumber;
        clientId: z.ZodNumber;
        amount: z.ZodNumber;
        correlationId: z.ZodString;
        paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
        paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
        recipient: z.ZodObject<{
            cardId: z.ZodOptional<z.ZodString>;
            recipientType: z.ZodString;
            address: z.ZodObject<{
                line1: z.ZodOptional<z.ZodString>;
                line2: z.ZodOptional<z.ZodString>;
                stateCode: z.ZodOptional<z.ZodString>;
                countryCode: z.ZodString;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }>;
        originator: z.ZodObject<{
            accountId: z.ZodOptional<z.ZodString>;
            recipientType: z.ZodString;
            address: z.ZodObject<{
                line1: z.ZodOptional<z.ZodString>;
                line2: z.ZodOptional<z.ZodString>;
                stateCode: z.ZodOptional<z.ZodString>;
                countryCode: z.ZodString;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }>;
        executedAt: z.ZodString;
        createdAt: z.ZodString;
        externalId: z.ZodString;
        status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
        paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        currencyData: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            currencyCodeInDigit: z.ZodNumber;
            isBaseCurrency: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }>;
        currency: z.ZodString;
    }, z.ZodAny, "strip">>, "many">;
}, "strip", z.ZodTypeAny, {
    totalFilteredRecords: number;
    pageItems: z.objectOutputType<{
        id: z.ZodNumber;
        clientId: z.ZodNumber;
        amount: z.ZodNumber;
        correlationId: z.ZodString;
        paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
        paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
        recipient: z.ZodObject<{
            cardId: z.ZodOptional<z.ZodString>;
            recipientType: z.ZodString;
            address: z.ZodObject<{
                line1: z.ZodOptional<z.ZodString>;
                line2: z.ZodOptional<z.ZodString>;
                stateCode: z.ZodOptional<z.ZodString>;
                countryCode: z.ZodString;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }>;
        originator: z.ZodObject<{
            accountId: z.ZodOptional<z.ZodString>;
            recipientType: z.ZodString;
            address: z.ZodObject<{
                line1: z.ZodOptional<z.ZodString>;
                line2: z.ZodOptional<z.ZodString>;
                stateCode: z.ZodOptional<z.ZodString>;
                countryCode: z.ZodString;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }>;
        executedAt: z.ZodString;
        createdAt: z.ZodString;
        externalId: z.ZodString;
        status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
        paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        currencyData: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            currencyCodeInDigit: z.ZodNumber;
            isBaseCurrency: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }>;
        currency: z.ZodString;
    }, z.ZodAny, "strip">[];
}, {
    totalFilteredRecords: number;
    pageItems: z.objectInputType<{
        id: z.ZodNumber;
        clientId: z.ZodNumber;
        amount: z.ZodNumber;
        correlationId: z.ZodString;
        paymentType: z.ZodEnum<["CREDIT", "DEBIT"]>;
        paymentRail: z.ZodEnum<["ACH", "SAMEDAYACH", "WIRE", "SWIFT", "INTERNAL", "FXPAY", "CARD"]>;
        recipient: z.ZodObject<{
            cardId: z.ZodOptional<z.ZodString>;
            recipientType: z.ZodString;
            address: z.ZodObject<{
                line1: z.ZodOptional<z.ZodString>;
                line2: z.ZodOptional<z.ZodString>;
                stateCode: z.ZodOptional<z.ZodString>;
                countryCode: z.ZodString;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            cardId?: string | undefined;
        }>;
        originator: z.ZodObject<{
            accountId: z.ZodOptional<z.ZodString>;
            recipientType: z.ZodString;
            address: z.ZodObject<{
                line1: z.ZodOptional<z.ZodString>;
                line2: z.ZodOptional<z.ZodString>;
                stateCode: z.ZodOptional<z.ZodString>;
                countryCode: z.ZodString;
                postalCode: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }, {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            }>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }, {
            recipientType: string;
            address: {
                countryCode: string;
                line1?: string | undefined;
                line2?: string | undefined;
                stateCode?: string | undefined;
                postalCode?: string | undefined;
            };
            name: string;
            accountId?: string | undefined;
        }>;
        executedAt: z.ZodString;
        createdAt: z.ZodString;
        externalId: z.ZodString;
        status: z.ZodEnum<["DRAFT", "AML_SCREENING", "AML_REJECTED", "EXECUTION_SCHEDULED", "EXECUTION_PROCESSING", "EXECUTION_SUCCESS", "EXECUTION_FAILURE", "RETURNED", "CANCELLED", "COMPLIANCE_FAILURE", "DELETED", "UNKNOWN"]>;
        paymentRailMetaData: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        currencyData: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            currencyCodeInDigit: z.ZodNumber;
            isBaseCurrency: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            currencyCodeInDigit: number;
            isBaseCurrency: boolean;
        }>;
        currency: z.ZodString;
    }, z.ZodAny, "strip">[];
}>;
type Payment = z.infer<typeof PaymentSchema>;
type CreatePaymentInput = z.infer<typeof CreatePaymentInputSchema>;
type UpdatePaymentInput = z.infer<typeof UpdatePaymentInputSchema>;
type PaymentResponse = z.infer<typeof PaymentResponseSchema>;

declare const SavingAccountShape: {
    id: z.ZodNumber;
    accountNo: z.ZodString;
    depositType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    clientId: z.ZodNumber;
    clientName: z.ZodString;
    savingsProductId: z.ZodNumber;
    savingsProductName: z.ZodString;
    fieldOfficerId: z.ZodNumber;
    status: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
        submittedAndPendingApproval: z.ZodBoolean;
        approved: z.ZodBoolean;
        rejected: z.ZodBoolean;
        withdrawnByApplicant: z.ZodBoolean;
        active: z.ZodBoolean;
        closed: z.ZodBoolean;
        prematureClosed: z.ZodBoolean;
        transferInProgress: z.ZodBoolean;
        transferOnHold: z.ZodBoolean;
        matured: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
        submittedAndPendingApproval: boolean;
        approved: boolean;
        rejected: boolean;
        withdrawnByApplicant: boolean;
        active: boolean;
        closed: boolean;
        prematureClosed: boolean;
        transferInProgress: boolean;
        transferOnHold: boolean;
        matured: boolean;
    }, {
        value: string;
        code: string;
        id: number;
        submittedAndPendingApproval: boolean;
        approved: boolean;
        rejected: boolean;
        withdrawnByApplicant: boolean;
        active: boolean;
        closed: boolean;
        prematureClosed: boolean;
        transferInProgress: boolean;
        transferOnHold: boolean;
        matured: boolean;
    }>;
    subStatus: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
        none: z.ZodBoolean;
        inactive: z.ZodBoolean;
        dormant: z.ZodBoolean;
        escheat: z.ZodBoolean;
        block: z.ZodBoolean;
        blockCredit: z.ZodBoolean;
        blockDebit: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
        none: boolean;
        inactive: boolean;
        dormant: boolean;
        escheat: boolean;
        block: boolean;
        blockCredit: boolean;
        blockDebit: boolean;
    }, {
        value: string;
        code: string;
        id: number;
        none: boolean;
        inactive: boolean;
        dormant: boolean;
        escheat: boolean;
        block: boolean;
        blockCredit: boolean;
        blockDebit: boolean;
    }>;
    timeline: z.ZodObject<{
        submittedOnDate: z.ZodArray<z.ZodNumber, "many">;
        submittedByUsername: z.ZodString;
        submittedByFirstname: z.ZodString;
        submittedByLastname: z.ZodString;
        approvedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        approvedByUsername: z.ZodOptional<z.ZodString>;
        approvedByFirstname: z.ZodOptional<z.ZodString>;
        approvedByLastname: z.ZodOptional<z.ZodString>;
        activatedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        activatedByUsername: z.ZodOptional<z.ZodString>;
        activatedByFirstname: z.ZodOptional<z.ZodString>;
        activatedByLastname: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        submittedOnDate: number[];
        submittedByUsername: string;
        submittedByFirstname: string;
        submittedByLastname: string;
        approvedOnDate?: number[] | undefined;
        approvedByUsername?: string | undefined;
        approvedByFirstname?: string | undefined;
        approvedByLastname?: string | undefined;
        activatedOnDate?: number[] | undefined;
        activatedByUsername?: string | undefined;
        activatedByFirstname?: string | undefined;
        activatedByLastname?: string | undefined;
    }, {
        submittedOnDate: number[];
        submittedByUsername: string;
        submittedByFirstname: string;
        submittedByLastname: string;
        approvedOnDate?: number[] | undefined;
        approvedByUsername?: string | undefined;
        approvedByFirstname?: string | undefined;
        approvedByLastname?: string | undefined;
        activatedOnDate?: number[] | undefined;
        activatedByUsername?: string | undefined;
        activatedByFirstname?: string | undefined;
        activatedByLastname?: string | undefined;
    }>;
    currency: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        decimalPlaces: z.ZodNumber;
        inMultiplesOf: z.ZodNumber;
        displaySymbol: z.ZodString;
        nameCode: z.ZodString;
        displayLabel: z.ZodString;
        currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
        isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    }>;
    nominalAnnualInterestRate: z.ZodNumber;
    interestCompoundingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestPostingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationDaysInYearType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    lockinPeriodFrequency: z.ZodNumber;
    lockinPeriodFrequencyType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    withdrawalFeeForTransfers: z.ZodBoolean;
    allowOverdraft: z.ZodBoolean;
    enforceMinRequiredBalance: z.ZodBoolean;
    onHoldFunds: z.ZodNumber;
    withHoldTax: z.ZodBoolean;
    lastActiveTransactionDate: z.ZodArray<z.ZodNumber, "many">;
    isDormancyTrackingActive: z.ZodBoolean;
    savingsAmountOnHold: z.ZodNumber;
    summary: z.ZodObject<{
        currency: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            inMultiplesOf: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            displayLabel: z.ZodString;
            currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
            isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }>;
        totalDeposits: z.ZodNumber;
        totalInterestEarned: z.ZodNumber;
        totalInterestPosted: z.ZodNumber;
        accountBalance: z.ZodNumber;
        totalOverdraftInterestDerived: z.ZodNumber;
        interestNotPosted: z.ZodNumber;
        lastInterestCalculationDate: z.ZodArray<z.ZodNumber, "many">;
        availableBalance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountBalance: number;
        availableBalance: number;
        totalDeposits: number;
        totalInterestEarned: number;
        totalInterestPosted: number;
        totalOverdraftInterestDerived: number;
        interestNotPosted: number;
        lastInterestCalculationDate: number[];
    }, {
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountBalance: number;
        availableBalance: number;
        totalDeposits: number;
        totalInterestEarned: number;
        totalInterestPosted: number;
        totalOverdraftInterestDerived: number;
        interestNotPosted: number;
        lastInterestCalculationDate: number[];
    }>;
    isLinkedToFloatingInterestRates: z.ZodBoolean;
    interestRateDifferential: z.ZodNumber;
    overdraftInterestRateDifferential: z.ZodNumber;
    floatingRateId: z.ZodNumber;
    isBaseLendingRate: z.ZodBoolean;
    isFloatingInterestRateCalculationAllowed: z.ZodBoolean;
    bankDetails: z.ZodObject<{
        routingNumber: z.ZodString;
        name: z.ZodString;
        swiftCode: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postcode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        name: string;
        city: string;
        routingNumber: string;
        swiftCode: string;
        postcode: string;
    }, {
        address: string;
        name: string;
        city: string;
        routingNumber: string;
        swiftCode: string;
        postcode: string;
    }>;
    skipCollectTransferCharge: z.ZodBoolean;
    cardRestricted: z.ZodBoolean;
    overdraftLimit: z.ZodNumber;
    minRequiredBalance: z.ZodNumber;
    minBalanceForInterestCalculation: z.ZodNumber;
    minOverdraftForInterestCalculation: z.ZodNumber;
    overdraftMinimumDue: z.ZodNumber;
    currentFloatingInterestPeriod: z.ZodObject<{
        fromDate: z.ZodArray<z.ZodNumber, "many">;
        interestRate: z.ZodNumber;
        isDifferentialToBLR: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        fromDate: number[];
        interestRate: number;
        isDifferentialToBLR: boolean;
    }, {
        fromDate: number[];
        interestRate: number;
        isDifferentialToBLR: boolean;
    }>;
    floatingRateName: z.ZodString;
    floatingRateDifferential: z.ZodNumber;
    parentAccount: z.ZodObject<{
        withdrawalFeeForTransfers: z.ZodBoolean;
        allowOverdraft: z.ZodBoolean;
        enforceMinRequiredBalance: z.ZodBoolean;
        withHoldTax: z.ZodBoolean;
        isDormancyTrackingActive: z.ZodBoolean;
        isLinkedToFloatingInterestRates: z.ZodBoolean;
        isBaseLendingRate: z.ZodBoolean;
        skipCollectTransferCharge: z.ZodBoolean;
        cardRestricted: z.ZodBoolean;
        allowPrepaidCard: z.ZodBoolean;
        prepaidAccount: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        allowPrepaidCard: boolean;
        withdrawalFeeForTransfers: boolean;
        allowOverdraft: boolean;
        enforceMinRequiredBalance: boolean;
        withHoldTax: boolean;
        isDormancyTrackingActive: boolean;
        isLinkedToFloatingInterestRates: boolean;
        isBaseLendingRate: boolean;
        skipCollectTransferCharge: boolean;
        cardRestricted: boolean;
        prepaidAccount: boolean;
    }, {
        allowPrepaidCard: boolean;
        withdrawalFeeForTransfers: boolean;
        allowOverdraft: boolean;
        enforceMinRequiredBalance: boolean;
        withHoldTax: boolean;
        isDormancyTrackingActive: boolean;
        isLinkedToFloatingInterestRates: boolean;
        isBaseLendingRate: boolean;
        skipCollectTransferCharge: boolean;
        cardRestricted: boolean;
        prepaidAccount: boolean;
    }>;
    allowPrepaidCard: z.ZodBoolean;
    prepaidAccount: z.ZodBoolean;
    prepaidLimitAmount: z.ZodNumber;
};
declare const SavingAccountSchema: z.ZodObject<{
    id: z.ZodNumber;
    accountNo: z.ZodString;
    depositType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    clientId: z.ZodNumber;
    clientName: z.ZodString;
    savingsProductId: z.ZodNumber;
    savingsProductName: z.ZodString;
    fieldOfficerId: z.ZodNumber;
    status: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
        submittedAndPendingApproval: z.ZodBoolean;
        approved: z.ZodBoolean;
        rejected: z.ZodBoolean;
        withdrawnByApplicant: z.ZodBoolean;
        active: z.ZodBoolean;
        closed: z.ZodBoolean;
        prematureClosed: z.ZodBoolean;
        transferInProgress: z.ZodBoolean;
        transferOnHold: z.ZodBoolean;
        matured: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
        submittedAndPendingApproval: boolean;
        approved: boolean;
        rejected: boolean;
        withdrawnByApplicant: boolean;
        active: boolean;
        closed: boolean;
        prematureClosed: boolean;
        transferInProgress: boolean;
        transferOnHold: boolean;
        matured: boolean;
    }, {
        value: string;
        code: string;
        id: number;
        submittedAndPendingApproval: boolean;
        approved: boolean;
        rejected: boolean;
        withdrawnByApplicant: boolean;
        active: boolean;
        closed: boolean;
        prematureClosed: boolean;
        transferInProgress: boolean;
        transferOnHold: boolean;
        matured: boolean;
    }>;
    subStatus: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
        none: z.ZodBoolean;
        inactive: z.ZodBoolean;
        dormant: z.ZodBoolean;
        escheat: z.ZodBoolean;
        block: z.ZodBoolean;
        blockCredit: z.ZodBoolean;
        blockDebit: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
        none: boolean;
        inactive: boolean;
        dormant: boolean;
        escheat: boolean;
        block: boolean;
        blockCredit: boolean;
        blockDebit: boolean;
    }, {
        value: string;
        code: string;
        id: number;
        none: boolean;
        inactive: boolean;
        dormant: boolean;
        escheat: boolean;
        block: boolean;
        blockCredit: boolean;
        blockDebit: boolean;
    }>;
    timeline: z.ZodObject<{
        submittedOnDate: z.ZodArray<z.ZodNumber, "many">;
        submittedByUsername: z.ZodString;
        submittedByFirstname: z.ZodString;
        submittedByLastname: z.ZodString;
        approvedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        approvedByUsername: z.ZodOptional<z.ZodString>;
        approvedByFirstname: z.ZodOptional<z.ZodString>;
        approvedByLastname: z.ZodOptional<z.ZodString>;
        activatedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        activatedByUsername: z.ZodOptional<z.ZodString>;
        activatedByFirstname: z.ZodOptional<z.ZodString>;
        activatedByLastname: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        submittedOnDate: number[];
        submittedByUsername: string;
        submittedByFirstname: string;
        submittedByLastname: string;
        approvedOnDate?: number[] | undefined;
        approvedByUsername?: string | undefined;
        approvedByFirstname?: string | undefined;
        approvedByLastname?: string | undefined;
        activatedOnDate?: number[] | undefined;
        activatedByUsername?: string | undefined;
        activatedByFirstname?: string | undefined;
        activatedByLastname?: string | undefined;
    }, {
        submittedOnDate: number[];
        submittedByUsername: string;
        submittedByFirstname: string;
        submittedByLastname: string;
        approvedOnDate?: number[] | undefined;
        approvedByUsername?: string | undefined;
        approvedByFirstname?: string | undefined;
        approvedByLastname?: string | undefined;
        activatedOnDate?: number[] | undefined;
        activatedByUsername?: string | undefined;
        activatedByFirstname?: string | undefined;
        activatedByLastname?: string | undefined;
    }>;
    currency: z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        decimalPlaces: z.ZodNumber;
        inMultiplesOf: z.ZodNumber;
        displaySymbol: z.ZodString;
        nameCode: z.ZodString;
        displayLabel: z.ZodString;
        currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
        isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    }, {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    }>;
    nominalAnnualInterestRate: z.ZodNumber;
    interestCompoundingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestPostingPeriodType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    interestCalculationDaysInYearType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    lockinPeriodFrequency: z.ZodNumber;
    lockinPeriodFrequencyType: z.ZodObject<{
        id: z.ZodNumber;
        code: z.ZodString;
        value: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        value: string;
        code: string;
        id: number;
    }, {
        value: string;
        code: string;
        id: number;
    }>;
    withdrawalFeeForTransfers: z.ZodBoolean;
    allowOverdraft: z.ZodBoolean;
    enforceMinRequiredBalance: z.ZodBoolean;
    onHoldFunds: z.ZodNumber;
    withHoldTax: z.ZodBoolean;
    lastActiveTransactionDate: z.ZodArray<z.ZodNumber, "many">;
    isDormancyTrackingActive: z.ZodBoolean;
    savingsAmountOnHold: z.ZodNumber;
    summary: z.ZodObject<{
        currency: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            inMultiplesOf: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            displayLabel: z.ZodString;
            currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
            isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }>;
        totalDeposits: z.ZodNumber;
        totalInterestEarned: z.ZodNumber;
        totalInterestPosted: z.ZodNumber;
        accountBalance: z.ZodNumber;
        totalOverdraftInterestDerived: z.ZodNumber;
        interestNotPosted: z.ZodNumber;
        lastInterestCalculationDate: z.ZodArray<z.ZodNumber, "many">;
        availableBalance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountBalance: number;
        availableBalance: number;
        totalDeposits: number;
        totalInterestEarned: number;
        totalInterestPosted: number;
        totalOverdraftInterestDerived: number;
        interestNotPosted: number;
        lastInterestCalculationDate: number[];
    }, {
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountBalance: number;
        availableBalance: number;
        totalDeposits: number;
        totalInterestEarned: number;
        totalInterestPosted: number;
        totalOverdraftInterestDerived: number;
        interestNotPosted: number;
        lastInterestCalculationDate: number[];
    }>;
    isLinkedToFloatingInterestRates: z.ZodBoolean;
    interestRateDifferential: z.ZodNumber;
    overdraftInterestRateDifferential: z.ZodNumber;
    floatingRateId: z.ZodNumber;
    isBaseLendingRate: z.ZodBoolean;
    isFloatingInterestRateCalculationAllowed: z.ZodBoolean;
    bankDetails: z.ZodObject<{
        routingNumber: z.ZodString;
        name: z.ZodString;
        swiftCode: z.ZodString;
        address: z.ZodString;
        city: z.ZodString;
        postcode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        name: string;
        city: string;
        routingNumber: string;
        swiftCode: string;
        postcode: string;
    }, {
        address: string;
        name: string;
        city: string;
        routingNumber: string;
        swiftCode: string;
        postcode: string;
    }>;
    skipCollectTransferCharge: z.ZodBoolean;
    cardRestricted: z.ZodBoolean;
    overdraftLimit: z.ZodNumber;
    minRequiredBalance: z.ZodNumber;
    minBalanceForInterestCalculation: z.ZodNumber;
    minOverdraftForInterestCalculation: z.ZodNumber;
    overdraftMinimumDue: z.ZodNumber;
    currentFloatingInterestPeriod: z.ZodObject<{
        fromDate: z.ZodArray<z.ZodNumber, "many">;
        interestRate: z.ZodNumber;
        isDifferentialToBLR: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        fromDate: number[];
        interestRate: number;
        isDifferentialToBLR: boolean;
    }, {
        fromDate: number[];
        interestRate: number;
        isDifferentialToBLR: boolean;
    }>;
    floatingRateName: z.ZodString;
    floatingRateDifferential: z.ZodNumber;
    parentAccount: z.ZodObject<{
        withdrawalFeeForTransfers: z.ZodBoolean;
        allowOverdraft: z.ZodBoolean;
        enforceMinRequiredBalance: z.ZodBoolean;
        withHoldTax: z.ZodBoolean;
        isDormancyTrackingActive: z.ZodBoolean;
        isLinkedToFloatingInterestRates: z.ZodBoolean;
        isBaseLendingRate: z.ZodBoolean;
        skipCollectTransferCharge: z.ZodBoolean;
        cardRestricted: z.ZodBoolean;
        allowPrepaidCard: z.ZodBoolean;
        prepaidAccount: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        allowPrepaidCard: boolean;
        withdrawalFeeForTransfers: boolean;
        allowOverdraft: boolean;
        enforceMinRequiredBalance: boolean;
        withHoldTax: boolean;
        isDormancyTrackingActive: boolean;
        isLinkedToFloatingInterestRates: boolean;
        isBaseLendingRate: boolean;
        skipCollectTransferCharge: boolean;
        cardRestricted: boolean;
        prepaidAccount: boolean;
    }, {
        allowPrepaidCard: boolean;
        withdrawalFeeForTransfers: boolean;
        allowOverdraft: boolean;
        enforceMinRequiredBalance: boolean;
        withHoldTax: boolean;
        isDormancyTrackingActive: boolean;
        isLinkedToFloatingInterestRates: boolean;
        isBaseLendingRate: boolean;
        skipCollectTransferCharge: boolean;
        cardRestricted: boolean;
        prepaidAccount: boolean;
    }>;
    allowPrepaidCard: z.ZodBoolean;
    prepaidAccount: z.ZodBoolean;
    prepaidLimitAmount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    clientId: number;
    status: {
        value: string;
        code: string;
        id: number;
        submittedAndPendingApproval: boolean;
        approved: boolean;
        rejected: boolean;
        withdrawnByApplicant: boolean;
        active: boolean;
        closed: boolean;
        prematureClosed: boolean;
        transferInProgress: boolean;
        transferOnHold: boolean;
        matured: boolean;
    };
    id: number;
    currency: {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    };
    accountNo: string;
    timeline: {
        submittedOnDate: number[];
        submittedByUsername: string;
        submittedByFirstname: string;
        submittedByLastname: string;
        approvedOnDate?: number[] | undefined;
        approvedByUsername?: string | undefined;
        approvedByFirstname?: string | undefined;
        approvedByLastname?: string | undefined;
        activatedOnDate?: number[] | undefined;
        activatedByUsername?: string | undefined;
        activatedByFirstname?: string | undefined;
        activatedByLastname?: string | undefined;
    };
    subStatus: {
        value: string;
        code: string;
        id: number;
        none: boolean;
        inactive: boolean;
        dormant: boolean;
        escheat: boolean;
        block: boolean;
        blockCredit: boolean;
        blockDebit: boolean;
    };
    lastActiveTransactionDate: number[];
    depositType: {
        value: string;
        code: string;
        id: number;
    };
    allowPrepaidCard: boolean;
    withdrawalFeeForTransfers: boolean;
    allowOverdraft: boolean;
    enforceMinRequiredBalance: boolean;
    withHoldTax: boolean;
    isDormancyTrackingActive: boolean;
    isLinkedToFloatingInterestRates: boolean;
    isBaseLendingRate: boolean;
    skipCollectTransferCharge: boolean;
    cardRestricted: boolean;
    prepaidAccount: boolean;
    clientName: string;
    savingsProductId: number;
    savingsProductName: string;
    fieldOfficerId: number;
    nominalAnnualInterestRate: number;
    interestCompoundingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestPostingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationDaysInYearType: {
        value: string;
        code: string;
        id: number;
    };
    lockinPeriodFrequency: number;
    lockinPeriodFrequencyType: {
        value: string;
        code: string;
        id: number;
    };
    onHoldFunds: number;
    savingsAmountOnHold: number;
    summary: {
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountBalance: number;
        availableBalance: number;
        totalDeposits: number;
        totalInterestEarned: number;
        totalInterestPosted: number;
        totalOverdraftInterestDerived: number;
        interestNotPosted: number;
        lastInterestCalculationDate: number[];
    };
    interestRateDifferential: number;
    overdraftInterestRateDifferential: number;
    floatingRateId: number;
    isFloatingInterestRateCalculationAllowed: boolean;
    bankDetails: {
        address: string;
        name: string;
        city: string;
        routingNumber: string;
        swiftCode: string;
        postcode: string;
    };
    overdraftLimit: number;
    minRequiredBalance: number;
    minBalanceForInterestCalculation: number;
    minOverdraftForInterestCalculation: number;
    overdraftMinimumDue: number;
    currentFloatingInterestPeriod: {
        fromDate: number[];
        interestRate: number;
        isDifferentialToBLR: boolean;
    };
    floatingRateName: string;
    floatingRateDifferential: number;
    parentAccount: {
        allowPrepaidCard: boolean;
        withdrawalFeeForTransfers: boolean;
        allowOverdraft: boolean;
        enforceMinRequiredBalance: boolean;
        withHoldTax: boolean;
        isDormancyTrackingActive: boolean;
        isLinkedToFloatingInterestRates: boolean;
        isBaseLendingRate: boolean;
        skipCollectTransferCharge: boolean;
        cardRestricted: boolean;
        prepaidAccount: boolean;
    };
    prepaidLimitAmount: number;
}, {
    clientId: number;
    status: {
        value: string;
        code: string;
        id: number;
        submittedAndPendingApproval: boolean;
        approved: boolean;
        rejected: boolean;
        withdrawnByApplicant: boolean;
        active: boolean;
        closed: boolean;
        prematureClosed: boolean;
        transferInProgress: boolean;
        transferOnHold: boolean;
        matured: boolean;
    };
    id: number;
    currency: {
        code: string;
        name: string;
        decimalPlaces: number;
        displaySymbol: string;
        nameCode: string;
        inMultiplesOf: number;
        displayLabel: string;
        currencyCodeInDigit?: number | undefined;
        isBaseCurrency?: boolean | undefined;
    };
    accountNo: string;
    timeline: {
        submittedOnDate: number[];
        submittedByUsername: string;
        submittedByFirstname: string;
        submittedByLastname: string;
        approvedOnDate?: number[] | undefined;
        approvedByUsername?: string | undefined;
        approvedByFirstname?: string | undefined;
        approvedByLastname?: string | undefined;
        activatedOnDate?: number[] | undefined;
        activatedByUsername?: string | undefined;
        activatedByFirstname?: string | undefined;
        activatedByLastname?: string | undefined;
    };
    subStatus: {
        value: string;
        code: string;
        id: number;
        none: boolean;
        inactive: boolean;
        dormant: boolean;
        escheat: boolean;
        block: boolean;
        blockCredit: boolean;
        blockDebit: boolean;
    };
    lastActiveTransactionDate: number[];
    depositType: {
        value: string;
        code: string;
        id: number;
    };
    allowPrepaidCard: boolean;
    withdrawalFeeForTransfers: boolean;
    allowOverdraft: boolean;
    enforceMinRequiredBalance: boolean;
    withHoldTax: boolean;
    isDormancyTrackingActive: boolean;
    isLinkedToFloatingInterestRates: boolean;
    isBaseLendingRate: boolean;
    skipCollectTransferCharge: boolean;
    cardRestricted: boolean;
    prepaidAccount: boolean;
    clientName: string;
    savingsProductId: number;
    savingsProductName: string;
    fieldOfficerId: number;
    nominalAnnualInterestRate: number;
    interestCompoundingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestPostingPeriodType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationType: {
        value: string;
        code: string;
        id: number;
    };
    interestCalculationDaysInYearType: {
        value: string;
        code: string;
        id: number;
    };
    lockinPeriodFrequency: number;
    lockinPeriodFrequencyType: {
        value: string;
        code: string;
        id: number;
    };
    onHoldFunds: number;
    savingsAmountOnHold: number;
    summary: {
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountBalance: number;
        availableBalance: number;
        totalDeposits: number;
        totalInterestEarned: number;
        totalInterestPosted: number;
        totalOverdraftInterestDerived: number;
        interestNotPosted: number;
        lastInterestCalculationDate: number[];
    };
    interestRateDifferential: number;
    overdraftInterestRateDifferential: number;
    floatingRateId: number;
    isFloatingInterestRateCalculationAllowed: boolean;
    bankDetails: {
        address: string;
        name: string;
        city: string;
        routingNumber: string;
        swiftCode: string;
        postcode: string;
    };
    overdraftLimit: number;
    minRequiredBalance: number;
    minBalanceForInterestCalculation: number;
    minOverdraftForInterestCalculation: number;
    overdraftMinimumDue: number;
    currentFloatingInterestPeriod: {
        fromDate: number[];
        interestRate: number;
        isDifferentialToBLR: boolean;
    };
    floatingRateName: string;
    floatingRateDifferential: number;
    parentAccount: {
        allowPrepaidCard: boolean;
        withdrawalFeeForTransfers: boolean;
        allowOverdraft: boolean;
        enforceMinRequiredBalance: boolean;
        withHoldTax: boolean;
        isDormancyTrackingActive: boolean;
        isLinkedToFloatingInterestRates: boolean;
        isBaseLendingRate: boolean;
        skipCollectTransferCharge: boolean;
        cardRestricted: boolean;
        prepaidAccount: boolean;
    };
    prepaidLimitAmount: number;
}>;
declare const ListAccountsOfClientResponseShape: {
    savingsAccounts: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        accountNo: z.ZodString;
        productId: z.ZodNumber;
        productName: z.ZodString;
        shortProductName: z.ZodString;
        status: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
            submittedAndPendingApproval: z.ZodBoolean;
            approved: z.ZodBoolean;
            rejected: z.ZodBoolean;
            withdrawnByApplicant: z.ZodBoolean;
            active: z.ZodBoolean;
            closed: z.ZodBoolean;
            prematureClosed: z.ZodBoolean;
            transferInProgress: z.ZodBoolean;
            transferOnHold: z.ZodBoolean;
            matured: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
            submittedAndPendingApproval: boolean;
            approved: boolean;
            rejected: boolean;
            withdrawnByApplicant: boolean;
            active: boolean;
            closed: boolean;
            prematureClosed: boolean;
            transferInProgress: boolean;
            transferOnHold: boolean;
            matured: boolean;
        }, {
            value: string;
            code: string;
            id: number;
            submittedAndPendingApproval: boolean;
            approved: boolean;
            rejected: boolean;
            withdrawnByApplicant: boolean;
            active: boolean;
            closed: boolean;
            prematureClosed: boolean;
            transferInProgress: boolean;
            transferOnHold: boolean;
            matured: boolean;
        }>;
        currency: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            inMultiplesOf: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            displayLabel: z.ZodString;
            currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
            isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }>;
        accountBalance: z.ZodNumber;
        accountType: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        timeline: z.ZodObject<{
            submittedOnDate: z.ZodArray<z.ZodNumber, "many">;
            submittedByUsername: z.ZodString;
            submittedByFirstname: z.ZodString;
            submittedByLastname: z.ZodString;
            approvedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            approvedByUsername: z.ZodOptional<z.ZodString>;
            approvedByFirstname: z.ZodOptional<z.ZodString>;
            approvedByLastname: z.ZodOptional<z.ZodString>;
            activatedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            activatedByUsername: z.ZodOptional<z.ZodString>;
            activatedByFirstname: z.ZodOptional<z.ZodString>;
            activatedByLastname: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername: string;
            submittedByFirstname: string;
            submittedByLastname: string;
            approvedOnDate?: number[] | undefined;
            approvedByUsername?: string | undefined;
            approvedByFirstname?: string | undefined;
            approvedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername: string;
            submittedByFirstname: string;
            submittedByLastname: string;
            approvedOnDate?: number[] | undefined;
            approvedByUsername?: string | undefined;
            approvedByFirstname?: string | undefined;
            approvedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        subStatus: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
            none: z.ZodBoolean;
            inactive: z.ZodBoolean;
            dormant: z.ZodBoolean;
            escheat: z.ZodBoolean;
            block: z.ZodBoolean;
            blockCredit: z.ZodBoolean;
            blockDebit: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        }, {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        }>;
        lastActiveTransactionDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        depositType: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        availableBalance: z.ZodNumber;
        allowPrepaidCard: z.ZodBoolean;
        primaryAccount: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        status: {
            value: string;
            code: string;
            id: number;
            submittedAndPendingApproval: boolean;
            approved: boolean;
            rejected: boolean;
            withdrawnByApplicant: boolean;
            active: boolean;
            closed: boolean;
            prematureClosed: boolean;
            transferInProgress: boolean;
            transferOnHold: boolean;
            matured: boolean;
        };
        id: number;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        accountNo: string;
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
        timeline: {
            submittedOnDate: number[];
            submittedByUsername: string;
            submittedByFirstname: string;
            submittedByLastname: string;
            approvedOnDate?: number[] | undefined;
            approvedByUsername?: string | undefined;
            approvedByFirstname?: string | undefined;
            approvedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        };
        subStatus: {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }, {
        status: {
            value: string;
            code: string;
            id: number;
            submittedAndPendingApproval: boolean;
            approved: boolean;
            rejected: boolean;
            withdrawnByApplicant: boolean;
            active: boolean;
            closed: boolean;
            prematureClosed: boolean;
            transferInProgress: boolean;
            transferOnHold: boolean;
            matured: boolean;
        };
        id: number;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        accountNo: string;
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
        timeline: {
            submittedOnDate: number[];
            submittedByUsername: string;
            submittedByFirstname: string;
            submittedByLastname: string;
            approvedOnDate?: number[] | undefined;
            approvedByUsername?: string | undefined;
            approvedByFirstname?: string | undefined;
            approvedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        };
        subStatus: {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }>, "many">;
};
declare const ListAccountsOfClientResponseSchema: z.ZodObject<{
    savingsAccounts: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        accountNo: z.ZodString;
        productId: z.ZodNumber;
        productName: z.ZodString;
        shortProductName: z.ZodString;
        status: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
            submittedAndPendingApproval: z.ZodBoolean;
            approved: z.ZodBoolean;
            rejected: z.ZodBoolean;
            withdrawnByApplicant: z.ZodBoolean;
            active: z.ZodBoolean;
            closed: z.ZodBoolean;
            prematureClosed: z.ZodBoolean;
            transferInProgress: z.ZodBoolean;
            transferOnHold: z.ZodBoolean;
            matured: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
            submittedAndPendingApproval: boolean;
            approved: boolean;
            rejected: boolean;
            withdrawnByApplicant: boolean;
            active: boolean;
            closed: boolean;
            prematureClosed: boolean;
            transferInProgress: boolean;
            transferOnHold: boolean;
            matured: boolean;
        }, {
            value: string;
            code: string;
            id: number;
            submittedAndPendingApproval: boolean;
            approved: boolean;
            rejected: boolean;
            withdrawnByApplicant: boolean;
            active: boolean;
            closed: boolean;
            prematureClosed: boolean;
            transferInProgress: boolean;
            transferOnHold: boolean;
            matured: boolean;
        }>;
        currency: z.ZodObject<{
            code: z.ZodString;
            name: z.ZodString;
            decimalPlaces: z.ZodNumber;
            inMultiplesOf: z.ZodNumber;
            displaySymbol: z.ZodString;
            nameCode: z.ZodString;
            displayLabel: z.ZodString;
            currencyCodeInDigit: z.ZodOptional<z.ZodNumber>;
            isBaseCurrency: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }, {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        }>;
        accountBalance: z.ZodNumber;
        accountType: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        timeline: z.ZodObject<{
            submittedOnDate: z.ZodArray<z.ZodNumber, "many">;
            submittedByUsername: z.ZodString;
            submittedByFirstname: z.ZodString;
            submittedByLastname: z.ZodString;
            approvedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            approvedByUsername: z.ZodOptional<z.ZodString>;
            approvedByFirstname: z.ZodOptional<z.ZodString>;
            approvedByLastname: z.ZodOptional<z.ZodString>;
            activatedOnDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
            activatedByUsername: z.ZodOptional<z.ZodString>;
            activatedByFirstname: z.ZodOptional<z.ZodString>;
            activatedByLastname: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername: string;
            submittedByFirstname: string;
            submittedByLastname: string;
            approvedOnDate?: number[] | undefined;
            approvedByUsername?: string | undefined;
            approvedByFirstname?: string | undefined;
            approvedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername: string;
            submittedByFirstname: string;
            submittedByLastname: string;
            approvedOnDate?: number[] | undefined;
            approvedByUsername?: string | undefined;
            approvedByFirstname?: string | undefined;
            approvedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        subStatus: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
            none: z.ZodBoolean;
            inactive: z.ZodBoolean;
            dormant: z.ZodBoolean;
            escheat: z.ZodBoolean;
            block: z.ZodBoolean;
            blockCredit: z.ZodBoolean;
            blockDebit: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        }, {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        }>;
        lastActiveTransactionDate: z.ZodOptional<z.ZodArray<z.ZodNumber, "many">>;
        depositType: z.ZodObject<{
            id: z.ZodNumber;
            code: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        availableBalance: z.ZodNumber;
        allowPrepaidCard: z.ZodBoolean;
        primaryAccount: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        status: {
            value: string;
            code: string;
            id: number;
            submittedAndPendingApproval: boolean;
            approved: boolean;
            rejected: boolean;
            withdrawnByApplicant: boolean;
            active: boolean;
            closed: boolean;
            prematureClosed: boolean;
            transferInProgress: boolean;
            transferOnHold: boolean;
            matured: boolean;
        };
        id: number;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        accountNo: string;
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
        timeline: {
            submittedOnDate: number[];
            submittedByUsername: string;
            submittedByFirstname: string;
            submittedByLastname: string;
            approvedOnDate?: number[] | undefined;
            approvedByUsername?: string | undefined;
            approvedByFirstname?: string | undefined;
            approvedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        };
        subStatus: {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }, {
        status: {
            value: string;
            code: string;
            id: number;
            submittedAndPendingApproval: boolean;
            approved: boolean;
            rejected: boolean;
            withdrawnByApplicant: boolean;
            active: boolean;
            closed: boolean;
            prematureClosed: boolean;
            transferInProgress: boolean;
            transferOnHold: boolean;
            matured: boolean;
        };
        id: number;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        accountNo: string;
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
        timeline: {
            submittedOnDate: number[];
            submittedByUsername: string;
            submittedByFirstname: string;
            submittedByLastname: string;
            approvedOnDate?: number[] | undefined;
            approvedByUsername?: string | undefined;
            approvedByFirstname?: string | undefined;
            approvedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        };
        subStatus: {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    savingsAccounts: {
        status: {
            value: string;
            code: string;
            id: number;
            submittedAndPendingApproval: boolean;
            approved: boolean;
            rejected: boolean;
            withdrawnByApplicant: boolean;
            active: boolean;
            closed: boolean;
            prematureClosed: boolean;
            transferInProgress: boolean;
            transferOnHold: boolean;
            matured: boolean;
        };
        id: number;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        accountNo: string;
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
        timeline: {
            submittedOnDate: number[];
            submittedByUsername: string;
            submittedByFirstname: string;
            submittedByLastname: string;
            approvedOnDate?: number[] | undefined;
            approvedByUsername?: string | undefined;
            approvedByFirstname?: string | undefined;
            approvedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        };
        subStatus: {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }[];
}, {
    savingsAccounts: {
        status: {
            value: string;
            code: string;
            id: number;
            submittedAndPendingApproval: boolean;
            approved: boolean;
            rejected: boolean;
            withdrawnByApplicant: boolean;
            active: boolean;
            closed: boolean;
            prematureClosed: boolean;
            transferInProgress: boolean;
            transferOnHold: boolean;
            matured: boolean;
        };
        id: number;
        currency: {
            code: string;
            name: string;
            decimalPlaces: number;
            displaySymbol: string;
            nameCode: string;
            inMultiplesOf: number;
            displayLabel: string;
            currencyCodeInDigit?: number | undefined;
            isBaseCurrency?: boolean | undefined;
        };
        accountType: {
            value: string;
            code: string;
            id: number;
        };
        accountNo: string;
        productId: number;
        productName: string;
        shortProductName: string;
        accountBalance: number;
        timeline: {
            submittedOnDate: number[];
            submittedByUsername: string;
            submittedByFirstname: string;
            submittedByLastname: string;
            approvedOnDate?: number[] | undefined;
            approvedByUsername?: string | undefined;
            approvedByFirstname?: string | undefined;
            approvedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        };
        subStatus: {
            value: string;
            code: string;
            id: number;
            none: boolean;
            inactive: boolean;
            dormant: boolean;
            escheat: boolean;
            block: boolean;
            blockCredit: boolean;
            blockDebit: boolean;
        };
        depositType: {
            value: string;
            code: string;
            id: number;
        };
        availableBalance: number;
        allowPrepaidCard: boolean;
        primaryAccount: Record<string, any>;
        lastActiveTransactionDate?: number[] | undefined;
    }[];
}>;
declare const ListAccountsRequestShape: {
    tenantId: z.ZodOptional<z.ZodString>;
    showReservedAccount: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
};
declare const ListAccountsRequestSchema: z.ZodObject<{
    tenantId: z.ZodOptional<z.ZodString>;
    showReservedAccount: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    showReservedAccount: boolean;
    tenantId?: string | undefined;
}, {
    showReservedAccount?: boolean | undefined;
    tenantId?: string | undefined;
}>;
declare const UpdateAccountRequestShape: {
    clientId: z.ZodNumber;
    productId: z.ZodNumber;
    submittedOnDate: z.ZodString;
    nominalAnnualInterestRate: z.ZodString;
    minRequiredOpeningBalance: z.ZodString;
    lockinPeriodFrequency: z.ZodString;
    withdrawalFeeForTransfers: z.ZodBoolean;
    allowOverdraft: z.ZodBoolean;
    overdraftLimit: z.ZodNumber;
    minOverdraftForInterestCalculation: z.ZodNumber;
    enforceMinRequiredBalance: z.ZodBoolean;
    minRequiredBalance: z.ZodNumber;
    withHoldTax: z.ZodBoolean;
    interestCompoundingPeriodType: z.ZodNumber;
    interestPostingPeriodType: z.ZodNumber;
    interestCalculationType: z.ZodNumber;
    interestCalculationDaysInYearType: z.ZodNumber;
    fieldOfficerId: z.ZodNumber;
    lockinPeriodFrequencyType: z.ZodNumber;
    locale: z.ZodString;
    dateFormat: z.ZodString;
    monthDayFormat: z.ZodString;
    charges: z.ZodArray<z.ZodAny, "many">;
};
declare const UpdateAccountRequestSchema: z.ZodObject<{
    clientId: z.ZodNumber;
    productId: z.ZodNumber;
    submittedOnDate: z.ZodString;
    nominalAnnualInterestRate: z.ZodString;
    minRequiredOpeningBalance: z.ZodString;
    lockinPeriodFrequency: z.ZodString;
    withdrawalFeeForTransfers: z.ZodBoolean;
    allowOverdraft: z.ZodBoolean;
    overdraftLimit: z.ZodNumber;
    minOverdraftForInterestCalculation: z.ZodNumber;
    enforceMinRequiredBalance: z.ZodBoolean;
    minRequiredBalance: z.ZodNumber;
    withHoldTax: z.ZodBoolean;
    interestCompoundingPeriodType: z.ZodNumber;
    interestPostingPeriodType: z.ZodNumber;
    interestCalculationType: z.ZodNumber;
    interestCalculationDaysInYearType: z.ZodNumber;
    fieldOfficerId: z.ZodNumber;
    lockinPeriodFrequencyType: z.ZodNumber;
    locale: z.ZodString;
    dateFormat: z.ZodString;
    monthDayFormat: z.ZodString;
    charges: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    clientId: number;
    dateFormat: string;
    locale: string;
    submittedOnDate: string;
    productId: number;
    withdrawalFeeForTransfers: boolean;
    allowOverdraft: boolean;
    enforceMinRequiredBalance: boolean;
    withHoldTax: boolean;
    fieldOfficerId: number;
    nominalAnnualInterestRate: string;
    interestCompoundingPeriodType: number;
    interestPostingPeriodType: number;
    interestCalculationType: number;
    interestCalculationDaysInYearType: number;
    lockinPeriodFrequency: string;
    lockinPeriodFrequencyType: number;
    overdraftLimit: number;
    minRequiredBalance: number;
    minOverdraftForInterestCalculation: number;
    minRequiredOpeningBalance: string;
    monthDayFormat: string;
    charges: any[];
}, {
    clientId: number;
    dateFormat: string;
    locale: string;
    submittedOnDate: string;
    productId: number;
    withdrawalFeeForTransfers: boolean;
    allowOverdraft: boolean;
    enforceMinRequiredBalance: boolean;
    withHoldTax: boolean;
    fieldOfficerId: number;
    nominalAnnualInterestRate: string;
    interestCompoundingPeriodType: number;
    interestPostingPeriodType: number;
    interestCalculationType: number;
    interestCalculationDaysInYearType: number;
    lockinPeriodFrequency: string;
    lockinPeriodFrequencyType: number;
    overdraftLimit: number;
    minRequiredBalance: number;
    minOverdraftForInterestCalculation: number;
    minRequiredOpeningBalance: string;
    monthDayFormat: string;
    charges: any[];
}>;
type ListAccountsOfClientRequest = z.infer<typeof ListAccountsRequestSchema>;
type SavingAccount = z.infer<typeof SavingAccountSchema>;
type UpdateAccountRequest = z.infer<typeof UpdateAccountRequestSchema>;

declare const CreateClientRequestSchema: z__default.ZodObject<{
    firstname: z__default.ZodString;
    middlename: z__default.ZodOptional<z__default.ZodString>;
    lastname: z__default.ZodString;
    fullname: z__default.ZodOptional<z__default.ZodString>;
    dob: z__default.ZodString;
    genderId: z__default.ZodNumber;
    locale: z__default.ZodString;
    officeId: z__default.ZodNumber;
    mobileCountryCode: z__default.ZodString;
    mobileNo: z__default.ZodString;
    emailAddress: z__default.ZodString;
    legalFormId: z__default.ZodNumber;
    externalId: z__default.ZodOptional<z__default.ZodString>;
    isOptedForMLALStatus: z__default.ZodOptional<z__default.ZodBoolean>;
    currentMLALStatus: z__default.ZodOptional<z__default.ZodString>;
    isStaff: z__default.ZodOptional<z__default.ZodBoolean>;
    staffId: z__default.ZodOptional<z__default.ZodNumber>;
    clientClassificationId: z__default.ZodOptional<z__default.ZodNumber>;
    savingsProductId: z__default.ZodOptional<z__default.ZodNumber>;
    active: z__default.ZodOptional<z__default.ZodBoolean>;
    dateFormat: z__default.ZodString;
    activationDate: z__default.ZodOptional<z__default.ZodString>;
    submittedOnDate: z__default.ZodString;
    dateOfBirth: z__default.ZodString;
}, "strip", z__default.ZodAny, z__default.objectOutputType<{
    firstname: z__default.ZodString;
    middlename: z__default.ZodOptional<z__default.ZodString>;
    lastname: z__default.ZodString;
    fullname: z__default.ZodOptional<z__default.ZodString>;
    dob: z__default.ZodString;
    genderId: z__default.ZodNumber;
    locale: z__default.ZodString;
    officeId: z__default.ZodNumber;
    mobileCountryCode: z__default.ZodString;
    mobileNo: z__default.ZodString;
    emailAddress: z__default.ZodString;
    legalFormId: z__default.ZodNumber;
    externalId: z__default.ZodOptional<z__default.ZodString>;
    isOptedForMLALStatus: z__default.ZodOptional<z__default.ZodBoolean>;
    currentMLALStatus: z__default.ZodOptional<z__default.ZodString>;
    isStaff: z__default.ZodOptional<z__default.ZodBoolean>;
    staffId: z__default.ZodOptional<z__default.ZodNumber>;
    clientClassificationId: z__default.ZodOptional<z__default.ZodNumber>;
    savingsProductId: z__default.ZodOptional<z__default.ZodNumber>;
    active: z__default.ZodOptional<z__default.ZodBoolean>;
    dateFormat: z__default.ZodString;
    activationDate: z__default.ZodOptional<z__default.ZodString>;
    submittedOnDate: z__default.ZodString;
    dateOfBirth: z__default.ZodString;
}, z__default.ZodAny, "strip">, z__default.objectInputType<{
    firstname: z__default.ZodString;
    middlename: z__default.ZodOptional<z__default.ZodString>;
    lastname: z__default.ZodString;
    fullname: z__default.ZodOptional<z__default.ZodString>;
    dob: z__default.ZodString;
    genderId: z__default.ZodNumber;
    locale: z__default.ZodString;
    officeId: z__default.ZodNumber;
    mobileCountryCode: z__default.ZodString;
    mobileNo: z__default.ZodString;
    emailAddress: z__default.ZodString;
    legalFormId: z__default.ZodNumber;
    externalId: z__default.ZodOptional<z__default.ZodString>;
    isOptedForMLALStatus: z__default.ZodOptional<z__default.ZodBoolean>;
    currentMLALStatus: z__default.ZodOptional<z__default.ZodString>;
    isStaff: z__default.ZodOptional<z__default.ZodBoolean>;
    staffId: z__default.ZodOptional<z__default.ZodNumber>;
    clientClassificationId: z__default.ZodOptional<z__default.ZodNumber>;
    savingsProductId: z__default.ZodOptional<z__default.ZodNumber>;
    active: z__default.ZodOptional<z__default.ZodBoolean>;
    dateFormat: z__default.ZodString;
    activationDate: z__default.ZodOptional<z__default.ZodString>;
    submittedOnDate: z__default.ZodString;
    dateOfBirth: z__default.ZodString;
}, z__default.ZodAny, "strip">>;
declare const CreateClientResponseSchema: z__default.ZodObject<{
    clientId: z__default.ZodNumber;
    status: z__default.ZodString;
}, "strip", z__default.ZodAny, z__default.objectOutputType<{
    clientId: z__default.ZodNumber;
    status: z__default.ZodString;
}, z__default.ZodAny, "strip">, z__default.objectInputType<{
    clientId: z__default.ZodNumber;
    status: z__default.ZodString;
}, z__default.ZodAny, "strip">>;
declare const UpdateClientRequestSchema: z__default.ZodObject<{
    firstname: z__default.ZodOptional<z__default.ZodString>;
    middlename: z__default.ZodOptional<z__default.ZodString>;
    fullname: z__default.ZodOptional<z__default.ZodString>;
    genderId: z__default.ZodOptional<z__default.ZodNumber>;
    lastname: z__default.ZodOptional<z__default.ZodString>;
    occupationId: z__default.ZodOptional<z__default.ZodNumber>;
    mobileCountryCode: z__default.ZodOptional<z__default.ZodString>;
    mobileNo: z__default.ZodOptional<z__default.ZodString>;
    emailAddress: z__default.ZodOptional<z__default.ZodString>;
    externalId: z__default.ZodOptional<z__default.ZodString>;
    clientClassificationId: z__default.ZodOptional<z__default.ZodNumber>;
    dateOfBirth: z__default.ZodOptional<z__default.ZodString>;
    dateFormat: z__default.ZodOptional<z__default.ZodString>;
}, "strip", z__default.ZodAny, z__default.objectOutputType<{
    firstname: z__default.ZodOptional<z__default.ZodString>;
    middlename: z__default.ZodOptional<z__default.ZodString>;
    fullname: z__default.ZodOptional<z__default.ZodString>;
    genderId: z__default.ZodOptional<z__default.ZodNumber>;
    lastname: z__default.ZodOptional<z__default.ZodString>;
    occupationId: z__default.ZodOptional<z__default.ZodNumber>;
    mobileCountryCode: z__default.ZodOptional<z__default.ZodString>;
    mobileNo: z__default.ZodOptional<z__default.ZodString>;
    emailAddress: z__default.ZodOptional<z__default.ZodString>;
    externalId: z__default.ZodOptional<z__default.ZodString>;
    clientClassificationId: z__default.ZodOptional<z__default.ZodNumber>;
    dateOfBirth: z__default.ZodOptional<z__default.ZodString>;
    dateFormat: z__default.ZodOptional<z__default.ZodString>;
}, z__default.ZodAny, "strip">, z__default.objectInputType<{
    firstname: z__default.ZodOptional<z__default.ZodString>;
    middlename: z__default.ZodOptional<z__default.ZodString>;
    fullname: z__default.ZodOptional<z__default.ZodString>;
    genderId: z__default.ZodOptional<z__default.ZodNumber>;
    lastname: z__default.ZodOptional<z__default.ZodString>;
    occupationId: z__default.ZodOptional<z__default.ZodNumber>;
    mobileCountryCode: z__default.ZodOptional<z__default.ZodString>;
    mobileNo: z__default.ZodOptional<z__default.ZodString>;
    emailAddress: z__default.ZodOptional<z__default.ZodString>;
    externalId: z__default.ZodOptional<z__default.ZodString>;
    clientClassificationId: z__default.ZodOptional<z__default.ZodNumber>;
    dateOfBirth: z__default.ZodOptional<z__default.ZodString>;
    dateFormat: z__default.ZodOptional<z__default.ZodString>;
}, z__default.ZodAny, "strip">>;
declare const UpdateClientIdentifierRequestSchema: z__default.ZodObject<{
    documentTypeId: z__default.ZodString;
    documentKey: z__default.ZodString;
    status: z__default.ZodString;
    description: z__default.ZodOptional<z__default.ZodString>;
    issuedBy: z__default.ZodOptional<z__default.ZodString>;
    locale: z__default.ZodOptional<z__default.ZodString>;
    dateFormat: z__default.ZodOptional<z__default.ZodString>;
    expiryDate: z__default.ZodOptional<z__default.ZodString>;
    nationality: z__default.ZodOptional<z__default.ZodNumber>;
    issuedDate: z__default.ZodOptional<z__default.ZodString>;
}, "strip", z__default.ZodAny, z__default.objectOutputType<{
    documentTypeId: z__default.ZodString;
    documentKey: z__default.ZodString;
    status: z__default.ZodString;
    description: z__default.ZodOptional<z__default.ZodString>;
    issuedBy: z__default.ZodOptional<z__default.ZodString>;
    locale: z__default.ZodOptional<z__default.ZodString>;
    dateFormat: z__default.ZodOptional<z__default.ZodString>;
    expiryDate: z__default.ZodOptional<z__default.ZodString>;
    nationality: z__default.ZodOptional<z__default.ZodNumber>;
    issuedDate: z__default.ZodOptional<z__default.ZodString>;
}, z__default.ZodAny, "strip">, z__default.objectInputType<{
    documentTypeId: z__default.ZodString;
    documentKey: z__default.ZodString;
    status: z__default.ZodString;
    description: z__default.ZodOptional<z__default.ZodString>;
    issuedBy: z__default.ZodOptional<z__default.ZodString>;
    locale: z__default.ZodOptional<z__default.ZodString>;
    dateFormat: z__default.ZodOptional<z__default.ZodString>;
    expiryDate: z__default.ZodOptional<z__default.ZodString>;
    nationality: z__default.ZodOptional<z__default.ZodNumber>;
    issuedDate: z__default.ZodOptional<z__default.ZodString>;
}, z__default.ZodAny, "strip">>;
declare const UpdateClientIdentifierResponseSchema: z__default.ZodObject<{
    id: z__default.ZodNumber;
    officeId: z__default.ZodNumber;
    clientId: z__default.ZodNumber;
    resourceId: z__default.ZodNumber;
    changes: z__default.ZodRecord<z__default.ZodString, z__default.ZodAny>;
    isScheduledTransfer: z__default.ZodBoolean;
    isSkipNotification: z__default.ZodBoolean;
}, "strip", z__default.ZodAny, z__default.objectOutputType<{
    id: z__default.ZodNumber;
    officeId: z__default.ZodNumber;
    clientId: z__default.ZodNumber;
    resourceId: z__default.ZodNumber;
    changes: z__default.ZodRecord<z__default.ZodString, z__default.ZodAny>;
    isScheduledTransfer: z__default.ZodBoolean;
    isSkipNotification: z__default.ZodBoolean;
}, z__default.ZodAny, "strip">, z__default.objectInputType<{
    id: z__default.ZodNumber;
    officeId: z__default.ZodNumber;
    clientId: z__default.ZodNumber;
    resourceId: z__default.ZodNumber;
    changes: z__default.ZodRecord<z__default.ZodString, z__default.ZodAny>;
    isScheduledTransfer: z__default.ZodBoolean;
    isSkipNotification: z__default.ZodBoolean;
}, z__default.ZodAny, "strip">>;
declare const ListClientsRequestSchema: z__default.ZodObject<{
    tenantId: z__default.ZodOptional<z__default.ZodString>;
    offset: z__default.ZodOptional<z__default.ZodNumber>;
    limit: z__default.ZodOptional<z__default.ZodNumber>;
    orderBy: z__default.ZodOptional<z__default.ZodString>;
    sortOrder: z__default.ZodOptional<z__default.ZodString>;
    officeId: z__default.ZodOptional<z__default.ZodNumber>;
    displayName: z__default.ZodOptional<z__default.ZodString>;
    firstname: z__default.ZodOptional<z__default.ZodString>;
    lastname: z__default.ZodOptional<z__default.ZodString>;
    externalId: z__default.ZodOptional<z__default.ZodString>;
    orphansOnly: z__default.ZodOptional<z__default.ZodBoolean>;
    clientStatus: z__default.ZodOptional<z__default.ZodString>;
    mobileNo: z__default.ZodOptional<z__default.ZodString>;
    createdStartDate: z__default.ZodOptional<z__default.ZodString>;
    creationEndDate: z__default.ZodOptional<z__default.ZodString>;
    activatedStartDate: z__default.ZodOptional<z__default.ZodString>;
    activatedEndDate: z__default.ZodOptional<z__default.ZodString>;
    closedStartDate: z__default.ZodOptional<z__default.ZodString>;
    closedEndDate: z__default.ZodOptional<z__default.ZodString>;
}, "strip", z__default.ZodTypeAny, {
    externalId?: string | undefined;
    orderBy?: string | undefined;
    sortOrder?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    tenantId?: string | undefined;
    firstname?: string | undefined;
    lastname?: string | undefined;
    displayName?: string | undefined;
    mobileNo?: string | undefined;
    officeId?: number | undefined;
    orphansOnly?: boolean | undefined;
    clientStatus?: string | undefined;
    createdStartDate?: string | undefined;
    creationEndDate?: string | undefined;
    activatedStartDate?: string | undefined;
    activatedEndDate?: string | undefined;
    closedStartDate?: string | undefined;
    closedEndDate?: string | undefined;
}, {
    externalId?: string | undefined;
    orderBy?: string | undefined;
    sortOrder?: string | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    tenantId?: string | undefined;
    firstname?: string | undefined;
    lastname?: string | undefined;
    displayName?: string | undefined;
    mobileNo?: string | undefined;
    officeId?: number | undefined;
    orphansOnly?: boolean | undefined;
    clientStatus?: string | undefined;
    createdStartDate?: string | undefined;
    creationEndDate?: string | undefined;
    activatedStartDate?: string | undefined;
    activatedEndDate?: string | undefined;
    closedStartDate?: string | undefined;
    closedEndDate?: string | undefined;
}>;
declare const ListClientsResponseSchema: z__default.ZodObject<{
    totalFilteredRecords: z__default.ZodNumber;
    pageItems: z__default.ZodArray<z__default.ZodObject<{
        id: z__default.ZodNumber;
        accountNo: z__default.ZodString;
        status: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z__default.ZodObject<{
            active: z__default.ZodBoolean;
            mandatory: z__default.ZodBoolean;
            systemDefined: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z__default.ZodBoolean;
        activationDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        firstname: z__default.ZodString;
        lastname: z__default.ZodString;
        displayName: z__default.ZodString;
        mobileNo: z__default.ZodString;
        emailAddress: z__default.ZodString;
        dateOfBirth: z__default.ZodArray<z__default.ZodNumber, "many">;
        gender: z__default.ZodObject<{
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z__default.ZodArray<z__default.ZodAny, "many">;
        clientClassification: z__default.ZodObject<{
            id: z__default.ZodNumber;
            name: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z__default.ZodObject<{
            active: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z__default.ZodBoolean;
        skipAvs: z__default.ZodBoolean;
        officeId: z__default.ZodNumber;
        officeName: z__default.ZodString;
        imageId: z__default.ZodOptional<z__default.ZodString>;
        imagePresent: z__default.ZodOptional<z__default.ZodBoolean>;
        timeline: z__default.ZodObject<{
            submittedOnDate: z__default.ZodArray<z__default.ZodNumber, "many">;
            submittedByUsername: z__default.ZodOptional<z__default.ZodString>;
            submittedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            submittedByLastname: z__default.ZodOptional<z__default.ZodString>;
            activatedOnDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
            activatedByUsername: z__default.ZodOptional<z__default.ZodString>;
            activatedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            activatedByLastname: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z__default.ZodString;
        updatedAt: z__default.ZodString;
        isBlockExternalCardsAddition: z__default.ZodBoolean;
        clientNonPersonDetails: z__default.ZodObject<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">>;
        clientTransferOptionData: z__default.ZodObject<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">>;
        authorizations: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        mobileCountryCode: z__default.ZodString;
        clientKycStatus: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        ofLoanCycle: z__default.ZodNumber;
        ofLoanActive: z__default.ZodNumber;
        activeDepositAccount: z__default.ZodNumber;
        onBoardingStatus: z__default.ZodOptional<z__default.ZodString>;
    }, "strip", z__default.ZodAny, z__default.objectOutputType<{
        id: z__default.ZodNumber;
        accountNo: z__default.ZodString;
        status: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z__default.ZodObject<{
            active: z__default.ZodBoolean;
            mandatory: z__default.ZodBoolean;
            systemDefined: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z__default.ZodBoolean;
        activationDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        firstname: z__default.ZodString;
        lastname: z__default.ZodString;
        displayName: z__default.ZodString;
        mobileNo: z__default.ZodString;
        emailAddress: z__default.ZodString;
        dateOfBirth: z__default.ZodArray<z__default.ZodNumber, "many">;
        gender: z__default.ZodObject<{
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z__default.ZodArray<z__default.ZodAny, "many">;
        clientClassification: z__default.ZodObject<{
            id: z__default.ZodNumber;
            name: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z__default.ZodObject<{
            active: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z__default.ZodBoolean;
        skipAvs: z__default.ZodBoolean;
        officeId: z__default.ZodNumber;
        officeName: z__default.ZodString;
        imageId: z__default.ZodOptional<z__default.ZodString>;
        imagePresent: z__default.ZodOptional<z__default.ZodBoolean>;
        timeline: z__default.ZodObject<{
            submittedOnDate: z__default.ZodArray<z__default.ZodNumber, "many">;
            submittedByUsername: z__default.ZodOptional<z__default.ZodString>;
            submittedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            submittedByLastname: z__default.ZodOptional<z__default.ZodString>;
            activatedOnDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
            activatedByUsername: z__default.ZodOptional<z__default.ZodString>;
            activatedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            activatedByLastname: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z__default.ZodString;
        updatedAt: z__default.ZodString;
        isBlockExternalCardsAddition: z__default.ZodBoolean;
        clientNonPersonDetails: z__default.ZodObject<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">>;
        clientTransferOptionData: z__default.ZodObject<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">>;
        authorizations: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        mobileCountryCode: z__default.ZodString;
        clientKycStatus: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        ofLoanCycle: z__default.ZodNumber;
        ofLoanActive: z__default.ZodNumber;
        activeDepositAccount: z__default.ZodNumber;
        onBoardingStatus: z__default.ZodOptional<z__default.ZodString>;
    }, z__default.ZodAny, "strip">, z__default.objectInputType<{
        id: z__default.ZodNumber;
        accountNo: z__default.ZodString;
        status: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z__default.ZodObject<{
            active: z__default.ZodBoolean;
            mandatory: z__default.ZodBoolean;
            systemDefined: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z__default.ZodBoolean;
        activationDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        firstname: z__default.ZodString;
        lastname: z__default.ZodString;
        displayName: z__default.ZodString;
        mobileNo: z__default.ZodString;
        emailAddress: z__default.ZodString;
        dateOfBirth: z__default.ZodArray<z__default.ZodNumber, "many">;
        gender: z__default.ZodObject<{
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z__default.ZodArray<z__default.ZodAny, "many">;
        clientClassification: z__default.ZodObject<{
            id: z__default.ZodNumber;
            name: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z__default.ZodObject<{
            active: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z__default.ZodBoolean;
        skipAvs: z__default.ZodBoolean;
        officeId: z__default.ZodNumber;
        officeName: z__default.ZodString;
        imageId: z__default.ZodOptional<z__default.ZodString>;
        imagePresent: z__default.ZodOptional<z__default.ZodBoolean>;
        timeline: z__default.ZodObject<{
            submittedOnDate: z__default.ZodArray<z__default.ZodNumber, "many">;
            submittedByUsername: z__default.ZodOptional<z__default.ZodString>;
            submittedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            submittedByLastname: z__default.ZodOptional<z__default.ZodString>;
            activatedOnDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
            activatedByUsername: z__default.ZodOptional<z__default.ZodString>;
            activatedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            activatedByLastname: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z__default.ZodString;
        updatedAt: z__default.ZodString;
        isBlockExternalCardsAddition: z__default.ZodBoolean;
        clientNonPersonDetails: z__default.ZodObject<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">>;
        clientTransferOptionData: z__default.ZodObject<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">>;
        authorizations: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        mobileCountryCode: z__default.ZodString;
        clientKycStatus: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        ofLoanCycle: z__default.ZodNumber;
        ofLoanActive: z__default.ZodNumber;
        activeDepositAccount: z__default.ZodNumber;
        onBoardingStatus: z__default.ZodOptional<z__default.ZodString>;
    }, z__default.ZodAny, "strip">>, "many">;
}, "strip", z__default.ZodAny, z__default.objectOutputType<{
    totalFilteredRecords: z__default.ZodNumber;
    pageItems: z__default.ZodArray<z__default.ZodObject<{
        id: z__default.ZodNumber;
        accountNo: z__default.ZodString;
        status: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z__default.ZodObject<{
            active: z__default.ZodBoolean;
            mandatory: z__default.ZodBoolean;
            systemDefined: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z__default.ZodBoolean;
        activationDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        firstname: z__default.ZodString;
        lastname: z__default.ZodString;
        displayName: z__default.ZodString;
        mobileNo: z__default.ZodString;
        emailAddress: z__default.ZodString;
        dateOfBirth: z__default.ZodArray<z__default.ZodNumber, "many">;
        gender: z__default.ZodObject<{
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z__default.ZodArray<z__default.ZodAny, "many">;
        clientClassification: z__default.ZodObject<{
            id: z__default.ZodNumber;
            name: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z__default.ZodObject<{
            active: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z__default.ZodBoolean;
        skipAvs: z__default.ZodBoolean;
        officeId: z__default.ZodNumber;
        officeName: z__default.ZodString;
        imageId: z__default.ZodOptional<z__default.ZodString>;
        imagePresent: z__default.ZodOptional<z__default.ZodBoolean>;
        timeline: z__default.ZodObject<{
            submittedOnDate: z__default.ZodArray<z__default.ZodNumber, "many">;
            submittedByUsername: z__default.ZodOptional<z__default.ZodString>;
            submittedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            submittedByLastname: z__default.ZodOptional<z__default.ZodString>;
            activatedOnDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
            activatedByUsername: z__default.ZodOptional<z__default.ZodString>;
            activatedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            activatedByLastname: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z__default.ZodString;
        updatedAt: z__default.ZodString;
        isBlockExternalCardsAddition: z__default.ZodBoolean;
        clientNonPersonDetails: z__default.ZodObject<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">>;
        clientTransferOptionData: z__default.ZodObject<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">>;
        authorizations: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        mobileCountryCode: z__default.ZodString;
        clientKycStatus: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        ofLoanCycle: z__default.ZodNumber;
        ofLoanActive: z__default.ZodNumber;
        activeDepositAccount: z__default.ZodNumber;
        onBoardingStatus: z__default.ZodOptional<z__default.ZodString>;
    }, "strip", z__default.ZodAny, z__default.objectOutputType<{
        id: z__default.ZodNumber;
        accountNo: z__default.ZodString;
        status: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z__default.ZodObject<{
            active: z__default.ZodBoolean;
            mandatory: z__default.ZodBoolean;
            systemDefined: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z__default.ZodBoolean;
        activationDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        firstname: z__default.ZodString;
        lastname: z__default.ZodString;
        displayName: z__default.ZodString;
        mobileNo: z__default.ZodString;
        emailAddress: z__default.ZodString;
        dateOfBirth: z__default.ZodArray<z__default.ZodNumber, "many">;
        gender: z__default.ZodObject<{
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z__default.ZodArray<z__default.ZodAny, "many">;
        clientClassification: z__default.ZodObject<{
            id: z__default.ZodNumber;
            name: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z__default.ZodObject<{
            active: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z__default.ZodBoolean;
        skipAvs: z__default.ZodBoolean;
        officeId: z__default.ZodNumber;
        officeName: z__default.ZodString;
        imageId: z__default.ZodOptional<z__default.ZodString>;
        imagePresent: z__default.ZodOptional<z__default.ZodBoolean>;
        timeline: z__default.ZodObject<{
            submittedOnDate: z__default.ZodArray<z__default.ZodNumber, "many">;
            submittedByUsername: z__default.ZodOptional<z__default.ZodString>;
            submittedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            submittedByLastname: z__default.ZodOptional<z__default.ZodString>;
            activatedOnDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
            activatedByUsername: z__default.ZodOptional<z__default.ZodString>;
            activatedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            activatedByLastname: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z__default.ZodString;
        updatedAt: z__default.ZodString;
        isBlockExternalCardsAddition: z__default.ZodBoolean;
        clientNonPersonDetails: z__default.ZodObject<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">>;
        clientTransferOptionData: z__default.ZodObject<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">>;
        authorizations: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        mobileCountryCode: z__default.ZodString;
        clientKycStatus: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        ofLoanCycle: z__default.ZodNumber;
        ofLoanActive: z__default.ZodNumber;
        activeDepositAccount: z__default.ZodNumber;
        onBoardingStatus: z__default.ZodOptional<z__default.ZodString>;
    }, z__default.ZodAny, "strip">, z__default.objectInputType<{
        id: z__default.ZodNumber;
        accountNo: z__default.ZodString;
        status: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z__default.ZodObject<{
            active: z__default.ZodBoolean;
            mandatory: z__default.ZodBoolean;
            systemDefined: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z__default.ZodBoolean;
        activationDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        firstname: z__default.ZodString;
        lastname: z__default.ZodString;
        displayName: z__default.ZodString;
        mobileNo: z__default.ZodString;
        emailAddress: z__default.ZodString;
        dateOfBirth: z__default.ZodArray<z__default.ZodNumber, "many">;
        gender: z__default.ZodObject<{
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z__default.ZodArray<z__default.ZodAny, "many">;
        clientClassification: z__default.ZodObject<{
            id: z__default.ZodNumber;
            name: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z__default.ZodObject<{
            active: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z__default.ZodBoolean;
        skipAvs: z__default.ZodBoolean;
        officeId: z__default.ZodNumber;
        officeName: z__default.ZodString;
        imageId: z__default.ZodOptional<z__default.ZodString>;
        imagePresent: z__default.ZodOptional<z__default.ZodBoolean>;
        timeline: z__default.ZodObject<{
            submittedOnDate: z__default.ZodArray<z__default.ZodNumber, "many">;
            submittedByUsername: z__default.ZodOptional<z__default.ZodString>;
            submittedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            submittedByLastname: z__default.ZodOptional<z__default.ZodString>;
            activatedOnDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
            activatedByUsername: z__default.ZodOptional<z__default.ZodString>;
            activatedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            activatedByLastname: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z__default.ZodString;
        updatedAt: z__default.ZodString;
        isBlockExternalCardsAddition: z__default.ZodBoolean;
        clientNonPersonDetails: z__default.ZodObject<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">>;
        clientTransferOptionData: z__default.ZodObject<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">>;
        authorizations: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        mobileCountryCode: z__default.ZodString;
        clientKycStatus: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        ofLoanCycle: z__default.ZodNumber;
        ofLoanActive: z__default.ZodNumber;
        activeDepositAccount: z__default.ZodNumber;
        onBoardingStatus: z__default.ZodOptional<z__default.ZodString>;
    }, z__default.ZodAny, "strip">>, "many">;
}, z__default.ZodAny, "strip">, z__default.objectInputType<{
    totalFilteredRecords: z__default.ZodNumber;
    pageItems: z__default.ZodArray<z__default.ZodObject<{
        id: z__default.ZodNumber;
        accountNo: z__default.ZodString;
        status: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z__default.ZodObject<{
            active: z__default.ZodBoolean;
            mandatory: z__default.ZodBoolean;
            systemDefined: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z__default.ZodBoolean;
        activationDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        firstname: z__default.ZodString;
        lastname: z__default.ZodString;
        displayName: z__default.ZodString;
        mobileNo: z__default.ZodString;
        emailAddress: z__default.ZodString;
        dateOfBirth: z__default.ZodArray<z__default.ZodNumber, "many">;
        gender: z__default.ZodObject<{
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z__default.ZodArray<z__default.ZodAny, "many">;
        clientClassification: z__default.ZodObject<{
            id: z__default.ZodNumber;
            name: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z__default.ZodObject<{
            active: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z__default.ZodBoolean;
        skipAvs: z__default.ZodBoolean;
        officeId: z__default.ZodNumber;
        officeName: z__default.ZodString;
        imageId: z__default.ZodOptional<z__default.ZodString>;
        imagePresent: z__default.ZodOptional<z__default.ZodBoolean>;
        timeline: z__default.ZodObject<{
            submittedOnDate: z__default.ZodArray<z__default.ZodNumber, "many">;
            submittedByUsername: z__default.ZodOptional<z__default.ZodString>;
            submittedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            submittedByLastname: z__default.ZodOptional<z__default.ZodString>;
            activatedOnDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
            activatedByUsername: z__default.ZodOptional<z__default.ZodString>;
            activatedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            activatedByLastname: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z__default.ZodString;
        updatedAt: z__default.ZodString;
        isBlockExternalCardsAddition: z__default.ZodBoolean;
        clientNonPersonDetails: z__default.ZodObject<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">>;
        clientTransferOptionData: z__default.ZodObject<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">>;
        authorizations: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        mobileCountryCode: z__default.ZodString;
        clientKycStatus: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        ofLoanCycle: z__default.ZodNumber;
        ofLoanActive: z__default.ZodNumber;
        activeDepositAccount: z__default.ZodNumber;
        onBoardingStatus: z__default.ZodOptional<z__default.ZodString>;
    }, "strip", z__default.ZodAny, z__default.objectOutputType<{
        id: z__default.ZodNumber;
        accountNo: z__default.ZodString;
        status: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z__default.ZodObject<{
            active: z__default.ZodBoolean;
            mandatory: z__default.ZodBoolean;
            systemDefined: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z__default.ZodBoolean;
        activationDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        firstname: z__default.ZodString;
        lastname: z__default.ZodString;
        displayName: z__default.ZodString;
        mobileNo: z__default.ZodString;
        emailAddress: z__default.ZodString;
        dateOfBirth: z__default.ZodArray<z__default.ZodNumber, "many">;
        gender: z__default.ZodObject<{
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z__default.ZodArray<z__default.ZodAny, "many">;
        clientClassification: z__default.ZodObject<{
            id: z__default.ZodNumber;
            name: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z__default.ZodObject<{
            active: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z__default.ZodBoolean;
        skipAvs: z__default.ZodBoolean;
        officeId: z__default.ZodNumber;
        officeName: z__default.ZodString;
        imageId: z__default.ZodOptional<z__default.ZodString>;
        imagePresent: z__default.ZodOptional<z__default.ZodBoolean>;
        timeline: z__default.ZodObject<{
            submittedOnDate: z__default.ZodArray<z__default.ZodNumber, "many">;
            submittedByUsername: z__default.ZodOptional<z__default.ZodString>;
            submittedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            submittedByLastname: z__default.ZodOptional<z__default.ZodString>;
            activatedOnDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
            activatedByUsername: z__default.ZodOptional<z__default.ZodString>;
            activatedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            activatedByLastname: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z__default.ZodString;
        updatedAt: z__default.ZodString;
        isBlockExternalCardsAddition: z__default.ZodBoolean;
        clientNonPersonDetails: z__default.ZodObject<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">>;
        clientTransferOptionData: z__default.ZodObject<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">>;
        authorizations: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        mobileCountryCode: z__default.ZodString;
        clientKycStatus: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        ofLoanCycle: z__default.ZodNumber;
        ofLoanActive: z__default.ZodNumber;
        activeDepositAccount: z__default.ZodNumber;
        onBoardingStatus: z__default.ZodOptional<z__default.ZodString>;
    }, z__default.ZodAny, "strip">, z__default.objectInputType<{
        id: z__default.ZodNumber;
        accountNo: z__default.ZodString;
        status: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        subStatus: z__default.ZodObject<{
            active: z__default.ZodBoolean;
            mandatory: z__default.ZodBoolean;
            systemDefined: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }, {
            active: boolean;
            mandatory: boolean;
            systemDefined: boolean;
        }>;
        active: z__default.ZodBoolean;
        activationDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        firstname: z__default.ZodString;
        lastname: z__default.ZodString;
        displayName: z__default.ZodString;
        mobileNo: z__default.ZodString;
        emailAddress: z__default.ZodString;
        dateOfBirth: z__default.ZodArray<z__default.ZodNumber, "many">;
        gender: z__default.ZodObject<{
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
        }, {
            id: number;
        }>;
        clientTypes: z__default.ZodArray<z__default.ZodAny, "many">;
        clientClassification: z__default.ZodObject<{
            id: z__default.ZodNumber;
            name: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            id: number;
            name?: string | undefined;
        }, {
            id: number;
            name?: string | undefined;
        }>;
        occupation: z__default.ZodObject<{
            active: z__default.ZodBoolean;
        }, "strip", z__default.ZodTypeAny, {
            active: boolean;
        }, {
            active: boolean;
        }>;
        isStaff: z__default.ZodBoolean;
        skipAvs: z__default.ZodBoolean;
        officeId: z__default.ZodNumber;
        officeName: z__default.ZodString;
        imageId: z__default.ZodOptional<z__default.ZodString>;
        imagePresent: z__default.ZodOptional<z__default.ZodBoolean>;
        timeline: z__default.ZodObject<{
            submittedOnDate: z__default.ZodArray<z__default.ZodNumber, "many">;
            submittedByUsername: z__default.ZodOptional<z__default.ZodString>;
            submittedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            submittedByLastname: z__default.ZodOptional<z__default.ZodString>;
            activatedOnDate: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
            activatedByUsername: z__default.ZodOptional<z__default.ZodString>;
            activatedByFirstname: z__default.ZodOptional<z__default.ZodString>;
            activatedByLastname: z__default.ZodOptional<z__default.ZodString>;
        }, "strip", z__default.ZodTypeAny, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }, {
            submittedOnDate: number[];
            submittedByUsername?: string | undefined;
            submittedByFirstname?: string | undefined;
            submittedByLastname?: string | undefined;
            activatedOnDate?: number[] | undefined;
            activatedByUsername?: string | undefined;
            activatedByFirstname?: string | undefined;
            activatedByLastname?: string | undefined;
        }>;
        legalForm: z__default.ZodObject<{
            id: z__default.ZodNumber;
            code: z__default.ZodString;
            value: z__default.ZodString;
        }, "strip", z__default.ZodTypeAny, {
            value: string;
            code: string;
            id: number;
        }, {
            value: string;
            code: string;
            id: number;
        }>;
        clientVerificationStatus: z__default.ZodString;
        updatedAt: z__default.ZodString;
        isBlockExternalCardsAddition: z__default.ZodBoolean;
        clientNonPersonDetails: z__default.ZodObject<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            constitution: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            mainBusinessLine: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
            countryOfIncorporation: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        }, z__default.ZodAny, "strip">>;
        clientTransferOptionData: z__default.ZodObject<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, "strip", z__default.ZodAny, z__default.objectOutputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">, z__default.objectInputType<{
            isExternalCardDebitDisable: z__default.ZodBoolean;
            isExternalCardCreditDisable: z__default.ZodBoolean;
            isAchDebitOutgoingDisable: z__default.ZodBoolean;
            isAchCreditOutgoingDisable: z__default.ZodBoolean;
            isAchDebitIncomingDisable: z__default.ZodBoolean;
            isAchCreditIncomingDisable: z__default.ZodBoolean;
            isInternalCreditDisable: z__default.ZodBoolean;
            isInternalDebitDisable: z__default.ZodBoolean;
            isWireCreditOutgoingDisable: z__default.ZodBoolean;
            isWireCreditIncomingDisable: z__default.ZodBoolean;
            isSwiftCreditOutgoingDisable: z__default.ZodBoolean;
            isSwiftCreditIncomingDisable: z__default.ZodBoolean;
            isFxpayCreditOutgoingDisable: z__default.ZodBoolean;
            isAllocateToSubAccountDisable: z__default.ZodBoolean;
            isInternalCreditOwnDisable: z__default.ZodBoolean;
            type: z__default.ZodString;
            resourceId: z__default.ZodNumber;
            id: z__default.ZodNumber;
        }, z__default.ZodAny, "strip">>;
        authorizations: z__default.ZodOptional<z__default.ZodArray<z__default.ZodNumber, "many">>;
        mobileCountryCode: z__default.ZodString;
        clientKycStatus: z__default.ZodObject<{}, "strip", z__default.ZodAny, z__default.objectOutputType<{}, z__default.ZodAny, "strip">, z__default.objectInputType<{}, z__default.ZodAny, "strip">>;
        ofLoanCycle: z__default.ZodNumber;
        ofLoanActive: z__default.ZodNumber;
        activeDepositAccount: z__default.ZodNumber;
        onBoardingStatus: z__default.ZodOptional<z__default.ZodString>;
    }, z__default.ZodAny, "strip">>, "many">;
}, z__default.ZodAny, "strip">>;
type CreateClientRequest = z__default.infer<typeof CreateClientRequestSchema>;
type CreateClientResponse = z__default.infer<typeof CreateClientResponseSchema>;
type UpdateClientRequest = z__default.infer<typeof UpdateClientRequestSchema>;
type UpdateClientIdentifierRequest = z__default.infer<typeof UpdateClientIdentifierRequestSchema>;
type UpdateClientIdentifierResponse = z__default.infer<typeof UpdateClientIdentifierResponseSchema>;
type ListClientsRequest = z__default.infer<typeof ListClientsRequestSchema>;
type ListClientsResponse = z__default.infer<typeof ListClientsResponseSchema>;

export { UpdateAccountRequestSchema as A, UpdateAccountRequestShape as B, type Config as C, type CreateClientRequest as D, type UpdateClientRequest as E, type ProcessOutput as F, type UpdateClientIdentifierRequest as G, type PaymentRail as H, type MarkAsReturnInput as I, type GetTransferInput as J, type UpdateTraceNumbersInput as K, ListAccountsOfClientResponseShape as L, type Middleware as M, type CreateTransferInput as N, type CreateTransferOutput as O, type Payment as P, type UpdateClientIdentifierResponse as Q, type CreateClientResponse as R, SortOrderSchema as S, type Transfer as T, type UpdatePaymentInput as U, type ListClientsRequest as V, type ListClientsResponse as W, type ListAccountsOfClientRequest as X, type GraphQLRequest as Y, type Command as a, type CreatePaymentInput as b, type PaymentResponse as c, type PaymentStatus as d, type PaymentRailType as e, type PaymentType as f, type PaymentFilters as g, PaymentStatusSchema as h, PaymentFilterKeySchema as i, PaymentRailSchema as j, PaymentTypeSchema as k, CreatePaymentInputSchema as l, UpdatePaymentInputSchema as m, PaymentResponseSchema as n, PaymentFiltersSchema as o, PaymentFilterShape as p, PaymentShape as q, CreatePaymentInputShape as r, UpdatePaymentInputShape as s, SavingAccountSchema as t, SavingAccountShape as u, type SavingAccount as v, ListAccountsOfClientResponseSchema as w, ListAccountsRequestShape as x, ListAccountsRequestSchema as y, type UpdateAccountRequest as z };
