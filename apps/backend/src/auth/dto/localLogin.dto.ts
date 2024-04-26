import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AuthLocalLoginDto {
  @ApiProperty({ example: 'hello@example.com', description: 'Patient email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'Patient password' })
  @IsString()
  password: string;
}

export class TwoFactorAuthDto {
  @ApiProperty({ example: 'hello@example.com', description: 'Patient email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'Patient password' })
  @IsString()
  password: string;

  @ApiProperty({ example: '123456', description: 'Verification code' })
  @IsString()
  @Length(6, 6)
  code: string;
}
