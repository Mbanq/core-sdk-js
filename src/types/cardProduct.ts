import z from 'zod';

export const CardProductItemShape = z.object({
  id: z.number(),
  name: z.string(),
  active: z.boolean(),
  bin: z.string(),
  cardType: z.string(),
  network: z.string(),
  manualPin: z.boolean(),
  virtual: z.boolean(),
  digitalFirst: z.boolean(),
  atmWithdrawalsEnabled: z.boolean(),
  internationalPaymentsEnabled: z.boolean(),
  currencyCode: z.string(),
  currencyDigitsAfterDecimal: z.number(),
  currencyInMultiplesOf: z.number(),
  cardProcessorId: z.number(),
  cardProcessorDisplayName: z.string(),
  yearExpire: z.number(),
  maxActiveCardAllowed: z.number(),
  creditProductId: z.number()
});

export const CardProductResponseShape = z.object({
  totalFilteredRecords: z.number(),
  pageItems: z.array(CardProductItemShape)
});

export type CardProducts = z.infer<typeof CardProductResponseShape>;

const CardProductDetailShape = z.object({
  id: z.number(),
  name: z.string(),
  externalProductId: z.number(),
  active: z.boolean(),
  bin: z.number(),
  cardType: z.string(),
  network: z.string(),
  manualPin: z.boolean(),
  virtual: z.boolean(),
  digitalFirst: z.boolean(),
  atmWithdrawalsEnabled: z.boolean(),
  internationalPaymentsEnabled: z.boolean(),
  onlinePaymentsEnabled: z.boolean(),
  contactlessPaymentsEnabled: z.boolean(),
  posPaymentsEnabled: z.boolean(),
  currencyCode: z.string(),
  currencyDigitsAfterDecimal: z.number(),
  currencyInMultiplesOf: z.number(),
  velocityRules: z.object({
    controls:z.array(z.string()),
    type: z.string(),
    value: z.number(),
    timePeriod: z.number(),
    timeUnit: z.string(),
    category: z.string(),
    categoryId: z.number(),
    version: z.number(),
    id: z.number()
  }),
  cardProcessorId: z.number(),
  cardProcessorDisplayName: z.string(),
  yearExpire: z.number(),
  maxActiveCardAllowed: z.number(),
  prepaidCard: z.boolean(),
  legalForm: z.number(),
  businessCardIDEnabled: z.boolean(),
  fulfillCardOnOrder: z.boolean()
});

export type CardProductDetail = z.infer<typeof CardProductDetailShape>;

export const CardProductRequestShape = z.object({
  cardProcessorId: z.number().default(12),
  externalProductId: z.number().default(1),
  cardProcessorConfigId: z.number().default(50000),
  name: z.string(),
  legalForm: z.number(),
  cardType: z.enum(['CREDIT', 'DEBIT']).default('DEBIT'),
  network: z.string().default('VISA'),
  bin: z.string(),
  yearExpire: z.number(),
  maxActiveCardAllowed: z.number().default(1),
  currencyCode: z.string(),
  currencyDigitsAfterDecimal: z.number(),
  onlinePaymentsEnabled: z.boolean().optional(),
  contactlessPaymentsEnabled: z.boolean().optional(),
  atmWithdrawalsEnabled: z.boolean().optional(),
  internationalPaymentsEnabled: z.boolean().optional(),
  posPaymentsEnabled: z.boolean().optional(),
  virtual: z.boolean().optional(),
  manualPin: z.boolean().optional(),
  active: z.boolean().optional(),
  prepaidCard: z.boolean().optional()
});
export const CardProductUpdateRequestShape = CardProductRequestShape.partial();
export type CardProductRequest = z.infer<typeof CardProductRequestShape>;
export type CardProductUpdateRequest = z.infer<typeof CardProductUpdateRequestShape>;
export const CreateCardProductResponseShape = z.object({
  id: z.string(),
  resourceId: z.number()
});
export type CreateCardProductResponse = z.infer<typeof CreateCardProductResponseShape>;
