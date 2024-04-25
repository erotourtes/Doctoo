import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ResponseDoctorDto } from '../../doctor/dto/response.dto';
import { ResponsePatientDto } from '../../patient/dto/response.dto';

export class ResponseUserDto {
  @ApiProperty({ description: 'The ID of the user', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  readonly id: string;

  @ApiProperty({ description: 'The first name of the user', example: 'John' })
  readonly firstName: string;

  @ApiProperty({ description: 'The last name of the user', example: 'Doe' })
  readonly lastName: string;

  @ApiProperty({ description: 'The phone number of the user', example: '+380980000000' })
  readonly phone: string;

  @ApiProperty({ description: 'The email address of the user', example: 'user@example.com' })
  readonly email: string;

  @Exclude()
  readonly password: string;

  @ApiProperty({ description: 'Indicates whether the email is verified', example: true })
  readonly emailVerified: boolean;

  @ApiProperty({ description: 'The Google ID of the user', example: 'google123' })
  readonly googleId: string;

  @ApiProperty({ description: 'The avatar key of the user', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  readonly avatarKey: string;

  @ApiProperty({ description: 'The list of doctors associated with the user', example: [] })
  readonly doctors: ResponseDoctorDto[];

  @ApiProperty({ description: 'The list of patients associated with the user', example: [] })
  readonly patients: ResponsePatientDto[];
}
