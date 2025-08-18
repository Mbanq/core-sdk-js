# Core SDK JS
## Table of Contents

- ### Introduction
- ### Installation
- ### Authentication
- ### Setup
  - #### Axios Instance Logger
- ### Middleware
  - #### Logging Middleware
  - #### Metrics Middleware
  - #### Custom Middleware
- ### API Reference
  - #### Transfer Operations
    - #### GetTransfers
    - #### LogFail Transfer
    - #### MarkAsFail
    - #### MarkAsProcessing
    - #### MarkAsReturned
  - ### Custom API
    - #### Custom Get
    - #### Custom Create
    - #### Custom Update
- ### Error Handling
- ### Examples

## Introduction
This library provides a set of JavaScript functions for interacting with our transfer management API. It simplifies the process of handling transfers and managing their statuses throughout their lifecycle.
## Installation

```bash
npm install @mbanq/core-sdk-js
```
## Setup
Before using any of the library functions, you need to initialize the client with your API credentials:
```javascript
const coreSDK = createClient({ 
  secret: 'testing123', 
  signee: 'TESTING', 
  baseUrl: 'https://example.com', 
  tenantId: 'testing' 
});
```

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
### Transfer Operations
### `GetTransfers(options)`

Retrieves a list of transfers based on the provided options.
#### Parameters:

- `options (Object)`
  - `transferStatus` (String, optional): Filter by transfer status
  - `executedAt` (Date): Filter executed transfers from this date
  - `queryLimit` (Date, optional): Number of results per page
  - `paymentType` (String): Filter by paymentType
  - `tenantId` (String, optional): Set tenant ID

#### Returns:

- Promise`<Array>` of transfer objects

#### Example:
```javascript
const command = GetTransfers({
  transferStatus: 'EXECUTION_SCHEDULED',
  executedAt: '2025-01-22',
  paymentType: 'ACH',
  queryLimit: 200,
  tenantId: 'default'
});
await coreSDK.request(command);
```
### `LogFailTransfer(params)`

Logs a failed transfer with the specified reason.
#### Parameters:
- `params (Object)`
  - `payload` (Transfer): The payload of transfer
  - `tanantId` (String): tenant ID

#### Returns:

- Promise`<Object>`

### `MarkAsFail(options)`

Marks a transfer as failed.
#### Parameters:

- `options`
  - `externalId`: (String)
  - `paymentType`: (String, optional)
  - `tenantId`: (String, optional)

#### Returns:

- Promise`<Object>`
  - `id`: (string)
  - `clientId`: (number)
  - `resourceId`: (number)
  - `resourceIdentifier`: (string)

### `MarkAsProcessing(options)`

Marks a transfer as currently processing.
#### Parameters:

- `options`
  - `externalId`: (string)
  - `fileUrl`: (string)
  - `paymentType`: (string)
  - `traceNumbers`: (Object)
    - `outgoingTransfer`: (string)
  - `tenantId`: (string, optional)

#### Returns:

- Promise`<Object>`
  - `id`: (string)
  - `clientId`: (number)
  - `resourceId`: (number)
  - `resourceIdentifier`: (string)

### `MarkAsReturned(transferId)`

Marks a transfer as returned.
#### Parameters:

- `options`
  - `paymentType`: (string)
  - `externalId`: (string)
  - `returnFileUrl`: (string)
  - `errorCode`: (string)
  - `errorMessage`: (string)
  - `returnDate`: (Date, optional)
  - `traceNumbers`: (Object)
    - `incomingReturnFile`?: (string, optional)
    - `outgoingReturnFile`: (string, optional)
  - `rawReturnDetails`: (any, optional)
  - `tenantId`: (string, optional)

#### Returns:

- Promise`<Object>`
  - `id`: (string)
  - `clientId`: (number)
  - `resourceId`: (number)
  - `resourceIdentifier`: (string)

### Custom API
### `Custom Get`

Retrieves any records based on the provided options.

#### Parameters:

- `options (Object)`
  - `commandName` (String, optional): Set command name base on you want beside name CustomGet
  - `url` (String): The url that use to request to get something but not include baseURL
  - `tenantId` (String, optional): Set tenant ID

#### Returns:

- Promise`<any>`

### `Custom Create`

Create any record or something based on the provided options.

#### Parameters:

- `options (Object)`
  -  `data` (Object): any values that use to create somthing
  - `commandName` (String, optional): Set command name base on you want beside name CustomGet
  - `url` (String): The url that use to request to get something but not include baseURL
  - `tenantId` (String, optional): Set tenant ID

#### Returns:

- Promise`<any>`

### `Custom Update`

Update any record or something based on the provided options.

#### Parameters:

- `options (Object)`
  -  `update` (Object): any values that use to update somthing
  - `commandName` (String, optional): Set command name base on you want beside name CustomGet
  - `url` (String): The url that use to request to get something but not include baseURL
  - `tenantId` (String, optional): Set tenant ID

#### Returns:

- Promise`<any>`

## Error Handling
The library uses a consistent error handling pattern. All API calls may throw the following errors:

- `AuthenticationError`: Invalid or missing API credentials
- `ValidationError`: Invalid parameters provided
- `ApiError`: General API error with specific error code and message
- `NetworkError`: Network-related issues

## Examples
### Complete Transfer Flow Example
```javascript
// Initialize the client
const coreSDK = createClient({ secret: 'testing123', signee: 'TESTING', baseUrl: 'https://example.com', tenantId: 'testing' });

// Get schedule transfers
const command = GetTransfers({
  transferStatus: 'EXECUTION_SCHEDULED',
  executedAt: '2025-01-22',
  paymentType: 'ACH',
  queryLimit: 200,
  tenantId: 'default'
});
const scheduleTransfers = await coreSDK.request(command);

// Process each transfer
for (const transfer of scheduleTransfers) {
  try {
    // Mark as processing
    const markProcessing = MarkAsProcessing({
      externalId: transfer.externalId,
      fileUrl: transfer.fileUrl,
      paymentType: 'ACH',
      traceNumbers: {
          outgoingTransfer: '123456'
      },
      tenantId: 'default'
    })
    await coreSDK.request(markProcessing);

    // Your processing logic here

    // If processing fails
    if (/* some condition */) {
      const markFail = MarkAsFail({
        externalId: transfer.externalId,
        errorMessage: 'error testing',
        paymentType: 'ACH',
        tenantId: 'default'
      })
      await coreSDK.request(markFail);
    }
  } catch (error) {
    console.error(`Error processing transfer ${transfer.id}:`, error);
  }
}
```

For more detailed information or support, please contact our support team or visit our developer portal.
