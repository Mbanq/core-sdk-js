import z from 'zod';
import { createCommandError } from '../utils/errorHandler';

const LegalFormSchema = z.object({
  id: z.number(),
  code: z.string(),
  value: z.string()
});

const StatusSchema = z.object({
  id: z.number(),
  code: z.string(),
  value: z.string()
});

const SubStatusSchema = z.object({
  active: z.boolean(),
  mandatory: z.boolean(),
  systemDefined: z.boolean()
});

const GenderSchema = z.object({
  id: z.number()
});

const ClientClassificationSchema = z.object({
  id: z.number(),
  name: z.string().optional()
});

const OccupationSchema = z.object({
  active: z.boolean()
});

const TimelineSchema = z.object({
  submittedOnDate: z.array(z.number()),
  submittedByUsername: z.string().optional(),
  submittedByFirstname: z.string().optional(),
  submittedByLastname: z.string().optional(),
  activatedOnDate: z.array(z.number()).optional(),
  activatedByUsername: z.string().optional(),
  activatedByFirstname: z.string().optional(),
  activatedByLastname: z.string().optional()
});

const ConstitutionSchema = z.object({}).catchall(z.any());
const MainBusinessLineSchema = z.object({}).catchall(z.any());
const CountryOfIncorporationSchema = z.object({}).catchall(z.any());

const ClientNonPersonDetailsSchema = z.object({
  constitution: ConstitutionSchema,
  mainBusinessLine: MainBusinessLineSchema,
  countryOfIncorporation: CountryOfIncorporationSchema
}).catchall(z.any());

const ClientTransferOptionDataSchema = z.object({
  isExternalCardDebitDisable: z.boolean(),
  isExternalCardCreditDisable: z.boolean(),
  isAchDebitOutgoingDisable: z.boolean(),
  isAchCreditOutgoingDisable: z.boolean(),
  isAchDebitIncomingDisable: z.boolean(),
  isAchCreditIncomingDisable: z.boolean(),
  isInternalCreditDisable: z.boolean(),
  isInternalDebitDisable: z.boolean(),
  isWireCreditOutgoingDisable: z.boolean(),
  isWireCreditIncomingDisable: z.boolean(),
  isSwiftCreditOutgoingDisable: z.boolean(),
  isSwiftCreditIncomingDisable: z.boolean(),
  isFxpayCreditOutgoingDisable: z.boolean(),
  isAllocateToSubAccountDisable: z.boolean(),
  isInternalCreditOwnDisable: z.boolean(),
  type: z.string(),
  resourceId: z.number(),
  id: z.number()
}).catchall(z.any());

const ClientKycStatusSchema = z.object({}).catchall(z.any());

const ClientDataSchema = z.object({
  id: z.number(),
  accountNo: z.string(),
  status: StatusSchema,
  subStatus: SubStatusSchema,
  active: z.boolean(),
  activationDate: z.array(z.number()).optional(), // Only in get by ID
  firstname: z.string(),
  lastname: z.string(),
  displayName: z.string(),
  mobileNo: z.string(),
  emailAddress: z.string(),
  dateOfBirth: z.array(z.number()),
  gender: GenderSchema,
  clientTypes: z.array(z.any()),
  clientClassification: ClientClassificationSchema,
  occupation: OccupationSchema,
  isStaff: z.boolean(),
  skipAvs: z.boolean(),
  officeId: z.number(),
  officeName: z.string(),
  imageId: z.string().optional(), // Only in list clients
  imagePresent: z.boolean().optional(), // Only in list clients
  timeline: TimelineSchema,
  legalForm: LegalFormSchema,
  clientVerificationStatus: z.string(),
  updatedAt: z.string(),
  isBlockExternalCardsAddition: z.boolean(),
  clientNonPersonDetails: ClientNonPersonDetailsSchema,
  clientTransferOptionData: ClientTransferOptionDataSchema,
  authorizations: z.array(z.number()).optional(), // Only in get by ID
  mobileCountryCode: z.string(),
  clientKycStatus: ClientKycStatusSchema,
  ofLoanCycle: z.number(),
  ofLoanActive: z.number(),
  activeDepositAccount: z.number(),
  onBoardingStatus: z.string().optional() // Only in list clients
}).catchall(z.any()); // Allow additional properties

