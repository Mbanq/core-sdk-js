import { type Command, type Config } from '../../types';
import { GetConfigurationsResponse, GetConfigurationByNameResponse, UpdateConfigurationRequest, UpdateConfigurationResponse } from '../../types/globalConfiguration';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

/**
 * Retrieves all global configurations for the banking system.
 *
 * This API returns all configuration settings including their names, enabled status,
 * IDs, trap door settings, and value data types. These configurations control various
 * aspects of the banking platform's behavior.
 *
 * @returns A Command that when executed returns all global configurations
 *
 * @example
 * ```typescript
 * const getConfigsCmd = GetConfigurations();
 * const result = await getConfigsCmd.execute(config);
 *
 * // Access the configurations array
 * result.globalConfiguration.forEach(config => {
 *   console.log(`${config.name}: ${config.enabled ? 'enabled' : 'disabled'}`);
 * });
 * ```
 *
 * @see {@link https://apidocs.cloud.mbanq.com/reference/get_v1-configurations} API Documentation
 */
export const GetConfigurations = (): Command<{}, GetConfigurationsResponse> => {
  return {
    input: {},
    metadata: {
      commandName: 'GetConfigurations',
      path: '/v1/configurations',
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<GetConfigurationsResponse>('/v1/configurations');
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

/**
 * Retrieves a specific global configuration by its name.
 *
 * This API returns the configuration details for a specific global configuration
 * identified by its name, including its value, description, trap door setting,
 * and value data type.
 *
 * @param configName - The name of the configuration to retrieve
 *
 * @returns A Command that when executed returns the specific configuration details
 *
 * @example
 * ```typescript
 * const getConfigCmd = GetConfigurationByName('virtual-card-reordering-limit');
 * const result = await getConfigCmd.execute(config);
 *
 * console.log(`Value: ${result.value}`);
 * console.log(`Description: ${result.description}`);
 * console.log(`Data Type: ${result.valueDataType}`);
 * ```
 *
 * @see {@link https://apidocs.cloud.mbanq.com/reference/get_v1-configurations-name-configname} API Documentation
 */
export const GetConfigurationByName = (
  configName: string
): Command<{ configName: string }, GetConfigurationByNameResponse> => {
  return {
    input: { configName },
    metadata: {
      commandName: 'GetConfigurationByName',
      path: `/v1/configurations/name/${configName}`,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<GetConfigurationByNameResponse>(
          `/v1/configurations/name/${configName}`
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

/**
 * Enables or disables a specific global configuration.
 *
 * This API allows you to enable or disable a configuration by its ID.
 * The configuration's enabled status will be updated according to the provided value.
 *
 * @param configId - The ID of the configuration to update
 * @param requestData - The update parameters
 * @param requestData.enabled - Whether the configuration should be enabled (true) or disabled (false)
 *
 * @returns A Command that when executed returns the update confirmation
 *
 * @example
 * ```typescript
 * // Enable a configuration
 * const enableCmd = EnableDisableConfiguration(33, { enabled: true });
 * const result = await enableCmd.execute(config);
 * console.log(`Configuration ${result.resourceId} updated`);
 *
 * // Disable a configuration
 * const disableCmd = EnableDisableConfiguration(33, { enabled: false });
 * await disableCmd.execute(config);
 * ```
 *
 * @see {@link https://apidocs.cloud.mbanq.com/reference/enabledisableconfiguration} API Documentation
 */
export const EnableDisableConfiguration = (
  configId: number,
  requestData: UpdateConfigurationRequest
): Command<{
  configId: number;
  requestData: UpdateConfigurationRequest;
}, UpdateConfigurationResponse> => {
  return {
    input: { configId, requestData },
    metadata: {
      commandName: 'EnableDisableConfiguration',
      path: `/v1/configurations/${configId}`,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<UpdateConfigurationResponse>(
          `/v1/configurations/${configId}`,
          requestData
        );
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
