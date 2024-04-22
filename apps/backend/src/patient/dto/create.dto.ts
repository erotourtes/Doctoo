import { BloodType, Gender } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreatePatientDto {
  @IsNotEmptyString()
  @ApiProperty({ description: 'The ID of the user associated with the patient' })
  readonly userId: string;

  @IsNumber()
  @ApiProperty({ description: 'The weight of the patient' })
  readonly weight: number;

  @IsNumber()
  @ApiProperty({ description: 'The height of the patient' })
  readonly height: number;

  @IsNumber()
  @ApiProperty({ description: 'The age of the patient' })
  readonly age: number;

  @IsString()
  readonly identityCardKey: string;

  @IsEnum(BloodType)
  @ApiProperty({ description: 'The blood type of the patient', type: 'enum', enum: BloodType })
  readonly bloodType: BloodType;

  @IsEnum(Gender)
  @ApiProperty({ description: 'The gender of the patient', type: 'enum', enum: Gender })
  readonly gender: Gender;

  @IsString()
  @ApiProperty({ description: 'The country of residence of the patient' })
  readonly country: string;

  @IsOptional()
  @ApiProperty({ description: 'The state of residence of the patient', required: false })
  readonly state?: string;

  @IsString()
  @ApiProperty({ description: 'The city of residence of the patient' })
  readonly city: string;

  @IsString()
  @ApiProperty({ description: 'The street address of the patient' })
  readonly street: string;

  @IsOptional()
  @ApiProperty({ description: 'The apartment number of the patient', required: false })
  readonly apartment?: string;

  @IsNumber()
  @ApiProperty({ description: 'The zip code of the patient', required: false })
  readonly zipCode?: number;
}
