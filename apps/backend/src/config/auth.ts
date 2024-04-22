import { registerAs } from '@nestjs/config';
import { getOrThrow } from './utils';

export default registerAs('auth', () => ({
  JWT_SECRET: getOrThrow('JWT_SECRET'),
  JWT_EXPIRATION_DAYS: getOrThrow('JWT_EXPIRATION_DAYS'),
  JWT_EXPIRATION_TRESHOLD_SECONDS: +getOrThrow('JWT_EXPIRATION_TRESHOLD_SECONDS'),

  GOOGLE_CLIENT_ID: getOrThrow('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: getOrThrow('GOOGLE_CLIENT_SECRET'),
  googleRedirectURL: getOrThrow('GOOGLE_REDIRECT_URL'),

  SALT_ROUNDS: +getOrThrow('SALT_ROUNDS'),
}));
