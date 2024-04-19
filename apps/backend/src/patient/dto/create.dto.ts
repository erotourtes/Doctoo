import { BloodType, Gender } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { AdressDto } from '../../Adress.dto';
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

export class CreatePatientDto extends CreatePatientBaseDto {
  readonly address: AdressDto;
}
