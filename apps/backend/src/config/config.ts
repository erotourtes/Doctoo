import { registerAs } from '@nestjs/config';
import { getOrThrow } from './utils';

export default registerAs('config', () => ({
  NODE_ENV: getOrThrow('NODE_ENV'),
  APP_NAME: getOrThrow('APP_NAME'),
  APP_URL: getOrThrow('BACKEND_URL'),
  FRONTEND_URL: getOrThrow('FRONTEND_URL'),
  FRONTEND_SIGNUP_PATH: getOrThrow('FRONTEND_SIGNUP_PATH'),
  FRONTEND_CHANGE_EMAIL_PATH: getOrThrow('FRONTEND_CHANGE_EMAIL_PATH'),
}));
