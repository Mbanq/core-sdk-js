import z from 'zod';

const ChargeSchema = z.object({
  chargeId: z.number(),
  numberOfFeeExemptedCharge: z.number(),
  exemptedFeeAmount: z.number(),
  chargeAmount: z.number()
});

const ClassificationSchema = z.object({
  id: z.number(),
  name: z.string(),
  position: z.number(),
  description: z.string(),
  active: z.boolean(),
  mandatory: z.boolean(),
  systemDefined: z.boolean(),
  codeName: z.string(),
  isMasked: z.boolean(),
  charges: z.array(ChargeSchema)
});

export const ClientClassificationResponseSchema = z.object({
  clientId: z.number(),
  currentClassificationStartDate: z.string(),
  applicableDate: z.string(),
  upcomingClassificationRequestId: z.number(),
  currentClassification: ClassificationSchema,
  upcomingClassification: ClassificationSchema.optional()
});

export type ClientClassificationResponse = z.infer<typeof ClientClassificationResponseSchema>;

export const SwitchClientClassificationRequestSchema = z.object({
  classificationId: z.number(),
  expectedApplicableDate: z.string(),
  dateFormat: z.string(),
  locale: z.string().optional()
}).refine(input => {
  // When expectedApplicableDate is present, dateFormat should be present
  if (input.expectedApplicableDate == undefined && input.dateFormat === undefined) { return false; }
  return true;
});

export const SwitchClientClassificationResponseSchema = z.object({
  id: z.number(),
  clientId: z.number(),
  resourceId: z.number(),
  data: z.object({
    oldClassificationId: z.number(),
    newClassificationId: z.number()
  })
});

export type SwitchClientClassificationRequest = z.infer<typeof SwitchClientClassificationRequestSchema>;

export type SwitchClientClassificationResponse = z.infer<typeof SwitchClientClassificationResponseSchema>;