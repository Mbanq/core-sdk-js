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