const RiskRatingDataSchema = z.object({
  riskScore: z.number(),
  rating: z.string()
}).catchall(z.any()); // Allow additional properties

const ClientAddressDataSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string()
}).catchall(z.any()); // Allow additional properties

const ClientIdentifierDataSchema = z.object({
  type: z.string(),
  value: z.string()
}).catchall(z.any()); // Allow additional properties

// Client request/response schemas
export const CreateClientRequestShape = {
  firstname: z.string(),
  middlename: z.string().optional(),
  lastname: z.string(),
  fullname: z.string().optional(),
  dob: z.string(),
  genderId: z.number(),
  locale: z.string(),
  officeId: z.number(),
  mobileCountryCode: z.string(),
  mobileNo: z.string(),
  emailAddress: z.string().email(),
  legalFormId: z.number(),
  externalId: z.string().optional(),
  isOptedForMLALStatus: z.boolean().optional(),
  currentMLALStatus: z.string().optional(),
  isStaff: z.boolean().optional(),
  staffId: z.number().optional(),
  clientClassificationId: z.number().optional(),
  savingsProductId: z.number().optional(),
  active: z.boolean().optional(),
  dateFormat: z.string(),
  activationDate: z.string().optional(),
  submittedOnDate: z.string(),
  dateOfBirth: z.string()
};

export const CreateClientRequestSchema = z.object(CreateClientRequestShape).catchall(z.any());

export const CreateClientResponseShape = {
  clientId: z.number(),
  status: z.string()
};

export const CreateClientResponseSchema = z.object(CreateClientResponseShape).catchall(z.any());

export const UpdateClientRequestShape = {
  firstname: z.string().optional(),
  middlename: z.string().optional(),
  fullname: z.string().optional(),
  genderId: z.number().optional(),
  lastname: z.string().optional(),
  occupationId: z.number().optional(),
  mobileCountryCode: z.string().optional(),
  mobileNo: z.string().optional(),
  emailAddress: z.string().email().optional(),
  externalId: z.string().optional(),
  clientClassificationId: z.number().optional(),
  dateOfBirth: z.string().optional(),
  dateFormat: z.string().optional()
};

export const UpdateClientRequestSchema = z.object(UpdateClientRequestShape).catchall(z.any());

export const UpdateClientIdentifierRequestShape = {
  documentTypeId: z.string(),
  documentKey: z.string(),
  status: z.string(),
  description: z.string().optional(),
  issuedBy: z.string().optional(),
  locale: z.string().optional(),
  dateFormat: z.string().optional(),
  expiryDate: z.string().optional(),
  nationality: z.number().optional(),
  issuedDate: z.string().optional()
};

export const UpdateClientIdentifierRequestSchema = z.object(UpdateClientIdentifierRequestShape).catchall(z.any());

export const UpdateClientIdentifierResponseShape = {
  id: z.number(),
  officeId: z.number(),
  clientId: z.number(),
  resourceId: z.number(),
  changes: z.record(z.string(), z.any()),
  isScheduledTransfer: z.boolean(),
  isSkipNotification: z.boolean()
};

export const UpdateClientIdentifierResponseSchema = z.object(UpdateClientIdentifierResponseShape).catchall(z.any());

// Error response schemas
export const ErrorDetailShape = {
  developerMessage: z.string(),
  defaultUserMessage: z.string(),
  userMessageGlobalisationCode: z.string(),
  parameterName: z.string().optional(),
  value: z.any().nullable(),
  args: z.array(z.object({
    value: z.any()
  })).optional()
};

export const ErrorDetailSchema = z.object(ErrorDetailShape);

export const ApiErrorResponseShape = {
  developerMessage: z.string(),
  httpStatusCode: z.string(),
  defaultUserMessage: z.string(),
  userMessageGlobalisationCode: z.string(),
  errors: z.array(ErrorDetailSchema).optional()
};

export const ApiErrorResponseSchema = z.object(ApiErrorResponseShape).catchall(z.any());

export const ListClientsRequestShape = {
  tenantId: z.string().optional(),
  offset: z.number().optional(),
  limit: z.number().optional(),
  orderBy: z.string().optional(),
  sortOrder: z.string().optional(),
  officeId: z.number().optional(),
  displayName: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  externalId: z.string().optional(),
  orphansOnly: z.boolean().optional(),
  clientStatus: z.string().optional(),
  mobileNo: z.string().optional(),
  createdStartDate: z.string().optional(),
  creationEndDate: z.string().optional(),
  activatedStartDate: z.string().optional(),
  activatedEndDate: z.string().optional(),
  closedStartDate: z.string().optional(),
  closedEndDate: z.string().optional()
};

