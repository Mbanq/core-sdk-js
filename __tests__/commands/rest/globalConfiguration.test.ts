import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GetConfigurations } from '../../../src/commands/rest/globalConfiguration';
import * as baseRequestModule from '../../../src/utils/baseRequest';

describe('GlobalConfiguration Commands', () => {
    let mockAxiosInstance: any;

    beforeEach(() => {
        vi.stubEnv('SECRET', 'your_secret');
        vi.stubEnv('SIGNEE', 'your_signee');
        vi.stubEnv('TENANT_ID', 'your_tenant_id');
        vi.stubEnv('BASE_URL', 'https://your.api.url');

        mockAxiosInstance = {
            get: vi.fn(),
            post: vi.fn(),
            put: vi.fn(),
            delete: vi.fn()
        };

        vi.spyOn(baseRequestModule, 'default').mockResolvedValue(mockAxiosInstance);
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.unstubAllEnvs();
    });

    const mockConfig = {
        secret: 'your_secret',
        signee: 'your_signee',
        tenantId: 'your_tenant_id',
        baseUrl: 'https://your.api.url'
    };

    describe('GetConfigurations', () => {
        it('should get all global configurations successfully', async () => {
            const mockResponse = {
                data: {
                    globalConfiguration: [
                        {
                            name: 'maker-checker',
                            enabled: false,
                            id: 1,
                            trapDoor: false,
                            valueDataType: 'NONE'
                        },
                        {
                            name: 'reschedule-future-repayments',
                            enabled: true,
                            id: 5,
                            trapDoor: false,
                            valueDataType: 'NONE'
                        }
                    ]
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = { tenantId: 'z01j3e71zd6zkq90' };
            const command = GetConfigurations(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/configurations');
            expect(result).toBeDefined();
            expect(result!.globalConfiguration).toHaveLength(2);
            expect(result!.globalConfiguration[0]).toEqual({
                name: 'maker-checker',
                enabled: false,
                id: 1,
                trapDoor: false,
                valueDataType: 'NONE'
            });
            expect(result!.globalConfiguration[1]).toEqual({
                name: 'reschedule-future-repayments',
                enabled: true,
                id: 5,
                trapDoor: false,
                valueDataType: 'NONE'
            });
        });

        it('should get configurations without tenantId parameter', async () => {
            const mockResponse = {
                data: {
                    globalConfiguration: [
                        {
                            name: 'test-config',
                            enabled: true,
                            id: 10,
                            trapDoor: true,
                            valueDataType: 'STRING'
                        }
                    ]
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = {};
            const command = GetConfigurations(params);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/configurations');
            expect(result).toBeDefined();
            expect(result!.globalConfiguration).toHaveLength(1);
            expect(result!.globalConfiguration[0].name).toBe('test-config');
        });

        it('should use custom tenantId when provided', async () => {
            const mockResponse = {
                data: {
                    globalConfiguration: []
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = { tenantId: 'custom-tenant' };
            const command = GetConfigurations(params);
            const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
            await command.execute(mockConfig);

            expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
        });

        it('should handle empty configuration list', async () => {
            const mockResponse = {
                data: {
                    globalConfiguration: []
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = {};
            const command = GetConfigurations(params);
            const result = await command.execute(mockConfig);

            expect(result).toBeDefined();
            expect(result!.globalConfiguration).toEqual([]);
            expect(result!.globalConfiguration).toHaveLength(0);
        });

        it('should handle configurations with different value data types', async () => {
            const mockResponse = {
                data: {
                    globalConfiguration: [
                        {
                            name: 'config-none',
                            enabled: true,
                            id: 1,
                            trapDoor: false,
                            valueDataType: 'NONE'
                        },
                        {
                            name: 'config-string',
                            enabled: true,
                            id: 2,
                            trapDoor: false,
                            valueDataType: 'STRING'
                        },
                        {
                            name: 'config-number',
                            enabled: false,
                            id: 3,
                            trapDoor: true,
                            valueDataType: 'NUMBER'
                        }
                    ]
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const params = {};
            const command = GetConfigurations(params);
            const result = await command.execute(mockConfig);

            expect(result!.globalConfiguration).toHaveLength(3);
            expect(result!.globalConfiguration[0].valueDataType).toBe('NONE');
            expect(result!.globalConfiguration[1].valueDataType).toBe('STRING');
            expect(result!.globalConfiguration[2].valueDataType).toBe('NUMBER');
        });

        it('should handle errors properly', async () => {
            const mockError = new Error('Failed to fetch configurations');
            mockAxiosInstance.get.mockRejectedValue(mockError);

            const params = {};
            const command = GetConfigurations(params);

            await expect(command.execute(mockConfig)).rejects.toThrow('Failed to fetch configurations');
        });

        it('should handle network errors', async () => {
            const mockError = new Error('Network error');
            mockAxiosInstance.get.mockRejectedValue(mockError);

            const params = { tenantId: 'test-tenant' };
            const command = GetConfigurations(params);

            await expect(command.execute(mockConfig)).rejects.toThrow('Network error');
        });

        it('should handle unauthorized errors', async () => {
            const mockError = new Error('Unauthorized');
            mockAxiosInstance.get.mockRejectedValue(mockError);

            const params = {};
            const command = GetConfigurations(params);

            await expect(command.execute(mockConfig)).rejects.toThrow('Unauthorized');
        });

        it('should have correct metadata', () => {
            const params = {};
            const command = GetConfigurations(params);

            expect(command.metadata.commandName).toBe('GetConfigurations');
            expect(command.metadata.path).toBe('/v1/configurations');
            expect(command.metadata.method).toBe('GET');
        });

        it('should have correct input parameters', () => {
            const params = { tenantId: 'test-tenant' };
            const command = GetConfigurations(params);

            expect(command.input).toEqual({ tenantId: 'test-tenant' });
        });

        it('should have correct input parameters when tenantId is not provided', () => {
            const params = {};
            const command = GetConfigurations(params);

            expect(command.input).toEqual({});
        });
    });
});
