import axios, { AxiosInstance } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import * as https from 'https';
import { generateTokenWithJWT, getAccessTokenWithCredential } from './generateToken';
import type { Config } from '../types';

const core = {
  token: ''
};

const formatBearerToken = (token: string): string => {
  if (!token) return token;
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
};

export default async (config: Config): Promise<AxiosInstance> => {
  const verifyCoreSsl = true;
  const instance = axios.create({
    timeout: config.axiosConfig?.timeout || 29000,
    baseURL: config.baseUrl,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'JWT-Token': config?.secret ? `${generateTokenWithJWT(config?.secret, config?.signee || '')}` : undefined,
      Authorization: config.bearerToken !== undefined ? formatBearerToken(config.bearerToken) : config.credential ? `Bearer ${core.token || await getAccessTokenWithCredential(core.token, config.baseUrl, config.tenantId, config.credential )}` : undefined,
      'trace-id': config.traceId || `RequestUUID=${uuidv4()}`,
      tenantId: config.tenantId
    },
    httpsAgent: new https.Agent({
      rejectUnauthorized: verifyCoreSsl,
      keepAlive: config.axiosConfig?.keepAlive
    })
  });
  if (config.logger) {
    config.logger(instance);
  }

  return instance;
};
