# Payment API Documentation

This document provides comprehensive information about the Payment API in the Core SDK, including payment operations, data types, validation, and usage examples.

## Table of Contents

- [Payment Operations](#payment-operations)
  - [Create Payment](#create-payment)
  - [Get Payment](#get-payment)
  - [Update Payment](#update-payment)
  - [Delete Payment](#delete-payment)
  - [List Payments](#list-payments)
  - [Query Payments with Filters](#query-payments-with-filters)
- [Payment Filter System](#payment-filter-system)
  - [Available Filter Keys](#available-filter-keys)
  - [Filter Value Validation](#filter-value-validation)
  - [Query Building](#query-building)
- [Data Types and Schemas](#data-types-and-schemas)
  - [Payment Types](#payment-types)
  - [Payment Status](#payment-status)
  - [Payment Rails](#payment-rails)
  - [Input Schemas](#input-schemas)
- [Validation and Error Handling](#validation-and-error-handling)
- [Best Practices](#best-practices)
- [Examples](#examples)

## Payment Operations

### Create Payment

Create a new payment with comprehensive validation.

```typescript
// Basic payment creation
const result = await client.for('tenant-123').payment.create({
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
  reference: "Payment for services",
  externalId: "ext-12345"
});

console.log('Created payment:', result.payment);
```

**Parameters:**
- `data: CreatePaymentInput` - Payment data to create
- Automatic tenant ID injection from client context

**Returns:** `Promise<Payment>` - The created payment object

### Get Payment

Retrieve a specific payment by ID.

```typescript
// Get payment by ID
const payment = await client.for('tenant-123').payment.get(12345);
console.log('Payment details:', payment);
```

**Parameters:**
- `id: number` - Payment ID to retrieve
- Automatic tenant ID injection from client context

**Returns:** `Promise<Payment>` - The payment object

### Update Payment

Update an existing payment with validation.

```typescript
// Update payment
const updatedPayment = await client.for('tenant-123').payment.update(12345, {
  reference: "Updated payment reference",
  amount: 1200.00
});

console.log('Updated payment:', updatedPayment);
```

**Parameters:**
- `id: number` - Payment ID to update
- `data: UpdatePaymentInput` - Updated payment data
- Automatic tenant ID injection from client context

**Returns:** `Promise<Payment>` - The updated payment object

### Delete Payment

Delete a payment by ID.

```typescript
// Delete payment
await client.for('tenant-123').payment.delete(12345);
console.log('Payment deleted successfully');
```

**Parameters:**
- `id: number` - Payment ID to delete
- Automatic tenant ID injection from client context

**Returns:** `Promise<void>`

### List Payments

Get a simple list of payments with built-in filtering capabilities.

```typescript
// List all payments for tenant
const paymentsQuery = client.for('tenant-123').payments.list();

// Apply filters using the fluent interface
const filteredPayments = await paymentsQuery
  .where('status', 'EXECUTION_SUCCESS')
  .where('paymentRail', 'ACH')
  .where('originatorName', 'John Doe')
  .execute();

console.log('Filtered payments:', filteredPayments);
```

**Returns:** `PaymentQuery` object with fluent filtering interface

### Query Payments with Filters

Advanced payment querying with comprehensive filter support.

```typescript
import { GetPayments } from '../commands/rest/payment';

// Advanced filtering
const advancedQuery = GetPayments({
  status: 'EXECUTION_SUCCESS',
  paymentRail: 'ACH',
  fromValueDate: '2024-01-01',
  toValueDate: '2024-12-31',
  originatorName: 'John Doe',
  orderBy: 'createdAt',
  sortOrder: 'DESC'
}, { tenantId: 'tenant-123' });

const result = await advancedQuery.execute(config);
console.log('Advanced query results:', result.payments);
```

## Payment Filter System

### Available Filter Keys

The payment system supports extensive filtering options:

```typescript
// String filters
type StringFilters = 
  | 'originatorName'
  | 'originatorAccount'
  | 'originatorBankRoutingCode'
  | 'recipientName'
  | 'recipientAccount'
  | 'recipientBankRoutingCode'
  | 'reference'
  | 'traceNumber'
  | 'externalId'
  | 'clientId'
  | 'locale'
  | 'originatedBy';

// Date filters
type DateFilters = 
  | 'fromValueDate'
  | 'toValueDate'
  | 'fromExecuteDate'
  | 'toExecuteDate'
  | 'fromReturnDate'
  | 'toReturnDate';

// Enum filters
type EnumFilters = 
  | 'status'
  | 'paymentRail'
  | 'paymentType'
  | 'sortOrder';

// Boolean filters
type BooleanFilters = 'isSettlement';

// Sorting
type SortingOptions = 'orderBy';
```

### Filter Value Validation

Each filter type has specific validation rules:

```typescript
// Status validation
const validStatuses = [
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
];

// Payment rail validation
const validRails = [
  'ACH',
  'SAMEDAYACH',
  'WIRE',
  'SWIFT',
  'INTERNAL',
  'FXPAY',
  'CARD'
];

// Payment type validation
const validTypes = ['CREDIT', 'DEBIT'];

// Sort order validation
const validSortOrders = ['ASC', 'DESC'];
```

### Query Building

Build complex queries with validation:

```typescript
// Step-by-step query building
const query = client.for('tenant-123').payments.list();

// Add multiple filters
query
  .where('status', 'EXECUTION_SUCCESS')
  .where('paymentRail', 'ACH')
  .where('fromValueDate', '2024-01-01')
  .where('toValueDate', '2024-12-31')
  .where('originatorName', 'John Doe');

// Execute the query
const results = await query.execute();
```

## Data Types and Schemas

### Payment Types

```typescript
interface Payment {
  id: number;
  originatorName: string;
  originatorAccount: string;
  originatorBankRoutingCode: string;
  recipientName: string;
  recipientAccount: string;
  recipientBankRoutingCode: string;
  amount: number;
  currency: string;
  paymentRail: PaymentRailType;
  paymentType: PaymentType;
  status: PaymentStatus;
  reference?: string;
  externalId?: string;
  traceNumber?: string;
  valueDate?: string;
  executeDate?: string;
  returnDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Payment Status

```typescript
type PaymentStatus = 
  | 'DRAFT'
  | 'AML_SCREENING'
  | 'AML_REJECTED'
  | 'EXECUTION_SCHEDULED'
  | 'EXECUTION_PROCESSING'
  | 'EXECUTION_SUCCESS'
  | 'EXECUTION_FAILURE'
  | 'RETURNED'
  | 'CANCELLED'
  | 'COMPLIANCE_FAILURE'
  | 'DELETED'
  | 'UNKNOWN';
```

### Payment Rails

```typescript
type PaymentRailType = 
  | 'ACH'           // Automated Clearing House
  | 'SAMEDAYACH'    // Same Day ACH
  | 'WIRE'          // Wire Transfer
  | 'SWIFT'         // SWIFT International
  | 'INTERNAL'      // Internal Transfer
  | 'FXPAY'         // Foreign Exchange Payment
  | 'CARD';         // Card Payment
```

### Input Schemas

```typescript
interface CreatePaymentInput {
  originatorName: string;
  originatorAccount: string;
  originatorBankRoutingCode: string;
  recipientName: string;
  recipientAccount: string;
  recipientBankRoutingCode: string;
  amount: number;
  currency: string;
  paymentRail: PaymentRailType;
  paymentType: PaymentType;
  reference?: string;
  externalId?: string;
  valueDate?: string;
  executeDate?: string;
}

interface UpdatePaymentInput {
  originatorName?: string;
  originatorAccount?: string;
  originatorBankRoutingCode?: string;
  recipientName?: string;
  recipientAccount?: string;
  recipientBankRoutingCode?: string;
  amount?: number;
  currency?: string;
  paymentRail?: PaymentRailType;
  paymentType?: PaymentType;
  reference?: string;
  externalId?: string;
  valueDate?: string;
  executeDate?: string;
}
```

## Validation and Error Handling

### Schema Validation

All payment operations use Zod schemas for validation:

```typescript
import { 
  validateCreatePaymentInput,
  validateUpdatePaymentInput,
  validatePaymentStatus,
  validatePaymentRail 
} from '../types/payment';

// Validate payment data before creation
try {
  const validatedData = validateCreatePaymentInput(paymentData);
  const payment = await client.for('tenant-123').payment.create(validatedData);
} catch (error) {
  if (error instanceof ZodError) {
    console.error('Validation errors:', error.errors);
  }
}
```

### Error Types

```typescript
// Common payment errors
interface PaymentError {
  code: string;
  message: string;
  details?: any;
}

// Error codes
const PaymentErrorCodes = {
  INVALID_FILTER_KEY: 'invalid_filter_key',
  INVALID_STATUS: 'invalid_status',
  INVALID_RAIL: 'invalid_rail',
  INVALID_TYPE: 'invalid_type',
  VALIDATION_ERROR: 'validation_error',
  NOT_FOUND: 'payment_not_found',
  UNAUTHORIZED: 'unauthorized_access'
};
```

## Best Practices

### 1. Input Validation

Always validate payment data before submission:

```typescript
import { validateCreatePaymentInput } from '../types/payment';

const createPaymentSafely = async (data: any) => {
  try {
    // Validate input data
    const validatedData = validateCreatePaymentInput(data);
    
    // Create payment
    const payment = await client.for('tenant-123').payment.create(validatedData);
    return { success: true, payment };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

### 2. Error Handling

Implement comprehensive error handling:

```typescript
const handlePaymentOperation = async () => {
  try {
    const payment = await client.for('tenant-123').payment.get(12345);
    return payment;
  } catch (error) {
    if (error.code === 'payment_not_found') {
      console.log('Payment not found');
    } else if (error.code === 'unauthorized_access') {
      console.log('Access denied');
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
```

### 3. Efficient Querying

Use appropriate filtering for better performance:

```typescript
// Good: Specific filters
const recentSuccessfulACH = await client
  .for('tenant-123')
  .payments
  .list()
  .where('status', 'EXECUTION_SUCCESS')
  .where('paymentRail', 'ACH')
  .where('fromValueDate', '2024-11-01')
  .execute();

// Avoid: Too broad queries without filters
const allPayments = await client.for('tenant-123').payments.list().execute();
```

### 4. Tenant Management

Always specify tenant context:

```typescript
// Good: Explicit tenant context
const client = createInstance(config);
const payments = await client.for('tenant-123').payments.list().execute();

// Avoid: Missing tenant context (may cause errors)
const payments = await client.payments.list().execute();
```

## Examples

### Complete Payment Workflow

```typescript
import { createInstance } from '@mbanq/core-sdk';

const client = createInstance({
  baseURL: 'https://api.mbanq.com',
  apiKey: 'your-api-key'
});

// 1. Create a payment
const newPayment = await client.for('tenant-123').payment.create({
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

console.log('Created payment ID:', newPayment.id);

// 2. Check payment status
const currentPayment = await client.for('tenant-123').payment.get(newPayment.id);
console.log('Payment status:', currentPayment.status);

// 3. Update payment if needed
if (currentPayment.status === 'DRAFT') {
  const updatedPayment = await client.for('tenant-123').payment.update(newPayment.id, {
    reference: "Updated Invoice #12345",
    amount: 1200.00
  });
  console.log('Updated payment:', updatedPayment);
}

// 4. Query related payments
const relatedPayments = await client
  .for('tenant-123')
  .payments
  .list()
  .where('originatorName', 'John Doe')
  .where('status', 'EXECUTION_SUCCESS')
  .execute();

console.log('Related payments:', relatedPayments);
```

### Advanced Filtering Example

```typescript
// Complex payment search
const complexSearch = async () => {
  const payments = await client
    .for('tenant-123')
    .payments
    .list()
    .where('paymentRail', 'ACH')
    .where('status', 'EXECUTION_SUCCESS')
    .where('fromValueDate', '2024-01-01')
    .where('toValueDate', '2024-12-31')
    .where('originatorName', 'John Doe')
    .execute();

  return payments.filter(p => p.amount > 1000);
};

// Using direct command for advanced queries
import { GetPayments } from '../commands/rest/payment';

const advancedSearch = async () => {
  const command = GetPayments({
    status: 'EXECUTION_SUCCESS',
    paymentRail: 'WIRE',
    fromValueDate: '2024-11-01',
    toValueDate: '2024-11-30',
    orderBy: 'amount',
    sortOrder: 'DESC'
  }, { tenantId: 'tenant-123' });

  const result = await command.execute(config);
  return result.payments;
};
```

### Batch Operations

```typescript
// Process multiple payments
const processBatchPayments = async (paymentDataList: CreatePaymentInput[]) => {
  const results = [];
  
  for (const paymentData of paymentDataList) {
    try {
      const payment = await client.for('tenant-123').payment.create(paymentData);
      results.push({ success: true, payment });
    } catch (error) {
      results.push({ success: false, error: error.message, data: paymentData });
    }
  }
  
  return results;
};

// Usage
const batchData = [
  {
    originatorName: "John Doe",
    recipientName: "Jane Smith",
    amount: 1000,
    // ... other required fields
  },
  {
    originatorName: "Alice Johnson",
    recipientName: "Bob Wilson",
    amount: 2000,
    // ... other required fields
  }
];

const batchResults = await processBatchPayments(batchData);
console.log('Batch processing results:', batchResults);
```

For more information about client configuration and general SDK usage, see the [Client API Documentation](./CLIENT_API.md).
