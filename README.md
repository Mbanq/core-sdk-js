<p align="center">
  <img src="https://avatars.githubusercontent.com/u/26124358?s=200&v=4" alt="Mbanq Logo" width="120"/>
</p>

# Core SDK JS

![npm version](https://img.shields.io/npm/v/@mbanq/core-sdk-js.svg)
[![Download](https://img.shields.io/npm/dm/@mbanq/core-sdk-js)](https://www.npmjs.com/package/@mbanq/core-sdk-js)
![license](https://img.shields.io/github/license/Mbanq/core-sdk-js)

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Setup](#setup)
  - [Axios Instance Logger](#axios-instance-logger)
- [Middleware](#middleware)
  - [Logging Middleware](#logging-middleware)
  - [Metrics Middleware](#metrics-middleware)
  - [Custom Middleware](#custom-middleware)
- [API Reference](#api-reference)
  - [Client Operations](#client-operations)
  - [Client Identifier Operations](#client-identifier-operations)
  - [Account Operations](#account-operations)
  - [Payment Operations](#payment-operations)
  - [Multi-Tenant Support](#multi-tenant-support)
- [Documentation](#documentation)
- [Type Safety & Validation](#type-safety--validation)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Introduction
This library provides a comprehensive JavaScript SDK for interacting with the Mbanq payment API. It offers type-safe payment operations with built-in validation, multi-tenant support, and a modern fluent API design.
## Installation

```bash
npm install @mbanq/core-sdk-js
```

## Quick Start

```javascript
import { createClient, CreatePayment, GetTransfers } from '@mbanq/core-sdk-js';

const client = createClient({
  secret: 'your-jwt-secret',
  signee: 'YOUR-SIGNEE',
  baseUrl: 'https://api.cloud.mbanq.com',
  tenantId: 'your-tenant-id'
});

// Create payment
const payment = await client.request(CreatePayment({
  payment: {
    amount: 100.00,
    currency: 'USD',
    description: 'Payment for invoice #123'
  }
}));

// Get transfers
const transfers = await client.request(GetTransfers({
  transferStatus: 'EXECUTION_SCHEDULED',
  tenantId: 'default'
}));
```

## Setup

### Authentication Options

The SDK supports multiple authentication methods. Choose the one that fits your integration:

#### 1. JWT Token Authentication (Recommended)
Use your API secret and signee for JWT-based authentication:

```javascript
const client = createClient({
  secret: 'your-jwt-secret',
  signee: 'YOUR-SIGNEE', 
  baseUrl: 'https://api.cloud.mbanq.com',
  tenantId: 'your-tenant-id'
});
```

#### 2. Bearer Token Authentication
If you already have a valid access token:

```javascript
// With "Bearer " prefix (recommended)
const client = createClient({
  bearerToken: 'Bearer your-access-token',
  baseUrl: 'https://api.cloud.mbanq.com', 
  tenantId: 'your-tenant-id'
});

// Without "Bearer " prefix (automatically added)
const client = createClient({
  bearerToken: 'your-access-token', // "Bearer " will be added automatically
  baseUrl: 'https://api.cloud.mbanq.com', 
  tenantId: 'your-tenant-id'
});
```

#### 3. OAuth Credential Authentication
For OAuth 2.0 password grant flow:

```javascript
const client = createClient({
  credential: {
    client_id: 'your-client-id',
    client_secret: 'your-client-secret',
    username: 'your-username',
    password: 'your-password',
    grant_type: 'password'
  },
  baseUrl: 'https://api.cloud.mbanq.com',
  tenantId: 'your-tenant-id'
});
```

#### Authentication Priority
When multiple authentication methods are provided, the SDK uses them in this order:
1. **`bearerToken`** - Takes highest priority if provided
2. **`credential`** - OAuth flow is used if no bearerToken 
3. **`secret` + `signee`** - JWT authentication used as fallback

#### Additional Configuration Options
```javascript
const client = createClient({
  // Choose one authentication method from above
  secret: 'your-jwt-secret',
  signee: 'YOUR-SIGNEE',
  
  // Required configuration
  baseUrl: 'https://api.cloud.mbanq.com',
  tenantId: 'your-tenant-id',
  
  // Optional configuration
  traceId: 'custom-trace-id', // Custom request tracing identifier
  axiosConfig: {
    timeout: 30000, // Request timeout in milliseconds (default: 29000)
    keepAlive: true, // HTTP keep-alive for connection reuse
    headers: {
      'Custom-Header': 'custom-value' // Additional HTTP headers
    }
  }
});
```

### Security Best Practices

#### Credential Management
- **Never hardcode credentials** in your source code
- Use environment variables or secure credential management systems
- Rotate API secrets and tokens regularly
- Use the minimum required permissions for your integration

#### Environment Variables Example
```javascript
const client = createClient({
  secret: process.env.MBANQ_API_SECRET,
  signee: process.env.MBANQ_API_SIGNEE,
  baseUrl: process.env.MBANQ_API_URL,
  tenantId: process.env.MBANQ_TENANT_ID
});
```

#### Production Considerations
- Use HTTPS endpoints only (`https://`)
- Implement proper error handling to avoid credential leakage in logs
- Configure appropriate request timeouts
- Use connection pooling for high-volume applications

### Axios Instance Logger
You can also configure an Axios instance logger to set up interceptors or other axios-specific configurations:

```javascript
const axiosLogger = (axiosInstance) => {
  // Add request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log('Request:', config.method?.toUpperCase(), config.url);
      return config;
    }
  );
  
  // Add response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log('Response:', response.status, response.config.url);
      return response;
    }
  );
};

const coreSDK = createClient({
  secret: 'testing123',
  signee: 'TESTING',
  baseUrl: 'https://example.com',
  tenantId: 'testing',
  logger: axiosLogger // Configure Axios instance
});
```

## Middleware
The SDK supports middleware for cross-cutting concerns like logging and metrics. Middleware functions are executed automatically around command execution.

**Note**: This is different from the Axios instance logger above. Middleware loggers handle command-level logging, while the Axios logger handles HTTP request/response logging.

### Available Middleware

#### Logging Middleware
Logs command execution details including inputs, outputs, and errors.

```javascript
import { createClient, createLoggingMiddleware } from '@mbanq/core-sdk-js';

const loggingMiddleware = createLoggingMiddleware(console); // or custom logger

const client = createClient({
  secret: 'testing123',
  signee: 'TESTING',
  baseUrl: 'https://example.com',
  tenantId: 'testing',
  middlewares: [loggingMiddleware]
});
```

#### Logger Interface
For custom loggers, implement the Logger interface:

```typescript
interface Logger {
  info: (message: string, ...args: unknown[]) => void;
  error: (message: string, ...args: unknown[]) => void;
  warn?: (message: string, ...args: unknown[]) => void; // Optional
  log?: (message: string, ...args: unknown[]) => void;  // Optional
}

// Example with a custom logger
const customLogger = {
  info: (message, ...args) => myLoggingService.info(message, args),
  error: (message, ...args) => myLoggingService.error(message, args),
  warn: (message, ...args) => myLoggingService.warn(message, args)
};

const middleware = createLoggingMiddleware(customLogger);
```

#### Metrics Middleware
Tracks command execution metrics including counters for started, completed, and error events.

```javascript
import { createClient, createMetricsMiddleware } from '@mbanq/core-sdk-js';

// Your metrics client must implement the MetricsClient interface
const metricsClient = {
  incrementCounter: (counterName) => {
    // Increment your counter (e.g., Prometheus, StatsD, etc.)
    console.log(`Counter: ${counterName}`);
  },
  recordError: (error) => {
    // Optional: Record error details
    console.error('Command error:', error);
  }
};

const metricsMiddleware = createMetricsMiddleware(metricsClient);

const client = createClient({
  secret: 'testing123',
  signee: 'TESTING',
  baseUrl: 'https://example.com',
  tenantId: 'testing',
  middlewares: [metricsMiddleware]
});
```

#### MetricsClient Interface
```typescript
interface MetricsClient {
  incrementCounter: (counterName: string) => void;
  recordError?: (error: Error) => void; // Optional
}
```

#### Using Multiple Middleware
```javascript
const client = createClient({
  // ... other config
  middlewares: [
    createLoggingMiddleware(console),
    createMetricsMiddleware(metricsClient)
  ]
});
```

#### Custom Middleware
You can create custom middleware by implementing the Middleware interface:

```javascript
const customMiddleware = {
  before: async (command) => {
    // Called before command execution
    console.log(`Starting ${command.metadata.commandName}`);
  },
  after: async (command, response) => {
    // Called after successful execution
    console.log(`Completed ${command.metadata.commandName}`, response);
  },
  onError: async (command, error) => {
    // Called when command fails
    console.error(`Error in ${command.metadata.commandName}`, error);
  }
};

const client = createClient({
  // ... other config
  middlewares: [customMiddleware]
});
```

## API Reference

The SDK provides two API patterns for different operations:

### Modern Fluent API (Recommended)
For payment, client, and account operations, use the modern fluent API with method chaining:

```javascript
// Create payment
const payment = await apiClient.payment.create(paymentData).execute();

// Get payment
const payment = await apiClient.payment.get('payment-456').execute();

// List with filters
const payments = await apiClient.payment.list()
  .where('status').eq('DRAFT')
  .where('paymentRail').eq('ACH')
  .execute();
```

### Command Pattern (Legacy Support)
For transfer operations, the SDK also supports the traditional command pattern:

```javascript
// Get transfers with filters
const getTransfersCommand = GetTransfers({
  transferStatus: 'EXECUTION_SCHEDULED',
  executedAt: '2025-01-22',
  paymentType: 'ACH',
  queryLimit: 200,
  tenantId: 'default'
});
const transfers = await coreSDK.request(getTransfersCommand);

// Create a new transfer
const createTransferCommand = CreateTransfer({
  amount: 1000,
  currency: 'USD',
  paymentRail: 'ACH',
  paymentType: 'CREDIT',
  debtor: {
    name: 'Sender Name',
    identifier: '123456789',
    agent: { name: 'Bank Name', identifier: '021000021' }
  },
  creditor: {
    name: 'Recipient Name',
    identifier: '987654321',
    agent: { name: 'Recipient Bank', identifier: '121000248' }
  },
  tenantId: 'default'
});
const newTransfer = await coreSDK.request(createTransferCommand);

// Get specific transfer by ID
const getTransferCommand = GetTransfer({
  transferId: 'transfer-123',
  tenantId: 'default'
});
const transfer = await coreSDK.request(getTransferCommand);

// Mark transfer as successful
const markSuccessCommand = MarkAsSuccess({
  transferId: 'transfer-123',
  tenantId: 'default'
});
await coreSDK.request(markSuccessCommand);

// Mark transfer as processing
const markProcessingCommand = MarkAsProcessing({
  transferId: 'transfer-123',
  tenantId: 'default'
});
await coreSDK.request(markProcessingCommand);

// Mark transfer as returned
const markReturnedCommand = MarkAsReturned({
  transferId: 'transfer-123',
  returnCode: 'R01',
  returnReason: 'Insufficient funds',
  tenantId: 'default'
});
await coreSDK.request(markReturnedCommand);

// Log failed transfer
const logFailCommand = LogFailTransfer({
  transferId: 'transfer-123',
  errorCode: 'E001',
  errorMessage: 'Processing error',
  tenantId: 'default'
});
await coreSDK.request(logFailCommand);

// Mark transfer as failed
const markFailCommand = MarkAsFail({
  transferId: 'transfer-123',
  failureReason: 'Bank rejected',
  tenantId: 'default'
});
await coreSDK.request(markFailCommand);

// Update trace number
const updateTraceCommand = UpdateTraceNumber({
  transferId: 'transfer-123',
  traceNumber: 'TRC123456789',
  tenantId: 'default'
});
await coreSDK.request(updateTraceCommand);
```

Available transfer commands: `GetTransfers`, `CreateTransfer`, `GetTransfer`, `MarkAsSuccess`, `MarkAsProcessing`, `MarkAsReturned`, `LogFailTransfer`, `MarkAsFail`, `UpdateTraceNumber`

### Client Operations

The SDK provides comprehensive client management capabilities with full CRUD operations and advanced filtering. For complete documentation, see [Client API Documentation](./docs/CLIENT_API.md).

```javascript
// Create a new client
const client = await apiClient.client.create({
  firstname: 'John',
  lastname: 'Doe',
  emailAddress: 'john.doe@example.com',
  dateOfBirth: '1990-01-01',
  locale: 'en'
}).execute();

// Get client details
const clientDetails = await apiClient.client.get(123).execute();

// List clients with filtering
const clients = await apiClient.client.list()
  .where('status').eq('active')
  .limit(10)
  .execute();

// Update client information
const updatedClient = await apiClient.client.update(123, {
  emailAddress: 'john.updated@example.com'
}).execute();
```

### Client Identifier Operations

Manage client identity documents (KYC documents) such as passports, driver licenses, and other identification documents. The SDK provides full CRUD operations for client identifiers with support for document masking and field filtering.

```javascript
import { 
  ListClientDocument, 
  CreateClientIdentifier, 
  UpdateClientIdentifier,
  GetPermittedDocumentTypes,
  DeleteClientDocument
} from '@mbanq/core-sdk-js';

// List all client identifiers (documents)
const listCommand = ListClientDocument({ clientId: 15 });
const identifiers = await client.request(listCommand);

// List with unmasked document values
const unmaskedCommand = ListClientDocument({ 
  clientId: 15, 
  unmaskValue: true 
});
const unmaskedIdentifiers = await client.request(unmaskedCommand);

// List with specific fields only
const fieldsCommand = ListClientDocument({ 
  clientId: 15,
  fields: 'documentKey,documentType,status'
});
const filteredIdentifiers = await client.request(fieldsCommand);

// Get permitted document types for a client
const typesCommand = GetPermittedDocumentTypes({ clientId: 15 });
const documentTypes = await client.request(typesCommand);

// Create a new client identifier
const createCommand = CreateClientIdentifier({
  clientId: 15,
  input: {
    documentTypeId: '1',
    documentKey: 'ABC123456',
    status: 'ACTIVE',
    description: 'Valid passport',
    issuedBy: 'Government',
    locale: 'en_US',
    dateFormat: 'yyyy-MM-dd',
    expiryDate: '2030-12-31',
    nationality: 1,
    issuedDate: '2020-01-01'
  }
});
const newIdentifier = await client.request(createCommand);

// Update an existing client identifier
const updateCommand = UpdateClientIdentifier({
  clientId: 15,
  identifierId: 'id123',
  updates: {
    documentTypeId: '1',
    documentKey: 'XYZ789456',
    status: 'ACTIVE',
    description: 'Updated passport'
  }
});
const updatedIdentifier = await client.request(updateCommand);

// Delete a client identifier
const deleteCommand = DeleteClientDocument({
  clientId: 15,
  identifierId: 15
});
const deleteResult = await client.request(deleteCommand);
// Returns: { officeId: 1, clientId: 15, resourceId: 22411 }
```

**Available Commands:** `ListClientDocument`, `GetPermittedDocumentTypes`, `CreateClientIdentifier`, `UpdateClientIdentifier`, `DeleteClientDocument`

**Query Parameters:**
- `unmaskValue` - Set to `true` to return full document reference (unmasked)
- `fields` - Comma-separated list of fields to include in response


### Account Operations

Manage client accounts using the scoped account API with comprehensive CRUD operations and advanced query capabilities. For complete documentation, see [Account API Documentation](./docs/ACCOUNT_API.md).

```javascript
// List all accounts for a client
const accounts = await apiClient.client.for('client-123').accounts.list().execute();

// Get specific account details
const account = await apiClient.client.for('client-123').accounts.get(789).execute();

// Filter accounts by criteria
const savingsAccounts = await apiClient.client.for('client-123').accounts.list()
  .where('productName').eq('Savings Account')
  .execute();

// Update account settings
const updateResult = await apiClient.client.for('client-123').accounts.update('acc_789', {
  nominalAnnualInterestRate: '2.5',
  allowOverdraft: true,
  overdraftLimit: 1000
}).execute();

// Delete account
const deleteResult = await apiClient.client.for('client-123').accounts.delete('acc_789').execute();
```


### Payment Operations

The SDK provides comprehensive payment operations with support for multiple payment rails, advanced filtering, and full validation. For complete documentation, see [Payment API Documentation](./docs/PAYMENT_API.md).

```javascript
// Create payment
const payment = await client.for('tenant-123').payment.create({
  originatorName: "John Doe",
  originatorAccount: "123456789",
  originatorBankRoutingCode: "021000021",
  recipientName: "Jane Smith",
  recipientAccount: "987654321",
  recipientBankRoutingCode: "021000021",
  amount: 1000.50,
  currency: "USD",
  paymentRail: "ACH",
  paymentType: "CREDIT",
  reference: "Invoice #12345"
});

// Get payment
const payment = await client.for('tenant-123').payment.get(12345);

// Update payment
const updated = await client.for('tenant-123').payment.update(12345, {
  reference: "Updated reference"
});

// Delete payment
await client.for('tenant-123').payment.delete(12345);

// List payments with filtering
const payments = await client.for('tenant-123').payments.list()
  .where('status', 'EXECUTION_SUCCESS')
  .where('paymentRail', 'ACH')
  .execute();
```

**Supported Payment Rails:** ACH, SAMEDAYACH, WIRE, SWIFT, INTERNAL, FXPAY, CARD

**Available Payment Commands:** `CreatePayment`, `GetPayment`, `UpdatePayment`, `DeletePayment`, `ListPayments`, `GetPayments`

### Multi-Tenant Support

The SDK supports multi-tenant operations through the `.for()` method, allowing you to specify tenant context for operations.

#### Tenant-Specific Operations

All operations can be scoped to a specific tenant:

```javascript
// Initialize client
const client = createClient({
  baseURL: 'https://api.mbanq.com',
  apiKey: 'your-api-key'
});

// Payment operations for specific tenant
const payment = await client.for('tenant-123').payment.create(paymentData);
const payments = await client.for('tenant-123').payments.list().execute();
const payment = await client.for('tenant-123').payment.get(12345);
const updated = await client.for('tenant-123').payment.update(12345, updateData);
await client.for('tenant-123').payment.delete(12345);

// Account operations for specific tenant
const account = await client.for('tenant-123').accounts.get(98765);
const accounts = await client.for('tenant-123').accounts.list().execute();
const updated = await client.for('tenant-123').accounts.update(98765, accountData);
await client.for('tenant-123').accounts.delete(98765);

// Query with filters for specific tenant
const filteredPayments = await client.for('tenant-123').payments.list()
  .where('status', 'EXECUTION_SUCCESS')
  .where('paymentRail', 'ACH')
  .execute();
```

#### Default Tenant Configuration

You can also configure a default tenant in the client configuration:

```javascript
const client = createClient({
  baseURL: 'https://api.mbanq.com',
  apiKey: 'your-api-key',
  tenantId: 'default-tenant-123' // Optional default tenant
});

// Operations will use default tenant if no .for() is specified
const payment = await client.payment.create(paymentData); // Uses default-tenant-123

// Override default tenant for specific operations
const payment = await client.for('other-tenant-456').payment.create(paymentData);
```

#### Tenant Context Best Practices

```javascript
// Good: Always specify tenant context
const processPayments = async (tenantId: string) => {
  const payments = await client.for(tenantId).payments.list()
    .where('status', 'DRAFT')
    .execute();
    
  for (const payment of payments) {
    await client.for(tenantId).payment.update(payment.id, {
      status: 'EXECUTION_SCHEDULED'
    });
  }
};

// Good: Consistent tenant usage across operations
const transferFunds = async (tenantId: string, fromAccount: number, toAccount: number, amount: number) => {
  const clientContext = client.for(tenantId);
  
  const fromAcc = await clientContext.accounts.get(fromAccount);
  const toAcc = await clientContext.accounts.get(toAccount);
  
  const payment = await clientContext.payment.create({
    originatorAccount: fromAcc.accountNumber,
    recipientAccount: toAcc.accountNumber,
    amount: amount,
    // ... other payment data
  });
  
  return payment;
};
```

## Documentation

For detailed information about specific features and APIs, refer to the dedicated documentation:

### API Documentation
- **[Client API Documentation](./docs/CLIENT_API.md)** - Comprehensive guide to client configuration, initialization, and usage patterns
- **[Account API Documentation](./docs/ACCOUNT_API.md)** - Complete reference for account operations, query building, and data types
- **[Payment API Documentation](./docs/PAYMENT_API.md)** - Complete reference for payment operations, filtering, and payment rails

### Quick Links
- [Client Configuration Options](./docs/CLIENT_API.md#configuration-options) - Environment settings, authentication, and middleware
- [Account Operations](./docs/ACCOUNT_API.md#account-operations) - Get, list, update, and delete account operations
- [Payment Operations](./docs/PAYMENT_API.md#payment-operations) - Create, get, update, delete, and query payments
- [Payment Filtering](./docs/PAYMENT_API.md#payment-filter-system) - Advanced payment search and filtering
- [Error Handling Patterns](./docs/CLIENT_API.md#error-handling) - Error types and handling strategies
- [Type Definitions](./docs/ACCOUNT_API.md#data-types-and-schemas) - Complete schema and type reference

## Type Safety & Validation

The SDK uses [Zod](https://zod.dev/) for runtime type validation and TypeScript for compile-time type safety.

### Supported Payment Rails
- `ACH` - Automated Clearing House
- `SAMEDAYACH` - Same Day ACH
- `WIRE` - Domestic Wire Transfer
- `SWIFT` - International Wire Transfer  
- `INTERNAL` - Internal Transfer
- `FXPAY` - Foreign Exchange Payment
- `CARD` - Card Payment

### Payment Statuses
- `DRAFT`, `AML_SCREENING`, `AML_REJECTED`
- `EXECUTION_SCHEDULED`, `EXECUTION_PROCESSING`, `EXECUTION_SUCCESS`, `EXECUTION_FAILURE`
- `RETURNED`, `CANCELLED`, `COMPLIANCE_FAILURE`, `DELETED`, `UNKNOWN`

### Validation Features
- **Input Validation**: All create/update operations validate data structure
- **Response Validation**: API responses are validated before returning
- **Custom Rules**: WIRE transfers require recipient address with state/country
- **Type Safety**: Full TypeScript support with inferred types

## Error Handling
The library uses a consistent error handling pattern. All API calls may throw the following errors:

### Error Types
- **`CommandError`**: Base error type with `code`, `message`, `statusCode`, and optional `requestId`
- **Authentication Errors**: Invalid or missing API credentials
  - Invalid JWT secret/signee combination
  - Expired or invalid bearer token
  - OAuth credential authentication failure
- **Validation Errors**: Invalid parameters provided (uses Zod validation)
- **API Errors**: Server-side errors with specific error codes
- **Network Errors**: Network connectivity or timeout issues

### Common Authentication Error Scenarios
- **Missing credentials**: No authentication method provided
- **Invalid JWT**: Incorrect secret or signee values
- **Expired token**: Bearer token has expired and needs refresh
- **OAuth failure**: Invalid username/password or client credentials

## Examples

### Complete Payment Flow Example

```javascript
import { createClient } from '@mbanq/core-sdk-js';

// Initialize the client
const apiClient = createClient({ 
  secret: 'your-secret', 
  signee: 'YOUR-SIGNEE', 
  baseUrl: 'https://api.cloud.mbanq.com', 
  tenantId: 'your-tenant-id' 
});

// Create an ACH payment
const achPayment = await apiClient.payment.create({
  amount: 1500,
  currency: 'USD',
  paymentRail: 'ACH',
  paymentType: 'CREDIT',
  debtor: {
    name: 'Alice Corporation',
    identifier: '111222333',
    accountType: 'CHECKING',
    agent: {
      name: 'First National Bank',
      identifier: '021000021'
    }
  },
  creditor: {
    name: 'Bob Enterprises',
    identifier: '444555666',
    accountType: 'CHECKING',
    agent: {
      name: 'Second Federal Bank',
      identifier: '121000248'
    }
  },
  clientId: 'client-abc123',
  reference: ['Invoice-2025-001']
}).execute();

console.log('Created payment:', achPayment.id);

// Create an international WIRE payment
const wirePayment = await apiClient.payment.create({
  amount: 5000,
  currency: 'USD',
  paymentRail: 'SWIFT',
  paymentType: 'CREDIT',
  debtor: {
    name: 'US Company',
    identifier: '123456789',
    agent: {
      name: 'Chase Bank',
      identifier: 'CHASUS33XXX'
    }
  },
  creditor: {
    name: 'European Partner',
    identifier: '987654321',
    address: {
      streetAddress: '123 Business Ave',
      city: 'London', 
      state: 'England',
      country: 'GB',
      postalCode: 'SW1A 1AA'
    },
    agent: {
      name: 'HSBC Bank',
      identifier: 'HBUKGB4BXXX'
    }
  },
  chargeBearer: 'OUR',
  reference: ['Contract-2025-002'],
  exchangeRate: 0.85
}).execute();

// Retrieve and monitor payments
const payment = await apiClient.payment.get(achPayment.id).execute();
console.log('Payment status:', payment.status);

// Update payment if needed
if (payment.status === 'DRAFT') {
  await apiClient.payment.update(payment.id, {
    status: 'EXECUTION_SCHEDULED',
    reference: ['Updated-Reference']
  });
}

// List recent payments with filters
const recentPayments = await apiClient.payment.list()
  .where('status').eq('EXECUTION_SCHEDULED')
  .where('paymentRail').eq('ACH')
  .where('fromExecuteDate').eq('2025-01-01')
  .where('toExecuteDate').eq('2025-01-31')
  .limit(25)
  .execute();

console.log(`Found ${recentPayments.length} scheduled ACH payments`);

// Multi-tenant example
const tenantPayment = await apiClient.tenant('different-tenant').payment.create({
  amount: 750,
  currency: 'USD',
  paymentRail: 'INTERNAL',
  paymentType: 'CREDIT',
  debtor: { name: 'Internal Sender', identifier: '111111' },
  creditor: { name: 'Internal Receiver', identifier: '222222' }
}).execute();
```

### Error Handling Example

```javascript
import { isCommandError } from '@mbanq/core-sdk-js';

try {
  const payment = await apiClient.payment.create({
    amount: -100, // Invalid: negative amount
    currency: 'INVALID', // Invalid: not 3-character code
    // Missing required fields
  }).execute();
} catch (error) {
  if (isCommandError(error)) {
    console.error('Payment creation failed:');
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    if (error.requestId) {
      console.error('Request ID:', error.requestId);
    }
  } else {
    console.error('Unexpected error:', error);
  }
}
```

For more detailed information or support, please contact our support team or visit our developer portal.
