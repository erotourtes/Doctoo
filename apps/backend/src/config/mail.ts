import { registerAs } from '@nestjs/config';
import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';
import { validate } from './utils';
import { Expose, Transform } from 'class-transformer';

class MailConfig {
  @Expose()
  @IsString()
  MAIL_HOST: string;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(65535)
  MAIL_PORT: number;

  @Expose()
  @IsString()
  MAIL_USER: string;

  @Expose()
  @IsString()
  MAIL_PASS: string;

  @Expose()
  @IsString()
  MAIL_FROM: string;

  @Expose()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  MAIL_SECURE: boolean;
}

export default registerAs('mail', () => {
  return validate(MailConfig);
});