export const ListClientsRequestSchema = z.object(ListClientsRequestShape);

export const ClientDataShape = {
  id: z.number(),
  accountNo: z.string(),
  status: StatusSchema,
  subStatus: SubStatusSchema,
  active: z.boolean(),
  activationDate: z.array(z.number()).optional(), // Only in get by ID
  firstname: z.string(),
  lastname: z.string(),
  displayName: z.string(),
  mobileNo: z.string(),
  emailAddress: z.string(),
  dateOfBirth: z.array(z.number()),
  gender: GenderSchema,
  clientTypes: z.array(z.any()),
  clientClassification: ClientClassificationSchema,
  occupation: OccupationSchema,
  isStaff: z.boolean(),
  skipAvs: z.boolean(),
  officeId: z.number(),
  officeName: z.string(),
  imageId: z.string().optional(), // Only in list clients
  imagePresent: z.boolean().optional(), // Only in list clients
  timeline: TimelineSchema,
  legalForm: LegalFormSchema,
  clientVerificationStatus: z.string(),
  updatedAt: z.string(),
  isBlockExternalCardsAddition: z.boolean(),
  clientNonPersonDetails: ClientNonPersonDetailsSchema,
  clientTransferOptionData: ClientTransferOptionDataSchema,
  authorizations: z.array(z.number()).optional(), // Only in get by ID
  mobileCountryCode: z.string(),
  clientKycStatus: ClientKycStatusSchema,
  ofLoanCycle: z.number(),
  ofLoanActive: z.number(),
  activeDepositAccount: z.number(),
  onBoardingStatus: z.string().optional() // Only in list clients
};

export const ListClientsResponseShape = {
  totalFilteredRecords: z.number(),
  pageItems: z.array(ClientDataSchema)
};

export const ListClientsResponseSchema = z.object(ListClientsResponseShape).catchall(z.any());

export const ClientResponseShape = {
  clientData: ClientDataSchema.optional(),
  riskRatingData: RiskRatingDataSchema.optional(),
  clientAddressData: ClientAddressDataSchema.optional(),
  clientIdentifierData: ClientIdentifierDataSchema.optional()
};

export const ClientResponseSchema = z.object(ClientResponseShape);

// Type inference from Zod schemas
export type LegalForm = z.infer<typeof LegalFormSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type SubStatus = z.infer<typeof SubStatusSchema>;
export type Gender = z.infer<typeof GenderSchema>;
export type ClientClassification = z.infer<typeof ClientClassificationSchema>;
export type Occupation = z.infer<typeof OccupationSchema>;
export type Timeline = z.infer<typeof TimelineSchema>;
export type ClientNonPersonDetails = z.infer<typeof ClientNonPersonDetailsSchema>;
export type ClientTransferOptionData = z.infer<typeof ClientTransferOptionDataSchema>;
export type ClientKycStatus = z.infer<typeof ClientKycStatusSchema>;
export type ClientData = z.infer<typeof ClientDataSchema>;
export type RiskRatingData = z.infer<typeof RiskRatingDataSchema>;
export type ClientAddressData = z.infer<typeof ClientAddressDataSchema>;
export type ClientIdentifierData = z.infer<typeof ClientIdentifierDataSchema>;
export type CreateClientRequest = z.infer<typeof CreateClientRequestSchema>;
export type CreateClientResponse = z.infer<typeof CreateClientResponseSchema>;
export type UpdateClientRequest = z.infer<typeof UpdateClientRequestSchema>;
export type UpdateClientIdentifierRequest = z.infer<typeof UpdateClientIdentifierRequestSchema>;
export type UpdateClientIdentifierResponse = z.infer<typeof UpdateClientIdentifierResponseSchema>;
export type ErrorDetail = z.infer<typeof ErrorDetailSchema>;
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
export type ListClientsRequest = z.infer<typeof ListClientsRequestSchema>;
export type ListClientsResponse = z.infer<typeof ListClientsResponseSchema>;
export type ClientResponse = z.infer<typeof ClientResponseSchema>;

