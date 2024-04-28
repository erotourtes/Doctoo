import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BloodType, Gender } from '@prisma/client';
import { randomUUID } from 'crypto';

export class ResponsePatientDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique patient id.' })
  readonly id: string;

  @ApiProperty({ example: randomUUID(), description: 'The unique user id of the user to which the patient is bound.' })
  readonly userId: string;

  @ApiProperty({ example: 65, description: "Patient's weight." })
  readonly weight: number;

  @ApiProperty({ example: 185, description: 'Patient height.' })
  readonly height: number;

  @ApiProperty({ example: 35, description: "Patient's age." })
  readonly age: number;

  @ApiProperty({ enum: BloodType, example: BloodType.AB_MINUS, description: "The patient's blood type." })
  readonly bloodType: BloodType;

  @ApiProperty({ enum: Gender, example: Gender.MALE, description: 'Patient gender.' })
  readonly gender: Gender;

  @ApiProperty({ example: randomUUID(), description: 'A unique key to the patient identification file.' })
  readonly identityCardKey: string;

  @ApiProperty({ example: 'USA', description: 'The country where the hospital is located.' })
  readonly country: string;

  @ApiPropertyOptional({ example: 'Oregon', description: 'The address of the state where the hospital is located.' })
  readonly state?: string;

  @ApiProperty({ example: 'Salem', description: 'The name of the city where this hospital is located.' })
  readonly city: string;

  @ApiProperty({ example: 'St. Big Bells', description: 'The name of the street where this hospital is located.' })
  readonly street: string;

  @ApiPropertyOptional({ example: '35A', description: "Patient's apartment number." })
  readonly apartment?: string;

  @ApiProperty({ example: 0o200, description: "The hospital's zip code." })
  readonly zipCode?: number;

  @ApiProperty({ default: false, description: "Status of alerts to the patient's email." })
  emailNotificationToggle: boolean;

  @ApiProperty({ example: false, description: 'Whether to request a two-factor confirmation when making a payment.' })
  requestBillPaymentApproval: boolean;
}
