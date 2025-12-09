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

export const ClientIdentifierItemShape = {
  id: z.number(),
  clientId: z.number(),
  documentType: z.object({
    id: z.number(),
    name: z.string(),
    isMasked: z.boolean().optional()
  }),
  documentKey: z.union([z.string(), z.number()]),
  status: z.string(),
  description: z.string().optional(),
  issuedBy: z.string().optional(),
  expiryDate: z.union([z.string(), z.array(z.number())]).optional(),
  nationality: z.object({
    id: z.number(),
    name: z.string()
  }).optional(),
  issuedDate: z.string().optional(),
  documentStatus: z.string().optional()
};

export const ClientIdentifierResponseSchema = z.object(ClientIdentifierResponseShape).catchall(z.any());

export const ClientIdentifierItemSchema = z.object(ClientIdentifierItemShape).catchall(z.any());

export const ListClientDocumentResponseSchema = z.array(ClientIdentifierItemSchema);

export type ClientIdentifierRequest = z.infer<typeof ClientIdentifierRequestSchema>;
export type ClientIdentifierResponse = z.infer<typeof ClientIdentifierResponseSchema>;
export type ClientIdentifierItem = z.infer<typeof ClientIdentifierItemSchema>;
export type ListClientDocumentResponse = z.infer<typeof ListClientDocumentResponseSchema>;

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
});

export type DocumentUploadRequest = z.infer<typeof DocumentUploadRequestSchema>;
export type DocumentUploadResponse = z.infer<typeof ClientIdentifierResponseSchema>;

export const validateDocumentUploadRequest = (input: unknown): DocumentUploadRequest => {
  return DocumentUploadRequestSchema.parse(input);
};

export const DeleteClientDocumentResponseSchema = z.object({
  officeId: z.number(),
  clientId: z.number(),
  resourceId: z.number()
});

export type DeleteClientDocumentResponse = z.infer<typeof DeleteClientDocumentResponseSchema>;

export const ApproveRejectClientDocumentResponseSchema = z.object({
  clientId: z.number(),
  resourceId: z.number()
});

export type ApproveRejectClientDocumentResponse = z.infer<typeof ApproveRejectClientDocumentResponseSchema>;
