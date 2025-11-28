import { EnableSelfServiceAccess } from '../../../src/commands/rest/user';
import { EnableSelfServiceAccessRequest } from '../../../src/types/user';
import baseRequest from '../../../src/utils/baseRequest';
import { vi, describe, it, expect } from 'vitest';

vi.mock('../../../src/utils/baseRequest');

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
