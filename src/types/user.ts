import { z } from 'zod';

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  disabled: z.boolean(),
  isSelfService: z.boolean(),
  position: z.number()
});

export const UserDetailShape = {
  username: z.string(),
  userId: z.number(),
  accessToken: z.string(),
  authenticated: z.boolean(),
  officeId: z.number(),
  officeName: z.string(),
  roles: z.array(RoleSchema),
  permissions: z.array(z.string()),
  shouldRenewPassword: z.boolean(),
  isTwoFactorAuthenticationRequired: z.boolean(),
  isSelfServiceUser: z.boolean()
};

export const UserDetailSchema = z.object(UserDetailShape);

export type UserDetail = z.infer<typeof UserDetailSchema>;

const SelfServiceUserRequestShape = {
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  officeId: z.number(),
  roles: z.array(z.number()),
  sendPasswordToEmail: z.boolean().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  repeatPassword: z.string().optional(),
  enabled: z.boolean().optional(),
  clients: z.array(z.number()).optional()
};

export const EnableSelfServiceAccessRequestSchema = z.object(SelfServiceUserRequestShape);

export type EnableSelfServiceAccessRequest = z.infer<
  typeof EnableSelfServiceAccessRequestSchema
>;

export const EnableSelfServiceAccessResponseSchema = z.object({
  id: z.string(),
  officeId: z.number(),
  clientId: z.number(),
  resourceId: z.number(),
  data: z.object({
    client: z.object({
      officeName: z.string(),
      displayName: z.string(),
      accountNo: z.number(),
      id: z.number(),
      status: z.string()
    }),
    maker: z.object({
      firstName: z.string(),
      lastName: z.string(),
      id: z.number(),
      email: z.string(),
      username: z.string()
    }),
    createdUser: z.object({
      firstName: z.string(),
      lastName: z.string(),
      id: z.number(),
      email: z.string(),
      username: z.string()
    })
  })
});

export type EnableSelfServiceAccessResponse = z.infer<
  typeof EnableSelfServiceAccessResponseSchema
>;

export const UpdateSelfServiceUserRequestSchema = z.object({
  userId: z.number(),
  ...SelfServiceUserRequestShape
});

export type UpdateSelfServiceUserRequest = z.infer<
  typeof UpdateSelfServiceUserRequestSchema
>;

const ResponseShape = {
  officeId: z.number(),
  clientId: z.number(),
  resourceId: z.number()
};

export const UpdateSelfServiceUserResponseSchema = z.object({
  ...ResponseShape,
  changes: z.record(z.unknown()).optional()
});

export type UpdateSelfServiceUserResponse = z.infer<
  typeof UpdateSelfServiceUserResponseSchema
>;

export const DeleteSelfServiceUserResponseSchema = z.object({
  ...ResponseShape
});

export type DeleteSelfServiceUserResponse = z.infer<typeof DeleteSelfServiceUserResponseSchema>;
