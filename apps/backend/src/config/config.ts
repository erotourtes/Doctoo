import { registerAs } from '@nestjs/config';
import { getOrThrow } from 'src/config/utils';

export default registerAs('config', () => ({
  nodeEnv: getOrThrow('NODE_ENV'),
}));
