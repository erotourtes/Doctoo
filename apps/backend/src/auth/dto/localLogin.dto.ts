import { IsEmail, IsString } from 'class-validator';

export class AuthLocalLoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
