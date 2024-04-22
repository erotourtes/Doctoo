import { BloodType, Gender } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ResponsePatientDto {
  @ApiProperty({ description: 'The ID of the patient' })
  readonly id: string;

  @ApiProperty({ description: 'The ID of the user associated with the patient' })
  readonly userId: string;

  @ApiProperty({ description: 'The weight of the patient' })
  readonly weight: number;

  @ApiProperty({ description: 'The height of the patient' })
  readonly height: number;

  @ApiProperty({ description: 'The age of the patient' })
  readonly age: number;

  @ApiProperty({ description: 'The blood type of the patient', type: 'enum', enum: BloodType })
  readonly bloodType: BloodType;

  @ApiProperty({ description: 'The gender of the patient', type: 'enum', enum: Gender })
  readonly gender: Gender;

  @ApiProperty({ description: 'The identity card key of the patient' })
  readonly identityCardKey: string;

  @ApiProperty({ description: 'The country of residence of the patient' })
  readonly country: string;

  @ApiProperty({ description: 'The state of residence of the patient', required: false })
  readonly state?: string;

  @ApiProperty({ description: 'The city of residence of the patient' })
  readonly city: string;

  @ApiProperty({ description: 'The street address of the patient' })
  readonly street: string;

  @ApiProperty({ description: 'The apartment number of the patient', required: false })
  readonly apartment?: string;

  @ApiProperty({ description: 'The zip code of the patient', required: false })
  readonly zipCode?: number;
}
