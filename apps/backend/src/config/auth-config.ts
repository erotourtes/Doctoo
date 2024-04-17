import { registerAs } from '@nestjs/config';
import { getOrThrow } from 'src/config/utils';

export default registerAs('auth-config', () => ({
  jwtSecret: getOrThrow('JWT_SECRET'),
  jwtExpirationDays: getOrThrow('JWT_EXPIRATION_DAYS'),

  clientID: getOrThrow('GOOGLE_CLIENT_ID'),
  clientSecret: getOrThrow('GOOGLE_SECRET'),
}));
