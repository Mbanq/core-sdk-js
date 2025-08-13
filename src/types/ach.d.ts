export type FileHeader = {
  id?: string,
  immediateOrigin?: string,
  immediateOriginName?: string,
  immediateDestination?: string,
  immediateDestinationName?: string,
  fileCreationTime?: string,
  fileCreationDate?: string,
  fileIDModifier?: string,
  referenceCode?: string
}

export type BatchHeader = {
  id?: string,
  serviceClassCode?: number,
  companyName: string,
  companyDiscretionaryData?: string,
  companyIdentification?: string,
  standardEntryClassCode: string,
  companyEntryDescription?: string,
  companyDescriptiveDate?: string,
  effectiveEntryDate: string,
  originatorStatusCode?: number,
  ODFIIdentification: string,
  batchNumber?: number
}

export type EntryDetails = {
  id?: string,
  transactionCode: number,
  RDFIIdentification: string,
  checkDigit?: string,
  DFIAccountNumber: string,
  amount: number,
  identificationNumber: string,
  individualName: string,
  discretionaryData?: string,
  addendaRecordIndicator?: number,
  traceNumber: string,
  addenda02?: {
    id?: string,
    typeCode?: string,
    referenceInformationOne?: string,
    referenceInformationTwo?: string,
    terminalIdentificationCode?: string,
    transactionSerialNumber?: string,
    transactionDate?: string,
    authorizationCodeOrExpireDate?: string,
    terminalLocation?: string,
    terminalCity?: string,
    terminalState?: string,
    traceNumber?: string
  },
  addenda05?: [
    {
      id?: string,
      typeCode?: string,
      paymentRelatedInformation?: string,
      sequenceNumber?: number,
      entryDetailSequenceNumber?: number
    }
  ],
  addenda98?: {
    id?: string,
    typeCode?: string,
    changeCode?: string,
    originalTrace?: string,
    originalDFI?: string,
    correctedData?: string,
    traceNumber?: string
  },
  addenda99?: {
    id?: string,
    typeCode?: string,
    returnCode: string,
    originalTrace?: string,
    dateOfDeath?: string,
    originalDFI?: string,
    addendaInformation: string,
    traceNumber?: string
  },
  category?: string
}

export type BatchControl = {
  id?: string,
  serviceClassCode?: number,
  entryAddendaCount?: number,
  entryHash?: number,
  totalDebit?: number,
  totalCredit?: number,
  companyIdentification?: string,
  messageAuthentication?: string,
  ODFIIdentification?: string,
  batchNumber?: number
}

export type Batches = {
  batchHeader: BatchHeader,
  entryDetails: Array<EntryDetails>,
  batchControl?: BatchControl,
  offset?: {
    routingNumber?: string,
    accountNumber?: string,
    accountType?: string,
    description?: string
  } | null
}

export type IATBatchHeader = {
  id?: string,
  serviceClassCode?: number,
  IATIndicator?: string,
  foreignExchangeIndicator?: string,
  foreignExchangeReferenceIndicator?: number,
  foreignExchangeReference?: string,
  ISODestinationCountryCode?: string,
  originatorIdentification?: string,
  standardEntryClassCode: string,
  companyEntryDescription?: string,
  ISOOriginatingCurrencyCode?: string,
  ISODestinationCurrencyCode?: string,
  effectiveEntryDate: string,
  originatorStatusCode?: number,
  ODFIIdentification: string,
  batchNumber?: number
}

export type IATEntryDetails = {
  id?: string,
  transactionCode: number,
  RDFIIdentification: string,
  checkDigit?: string,
  addendaRecords?: number,
  amount: number,
  DFIAccountNumber: string,
  OFACScreeningIndicator?: string,
  secondaryOFACScreeningIndicator?: string,
  addendaRecordIndicator?: number,
  traceNumber: string,
  addenda10: {
    id?: string,
    typeCode?: string,
    transactionTypeCode?: string,
    foreignPaymentAmount?: number,
    foreignTraceNumber?: string,
    name: string,
    entryDetailSequenceNumber?: number
  },
  addenda11: {
    id?: string,
    typeCode?: string,
    originatorName: string,
    originatorStreetAddress?: string,
    entryDetailSequenceNumber?: number
  },
  addenda12: {
    id?: string,
    typeCode?: string,
    originatorCityStateProvince?: string,
    originatorCountryPostalCode?: string,
    entryDetailSequenceNumber?: number
  },
  addenda13: {
    id?: string,
    typeCode?: string,
    ODFIName?: string,
    ODFIIDNumberQualifier?: string,
    ODFIIdentification?: string,
    ODFIBranchCountryCode?: string,
    entryDetailSequenceNumber?: number
  },
  addenda14: {
    id?: string,
    typeCode?: string,
    RDFIName?: string,
    RDFIIDNumberQualifier?: string,
    RDFIIdentification?: string,
    RDFIBranchCountryCode?: string,
    entryDetailSequenceNumber?: number
  },
  addenda15: {
    id?: string,
    typeCode?: string,
    receiverIDNumber?: string,
    receiverStreetAddress?: string,
    entryDetailSequenceNumber?: number
  },
  addenda16: {
    id?: string,
    typeCode?: string,
    receiverCityStateProvince?: string,
    receiverCountryPostalCode?: string,
    entryDetailSequenceNumber?: number
  },
  addenda17?: [{
    id?: string,
    typeCode?: string,
    paymentRelatedInformation?: string,
    sequenceNumber?: number,
    entryDetailSequenceNumber?: number
  }],
  addenda18?: [{
    id?: string,
    typeCode?: string,
    foreignCorrespondentBankName?: string,
    foreignCorrespondentBankIDNumberQualifier?: string,
    foreignCorrespondentBankIDNumber?: string,
    foreignCorrespondentBankBranchCountryCode?: string,
    sequenceNumber?: number,
    entryDetailSequenceNumber?: number
  }],
  addenda98?: {
    id?: string,
    typeCode?: string,
    changeCode?: string,
    originalTrace?: string,
    originalDFI?: string,
    correctedData?: string,
    traceNumber?: string
  },
  addenda99?: {
    id?: string,
    typeCode?: string,
    returnCode?: string,
    originalTrace?: string,
    dateOfDeath?: string,
    originalDFI?: string,
    addendaInformation?: string,
    traceNumber?: string
  },
  category?: string
}

export type IATBatches = {
  id?: string,
  IATBatchHeader: IATBatchHeader,
  IATEntryDetails: Array<IATEntryDetails>,
  batchControl?: BatchControl
}

export type FileControl = {
  id?: string,
  batchCount?: number,
  blockCount?: number,
  entryAddendaCount?: number,
  entryHash?: number,
  totalDebit?: number,
  totalCredit?: number
}

export type FileAdvControl = {
  id?: string,
  batchCount?: number,
  blockCount?: number,
  entryAddendaCount?: number,
  entryHash?: number,
  totalDebit?: number,
  totalCredit?: number
}

export type ReturnEntries = Array<Batches>

export type ACH = {
  id?: string,
  fileHeader?: FileHeader,
  batches?: Array<Batches>,
  IATBatches?: Array<IATBatches>,
  fileControl?: FileControl,
  NotificationOfChange?: Array<Batches>,
  ReturnEntries?: ReturnEntries,
  fileADVControl?: FileAdvControl
}
