import { BloodType, Gender } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreatePatientBaseDto {
  @IsNotEmptyString()
  readonly userId: string;

  @IsNumber()
  readonly weight: number;

  @IsNumber()
  readonly height: number;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly identityCardKey: string;

  @IsEnum(BloodType)
  readonly bloodType: BloodType;

  @IsEnum(Gender)
  readonly gender: Gender;
}

export class CreatePatientAdressDto {
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

  @IsNumber()
  readonly zipCode?: number;
}

export class CreatePatientDto extends CreatePatientBaseDto {
  readonly address: CreatePatientAdressDto;
}
