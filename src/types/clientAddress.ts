import z from 'zod';

export const AddressShape = z.object({
  clientId: z.number(),
  addressType: z.string(),
  addressId: z.number(),
  addressTypeId: z.number(),
  isActive: z.boolean(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  addressLine3: z.string(),
  mobileNo: z.number(),
  townVillage: z.string(),
  countyDistrict: z.string(),
  city: z.string(),
  stateProvinceId: z.number(),
  countryName: z.string(),
  stateName: z.string(),
  countryId: z.number(),
  postalCode: z.number(),
  createdBy: z.string(),
  updatedBy: z.string(),
  minifiedAddress: z.array(z.string())
});

export const ClientAddressShape = z.array(AddressShape);
export type GetClientAddressResponse = z.infer<typeof ClientAddressShape>;

export const CreateClientAddressResponseSchema = z.object({
  clientId: z.number(),
  resourceId: z.number()
});
export type CreateClientAddressResponse = z.infer<typeof CreateClientAddressResponseSchema>;

export const UpdateClientAddressResponseSchema = z.object({
  id: z.number(),
  clientId: z.number(),
  resourceId: z.number()
});
export type UpdateClientAddressResponse = z.infer<typeof UpdateClientAddressResponseSchema>;

// Common address fields shared between create and update operations
const ClientAddressFieldsSchema = z.object({
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  addressLine3: z.string().optional(),
  city: z.string(),
  stateProvinceId: z.number(),
  countryId: z.number(),
  postalCode: z.string(),
});

export const CreateClientAddressSchema = ClientAddressFieldsSchema.extend({
  isActive: z.boolean()
}).catchall(z.any());

export type CreateClientAddressRequest = z.infer<typeof CreateClientAddressSchema>;

export const UpdateClientAddressSchema = ClientAddressFieldsSchema.extend({
  addressId: z.number(),
  addressTypeId: z.number()
}).catchall(z.any());

export type UpdateClientAddressRequest = z.infer<typeof UpdateClientAddressSchema>;