import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';
import { randomUUID } from 'crypto';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: "The user's real first name." })
  @IsNotEmptyString()
  readonly firstName: string;

  @ApiProperty({ example: 'Doe', description: "The user's real last name." })
  @IsNotEmptyString()
  readonly lastName: string;

  @ApiProperty({ example: '+380000000000', description: "The user's phone number in national format." })
  @IsPhoneNumber()
  readonly phone: string;

  @ApiProperty({ example: 'example@example.com', description: 'Unique user mail.' })
  @IsEmail()
  readonly email: string;

  @ApiPropertyOptional({ example: 'password', description: 'User password.' })
  @IsOptional()
  @IsNotEmptyString()
  password?: string;

  @ApiPropertyOptional({ example: 'G-123456789', description: 'Unique Google Id of the user.' })
  @IsOptional()
  @IsNotEmptyString()
  googleId?: string;

  @ApiProperty({ example: `${randomUUID()}.jpeg`, description: 'The unique file id of the file in S3 storage.' })
  @IsNotEmptyString()
  avatarKey: string;
}
