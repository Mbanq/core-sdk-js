import { z, ZodError } from 'zod';
import { createCommandError } from '../utils/errorHandler';
import { PaymentRailSchema } from './payment';

export const BankInformationSchema = z.object({
  routingNumber: z.string(),
  swiftCode: z.string()
});

export const AccountDetailsDataSchema = z.object({
  accountNumber: z.string(),
  bankInformation: BankInformationSchema
});

export const AddressSchema = z.object({
  line1: z.string(),
  line2: z.string(),
  city: z.string(),
  stateCode: z.string(),
  countryCode: z.string(),
  postalCode: z.string()
});

export const RecipientShape = {
  id: z.number(),
  clientId: z.number(),
  nickName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  businessName: z.string(),
  emailAddress: z.string(),
  phoneNumber: z.string(),
  recipientType: z.string(),
  paymentRail: z.string(),
  isOwnAccount: z.boolean(),
  address: AddressSchema,
  accountDetailsData: AccountDetailsDataSchema
};
export const RecipientSchema = z.object(RecipientShape);

export const RecipientsSchema = z.array(RecipientSchema);

export const RecipientRequestShape = {
  limit: z.number().min(1).optional().describe('Maximum number of records to return. Defaults to 20 if not specified. Set to 0 to return all records.'),
  offset: z.number().min(0).optional(),
  name: z.string().optional()
};

export const RecipientRequestSchema = z.object(RecipientRequestShape);

export const CreateRecipientRequestShape = {
  nickName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  businessName: z.string().optional(),
  emailAddress: z.string().email(),
  phoneNumber: z.string(),
  recipientType: z.string(),
  paymentRail: PaymentRailSchema,
  isOwnAccount: z.boolean().optional(),
  address: AddressSchema.optional(),
  accountDetailsData: AccountDetailsDataSchema
};

export const CreateRecipientRequestSchema = z.object(CreateRecipientRequestShape).refine(
  (data) => {
    if (data.paymentRail === 'WIRE' || data.paymentRail === 'SWIFT') {
      return data.address !== undefined &&
             data.address.stateCode !== undefined &&
             data.address.countryCode !== undefined;
    }
    return true;
  },
  {
    message: 'Address with state code and country code is required for WIRE and SWIFT payment rails',
    path: ['address']
  }
);

export const RecipientFilterKeySchema = z.enum([
  'name'
]);

export type RecipientFilterKey = z.infer<typeof RecipientFilterKeySchema>;
export const validateRecipientFilterKey = (key: string): RecipientFilterKey => {
  return RecipientFilterKeySchema.parse(key);
};
export const validateFilterKey = (key: string): void => {
  try {
    validateRecipientFilterKey(key);
  } catch (error) {
    if (error instanceof ZodError) {
      throw createCommandError({
        message: `Invalid filter key: '${key}'. ${error.message}`,
        code: 'invalid_filter_key'
      });
    }
    throw error;
  }
};

export const validateFilterValue = (key: string, value: any): void => {
  try {
    switch (key) {
      case 'name':
        z.string().parse(value);
        break;
      default:
        break;
    }
  } catch (error) {
    if (error instanceof ZodError) {
      throw createCommandError({
        message: `Invalid value for '${key}': '${value}'. ${error.message}`,
        code: `invalid_${key}_value`
      });
    }
    throw error;
  }
};

export const UpdateRecipientRequestShape = {
  nickName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  businessName: z.string().optional(),
  emailAddress: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  recipientType: z.string().optional(),
  paymentRail: PaymentRailSchema.optional(),
  isOwnAccount: z.boolean().optional(),
  address: AddressSchema.optional(),
  accountDetailsData: AccountDetailsDataSchema.optional()
};

export const UpdateRecipientRequestSchema = z.object(UpdateRecipientRequestShape).refine(
  (data) => {
    // Only validate if both paymentRail and address are being updated together
    if (data.paymentRail && data.address && (data.paymentRail === 'WIRE' || data.paymentRail === 'SWIFT')) {
      return data.address.stateCode !== undefined && data.address.countryCode !== undefined;
    }
    return true;
  },
  {
    message: 'When updating address for WIRE/SWIFT payment rails, state code and country code are required',
    path: ['address']
  }
);

export type Recipient = z.infer<typeof RecipientSchema>;
export type Recipients = z.infer<typeof RecipientsSchema>;
export type RecipientRequest = z.infer<typeof RecipientRequestSchema>;
export type CreateRecipientRequest = z.infer<typeof CreateRecipientRequestSchema>;
export type UpdateRecipientRequest = z.infer<typeof UpdateRecipientRequestSchema>;
