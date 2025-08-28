# Client API Documentation

The Core SDK provides a comprehensive client management system with a fluent API design. This document covers all client-related functionality.

## Table of Contents
- [Client Creation](#client-creation)
- [Configuration](#configuration)
- [Client Management](#client-management)
- [Account Management](#account-management)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Client Creation

### Creating a Client Instance

```typescript
import { createClient } from 'core-sdk-js';

const client = createClient({
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
await tenantClient.payment.create(paymentData);
```

## Client Management

### Creating Clients

```typescript
const clientData = {
  firstname: 'John',
  lastname: 'Doe',
  emailAddress: 'john.doe@example.com',
  dateOfBirth: '1990-01-01',
  locale: 'en',
  dateFormat: 'dd MMMM yyyy'
};

const createCommand = client.client.create(clientData);
const result = await createCommand.execute();
```

### Retrieving Clients

```typescript
// Get a specific client by ID
const getCommand = client.client.get(123);
const clientDetails = await getCommand.execute();

// List all clients
const listQuery = client.client.list();
const clients = await listQuery.execute();

// List with filtering and pagination
const filteredClients = await client.client.list()
  .where('status').eq('active')
  .limit(10)
  .offset(0)
  .execute();
```

### Updating Clients

```typescript
const updateData = {
  firstname: 'Jane',
  lastname: 'Smith',
  emailAddress: 'jane.smith@example.com'
};

const updateCommand = client.client.update(123, updateData);
const result = await updateCommand.execute();
```

### Client Document Management

```typescript
const documentData = {
  documentType: 'passport',
  documentNumber: 'P123456789',
  issueDate: '2020-01-01',
  expiryDate: '2030-01-01'
};

const updateDocCommand = client.client.updateDocumentRecord(123, documentData);
const result = await updateDocCommand.execute();
```

### Updating Client Identifiers

```typescript
const identifierData = {
  identifierType: 'SSN',
  identifierValue: '123-45-6789'
};

const updateIdentifierCommand = client.client.updateIdentifier(123, identifierData);
const result = await updateIdentifierCommand.execute();
```

### Deleting Clients

```typescript
const deleteCommand = client.client.delete(123);
const result = await deleteCommand.execute();
```

## Account Management

The client provides comprehensive account management capabilities through the `client.for(clientId).accounts` API.

### Listing Accounts

```typescript
// List all accounts for a client
const accounts = await client.client.for('123').accounts.list().execute();

// Filter accounts
const savingsAccounts = await client.client.for('123').accounts.list()
  .where('productName').eq('Savings Account')
  .execute();
```

### Getting Specific Accounts

```typescript
// Get account by ID using direct API call
const account = await client.client.for('123').accounts.get(789).execute();

// Get account by filtering from list (alternative method)
const account = await client.client.for('123').accounts.getFromList(789).execute();
```

### Updating Accounts

```typescript
const updateData = {
  type: 'savings',
  nominalAnnualInterestRate: '2.5',
  minRequiredOpeningBalance: '100.00',
  allowOverdraft: true,
  overdraftLimit: 1000
};

const result = await client.client.for('123').accounts.update('acc_123', updateData).execute();
```

### Deleting Accounts

```typescript
const result = await client.client.for('123').accounts.delete('acc_123').execute();
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
import { createClient } from 'core-sdk-js';

const errorHandlingMiddleware = {
  onError: async (command, error) => {
    console.error(`Command ${command.metadata.commandName} failed:`, error);
    // Custom error logging or reporting
  }
};

const client = createClient({
  baseUrl: 'https://api.example.com',
  tenantId: 'your-tenant-id',
  secret: 'your-secret',
  middlewares: [errorHandlingMiddleware]
});
```

## Examples

### Complete Client Management Workflow

```typescript
import { createClient } from 'core-sdk-js';

const client = createClient({
  baseUrl: 'https://api.example.com',
  tenantId: 'demo-tenant',
  secret: 'demo-secret'
});

async function clientWorkflow() {
  try {
    // 1. Create a new client
    const newClient = await client.client.create({
      firstname: 'John',
      lastname: 'Doe',
      emailAddress: 'john.doe@example.com',
      dateOfBirth: '1990-01-01',
      locale: 'en',
      dateFormat: 'dd MMMM yyyy'
    }).execute();
    
    console.log('Created client:', newClient);
    
    // 2. List accounts for the client
    const accounts = await client.client.for(newClient.clientId.toString())
      .accounts.list().execute();
    
    console.log('Client accounts:', accounts);
    
    // 3. Update client information
    const updatedClient = await client.client.update(newClient.clientId, {
      emailAddress: 'john.updated@example.com'
    }).execute();
    
    console.log('Updated client:', updatedClient);
    
  } catch (error) {
    console.error('Workflow failed:', error);
  }
}

clientWorkflow();
```

### Account Management Workflow

```typescript
async function accountWorkflow(clientId: string) {
  try {
    // 1. List all accounts
    const allAccounts = await client.client.for(clientId).accounts.list().execute();
    console.log('All accounts:', allAccounts);
    
    // 2. Filter for savings accounts
    const savingsAccounts = await client.client.for(clientId).accounts.list()
      .where('productName').eq('Savings Account')
      .execute();
    console.log('Savings accounts:', savingsAccounts);
    
    // 3. Get specific account details
    if (allAccounts.savingsAccounts.length > 0) {
      const accountId = allAccounts.savingsAccounts[0].id;
      const accountDetails = await client.client.for(clientId).accounts.get(accountId).execute();
      console.log('Account details:', accountDetails);
      
      // 4. Update account
      const updateResult = await client.client.for(clientId).accounts.update(
        accountDetails.accountNo,
        {
          nominalAnnualInterestRate: '3.0',
          allowOverdraft: true,
          overdraftLimit: 500
        }
      ).execute();
      console.log('Update result:', updateResult);
    }
    
  } catch (error) {
    console.error('Account workflow failed:', error);
  }
}
```

### Using Tenant Context

```typescript
// Create tenant-specific clients
const productionClient = client.tenant('production-tenant');
const stagingClient = client.tenant('staging-tenant');

// Operations are isolated by tenant
const prodAccounts = await productionClient.client.for('123').accounts.list().execute();
const stagingAccounts = await stagingClient.client.for('123').accounts.list().execute();

// Each will use their respective tenant ID
```

## Best Practices

1. **Always use execute()**: Don't forget to call `.execute()` on command objects
2. **Handle errors gracefully**: Use try-catch blocks and check for command errors
3. **Use tenant contexts**: When working with multiple tenants, use `client.tenant(id)` for clarity
4. **Leverage filtering**: Use the fluent query API for efficient data retrieval
5. **Configure timeouts**: Set appropriate timeout values in `axiosConfig` for your use case
6. **Use middleware**: Implement logging and metrics middleware for production applications

## TypeScript Support

The SDK is fully typed with comprehensive TypeScript support:

```typescript
import { 
  Config, 
  SavingAccount, 
  UpdateAccountRequest,
  ListAccountsOfClientResponse 
} from 'core-sdk-js';

// All types are available for import and use
const config: Config = { /* ... */ };
const account: SavingAccount = await client.client.for('123').accounts.get(1).execute();
```
