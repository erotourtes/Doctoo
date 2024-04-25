import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthLocalLoginDto {
  @ApiProperty({ example: 'hello@example.com', description: 'Patient email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'Patient password' })
  @IsString()
  password: string;
}
