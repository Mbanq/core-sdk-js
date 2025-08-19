# Core SDK JS
## Table of Contents

- ### Introduction
- ### Installation
- ### Quick Start
- ### Setup
  - #### Axios Instance Logger
- ### Middleware
  - #### Logging Middleware
  - #### Metrics Middleware
  - #### Custom Middleware
- ### API Reference
  - #### Payment Operations
    - #### Create Payment
    - #### Get Payment
    - #### Update Payment
    - #### List Payments
  - #### Multi-Tenant Support
- ### Type Safety & Validation
- ### Error Handling
- ### Examples

## Introduction
This library provides a comprehensive JavaScript SDK for interacting with the Mbanq payment API. It offers type-safe payment operations with built-in validation, multi-tenant support, and a modern fluent API design.
## Installation

```bash
npm install @mbanq/core-sdk-js
```

## Quick Start

```javascript
import { createClient } from '@mbanq/core-sdk-js';

// Initialize the client
const apiClient = createClient({ 
  secret: 'your-api-secret', 
  signee: 'YOUR-SIGNEE', 
  baseUrl: 'https://api.cloud.mbanq.com', 
  tenantId: 'your-tenant-id' 
});

// Create a payment
const payment = await apiClient.payment.create({
  amount: 1000,
  currency: 'USD',
  paymentRail: 'ACH',
  paymentType: 'CREDIT',
  debtor: {
    name: 'John Sender',
    identifier: '123456789',
    agent: {
      name: 'First Bank',
      identifier: '021000021'
    }
  },
  creditor: {
    name: 'Jane Receiver',
    identifier: '987654321',
    agent: {
      name: 'Second Bank', 
      identifier: '121000248'
    }
  }
});

// List payments with filtering
const payments = await apiClient.payment.list()
  .where('status').eq('DRAFT')
  .where('paymentRail').eq('ACH')
  .limit(10)
  .execute();
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

### Payment Operations

#### Create Payment

Creates a new payment with comprehensive validation.

```javascript
const payment = await apiClient.payment.create({
  // Required fields
  amount: 1000,
  currency: 'USD',
  paymentRail: 'ACH', // ACH, WIRE, SWIFT, INTERNAL, FXPAY, CARD
  paymentType: 'CREDIT', // CREDIT or DEBIT
  
  // Originator (sender)
  debtor: {
    name: 'John Sender',
    identifier: '123456789', // Account number
    accountType: 'CHECKING', // Optional: CHECKING or SAVINGS
    agent: {
      name: 'First Bank',
      identifier: '021000021' // Routing code
    }
  },
  
  // Recipient (receiver)
  creditor: {
    name: 'Jane Receiver',
    identifier: '987654321',
    accountType: 'SAVINGS',
    address: { // Required for WIRE transfers
      streetAddress: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'US',
      postalCode: '10001'
    },
    agent: {
      name: 'Second Bank',
      identifier: '121000248'
    }
  },
  
  // Optional fields
  clientId: 'client-123',
  reference: ['Invoice-001', 'Payment-ABC'],
  exchangeRate: 1.25,
  chargeBearer: 'OUR', // For SWIFT: OUR, BEN, SHA
  valueDate: '2025-01-15',
  paymentRailMetaData: {
    priority: 'high',
    category: 'business'
  }
});
```

#### Get Payment

Retrieves a specific payment by ID.

```javascript
const payment = await apiClient.payment.get('payment-456');
```

#### Update Payment

Updates an existing payment. All fields are optional.

```javascript
const updatedPayment = await apiClient.payment.update('payment-456', {
  amount: 1500,
  status: 'EXECUTION_SCHEDULED',
  creditor: {
    name: 'Updated Recipient Name'
  },
  errorCode: 'E001',
  errorMessage: 'Insufficient funds',
  exchangeRate: 1.30,
  reference: ['Updated-Reference'],
  paymentRailMetaData: {
    updated: true
  }
});
```

#### List Payments

Retrieves payments with powerful filtering capabilities.

```javascript
// Simple list
const payments = await apiClient.payment.list().execute();

// With filters and pagination
const payments = await apiClient.payment.list()
  .where('status').eq('DRAFT')
  .where('paymentRail').eq('ACH')
  .where('paymentType').eq('CREDIT')
  .where('originatorName').eq('John Doe')
  .limit(50)
  .offset(0)
  .execute();

// Available filter fields
// originatorName, originatorAccount, originatorBankRoutingCode
// recipientName, recipientAccount, recipientBankRoutingCode  
// reference, traceNumber, externalId, clientId
// dateFormat, locale, originatedBy, paymentRail, paymentType
// fromValueDate, toValueDate, fromExecuteDate, toExecuteDate
// status, fromReturnDate, toReturnDate, isSettlement, orderBy, sortOrder
```

### Multi-Tenant Support

The SDK supports multi-tenant operations through tenant context.

#### Default Tenant Operations
Uses the `tenantId` from client configuration:

```javascript
const payment = await apiClient.payment.create(paymentData);
const payments = await apiClient.payment.list().execute();
```

#### Tenant-Specific Operations
Override tenant for specific operations:

```javascript
// Create payment for specific tenant
const payment = await apiClient.tenant('tenant-123').payment.create(paymentData);

// Get payment from specific tenant
const payment = await apiClient.tenant('tenant-123').payment.get('payment-456');

// Update payment in specific tenant
await apiClient.tenant('tenant-123').payment.update('payment-456', updateData);

// List payments from specific tenant with filters
const payments = await apiClient.tenant('tenant-123').payment.list()
  .where('status').eq('DRAFT')
  .limit(10)
  .execute();
```

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
});

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
});

// Retrieve and monitor payments
const payment = await apiClient.payment.get(achPayment.id);
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
});
```

### Error Handling Example

```javascript
import { isCommandError } from '@mbanq/core-sdk-js';

try {
  const payment = await apiClient.payment.create({
    amount: -100, // Invalid: negative amount
    currency: 'INVALID', // Invalid: not 3-character code
    // Missing required fields
  });
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
