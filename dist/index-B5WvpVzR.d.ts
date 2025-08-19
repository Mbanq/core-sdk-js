import { a as Command, G as GraphQLRequest } from './config.d-NcOIimSJ.js';

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

declare const CreateTransfer: (params: {
    transfer: CreateTransferInput;
    tenantId: string;
}) => Command<{
    transfer: CreateTransferInput;
    tenantId: string;
}, CreateTransferOutput>;
declare const GetTransfer: (params: {
    id: number;
    tenantId: string;
}) => Command<{
    id: number;
    tenantId: string;
}, any>;
declare const GetTransfers: (params: GetTransferInput) => Command<GetTransferInput, Array<Transfer>>;
declare const MarkAsSuccess: (params: {
    externalId: string;
    paymentType?: PaymentRail;
    tenantId?: string;
}) => Command<{
    externalId: string;
    paymentType?: PaymentRail;
    tenantId?: string;
}, ProcessOutput>;
declare const MarkAsProcessing: (params: {
    externalId: string;
    fileUrl: string;
    paymentType: PaymentRail;
    traceNumbers: {
        outgoingTransfer: string;
    };
    tenantId?: string;
}) => Command<{
    externalId: string;
    fileUrl: string;
    paymentType: PaymentRail;
    traceNumbers: {
        outgoingTransfer: string;
    };
    tenantId?: string;
}, ProcessOutput>;
declare const MarkAsReturned: (params: MarkAsReturnInput) => Command<MarkAsReturnInput, ProcessOutput>;
declare const LogFailTransfer: (params: {
    payload: Transfer;
    tenantId?: string;
}) => Command<{
    payload: Transfer;
    tenantId?: string;
}, ProcessOutput>;
declare const MarkAsFail: (params: {
    externalId: string;
    errorMessage: string;
    paymentType: PaymentRail;
    tenantId?: string;
}) => Command<{
    externalId: string;
    errorMessage: string;
    paymentType: PaymentRail;
    tenantId?: string;
}, ProcessOutput>;
declare const UpdateTraceNumber: (params: UpdateTraceNumbersInput) => Command<UpdateTraceNumbersInput, ProcessOutput>;

interface SimpleCard {
  internalCardId: string,
  cardType?: string,
  tenantIdentifier?: string,
  status?: string
}

interface AuthorizationRequest {
  card: SimpleCard,
  payload: any,
  tenantId?: string,
  skipNotification?: boolean,
  flag?: string
}

interface CardUpdate {
  clientId: number,
  businessCardIDURL: string,
  businessCardIDQRCode: string
  tenantId?: string
}

declare const SendAuthorizationToCore: (params: AuthorizationRequest) => Command<AuthorizationRequest, any>;
declare const UpdateCardID: (params: CardUpdate) => Command<CardUpdate, void>;

interface ClientData {
    id: number;
    accountNo: string;
    displayName: string;
    legalForm: {
        code: string;
        value: string;
    };
    [key: string]: string | number | boolean | object;
}
interface RiskRatingData {
    riskScore: number;
    rating: string;
    [key: string]: string | number | boolean;
}
interface ClientAddressData {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    [key: string]: string | number | boolean;
}
interface ClientIdentifierData {
    type: string;
    value: string;
    [key: string]: string | number | boolean;
}
interface ClientResponse {
    clientData?: ClientData;
    riskRatingData?: RiskRatingData;
    clientAddressData?: ClientAddressData;
    clientIdentifierData?: ClientIdentifierData;
}
declare const GetClientData: (params: {
    clientId: number;
    tenantId?: string;
    riskRating?: boolean;
    clientAddress?: boolean;
    clientIdentifier?: boolean;
}) => Command<{
    clientId: number;
    tenantId?: string;
    riskRating?: boolean;
    clientAddress?: boolean;
    clientIdentifier?: boolean;
}, ClientResponse>;
declare const UpdateClient: (params: {
    tenantId?: string;
    clientId: number;
    updates: object;
}) => Command<{
    tenantId?: string;
    clientId: number;
    updates: object;
}, ProcessOutput>;
declare const UpdateClientIdentifier: (params: {
    tenantId?: string;
    clientId: number;
    identifierId: string;
    updates: object;
}) => Command<{
    tenantId?: string;
    clientId: number;
    identifierId: string;
    updates: object;
}, ProcessOutput>;

declare const GraphQL: (request: GraphQLRequest) => Command<GraphQLRequest, any>;

export { CreateTransfer as C, GetTransfers as G, LogFailTransfer as L, MarkAsFail as M, type ProcessOutput as P, SendAuthorizationToCore as S, type Transfer as T, UpdateTraceNumber as U, MarkAsProcessing as a, MarkAsReturned as b, MarkAsSuccess as c, GetTransfer as d, UpdateCardID as e, GetClientData as f, UpdateClient as g, UpdateClientIdentifier as h, GraphQL as i, type GetTransferInput as j, type MarkAsReturnInput as k, type CreateTransferInput as l, type CreateTransferOutput as m };
