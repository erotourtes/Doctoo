import { registerAs } from '@nestjs/config';
import { getOrThrow } from './utils';

export default registerAs('config', () => ({
  NODE_ENV: getOrThrow('NODE_ENV'),
}));
