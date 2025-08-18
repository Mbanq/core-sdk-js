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

export const VALID_STATUS_VALUES = [
  'DRAFT',
  'AML_SCREENING',
  'AML_REJECTED',
  'EXECUTION_SCHEDULED',
  'EXECUTION_PROCESSING',
  'EXECUTION_SUCCESS',
  'EXECUTION_FAILURE',
  'RETURNED',
  'CANCELLED',
  'COMPLIANCE_FAILURE',
  'DELETED',
  'UNKNOWN'
] as const;

export const VALID_PAYMENT_RAIL_VALUES = ['ACH', 'WIRE', 'SWIFT', 'INTERNAL', 'FXPAY', 'CARD'] as const;
export const VALID_PAYMENT_TYPE_VALUES = ['CREDIT', 'DEBIT'] as const;
export const VALID_SORT_ORDER_VALUES = ['ASC', 'DESC'] as const;