// Validation functions
export const validateCreateClientRequest = (input: unknown): CreateClientRequest => {
  return CreateClientRequestSchema.parse(input);
};

export const validateUpdateClientRequest = (input: unknown): UpdateClientRequest => {
  return UpdateClientRequestSchema.parse(input);
};

export const validateUpdateClientIdentifierRequest = (input: unknown): UpdateClientIdentifierRequest => {
  return UpdateClientIdentifierRequestSchema.parse(input);
};

export const validateUpdateClientIdentifierResponse = (response: unknown): UpdateClientIdentifierResponse => {
  return UpdateClientIdentifierResponseSchema.parse(response);
};

export const validateApiErrorResponse = (error: unknown): ApiErrorResponse => {
  return ApiErrorResponseSchema.parse(error);
};

export const validateListClientsRequest = (input: unknown): ListClientsRequest => {
  return ListClientsRequestSchema.parse(input);
};

export const validateClientData = (data: unknown): ClientData => {
  return ClientDataSchema.parse(data);
};

export const validateClientResponse = (response: unknown): ClientResponse => {
  return ClientResponseSchema.parse(response);
};

// Client filter validation schemas
export const ClientFilterKeySchema = z.enum([
  'offset', 'limit', 'orderBy', 'sortOrder', 'officeId', 'displayName',
  'firstname', 'lastname', 'externalId', 'orphansOnly', 'clientStatus',
  'mobileNo', 'createdStartDate', 'creationEndDate', 'activatedStartDate',
  'activatedEndDate', 'closedStartDate', 'closedEndDate'
]);

export const ClientOrderBySchema = z.enum(['displayName', 'accountNo', 'officeId', 'officeName']);
export const ClientSortOrderSchema = z.enum(['ASC', 'DESC']);
export const ClientStatusSchema = z.enum(['ACTIVE', 'PENDING', 'INACTIVE']);

export type ClientFilterKey = z.infer<typeof ClientFilterKeySchema>;
export type ClientOrderBy = z.infer<typeof ClientOrderBySchema>;
export type ClientSortOrder = z.infer<typeof ClientSortOrderSchema>;
export type ClientStatus = z.infer<typeof ClientStatusSchema>;

// Validation functions
export const validateClientFilterKey = (key: string): ClientFilterKey => {
  return ClientFilterKeySchema.parse(key);
};

export const validateClientOrderBy = (orderBy: string): ClientOrderBy => {
  return ClientOrderBySchema.parse(orderBy);
};

export const validateClientSortOrder = (sortOrder: string): ClientSortOrder => {
  return ClientSortOrderSchema.parse(sortOrder);
};

export const validateClientStatus = (status: string): ClientStatus => {
  return ClientStatusSchema.parse(status);
};

