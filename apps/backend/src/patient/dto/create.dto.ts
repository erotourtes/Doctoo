import { BloodType, Gender } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreatePatientDto {
  @IsNotEmptyString()
  readonly user_id: string;

  @IsNumber()
  readonly weight: number;

  @IsNumber()
  readonly height: number;

  @IsNumber()
  readonly age: number;

  @IsEnum(BloodType)
  readonly blood_type: BloodType;

  @IsEnum(Gender)
  readonly gender: Gender;

  @IsString()
  readonly country: string;

  @IsOptional()
  readonly state?: string;

  @IsString()
  readonly city: string;

  @IsString()
  readonly street: string;

  @IsOptional()
  readonly apartment?: string;

  @IsOptional()
  readonly zip_code?: number;
}
