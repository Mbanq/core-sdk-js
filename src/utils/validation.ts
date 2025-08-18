import { Config } from '../types';

export const validateConfig = (config: Partial<Config>): string[] => {
  const errors: string[] = [];

  if (!config.baseUrl) {
    errors.push('baseUrl is required');
  } else if (typeof config.baseUrl !== 'string') {
    errors.push('baseUrl must be a string');
  } else {
    try {
      new URL(config.baseUrl);
    } catch {
      errors.push('baseUrl must be a valid URL');
    }
  }

  if (config.axiosConfig?.timeout !== undefined) {
    if (typeof config.axiosConfig.timeout !== 'number' || config.axiosConfig.timeout < 0) {
      errors.push('timeout must be a positive number');
    }
  }

  return errors;
};
