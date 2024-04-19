import { IsBoolean, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreateUserDto {
  @IsNotEmptyString()
  readonly firstName: string;

  @IsNotEmptyString()
  readonly lastName: string;

  @IsPhoneNumber()
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsBoolean()
  readonly emailVerified: boolean;

  @IsOptional()
  password?: string;

  @IsOptional()
  googleId?: string;

  @IsNotEmptyString()
  avatarKey: string;
}
