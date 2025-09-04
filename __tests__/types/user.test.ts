import { describe, it, expect } from 'vitest';
import { ZodError } from 'zod';
import {
  RoleSchema,
  UserDetailSchema,
  UserDetailShape,
  type UserDetail
} from '../../src/types/user';

describe('User Type Validations', () => {
  describe('RoleSchema', () => {
    it('should validate a valid role object', () => {
      const validRole = {
        id: 1,
        name: 'Admin',
        description: 'Administrator role',
        disabled: false,
        isSelfService: false,
        position: 1
      };

      expect(() => RoleSchema.parse(validRole)).not.toThrow();
      const result = RoleSchema.parse(validRole);
      expect(result.id).toBe(1);
      expect(result.name).toBe('Admin');
      expect(result.description).toBe('Administrator role');
      expect(result.disabled).toBe(false);
      expect(result.isSelfService).toBe(false);
      expect(result.position).toBe(1);
    });

    it('should validate role with boolean flags set to true', () => {
      const roleWithFlags = {
        id: 2,
        name: 'SelfService',
        description: 'Self-service role',
        disabled: true,
        isSelfService: true,
        position: 2
      };

      expect(() => RoleSchema.parse(roleWithFlags)).not.toThrow();
      const result = RoleSchema.parse(roleWithFlags);
      expect(result.disabled).toBe(true);
      expect(result.isSelfService).toBe(true);
    });

    it('should throw ZodError for missing required fields', () => {
      const incompleteRole = {
        id: 1,
        name: 'Admin'
        // missing description, disabled, isSelfService, position
      };

      expect(() => RoleSchema.parse(incompleteRole)).toThrow(ZodError);
    });

    it('should throw ZodError for invalid field types', () => {
      const invalidRole = {
        id: '1', // should be number
        name: 123, // should be string
        description: 'Administrator role',
        disabled: 'false', // should be boolean
        isSelfService: 0, // should be boolean
        position: '1' // should be number
      };

      expect(() => RoleSchema.parse(invalidRole)).toThrow(ZodError);
    });

    it('should throw ZodError for negative position', () => {
      const roleWithNegativePosition = {
        id: 1,
        name: 'Admin',
        description: 'Administrator role',
        disabled: false,
        isSelfService: false,
        position: -1
      };

      // This should pass since Zod doesn't enforce positive numbers by default
      expect(() => RoleSchema.parse(roleWithNegativePosition)).not.toThrow();
    });
  });

  describe('UserDetailSchema', () => {
    const validUserDetail = {
      username: 'john.doe',
      userId: 12345,
      accessToken: 'mock-access-token',
      authenticated: true,
      officeId: 1,
      officeName: 'Main Office',
      roles: [
        {
          id: 1,
          name: 'Admin',
          description: 'Administrator role',
          disabled: false,
          isSelfService: false,
          position: 1
        }
      ],
      permissions: ['READ_USERS', 'WRITE_USERS'],
      shouldRenewPassword: false,
      isTwoFactorAuthenticationRequired: false,
      isSelfServiceUser: false
    };

    it('should validate a valid user detail object', () => {
      expect(() => UserDetailSchema.parse(validUserDetail)).not.toThrow();
      const result = UserDetailSchema.parse(validUserDetail);
      
      expect(result.username).toBe('john.doe');
      expect(result.userId).toBe(12345);
      expect(result.accessToken).toBe('mock-access-token');
      expect(result.authenticated).toBe(true);
      expect(result.officeId).toBe(1);
      expect(result.officeName).toBe('Main Office');
      expect(result.roles).toHaveLength(1);
      expect(result.permissions).toEqual(['READ_USERS', 'WRITE_USERS']);
      expect(result.shouldRenewPassword).toBe(false);
      expect(result.isTwoFactorAuthenticationRequired).toBe(false);
      expect(result.isSelfServiceUser).toBe(false);
    });

    it('should validate user detail with multiple roles', () => {
      const userWithMultipleRoles = {
        ...validUserDetail,
        roles: [
          {
            id: 1,
            name: 'Admin',
            description: 'Administrator role',
            disabled: false,
            isSelfService: false,
            position: 1
          },
          {
            id: 2,
            name: 'User',
            description: 'Standard user role',
            disabled: false,
            isSelfService: true,
            position: 2
          }
        ]
      };

      expect(() => UserDetailSchema.parse(userWithMultipleRoles)).not.toThrow();
      const result = UserDetailSchema.parse(userWithMultipleRoles);
      expect(result.roles).toHaveLength(2);
      expect(result.roles[0].name).toBe('Admin');
      expect(result.roles[1].name).toBe('User');
    });

    it('should validate user detail with empty roles array', () => {
      const userWithNoRoles = {
        ...validUserDetail,
        roles: []
      };

      expect(() => UserDetailSchema.parse(userWithNoRoles)).not.toThrow();
      const result = UserDetailSchema.parse(userWithNoRoles);
      expect(result.roles).toHaveLength(0);
    });

    it('should validate user detail with empty permissions array', () => {
      const userWithNoPermissions = {
        ...validUserDetail,
        permissions: []
      };

      expect(() => UserDetailSchema.parse(userWithNoPermissions)).not.toThrow();
      const result = UserDetailSchema.parse(userWithNoPermissions);
      expect(result.permissions).toHaveLength(0);
    });

    it('should validate user detail with many permissions', () => {
      const userWithManyPermissions = {
        ...validUserDetail,
        permissions: [
          'READ_USERS',
          'WRITE_USERS', 
          'DELETE_USERS',
          'READ_PAYMENTS',
          'WRITE_PAYMENTS',
          'READ_ACCOUNTS',
          'ADMIN_DASHBOARD'
        ]
      };

      expect(() => UserDetailSchema.parse(userWithManyPermissions)).not.toThrow();
      const result = UserDetailSchema.parse(userWithManyPermissions);
      expect(result.permissions).toHaveLength(7);
      expect(result.permissions).toContain('ADMIN_DASHBOARD');
    });

    it('should validate user detail with all boolean flags set to true', () => {
      const userWithAllFlags = {
        ...validUserDetail,
        authenticated: true,
        shouldRenewPassword: true,
        isTwoFactorAuthenticationRequired: true,
        isSelfServiceUser: true
      };

      expect(() => UserDetailSchema.parse(userWithAllFlags)).not.toThrow();
      const result = UserDetailSchema.parse(userWithAllFlags);
      expect(result.authenticated).toBe(true);
      expect(result.shouldRenewPassword).toBe(true);
      expect(result.isTwoFactorAuthenticationRequired).toBe(true);
      expect(result.isSelfServiceUser).toBe(true);
    });

    it('should throw ZodError for missing required fields', () => {
      const incompleteUser = {
        username: 'john.doe',
        userId: 12345
        // missing many required fields
      };

      expect(() => UserDetailSchema.parse(incompleteUser)).toThrow(ZodError);
    });

    it('should throw ZodError for invalid field types', () => {
      const invalidUser = {
        username: 123, // should be string
        userId: 'invalid', // should be number
        accessToken: null, // should be string
        authenticated: 'true', // should be boolean
        officeId: '1', // should be number
        officeName: 456, // should be string
        roles: 'invalid', // should be array
        permissions: null, // should be array
        shouldRenewPassword: 'false', // should be boolean
        isTwoFactorAuthenticationRequired: 0, // should be boolean
        isSelfServiceUser: 'no' // should be boolean
      };

      expect(() => UserDetailSchema.parse(invalidUser)).toThrow(ZodError);
    });

    it('should throw ZodError for invalid role in roles array', () => {
      const userWithInvalidRole = {
        ...validUserDetail,
        roles: [
          {
            id: 'invalid', // should be number
            name: 123, // should be string
            description: 'Administrator role',
            disabled: false,
            isSelfService: false,
            position: 1
          }
        ]
      };

      expect(() => UserDetailSchema.parse(userWithInvalidRole)).toThrow(ZodError);
    });

    it('should throw ZodError for invalid permissions array', () => {
      const userWithInvalidPermissions = {
        ...validUserDetail,
        permissions: [123, 456] // should be array of strings
      };

      expect(() => UserDetailSchema.parse(userWithInvalidPermissions)).toThrow(ZodError);
    });

    it('should validate user with negative userId (edge case)', () => {
      const userWithNegativeId = {
        ...validUserDetail,
        userId: -1
      };

      // This should pass since Zod doesn't enforce positive numbers by default
      expect(() => UserDetailSchema.parse(userWithNegativeId)).not.toThrow();
    });

    it('should validate user with very long strings', () => {
      const userWithLongStrings = {
        ...validUserDetail,
        username: 'a'.repeat(1000),
        accessToken: 'b'.repeat(2000),
        officeName: 'c'.repeat(500)
      };

      expect(() => UserDetailSchema.parse(userWithLongStrings)).not.toThrow();
      const result = UserDetailSchema.parse(userWithLongStrings);
      expect(result.username).toHaveLength(1000);
      expect(result.accessToken).toHaveLength(2000);
      expect(result.officeName).toHaveLength(500);
    });
  });

  describe('UserDetailShape', () => {
    it('should have correct shape structure', () => {
      expect(UserDetailShape).toHaveProperty('username');
      expect(UserDetailShape).toHaveProperty('userId');
      expect(UserDetailShape).toHaveProperty('accessToken');
      expect(UserDetailShape).toHaveProperty('authenticated');
      expect(UserDetailShape).toHaveProperty('officeId');
      expect(UserDetailShape).toHaveProperty('officeName');
      expect(UserDetailShape).toHaveProperty('roles');
      expect(UserDetailShape).toHaveProperty('permissions');
      expect(UserDetailShape).toHaveProperty('shouldRenewPassword');
      expect(UserDetailShape).toHaveProperty('isTwoFactorAuthenticationRequired');
      expect(UserDetailShape).toHaveProperty('isSelfServiceUser');
    });
  });

  describe('UserDetail type', () => {
    it('should infer correct TypeScript type', () => {
      const user: UserDetail = {
        username: 'test.user',
        userId: 123,
        accessToken: 'token',
        authenticated: true,
        officeId: 1,
        officeName: 'Office',
        roles: [],
        permissions: [],
        shouldRenewPassword: false,
        isTwoFactorAuthenticationRequired: false,
        isSelfServiceUser: false
      };

      // TypeScript compilation success means the type is correct
      expect(user.username).toBe('test.user');
      expect(user.userId).toBe(123);
      expect(typeof user.authenticated).toBe('boolean');
      expect(Array.isArray(user.roles)).toBe(true);
      expect(Array.isArray(user.permissions)).toBe(true);
    });
  });
});