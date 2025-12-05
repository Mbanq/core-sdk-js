import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GetConfigurations, GetConfigurationByName, EnableDisableConfiguration } from '../../../src/commands/rest/globalConfiguration';
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

    describe('GetConfigurationByName', () => {
        it('should get configuration by name successfully', async () => {
            const mockResponse = {
                data: {
                    'virtual-card-reordering-limit': true,
                    value: 'string',
                    id: 0,
                    description: 'string',
                    trapDoor: true,
                    valueDataType: 'string'
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const configName = 'virtual-card-reordering-limit';
            const command = GetConfigurationByName(configName, { tenantId: 'z01j3e71zd6zkq90' });
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/configurations/name/virtual-card-reordering-limit');
            expect(result).toBeDefined();
            expect(result!['virtual-card-reordering-limit']).toBe(true);
            expect(result!.value).toBe('string');
            expect(result!.description).toBe('string');
            expect(result!.trapDoor).toBe(true);
            expect(result!.valueDataType).toBe('string');
        });

        it('should get configuration by name without tenantId', async () => {
            const mockResponse = {
                data: {
                    value: 'test-value',
                    id: 5,
                    description: 'Test configuration',
                    trapDoor: false,
                    valueDataType: 'STRING'
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const configName = 'test-config';
            const command = GetConfigurationByName(configName);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v1/configurations/name/test-config');
            expect(result).toBeDefined();
            expect(result!.value).toBe('test-value');
            expect(result!.description).toBe('Test configuration');
        });

        it('should use custom tenantId when provided', async () => {
            const mockResponse = {
                data: {
                    value: 'test',
                    id: 1
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const configName = 'test-config';
            const command = GetConfigurationByName(configName, { tenantId: 'custom-tenant' });
            const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
            await command.execute(mockConfig);

            expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
        });

        it('should handle configuration with different value data types', async () => {
            const mockResponse = {
                data: {
                    value: '100',
                    id: 10,
                    description: 'Numeric configuration',
                    trapDoor: false,
                    valueDataType: 'NUMBER'
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const configName = 'numeric-config';
            const command = GetConfigurationByName(configName);
            const result = await command.execute(mockConfig);

            expect(result!.valueDataType).toBe('NUMBER');
            expect(result!.value).toBe('100');
        });

        it('should handle configuration not found error', async () => {
            const mockError = new Error('Configuration not found');
            mockAxiosInstance.get.mockRejectedValue(mockError);

            const configName = 'non-existent-config';
            const command = GetConfigurationByName(configName);

            await expect(command.execute(mockConfig)).rejects.toThrow('Configuration not found');
        });

        it('should handle network errors', async () => {
            const mockError = new Error('Network error');
            mockAxiosInstance.get.mockRejectedValue(mockError);

            const configName = 'test-config';
            const command = GetConfigurationByName(configName, { tenantId: 'test-tenant' });

            await expect(command.execute(mockConfig)).rejects.toThrow('Network error');
        });

        it('should handle unauthorized errors', async () => {
            const mockError = new Error('Unauthorized');
            mockAxiosInstance.get.mockRejectedValue(mockError);

            const configName = 'test-config';
            const command = GetConfigurationByName(configName);

            await expect(command.execute(mockConfig)).rejects.toThrow('Unauthorized');
        });

        it('should have correct metadata', () => {
            const configName = 'test-config';
            const command = GetConfigurationByName(configName);

            expect(command.metadata.commandName).toBe('GetConfigurationByName');
            expect(command.metadata.path).toBe('/v1/configurations/name/test-config');
            expect(command.metadata.method).toBe('GET');
        });

        it('should have correct metadata with different config name', () => {
            const configName = 'virtual-card-reordering-limit';
            const command = GetConfigurationByName(configName);

            expect(command.metadata.path).toBe('/v1/configurations/name/virtual-card-reordering-limit');
        });

        it('should have correct input parameters', () => {
            const configName = 'test-config';
            const command = GetConfigurationByName(configName, { tenantId: 'test-tenant' });

            expect(command.input.configName).toBe('test-config');
            expect(command.input.configuration?.tenantId).toBe('test-tenant');
        });

        it('should have correct input parameters when tenantId is not provided', () => {
            const configName = 'test-config';
            const command = GetConfigurationByName(configName);

            expect(command.input.configName).toBe('test-config');
            expect(command.input.configuration).toBeUndefined();
        });
    });

    describe('EnableDisableConfiguration', () => {
        it('should enable configuration successfully', async () => {
            const mockResponse = {
                data: {
                    id: '33',
                    resourceId: 33,
                    changes: {
                        enabled: true
                    }
                }
            };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);

            const configId = 33;
            const requestData = { enabled: true };
            const command = EnableDisableConfiguration(configId, requestData, { tenantId: 'z01j3e71zd6zkq90' });
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
            expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/configurations/33', { enabled: true });
            expect(result).toBeDefined();
            expect(result!.id).toBe('33');
            expect(result!.resourceId).toBe(33);
            expect(result!.changes?.enabled).toBe(true);
        });

        it('should disable configuration successfully', async () => {
            const mockResponse = {
                data: {
                    id: '33',
                    resourceId: 33,
                    changes: {
                        enabled: false
                    }
                }
            };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);

            const configId = 33;
            const requestData = { enabled: false };
            const command = EnableDisableConfiguration(configId, requestData, { tenantId: 'z01j3e71zd6zkq90' });
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/configurations/33', { enabled: false });
            expect(result!.changes?.enabled).toBe(false);
        });

        it('should update configuration without tenantId', async () => {
            const mockResponse = {
                data: {
                    id: '10',
                    resourceId: 10,
                    changes: {
                        enabled: true
                    }
                }
            };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);

            const configId = 10;
            const requestData = { enabled: true };
            const command = EnableDisableConfiguration(configId, requestData);
            const result = await command.execute(mockConfig);

            expect(mockAxiosInstance.post).toHaveBeenCalledWith('/v1/configurations/10', { enabled: true });
            expect(result).toBeDefined();
            expect(result!.resourceId).toBe(10);
        });

        it('should use custom tenantId when provided', async () => {
            const mockResponse = {
                data: {
                    id: '5',
                    resourceId: 5
                }
            };
            mockAxiosInstance.post.mockResolvedValue(mockResponse);

            const configId = 5;
            const requestData = { enabled: true };
            const command = EnableDisableConfiguration(configId, requestData, { tenantId: 'custom-tenant' });
            const expectedConfig = { ...mockConfig, tenantId: 'custom-tenant' };
            await command.execute(mockConfig);

            expect(baseRequestModule.default).toHaveBeenCalledWith(expectedConfig);
        });

        it('should handle configuration not found error', async () => {
            const mockError = new Error('Configuration not found');
            mockAxiosInstance.post.mockRejectedValue(mockError);

            const configId = 999;
            const requestData = { enabled: true };
            const command = EnableDisableConfiguration(configId, requestData);

            await expect(command.execute(mockConfig)).rejects.toThrow('Configuration not found');
        });

        it('should handle network errors', async () => {
            const mockError = new Error('Network error');
            mockAxiosInstance.post.mockRejectedValue(mockError);

            const configId = 33;
            const requestData = { enabled: false };
            const command = EnableDisableConfiguration(configId, requestData, { tenantId: 'test-tenant' });

            await expect(command.execute(mockConfig)).rejects.toThrow('Network error');
        });

        it('should handle unauthorized errors', async () => {
            const mockError = new Error('Unauthorized');
            mockAxiosInstance.post.mockRejectedValue(mockError);

            const configId = 33;
            const requestData = { enabled: true };
            const command = EnableDisableConfiguration(configId, requestData);

            await expect(command.execute(mockConfig)).rejects.toThrow('Unauthorized');
        });

        it('should have correct metadata', () => {
            const configId = 33;
            const requestData = { enabled: true };
            const command = EnableDisableConfiguration(configId, requestData);

            expect(command.metadata.commandName).toBe('EnableDisableConfiguration');
            expect(command.metadata.path).toBe('/v1/configurations/33');
            expect(command.metadata.method).toBe('POST');
        });

        it('should have correct metadata with different config ID', () => {
            const configId = 100;
            const requestData = { enabled: false };
            const command = EnableDisableConfiguration(configId, requestData);

            expect(command.metadata.path).toBe('/v1/configurations/100');
        });

        it('should have correct input parameters', () => {
            const configId = 33;
            const requestData = { enabled: true };
            const command = EnableDisableConfiguration(configId, requestData, { tenantId: 'test-tenant' });

            expect(command.input.configId).toBe(33);
            expect(command.input.requestData).toEqual({ enabled: true });
            expect(command.input.configuration?.tenantId).toBe('test-tenant');
        });

        it('should have correct input parameters when tenantId is not provided', () => {
            const configId = 33;
            const requestData = { enabled: false };
            const command = EnableDisableConfiguration(configId, requestData);

            expect(command.input.configId).toBe(33);
            expect(command.input.requestData).toEqual({ enabled: false });
            expect(command.input.configuration).toBeUndefined();
        });
    });
});

