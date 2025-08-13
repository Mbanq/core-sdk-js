interface SimpleCard {
  internalCardId: string,
  cardType?: string,
  tenantIdentifier?: string,
  status?: string
}

export interface AuthorizationRequest {
  card: SimpleCard,
  payload: any,
  tenantId?: string,
  skipNotification?: boolean,
  flag?: string
}

export interface CardUpdate {
  clientId: number,
  businessCardIDURL: string,
  businessCardIDQRCode: string
  tenantId?: string
}
