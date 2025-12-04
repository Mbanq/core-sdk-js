# Account API Documentation

The Core SDK provides comprehensive account management capabilities with support for retrieving, updating, and managing client accounts. This document covers all account-related functionality.

## Table of Contents
- [Overview](#overview)
- [API Structure](#api-structure)
- [Account Operations](#account-operations)
- [Query Building](#query-building)
- [Data Types](#data-types)
- [Error Handling](#error-handling)
- [Examples](#examples)

## Overview

The Account API allows you to:
- Create and activate new accounts in a single operation
- List accounts for a specific client
- Retrieve individual account details
- Update account settings and properties
- Delete accounts
- Filter and query accounts with flexible criteria

All account operations are scoped to a specific client using the fluent API pattern:

```typescript
client.client.for(clientId).accounts.{operation}()
```

## API Structure

### Base Pattern

```typescript
const accounts = client.client.for('client-id').accounts;

// Available methods:
accounts.list()          // List all accounts
accounts.get(id)         // Get specific account
accounts.getFromList(id) // Get account by filtering list
accounts.update(id, data) // Update account
accounts.delete(id)      // Delete account
```

### Fluent Query Building

```typescript
// Basic list
await client.client.for('123').accounts.list().execute();

// With filtering
await client.client.for('123').accounts.list()
  .where('productName').eq('Savings Account')
  .execute();

// Complex queries
await client.client.for('123').accounts.list()
  .where('status').eq('active')
  .where('balance').gte(1000)
  .execute();
```

## Account Operations

### 1. List Accounts

List all accounts for a specific client.

```typescript
// Basic listing
const accounts = await client.client.for('client-123').accounts.list().execute();

console.log('Total accounts:', accounts.savingsAccounts.length);
console.log('Accounts:', accounts.savingsAccounts);
```

**Response Structure:**
```typescript
{
  savingsAccounts: [
    {
      id: 1,
      accountNo: "000000001",
      productName: "Savings Account",
      productId: 1,
      status: {
        id: 300,
        code: "savingsAccountStatusType.active",
        value: "Active"
      },
      currency: {
        code: "USD",
        name: "US Dollar",
        displaySymbol: "$"
      },
      accountBalance: 1000.00,
      availableBalance: 1000.00,
      // ... additional fields
    }
  ]
}
```

### 2. Get Specific Account

Retrieve detailed information for a specific account.

```typescript
// Direct API call (recommended)
const account = await client.client.for('client-123').accounts.get(789).execute();

// Alternative: Filter from list (useful for complex filtering)
const account = await client.client.for('client-123').accounts.getFromList(789).execute();
```

**Response Structure:**
```typescript
{
  id: 789,
  accountNo: "000000789",
  productName: "Premium Savings",
  productId: 2,
  clientId: 123,
  clientName: "John Doe",
  status: {
    id: 300,
    code: "savingsAccountStatusType.active",
    value: "Active"
  },
  currency: {
    code: "USD",
    name: "US Dollar",
    displaySymbol: "$"
  },
  accountBalance: 5000.00,
  availableBalance: 4500.00,
  nominalAnnualInterestRate: 2.5,
  minRequiredOpeningBalance: 100.00,
  allowOverdraft: true,
  overdraftLimit: 500.00,
  // ... detailed account information
}
```

### 3. Update Account

Update account settings and properties.

```typescript
const updateData = {
  nominalAnnualInterestRate: "3.0",
  minRequiredOpeningBalance: "250.00",
  allowOverdraft: true,
  overdraftLimit: 1000,
  enforceMinRequiredBalance: true,
  minRequiredBalance: 50.00,
  withHoldTax: false,
  interestCompoundingPeriodType: 4,
  interestPostingPeriodType: 4,
  interestCalculationType: 1,
  interestCalculationDaysInYearType: 365,
  fieldOfficerId: 1,
  locale: "en",
  dateFormat: "dd MMMM yyyy",
  monthDayFormat: "dd MMM"
};

const result = await client.client.for('client-123').accounts.update('acc_789', updateData).execute();
```

**Updatable Fields:**
- `nominalAnnualInterestRate`: Interest rate as string
- `minRequiredOpeningBalance`: Minimum opening balance
- `allowOverdraft`: Enable/disable overdraft
- `overdraftLimit`: Maximum overdraft amount
- `enforceMinRequiredBalance`: Enforce minimum balance
- `minRequiredBalance`: Minimum account balance
- `withHoldTax`: Tax withholding setting
- Interest calculation settings
- Localization settings

### 4. Delete Account

Delete an account (use with caution).

```typescript
const result = await client.client.for('client-123').accounts.delete('acc_789').execute();

console.log('Account deleted:', result);
```

### 5. Create and Activate Account

Create a new savings account and activate it in a single operation. This combines the submit, approve, and activate steps into one API call.

```typescript
import { CreateAndActivateAccount } from 'core-sdk-js';

// Minimal required fields
const newAccount = await CreateAndActivateAccount({
  clientId: 12,
  productId: 1,
  locale: 'en',
  dateFormat: 'dd MMMM yyyy',
  submittedOnDate: '22 June 2023',
  monthDayFormat: 'dd MMMM yyyy'
}).execute(config);

console.log('Account created:', newAccount);
```

**With Optional Fields:**

```typescript
const newAccount = await CreateAndActivateAccount({
  // Required fields
  clientId: 12,
  productId: 1,
  locale: 'en',
  dateFormat: 'dd MMMM yyyy',
  submittedOnDate: '22 June 2023',
  monthDayFormat: 'dd MMMM yyyy',
  
  // Optional fields
  nominalAnnualInterestRate: 22.49,
  minRequiredOpeningBalance: '1000',
  lockinPeriodFrequency: 0,
  withdrawalFeeForTransfers: true,
  allowOverdraft: true,
  overdraftLimit: 2,
  nominalAnnualInterestRateOverdraft: 22.49,
  minOverdraftForInterestCalculation: 2,
  enforceMinRequiredBalance: false,
  minRequiredBalance: 0,
  withHoldTax: false,
  interestCompoundingPeriodType: 1,
  interestPostingPeriodType: 4,
  interestCalculationType: 1,
  interestCalculationDaysInYearType: 365,
  externalId: '63748',
  lockinPeriodFrequencyType: 0,
  nickname: '12323',
  charges: [
    { chargeId: 1, amount: 100 },
    { chargeId: 2, amount: 50 }
  ]
}, { tenantId: 'custom-tenant' }).execute(config);
```

**Required Fields:**
- `clientId`: The client ID for whom the account is being created
- `productId`: The savings product ID to use
- `locale`: Locale setting (e.g., 'en')
- `dateFormat`: Date format pattern (e.g., 'dd MMMM yyyy')
- `submittedOnDate`: Account submission date
- `monthDayFormat`: Month-day format pattern (e.g., 'dd MMMM yyyy')

**Optional Fields:**
- `nominalAnnualInterestRate`: Annual interest rate (number)
- `minRequiredOpeningBalance`: Minimum opening balance (string)
- `lockinPeriodFrequency`: Lock-in period frequency (number)
- `withdrawalFeeForTransfers`: Enable withdrawal fees (boolean)
- `allowOverdraft`: Allow overdraft (boolean)
- `overdraftLimit`: Maximum overdraft amount (number)
- `nominalAnnualInterestRateOverdraft`: Overdraft interest rate (number)
- `minOverdraftForInterestCalculation`: Minimum overdraft for interest (number)
- `enforceMinRequiredBalance`: Enforce minimum balance (boolean)
- `minRequiredBalance`: Minimum account balance (number)
- `withHoldTax`: Tax withholding (boolean)
- `interestCompoundingPeriodType`: Interest compounding period type (number)
- `interestPostingPeriodType`: Interest posting period type (number)
- `interestCalculationType`: Interest calculation type (number)
- `interestCalculationDaysInYearType`: Days in year for calculation (number)
- `externalId`: External identifier (string)
- `lockinPeriodFrequencyType`: Lock-in period frequency type (number)
- `nickname`: Account nickname (string)
- `charges`: Array of charges with `chargeId` and optional `amount`

**Response Structure:**
```typescript
{
  officeId: 1,
  clientId: 12,
  savingsId: 15,
  resourceId: 15,
  changes: {
    status: 'ACTIVE',
    locale: 'en',
    dateFormat: 'dd MMMM yyyy',
    activatedOnDate: '22 June 2023'
  }
}
```

**With Custom Tenant:**
```typescript
const newAccount = await CreateAndActivateAccount(
  {
    clientId: 12,
    productId: 1,
    locale: 'en',
    dateFormat: 'dd MMMM yyyy',
    submittedOnDate: '22 June 2023',
    monthDayFormat: 'dd MMMM yyyy'
  },
  { tenantId: 'custom-tenant-id' }
).execute(config);
```

## Query Building

### Available Filters

The account listing supports various filter criteria:

```typescript
// Filter by product name
await client.client.for('123').accounts.list()
  .where('productName').eq('Savings Account')
  .execute();

// Filter by status
await client.client.for('123').accounts.list()
  .where('status.value').eq('Active')
  .execute();

// Filter by balance (if supported)
await client.client.for('123').accounts.list()
  .where('accountBalance').gte(1000)
  .execute();
```

### Supported Filter Operations

| Operation | Method | Description |
|-----------|---------|-------------|
| Equals | `.eq(value)` | Exact match |
| Greater Than | `.gt(value)` | Greater than value |
| Greater Than or Equal | `.gte(value)` | Greater than or equal |
| Less Than | `.lt(value)` | Less than value |
| Less Than or Equal | `.lte(value)` | Less than or equal |
| Contains | `.contains(value)` | String contains |
| In | `.in(values)` | Value in array |

### Filter Validation

The SDK validates filter keys and values:

```typescript
// Valid filters
const validFilters = [
  'productName',
  'status.value',
  'accountBalance',
  'availableBalance',
  'currency.code'
];

// Invalid filter will throw validation error
try {
  await client.client.for('123').accounts.list()
    .where('invalidField').eq('value')
    .execute();
} catch (error) {
  console.error('Invalid filter:', error.message);
}
```

## Data Types

### Account Schema

```typescript
interface SavingAccount {
  id: number;
  accountNo: string;
  productName: string;
  productId: number;
  clientId?: number;
  clientName?: string;
  status: {
    id: number;
    code: string;
    value: string;
  };
  currency: {
    code: string;
    name: string;
    displaySymbol: string;
  };
  accountBalance: number;
  availableBalance: number;
  nominalAnnualInterestRate?: number;
  minRequiredOpeningBalance?: number;
  allowOverdraft?: boolean;
  overdraftLimit?: number;
  enforceMinRequiredBalance?: boolean;
  minRequiredBalance?: number;
  withHoldTax?: boolean;
  // ... additional fields
}
```

### Update Request Schema

```typescript
interface UpdateAccountRequest {
  clientId?: number;
  productId?: number;
  submittedOnDate?: string;
  nominalAnnualInterestRate?: string;
  minRequiredOpeningBalance?: string;
  lockinPeriodFrequency?: string;
  withdrawalFeeForTransfers?: boolean;
  allowOverdraft?: boolean;
  overdraftLimit?: number;
  minOverdraftForInterestCalculation?: number;
  enforceMinRequiredBalance?: boolean;
  minRequiredBalance?: number;
  withHoldTax?: boolean;
  interestCompoundingPeriodType?: number;
  interestPostingPeriodType?: number;
  interestCalculationType?: number;
  interestCalculationDaysInYearType?: number;
  fieldOfficerId?: number;
  lockinPeriodFrequencyType?: number;
  locale?: string;
  dateFormat?: string;
  monthDayFormat?: string;
  charges?: any[];
}
```

### Create and Activate Account Request Schema

```typescript
interface CreateAndActivateAccountRequest {
  // Required fields
  clientId: number;
  productId: number;
  locale: string;
  dateFormat: string;
  submittedOnDate: string;
  monthDayFormat: string;
  
  // Optional fields
  nominalAnnualInterestRate?: number;
  minRequiredOpeningBalance?: string;
  lockinPeriodFrequency?: number;
  withdrawalFeeForTransfers?: boolean;
  allowOverdraft?: boolean;
  overdraftLimit?: number;
  nominalAnnualInterestRateOverdraft?: number;
  minOverdraftForInterestCalculation?: number;
  enforceMinRequiredBalance?: boolean;
  minRequiredBalance?: number;
  withHoldTax?: boolean;
  interestCompoundingPeriodType?: number;
  interestPostingPeriodType?: number;
  interestCalculationType?: number;
  interestCalculationDaysInYearType?: number;
  externalId?: string;
  lockinPeriodFrequencyType?: number;
  nickname?: string;
  charges?: Array<{
    chargeId: number;
    amount?: number;
  }>;
}
```

### Create and Activate Account Response Schema

```typescript
interface CreateAndActivateAccountResponse {
  officeId: number;
  clientId: number;
  savingsId: number;
  resourceId: number;
  changes: {
    status: string;
    locale: string;
    dateFormat: string;
    activatedOnDate: string;
  };
}
```

### List Response Schema

```typescript
interface ListAccountsOfClientResponse {
  savingsAccounts: SavingAccount[];
  // Additional metadata may be included
}
```

## Error Handling

### Common Error Scenarios

```typescript
import { isCommandError } from 'core-sdk-js';

try {
  const account = await client.client.for('invalid-client').accounts.get(999).execute();
} catch (error) {
  if (isCommandError(error)) {
    switch (error.status) {
      case 404:
        console.error('Account or client not found');
        break;
      case 403:
        console.error('Access denied to account');
        break;
      case 400:
        console.error('Invalid request parameters');
        break;
      default:
        console.error('API error:', error.message);
    }
  }
}
```

### Validation Errors

```typescript
try {
  const result = await client.client.for('123').accounts.update('acc_789', {
    nominalAnnualInterestRate: 'invalid-rate' // Should be numeric string
  }).execute();
} catch (error) {
  if (isCommandError(error) && error.code === 'validation_error') {
    console.error('Validation failed:', error.message);
  }
}
```

## Examples

### Complete Account Management

```typescript
async function manageClientAccounts(clientId: string) {
  try {
    // 1. List all accounts
    console.log('📋 Fetching all accounts...');
    const allAccounts = await client.client.for(clientId).accounts.list().execute();
    console.log(`Found ${allAccounts.savingsAccounts.length} accounts`);

    // 2. Filter for active savings accounts
    console.log('🔍 Filtering active accounts...');
    const activeAccounts = await client.client.for(clientId).accounts.list()
      .where('status.value').eq('Active')
      .where('productName').eq('Savings Account')
      .execute();
    console.log(`Found ${activeAccounts.savingsAccounts.length} active savings accounts`);

    // 3. Get detailed information for first account
    if (allAccounts.savingsAccounts.length > 0) {
      const firstAccount = allAccounts.savingsAccounts[0];
      console.log(`📖 Getting details for account ${firstAccount.accountNo}...`);
      
      const accountDetails = await client.client.for(clientId).accounts.get(firstAccount.id).execute();
      console.log('Account details:', {
        accountNo: accountDetails.accountNo,
        balance: accountDetails.accountBalance,
        interestRate: accountDetails.nominalAnnualInterestRate,
        overdraftAllowed: accountDetails.allowOverdraft
      });

      // 4. Update account settings
      console.log('⚙️ Updating account settings...');
      const updateResult = await client.client.for(clientId).accounts.update(
        firstAccount.accountNo,
        {
          nominalAnnualInterestRate: "2.75",
          allowOverdraft: true,
          overdraftLimit: 750,
          enforceMinRequiredBalance: true,
          minRequiredBalance: 100.00
        }
      ).execute();
      console.log('Update result:', updateResult);
    }

    // 5. Demonstrate error handling
    console.log('🚨 Testing error handling...');
    try {
      await client.client.for(clientId).accounts.get(99999).execute();
    } catch (error) {
      if (isCommandError(error)) {
        console.log(`Expected error caught: ${error.message} (Status: ${error.status})`);
      }
    }

  } catch (error) {
    console.error('❌ Account management failed:', error);
  }
}

// Usage
manageClientAccounts('client-123');
```

### Batch Account Operations

```typescript
async function batchAccountOperations(clientId: string) {
  try {
    // Get all accounts
    const accounts = await client.client.for(clientId).accounts.list().execute();
    
    // Update interest rates for all accounts
    const updatePromises = accounts.savingsAccounts.map(async (account) => {
      try {
        return await client.client.for(clientId).accounts.update(
          account.accountNo,
          { nominalAnnualInterestRate: "2.5" }
        ).execute();
      } catch (error) {
        console.error(`Failed to update account ${account.accountNo}:`, error);
        return null;
      }
    });

    const results = await Promise.allSettled(updatePromises);
    
    const successful = results.filter(r => r.status === 'fulfilled' && r.value !== null).length;
    const failed = results.length - successful;
    
    console.log(`✅ Updated ${successful} accounts successfully`);
    console.log(`❌ Failed to update ${failed} accounts`);
    
  } catch (error) {
    console.error('Batch operation failed:', error);
  }
}
```

### Account Monitoring

```typescript
async function monitorAccountBalances(clientId: string, minimumBalance: number) {
  try {
    const accounts = await client.client.for(clientId).accounts.list().execute();
    
    const lowBalanceAccounts = accounts.savingsAccounts.filter(
      account => account.accountBalance < minimumBalance
    );
    
    if (lowBalanceAccounts.length > 0) {
      console.log('⚠️ Low balance accounts detected:');
      lowBalanceAccounts.forEach(account => {
        console.log(`- Account ${account.accountNo}: $${account.accountBalance} (below $${minimumBalance})`);
      });
      
      // Optionally send notifications or take automated actions
      await sendLowBalanceNotifications(lowBalanceAccounts);
    } else {
      console.log('✅ All accounts have sufficient balance');
    }
    
  } catch (error) {
    console.error('Balance monitoring failed:', error);
  }
}

async function sendLowBalanceNotifications(accounts: SavingAccount[]) {
  // Implementation for sending notifications
  console.log(`📧 Sending notifications for ${accounts.length} accounts`);
}
```

### Creating New Accounts

```typescript
import { CreateAndActivateAccount } from 'core-sdk-js';

async function createNewSavingsAccount(clientId: number, productId: number) {
  try {
    console.log('🆕 Creating and activating new savings account...');
    
    const newAccount = await CreateAndActivateAccount({
      clientId: clientId,
      productId: productId,
      locale: 'en',
      dateFormat: 'dd MMMM yyyy',
      submittedOnDate: '01 December 2023',
      monthDayFormat: 'dd MMMM yyyy',
      
      // Optional: Set account features
      nominalAnnualInterestRate: 2.5,
      minRequiredOpeningBalance: '100',
      allowOverdraft: true,
      overdraftLimit: 500,
      enforceMinRequiredBalance: true,
      minRequiredBalance: 50,
      withHoldTax: false,
      
      // Interest calculation settings
      interestCompoundingPeriodType: 1,  // Daily
      interestPostingPeriodType: 4,      // Monthly
      interestCalculationType: 1,         // Daily Balance
      interestCalculationDaysInYearType: 365,
      
      // Optional: Add account nickname and external ID
      nickname: 'Primary Savings',
      externalId: 'EXT-' + Date.now(),
      
      // Optional: Add charges
      charges: [
        { chargeId: 1, amount: 10 }  // Account maintenance fee
      ]
    }).execute(config);
    
    console.log('✅ Account created successfully!');
    console.log('Account ID:', newAccount.savingsId);
    console.log('Resource ID:', newAccount.resourceId);
    console.log('Status:', newAccount.changes.status);
    console.log('Activated on:', newAccount.changes.activatedOnDate);
    
    return newAccount;
    
  } catch (error) {
    if (isCommandError(error)) {
      console.error('❌ Failed to create account:', error.message);
      
      // Handle specific error cases
      switch (error.status) {
        case 400:
          console.error('Invalid account parameters');
          break;
        case 404:
          console.error('Client or product not found');
          break;
        case 403:
          console.error('Insufficient permissions to create account');
          break;
        default:
          console.error('Unexpected error:', error.message);
      }
    }
    throw error;
  }
}

// Usage
createNewSavingsAccount(12, 1);
```

## Best Practices

1. **Use specific account IDs**: When getting individual accounts, use `get(id)` for direct API calls
2. **Filter efficiently**: Use query filters to reduce data transfer and improve performance
3. **Handle errors gracefully**: Always wrap account operations in try-catch blocks
4. **Validate update data**: Ensure update request data matches the expected schema
5. **Use appropriate data types**: Follow the schema requirements for numeric vs string fields
6. **Monitor API limits**: Be mindful of rate limits when performing batch operations
7. **Cache account lists**: Consider caching account lists for better performance in applications

## Schema Validation

The SDK includes Zod schema validation for all account operations:

```typescript
import { 
  SavingAccountSchema,
  UpdateAccountRequestSchema,
  CreateAndActivateAccountRequestSchema,
  CreateAndActivateAccountResponseSchema,
  ListAccountsOfClientResponseSchema 
} from 'core-sdk-js';

// Validate account data
const isValidAccount = SavingAccountSchema.safeParse(accountData);
if (!isValidAccount.success) {
  console.error('Invalid account data:', isValidAccount.error);
}

// Validate update request
const isValidUpdate = UpdateAccountRequestSchema.safeParse(updateData);
if (!isValidUpdate.success) {
  console.error('Invalid update data:', isValidUpdate.error);
}

// Validate create and activate request
const isValidCreate = CreateAndActivateAccountRequestSchema.safeParse(createData);
if (!isValidCreate.success) {
  console.error('Invalid create request:', isValidCreate.error);
}

// Validate create and activate response
const isValidResponse = CreateAndActivateAccountResponseSchema.safeParse(responseData);
if (!isValidResponse.success) {
  console.error('Invalid response data:', isValidResponse.error);
}
```
