import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Credential } from '../types/config';
import { createCommandError } from './errorHandler';

export const generateTokenWithJWT = (secret: string, signee: string): string => {
  if (!secret) {
    throw createCommandError({
      message: 'Missing JWT secret',
      code: 'missing_jwt_secret'
    });
  }

  const token = jwt.sign({ signee }, secret, { algorithm: 'HS512', expiresIn: '1d' });

  return token || '';
};

export const getAccessTokenWithCredential = async (token: string, baseUrl: string, tenantId: string, credential: Credential) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}/oauth/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      tenantId
    },
    data: credential
  };
  const { data: { access_token } } = await axios.request(options);
  token = access_token;

  return token;
};
