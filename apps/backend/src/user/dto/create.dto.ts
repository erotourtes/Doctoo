import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreateUserDto {
  @IsNotEmptyString()
  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  readonly firstName: string;

  @IsNotEmptyString()
  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  readonly lastName: string;

  @IsPhoneNumber()
  @ApiProperty({ description: 'The phone number of the user', example: '+380980000000' })
  readonly phone: string;

  @IsEmail()
  @ApiProperty({ description: 'The email address of the user', example: 'user@example.com' })
  readonly email: string;

  @IsOptional()
  @ApiProperty({ description: 'The password of the user', nullable: true, example: 'password123' })
  password?: string;

  @IsOptional()
  @ApiProperty({ description: 'The Google ID of the user', nullable: true, example: 'google123' })
  googleId?: string;

  @IsNotEmptyString()
  @ApiProperty({ description: 'The avatar key of the user', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  avatarKey: string;
}
