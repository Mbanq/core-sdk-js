import { DocumentNode } from 'graphql';
import { AxiosInstance } from 'axios';
import z__default from 'zod';

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
type PaymentType = 'CREDIT' | 'DEBIT';
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

export type { Command as C, GetTransferInput as G, ListClientsRequest as L, Middleware as M, ProcessOutput as P, Transfer as T, UpdateClientRequest as U, Config as a, CreateClientRequest as b, UpdateClientIdentifierRequest as c, PaymentRail as d, MarkAsReturnInput as e, UpdateTraceNumbersInput as f, CreateTransferInput as g, CreateTransferOutput as h, UpdateClientIdentifierResponse as i, CreateClientResponse as j, ListClientsResponse as k, GraphQLRequest as l };
