import { C as Command, G as GraphQLRequest } from './config.d-CyK6ZM6s.mjs';

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

export { type CreateTransferInput as C, GetClientData as G, type MarkAsReturnInput as M, type PaymentRail as P, SendAuthorizationToCore as S, type Transfer as T, UpdateCardID as U, UpdateClient as a, UpdateClientIdentifier as b, GraphQL as c, type ProcessOutput as d, type GetTransferInput as e, type UpdateTraceNumbersInput as f, type CreateTransferOutput as g };
