import { registerAs } from '@nestjs/config';
import { getOrThrow } from 'src/config/utils';

export default registerAs('auth-config', () => ({
  jwtSecret: getOrThrow('JWT_SECRET'),
  jwtExpirationDays: getOrThrow('JWT_EXPIRATION_DAYS'),

  googleClientID: getOrThrow('GOOGLE_CLIENT_ID'),
  googleSecret: getOrThrow('GOOGLE_SECRET'),
  googleRedirectURL: getOrThrow('GOOGLE_REDIRECT_URL'),
}));
