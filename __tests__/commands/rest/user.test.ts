import { EnableSelfServiceAccess, UpdateSelfServiceUser, DeleteSelfServiceUser, GetUserDetail } from '../../../src/commands/rest/user';
import { EnableSelfServiceAccessRequest, UpdateSelfServiceUserRequest } from '../../../src/types/user';
import baseRequest from '../../../src/utils/baseRequest';
import { vi, describe, it, expect } from 'vitest';

vi.mock('../../../src/utils/baseRequest');

describe('GetUserDetail', () => {
  const mockConfig = {
    auth: {
      clientId: 'clientId',
      clientSecret: 'clientSecret'
    },
    encryption: {
      key: 'key',
      iv: 'iv'
    },
    tenantId: 'tenantId',
    baseUrl: 'https://api.mbanq.com'
  };

  const mockUserDetail = {
    username: 'testUser',
    userId: 123,
    accessToken: 'test-token',
    authenticated: true,
    officeId: 1,
    officeName: 'Head Office',
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
    permissions: ['READ_CLIENT', 'CREATE_CLIENT'],
    shouldRenewPassword: false,
    isTwoFactorAuthenticationRequired: false,
    isSelfServiceUser: false
  };

  it('should get user detail successfully', async () => {
    const mockAxios = {
      get: vi.fn().mockResolvedValue({ data: mockUserDetail })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = GetUserDetail();
    const result = await command.execute(mockConfig);

    expect(baseRequest).toHaveBeenCalledWith(mockConfig);
    expect(mockAxios.get).toHaveBeenCalledWith('/v1/userdetails');
    expect(result).toEqual(mockUserDetail);
  });

  it('should get user detail with params', async () => {
    const mockAxios = {
      get: vi.fn().mockResolvedValue({ data: mockUserDetail })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = GetUserDetail({ tenantId: 'customTenant' });
    const result = await command.execute(mockConfig);

    expect(baseRequest).toHaveBeenCalledWith(mockConfig);
    expect(mockAxios.get).toHaveBeenCalledWith('/v1/userdetails');
    expect(result).toEqual(mockUserDetail);
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('API Error');
    const mockAxios = {
      get: vi.fn().mockRejectedValue(mockError)
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = GetUserDetail();

    // We expect the command to throw because handleAxiosError throws
    await expect(command.execute(mockConfig)).rejects.toThrow();
  });

  it('should override tenantId if provided in params', async () => {
    const mockAxios = {
      get: vi.fn().mockResolvedValue({ data: mockUserDetail })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = GetUserDetail({ tenantId: 'newTenantId' });
    await command.execute(mockConfig);

    expect(baseRequest).toHaveBeenCalledWith({
      ...mockConfig,
      tenantId: 'newTenantId'
    });
  });
});

describe('EnableSelfServiceAccess', () => {
  const mockConfig = {
    auth: {
      clientId: 'clientId',
      clientSecret: 'clientSecret'
    },
    encryption: {
      key: 'key',
      iv: 'iv'
    },
    tenantId: 'tenantId',
    baseUrl: 'https://api.mbanq.com'
  };

  const mockRequestData: EnableSelfServiceAccessRequest = {
    username: 'testUserName',
    firstname: 'testFirstName',
    lastname: 'testLastName',
    officeId: 1,
    roles: [1],
    isSelfServiceUser: true,
    sendPasswordToEmail: false,
    email: 'test@gmail.com',
    password: 'user1234',
    repeatPassword: 'user1234',
    enabled: false,
    clients: []
  };

  const mockResponse = {
    id: '107',
    officeId: 1,
    clientId: 1,
    resourceId: 107,
    data: {
      client: {
        officeName: 'Head Office',
        displayName: 'Smith R',
        accountNo: 1,
        id: 1,
        status: 'Active'
      },
      maker: {
        firstName: 'App',
        lastName: 'Administrator',
        id: 1,
        email: 'documents@gwocu.com',
        username: 'admin'
      },
      createdUser: {
        firstName: 'testFirstName',
        lastName: 'testLastName',
        id: 107,
        email: 'test@gmail.com',
        username: 'testUserName'
      }
    }
  };

  it('should enable self-service access successfully', async () => {
    const mockAxios = {
      post: vi.fn().mockResolvedValue({ data: mockResponse })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = EnableSelfServiceAccess(mockRequestData);
    const result = await command.execute(mockConfig);

    expect(baseRequest).toHaveBeenCalledWith(mockConfig);
    expect(mockAxios.post).toHaveBeenCalledWith('/v1/users', mockRequestData);
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('API Error');
    const mockAxios = {
      post: vi.fn().mockRejectedValue(mockError)
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = EnableSelfServiceAccess(mockRequestData);

    // We expect the command to throw because handleAxiosError throws
    await expect(command.execute(mockConfig)).rejects.toThrow();
  });

  it('should override tenantId if provided in params', async () => {
    const mockAxios = {
      post: vi.fn().mockResolvedValue({ data: mockResponse })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = EnableSelfServiceAccess(mockRequestData, { tenantId: 'newTenantId' });
    await command.execute(mockConfig);

    expect(baseRequest).toHaveBeenCalledWith({
      ...mockConfig,
      tenantId: 'newTenantId'
    });
  });
});

describe('UpdateSelfServiceUser', () => {
  const mockConfig = {
    auth: {
      clientId: 'clientId',
      clientSecret: 'clientSecret'
    },
    encryption: {
      key: 'key',
      iv: 'iv'
    },
    tenantId: 'tenantId',
    baseUrl: 'https://api.mbanq.com'
  };

  const mockRequestData: UpdateSelfServiceUserRequest = {
    userId: 123,
    username: 'updatedUserName',
    firstname: 'updatedFirstName',
    lastname: 'updatedLastName',
    officeId: 1,
    roles: [1, 2],
    sendPasswordToEmail: true,
    email: 'updated@gmail.com',
    password: 'newPass1234',
    repeatPassword: 'newPass1234',
    enabled: true,
    clients: [1, 2]
  };

  const mockResponse = {
    officeId: 1,
    clientId: 1,
    resourceId: 123,
    changes: {
      username: 'updatedUserName',
      email: 'updated@gmail.com',
      enabled: true
    }
  };

  it('should update self-service user successfully', async () => {
    const mockAxios = {
      put: vi.fn().mockResolvedValue({ data: mockResponse })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = UpdateSelfServiceUser(mockRequestData);
    const result = await command.execute(mockConfig);

    expect(baseRequest).toHaveBeenCalledWith(mockConfig);
    expect(mockAxios.put).toHaveBeenCalledWith('/v1/users/123', {
      username: 'updatedUserName',
      firstname: 'updatedFirstName',
      lastname: 'updatedLastName',
      officeId: 1,
      roles: [1, 2],
      isSelfServiceUser: true,
      sendPasswordToEmail: true,
      email: 'updated@gmail.com',
      password: 'newPass1234',
      repeatPassword: 'newPass1234',
      enabled: true,
      clients: [1, 2]
    });
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('API Error');
    const mockAxios = {
      put: vi.fn().mockRejectedValue(mockError)
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = UpdateSelfServiceUser(mockRequestData);

    // We expect the command to throw because handleAxiosError throws
    await expect(command.execute(mockConfig)).rejects.toThrow();
  });

  it('should override tenantId if provided in params', async () => {
    const mockAxios = {
      put: vi.fn().mockResolvedValue({ data: mockResponse })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = UpdateSelfServiceUser(mockRequestData, { tenantId: 'newTenantId' });
    await command.execute(mockConfig);

    expect(baseRequest).toHaveBeenCalledWith({
      ...mockConfig,
      tenantId: 'newTenantId'
    });
  });

  it('should exclude userId from request body', async () => {
    const mockAxios = {
      put: vi.fn().mockResolvedValue({ data: mockResponse })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = UpdateSelfServiceUser(mockRequestData);
    await command.execute(mockConfig);

    // Verify that userId is not in the request body
    const requestBody = mockAxios.put.mock.calls[0][1];
    expect(requestBody).not.toHaveProperty('userId');
    expect(requestBody).toHaveProperty('username');
  });
});

describe('DeleteSelfServiceUser', () => {
  const mockConfig = {
    auth: {
      clientId: 'clientId',
      clientSecret: 'clientSecret'
    },
    encryption: {
      key: 'key',
      iv: 'iv'
    },
    tenantId: 'tenantId',
    baseUrl: 'https://api.mbanq.com'
  };

  const mockResponse = {
    officeId: 1,
    clientId: 1,
    resourceId: 123
  };

  it('should delete self-service user successfully', async () => {
    const mockAxios = {
      delete: vi.fn().mockResolvedValue({ data: mockResponse })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = DeleteSelfServiceUser(123, { tenantId: 'tenantId' });
    const result = await command.execute(mockConfig);

    expect(baseRequest).toHaveBeenCalledWith(mockConfig);
    expect(mockAxios.delete).toHaveBeenCalledWith('/v1/users/123');
    expect(result).toEqual(mockResponse);
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('API Error');
    const mockAxios = {
      delete: vi.fn().mockRejectedValue(mockError)
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = DeleteSelfServiceUser(123, { tenantId: 'tenantId' });

    // We expect the command to throw because handleAxiosError throws
    await expect(command.execute(mockConfig)).rejects.toThrow();
  });

  it('should override tenantId if provided in params', async () => {
    const mockAxios = {
      delete: vi.fn().mockResolvedValue({ data: mockResponse })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = DeleteSelfServiceUser(123, { tenantId: 'newTenantId' });
    await command.execute(mockConfig);

    expect(baseRequest).toHaveBeenCalledWith({
      ...mockConfig,
      tenantId: 'newTenantId'
    });
  });

  it('should use correct userId in the DELETE endpoint', async () => {
    const mockAxios = {
      delete: vi.fn().mockResolvedValue({ data: mockResponse })
    };
    (baseRequest as any).mockResolvedValue(mockAxios);

    const command = DeleteSelfServiceUser(456, { tenantId: 'tenantId' });
    await command.execute(mockConfig);

    expect(mockAxios.delete).toHaveBeenCalledWith('/v1/users/456');
  });
});

