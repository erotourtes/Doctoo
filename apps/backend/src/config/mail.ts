import { registerAs } from '@nestjs/config';
import { getOrThrow } from './utils';

export default registerAs('mail', () => ({
  MAIL_HOST: getOrThrow('MAIL_HOST'),
  MAIL_PORT: +getOrThrow('MAIL_PORT'),
  MAIL_USER: getOrThrow('MAIL_USER'),
  MAIL_PASS: getOrThrow('MAIL_PASS'),
  MAIL_FROM: getOrThrow('MAIL_FROM'),
  MAIL_SECURE: getOrThrow('MAIL_SECURE') === 'true',
}));