// Simplified validation helper using Zod
export const validateClientFilters = (filters: Record<string, any>): void => {
  try {
    for (const [key, value] of Object.entries(filters)) {
      // Validate filter key
      validateClientFilterKey(key);

      // Skip validation for undefined/null values
      if (value === undefined || value === null) continue;

      // Use Zod validation for specific fields
      switch (key) {
        case 'orderBy':
          validateClientOrderBy(value);
          break;
        case 'sortOrder':
          validateClientSortOrder(value);
          break;
        case 'clientStatus':
          validateClientStatus(value);
          break;
        case 'offset':
        case 'limit':
        case 'officeId':
          z.number().min(0).parse(value);
          break;
        case 'orphansOnly':
          z.boolean().parse(value);
          break;
        case 'displayName':
        case 'firstname':
        case 'lastname':
        case 'externalId':
        case 'mobileNo':
        case 'createdStartDate':
        case 'creationEndDate':
        case 'activatedStartDate':
        case 'activatedEndDate':
        case 'closedStartDate':
        case 'closedEndDate':
          z.string().min(1).parse(value);
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

export const VerifyWithActivateClientSchema = z.object({
  clientId: z.string(),
  kycVerificationType: z.enum(['FULL', 'PARTIAL']).default('FULL').optional(),
  note: z.string().optional(),
  locale: z.string().default('en').optional(),
  dateFormat: z.string().default('dd MMMM yyyy').optional(),
  activationDate: z.string().optional(),
  isActivatedByManualReview: z.boolean().default(false).optional(),
  manualReviewActivationComments: z.string().optional(),
  skipVerify: z.boolean().default(false),
  skipActivate: z.boolean().default(false),
  autoActivate: z.boolean().default(true)
}).refine(
  (data) => !(data.skipVerify && data.skipActivate),
  {
    message: 'Cannot skip both verification and activation - at least one action must be performed',
    path: ['skipVerify', 'skipActivate']
  }
).refine(
  (data) => {
    // When skipVerify is false, kycVerificationType should be present
    if (!data.skipVerify && !data.kycVerificationType) {
      return false;
    }
    return true;
  },
  {
    message: 'kycVerificationType is required when skipVerify is false',
    path: ['kycVerificationType']
  }
).refine(
  (data) => {
    // When skipActivate is false, locale should be present
    if (!data.skipActivate && !data.locale) {
      return false;
    }
    return true;
  },
  {
    message: 'locale is required when skipActivate is false',
    path: ['locale']
  }
).refine(
  (data) => {
    // When skipActivate is false, dateFormat should be present
    if (!data.skipActivate && !data.dateFormat) {
      return false;
    }
    return true;
  },
  {
    message: 'dateFormat is required when skipActivate is false',
    path: ['dateFormat']
  }
).refine(
  (data) => {
    // When skipActivate is false, activationDate should be present
    if (!data.skipActivate && !data.activationDate) {
      return false;
    }
    return true;
  },
  {
    message: 'activationDate is required when skipActivate is false',
    path: ['activationDate']
  }
);

export type VerifyWithActivateClient = z.infer<typeof VerifyWithActivateClientSchema>;

export const ResponseVerifySchema = z.object({
  id: z.number(),
  clientId: z.number(),
  officeId: z.number(),
  resourceId: z.number(),
  data: z.object({
    clientVerificationStatus: z.enum(['PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED']),
    clientKycStatus: z.string()
  })
});

export type ResponseVerify = z.infer<typeof ResponseVerifySchema>;

export const DocumentTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  isMasked: z.boolean()
});

export const IdentifierVerificationStatusSchema = z.object({
  id: z.number(),
  value: z.string()
});

export const ClientIdentifierSchema = z.object({
  id: z.number(),
  clientId: z.number(),
  documentType: DocumentTypeSchema,
  documentKey: z.string(),
  issuedDate: z.array(z.number()).optional(),
  expiryDate: z.array(z.number()).optional(),
  description: z.string().optional(),
  status: z.string(),
  issuedBy: z.string().optional(),
  verificationStatus: IdentifierVerificationStatusSchema.optional()
});

export const ClientVerificationStatusSchema = z.object({
  id: z.number(),
  value: z.string()
});

export const GetStatusOfVerifyClientResponseSchema = z.object({
  id: z.number(),
  accountNo: z.union([z.string(), z.number()]),
  displayName: z.string(),
  legalForm: z.object({
    code: z.string(),
    value: z.number()
  }),
  verificationStatus: ClientVerificationStatusSchema,
  identifiers: z.array(ClientIdentifierSchema).optional(),
  ofLoanCycle: z.number(),
  mobileCountryCode: z.string(),
  ofLoanActive: z.number(),
  activeDepositAccount: z.number()
}).catchall(z.any());

export type DocumentType = z.infer<typeof DocumentTypeSchema>;
export type IdentifierVerificationStatus = z.infer<typeof IdentifierVerificationStatusSchema>;
export type ClientIdentifier = z.infer<typeof ClientIdentifierSchema>;
export type ClientVerificationStatus = z.infer<typeof ClientVerificationStatusSchema>;
export type GetStatusOfVerifyClientResponse = z.infer<typeof GetStatusOfVerifyClientResponseSchema>;

export const CloseClientRequestSchema = z.object({
  closureReasonId: z.string(),
  locale: z.string().optional(),
  closerDate: z.string(),
  dateFormat: z.string()
}).refine(input => {
  // When closerDate is present, dateFormat should be present
  if (input.closerDate == undefined && input.dateFormat === undefined) return false;
  return true;
});

export const CloseClientResponseSchema = z.object({
  id: z.number(),
  clientId: z.number(),
  resourceId: z.number()
});

export type CloseClientRequest = z.infer<typeof CloseClientRequestSchema>;
export type CloseClientResponse = z.infer<typeof CloseClientResponseSchema>;

export const validateCloseClientRequest = (input: unknown): CloseClientRequest => {
  return CloseClientRequestSchema.parse(input);
};
