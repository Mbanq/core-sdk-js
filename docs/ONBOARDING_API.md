# Onboarding API Documentation

The Core SDK provides a comprehensive process for user onboarding. This document covers all onboarding-related functionality.

## Table of Contents
- [Client Creation](#client-creation)
- [Configuration](#configuration)
- [Upload KYC Documents](#upload-kyc-document)
- [Activate with Verify Client](#activate-with-verify-client)
- [Error Handling](#error-handling)

## Client Creation

### Creating a Client Instance

```typescript
import { createInstance } from 'core-sdk-js';

const client = createInstance({
  baseUrl: 'https://api.example.com',
  tenantId: 'your-tenant-id',
  secret: 'your-api-secret',
  // Optional configurations
  signee: 'your-signee',
  bearerToken: 'your-bearer-token',
  graphqlPath: '/graphql',
  middlewares: [loggingMiddleware, metricsMiddleware],
  logger: (axiosInstance) => console.log('Request made'),
  traceId: 'unique-trace-id',
  axiosConfig: {
    timeout: 30000,
    headers: {
      'Custom-Header': 'value'
    },
    keepAlive: true
  }
});
```

### Configuration Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `baseUrl` | `string` | ✅ | The base URL for the API |
| `tenantId` | `string` | ✅ | Your tenant identifier |
| `secret` | `string` | ❌ | API secret for authentication |
| `credential` | `Credential` | ❌ | Alternative credential object |
| `signee` | `string` | ❌ | Request signee identifier |
| `bearerToken` | `string` | ❌ | Bearer token for authentication |
| `graphqlPath` | `string` | ❌ | Custom GraphQL endpoint path |
| `middlewares` | `Middleware[]` | ❌ | Array of middleware functions |
| `logger` | `function` | ❌ | Custom logging function |
| `traceId` | `string` | ❌ | Request tracing identifier |
| `axiosConfig` | `object` | ❌ | Additional Axios configuration |

## Configuration

### Dynamic Configuration Updates

```typescript
// Update configuration at runtime
client.updateConfig({
  secret: 'new-secret',
  axiosConfig: {
    headers: {
      'New-Header': 'new-value'
    }
  }
});

// Reset to original configuration
client.resetConfig();
```

### Tenant Context

```typescript
// Create a tenant-specific context
const tenantClient = client.tenant('specific-tenant-id');

// All operations on tenantClient will use the specified tenant ID
await tenantClient.onboarding.createInstance(clientData);
```

## Upload KYC Document

The uploaded documents can be fetched from Socure using the Image request API. Upload the collected document and SSN.

### List Document Type ID

```typescript
const createCommand = client.onboarding.getDocumentTypeId(clientId);
const result = await createCommand.execute();
```

### Create Client Identifiers

```typescript
const data = {
  documentTypeId: '647', // need to get from above
  documentKey: '1234567',
  status: 'Active',
  description: 'This document contains personal identification information',
  issuedBy: 'DMV',
  locale: 'en',
  dateFormat: 'dd MMMM yyyy',
  expiryDate: '15 August 2028',
  nationality: '633',
  issuedDate: '8 February 2028'
};

const createCommand = client.onboarding.createInstanceIdentifier(data);
const result = await createCommand.execute();
```

### Upload Documents

```typescript
const documentData = {
  kycId: '647', // resource_id of create client identifier
  name: 'testFileName1',
  type: 'Active',
  description: 'This document contains personal identification information',
  file: File // (png, jpeg, jpg)
};

const createCommand = client.onboarding.uploadDocument(documentData);
const result = await createCommand.execute();
```

## Activate with Verify Client

This is the final step of onboarding that is critical as it grants the client full access to perform all banking operations.

```typescript
const documentData = {
  clientId: '',
  kycVerificationType: 'FULL', // ('FULL', 'PARTIAL')
  note: '',
  dateFormat: '',
  activationDate: '',
  isActivatedByManualReview: false,
  manualReviewActivationComments: 'false',
  skipVerify: false,
  skipActivate: false
};

const createCommand = client.onboarding.activateWithVerifyClient(documentData);
const result = await createCommand.execute();
```


## Error Handling

### Built-in Error Handling

The SDK provides comprehensive error handling with structured error responses:

```typescript
import { isCommandError } from 'core-sdk-js';

try {
  const result = await client.client.get(123).execute();
} catch (error) {
  if (isCommandError(error)) {
    console.error('API Error:', error.message);
    console.error('Error Code:', error.code);
    console.error('Status:', error.status);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Custom Error Handling with Middleware

```typescript
import { createInstance } from 'core-sdk-js';

const errorHandlingMiddleware = {
  onError: async (command, error) => {
    console.error(`Command ${command.metadata.commandName} failed:`, error);
    // Custom error logging or reporting
  }
};

const client = createInstance({
  baseUrl: 'https://api.example.com',
  tenantId: 'your-tenant-id',
  secret: 'your-secret',
  middlewares: [errorHandlingMiddleware]
});
```

