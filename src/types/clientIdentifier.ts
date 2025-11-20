import z from 'zod';

export const ClientIdentifierRequestShape = {
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

export const ClientIdentifierRequestSchema = z.object(ClientIdentifierRequestShape).catchall(z.any());

export const ClientIdentifierResponseShape = {
  id: z.number(),
  officeId: z.number(),
  clientId: z.number(),
  resourceId: z.number(),
  changes: z.record(z.string(), z.any()),
  isScheduledTransfer: z.boolean(),
  isSkipNotification: z.boolean()
};

export const ClientIdentifierResponseSchema = z.object(ClientIdentifierResponseShape).catchall(z.any());


export type ClientIdentifierRequest = z.infer<typeof ClientIdentifierRequestSchema>;
export type ClientIdentifierResponse = z.infer<typeof ClientIdentifierResponseSchema>;

export const validateClientIdentifierRequest = (input: unknown): ClientIdentifierRequest => {
  return ClientIdentifierRequestSchema.parse(input);
};

export const validateClientIdentifierResponse = (response: unknown): ClientIdentifierResponse => {
  return ClientIdentifierResponseSchema.parse(response);
};

export const DocumentUploadRequestSchema = z.object({
  name: z.string(),
  file: z.union([z.instanceof(Buffer), z.instanceof(Blob), z.instanceof(File)]),
  type: z.string().optional(),
  description: z.string().optional()
});

export const DocumentUploadResponseSchema = z.object({
  id: z.string(),
  resourceIdentifier: z.string(),
  uuid: z.string()
})

export type DocumentUploadRequest = z.infer<typeof DocumentUploadRequestSchema>;
export type DocumentUploadResponse = z.infer<typeof ClientIdentifierResponseSchema>;

export const validateDocumentUploadRequest = (input: unknown): DocumentUploadRequest => {
  return DocumentUploadRequestSchema.parse(input);
};