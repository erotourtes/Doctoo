import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreateUserDto {
  @IsNotEmptyString()
  readonly first_name: string;

  @IsNotEmptyString()
  readonly last_name: string;

  @IsPhoneNumber()
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsBoolean()
  readonly email_verified: boolean;

  @IsOptional()
  password?: string;

  @IsOptional()
  google_id?: string;

  @IsNotEmptyString()
  avatar_key: string;
}
