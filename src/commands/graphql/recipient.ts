import { GraphQL } from './index';
import { Command } from '../../types/config';
import { Recipient, UpdateRecipientRequest } from '../../types/recipient';

const UPDATE_RECIPIENT_MUTATION = `
  mutation updateRecipient($id: ID!, $input: UpdateRecipientInput!) {
    updateRecipient(id: $id, input: $input) {
      id
      clientId
      nickName
      firstName
      lastName
      businessName
      emailAddress
      phoneNumber
      recipientType
      paymentRail
      isOwnAccount
      address {
        line1
        line2
        city
        stateCode
        countryCode
        postalCode
      }
      accountDetailsData {
        accountNumber
        bankInformation {
          routingNumber
          swiftCode
        }
      }
    }
  }
`;

export const UpdateRecipientGQL = (params: {
  id: string;
  input: UpdateRecipientRequest;
  tenantId?: string;
}): Command<{
  id: string;
  input: UpdateRecipientRequest;
  tenantId?: string;
}, { updateRecipient: Recipient }> => {
  const graphqlRequest = GraphQL({
    command: UPDATE_RECIPIENT_MUTATION,
    variables: {
      id: params.id,
      input: params.input
    },
    operationName: 'updateRecipient',
    tenantId: params.tenantId
  });

  return {
    input: params,
    metadata: {
      commandName: 'UpdateRecipientGQL',
      path: '/graphql',
      method: 'POST'
    },
    execute: graphqlRequest.execute
  };
};
