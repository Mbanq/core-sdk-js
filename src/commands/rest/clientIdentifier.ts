import {
  ClientIdentifierRequest,
  ClientIdentifierResponse,
  ListClientDocumentResponse,
  validateClientIdentifierRequest,
  validateDocumentUploadRequest,
  DocumentUploadRequest,
  DocumentUploadResponse,
  DeleteClientDocumentResponse,
  ApproveRejectClientDocumentResponse
} from '../../types/clientIdentifier';
import { Command, Config } from '../../types/config';
import baseRequest from '../../utils/baseRequest';
import { handleAxiosError } from '../../utils/errorHandler';

export const GetPermittedDocumentTypes = (clientId: number): Command<{ clientId: number }, any> => {
  const path = `/v1/clients/${clientId}/identifiers/template`;

  return {
    input: { clientId },
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
  };
};

export const ListClientDocument = (params: {
  clientId: number;
  unmaskValue?: boolean;
  fields?: string;
}): Command<{ params: typeof params }, ListClientDocumentResponse> => {
  const queryParams = new URLSearchParams();
  if (params.unmaskValue !== undefined) {
    queryParams.append('unmaskValue', params.unmaskValue.toString());
  }
  if (params.fields) {
    queryParams.append('fields', params.fields);
  }
  const queryString = queryParams.toString();
  const path = `/v1/clients/${params.clientId}/identifiers${queryString ? `?${queryString}` : ''}`;

  return {
    input: { params },
    metadata: {
      commandName: 'ListClientDocument',
      path,
      method: 'GET'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.get<ListClientDocumentResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const CreateClientIdentifier = (
  clientId: number,
  input: ClientIdentifierRequest
): Command<{ clientId: number; input: ClientIdentifierRequest }, ClientIdentifierResponse> => {
  validateClientIdentifierRequest(input);
  const path = `/v1/clients/${clientId}/identifiers`;

  return {
    input: { clientId, input },
    metadata: {
      commandName: 'CreateClientIdentifier',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ClientIdentifierResponse>(path, input);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UpdateClientIdentifier = (
  clientId: number,
  identifierId: string,
  updates: ClientIdentifierRequest
): Command<{ clientId: number; identifierId: string; updates: ClientIdentifierRequest }, ClientIdentifierResponse> => {
  validateClientIdentifierRequest(updates);
  const path = `/v1/clients/${clientId}/identifiers/${identifierId}`;

  return {
    input: { clientId, identifierId, updates },
    metadata: {
      commandName: 'UpdateClientIdentifier',
      path,
      method: 'PUT'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.put<ClientIdentifierResponse>(path, { ...updates });
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const UploadClientIdentifierDocument = (
  clientId: number,
  identifierId: string,
  data: DocumentUploadRequest
): Command<{
  clientId: number;
  identifierId: string;
  data: DocumentUploadRequest
}, DocumentUploadResponse> => {
  validateDocumentUploadRequest(data);

  const path = `/v1/client_identifiers/${identifierId}/documents`;

  return {
    input: { clientId, identifierId, data },
    metadata: {
      commandName: 'UploadClientIdentifierDocument',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);
      const { name, file, type, description } = data;
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

export const DeleteClientDocument = (
  clientId: number,
  identifierId: number
): Command<{
  clientId: number;
  identifierId: number;
}, DeleteClientDocumentResponse> => {
  const path = `/v1/clients/${clientId}/identifiers/${identifierId}`;

  return {
    input: { clientId, identifierId },
    metadata: {
      commandName: 'DeleteClientDocument',
      path,
      method: 'DELETE'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.delete<DeleteClientDocumentResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};

export const ApproveRejectClientDocument = (
  clientId: number,
  identifierId: number,
  command: 'approve' | 'reject'
): Command<{
  clientId: number;
  identifierId: number;
  command: 'approve' | 'reject';
}, ApproveRejectClientDocumentResponse> => {
  const path = `/v1/clients/${clientId}/identifiers/${identifierId}?command=${command}`;

  return {
    input: { clientId, identifierId, command },
    metadata: {
      commandName: 'ApproveRejectClientDocument',
      path,
      method: 'POST'
    },
    execute: async (config: Config) => {
      const axiosInstance = await baseRequest(config);

      try {
        const response = await axiosInstance.post<ApproveRejectClientDocumentResponse>(path);
        return response.data;
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };
};
