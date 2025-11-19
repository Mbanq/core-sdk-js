import { type Command, type Config } from '../../types';
import {
  ClientIdentifierRequest,
  ClientIdentifierResponse,
  validateClientIdentifierRequest,
  validateDocumentUploadRequest,
  DocumentUploadRequest,
  DocumentUploadResponse
} from '../../types/clientIdentifier';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

export const GetPermittedDocumentTypes = (params: { tenantId?: string; clientId: number }): Command<{ tenantId?: string; clientId: number }, any> => {
  const path = `/v1/clients/${params.clientId}/identifiers/template`;
  return {
    input: params,
    metadata: {
      commandName: 'GetPermittedDocumentTypes',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);
      try {
        const response = await axiosInstance.get<ClientIdentifierResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}

export const CreateClientIdentifier = (params:
  { tenatId?: string; clientId: number; input: ClientIdentifierRequest }
): Command<{ tenantId?: string; clientId: number; input: ClientIdentifierRequest }, ClientIdentifierResponse> => {
  validateClientIdentifierRequest(params.input);
  const path = `/v1/clients/${params.clientId}/identifiers`;
  return {
    input: params,
    metadata: {
      commandName: 'CreateClientIdentifier',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ClientIdentifierResponse>(path, params.input);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  }
}

export const UpdateClientIdentifier = (
  params: { tenantId?: string; clientId: number; identifierId: string; updates: ClientIdentifierRequest }
): Command<{ tenantId?: string; clientId: number; identifierId: string; updates: ClientIdentifierRequest }, ClientIdentifierResponse> => {
  validateClientIdentifierRequest(params.updates);
  const path = `/v1/clients/${params.clientId}/identifiers/${params.identifierId}`
  return {
    input: params,
    metadata: {
      commandName: 'UpdateClientIdentifier',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ClientIdentifierResponse>(path, { ...params.updates });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
export const UploadClientIdentifierDocument = (
  params: {
    tenantId?: string;
    clientId: number;
    identifierId: string;
    data: DocumentUploadRequest
  }
): Command<{
  tenantId?: string;
  clientId: number;
  identifierId: string;
  data: DocumentUploadRequest
}, DocumentUploadResponse> => {
  validateDocumentUploadRequest(params.data);

  const path = `/v1/client_identifiers/${params.identifierId}/documents`;
  return {
    input: params,
    metadata: {
      commandName: 'UploadClientIdentifierDocument',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      if (params.tenantId) {
        config.tenantId = params.tenantId;
      }

      const axiosInstance = await baseRequest(config);
      const { name, file, type, description } = params.data
      const formData = new FormData();

      formData.append('name', name);

      if (description) {
        formData.append('description', description);
      }

      if (type) {
        formData.append('type', type);
      }

      let fileBlob: Blob;
      let fileName: string;

      if (file instanceof File) {
        fileBlob = file;
        fileName = file.name;
      } else if (file instanceof Blob) {
        fileBlob = file;
        fileName = name;
      } else {
        fileBlob = new Blob([file], {
          type: 'application/octet-stream'
        });
        fileName = name;
      }
      
      formData.append('file', fileBlob, fileName);

      try {
        const response = await axiosInstance.post<DocumentUploadResponse>(path, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
