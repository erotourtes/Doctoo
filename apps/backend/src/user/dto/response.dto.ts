import { Doctor, Patient } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseUserDto {
  @ApiProperty({ description: 'The ID of the user', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  readonly id: string;

  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  readonly first_name: string;

  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  readonly last_name: string;

  @ApiProperty({ description: 'The phone number of the user', example: '+380980000000' })
  readonly phone: string;

  @ApiProperty({ description: 'The email address of the user', example: 'user@example.com' })
  readonly email: string;

  @ApiProperty({ description: 'Indicates whether the email is verified', example: true })
  readonly email_verified: boolean;

  @ApiProperty({ description: 'The password of the user', example: 'password123' })
  readonly password: string;

  @ApiProperty({ description: 'The Google ID of the user', example: 'google123' })
  readonly google_id: string;

  @ApiProperty({ description: 'The avatar key of the user', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  readonly avatar_key: string;

  @ApiProperty({ description: 'The list of doctors associated with the user', example: [] })
  readonly doctors: Doctor[]; // TODO: Use Doctor dto instead of prisma model.

  @ApiProperty({ description: 'The list of patients associated with the user', example: [] })
  readonly patients: Patient[]; // TODO: use Patient dto instead of prisma model.
}
