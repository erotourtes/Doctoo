import { BloodType, Gender } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';
import { CreatePatientAdressDto } from '../../patient/dto/create.dto';
import { CreateUserDto } from '../../user/dto/create.dto';

// TODO: Ask auth developer about this dto.
export class AuthSignUpBaseDto extends CreateUserDto {
  @IsNumber()
  readonly weight: number;

  @IsNumber()
  readonly height: number;

  @IsNumber()
  readonly age: number;

  @IsEnum(BloodType)
  readonly bloodType: BloodType;

  @IsEnum(Gender)
  readonly gender: Gender;
}

// TODO: Find way how it can be optimized.
export class AuthSignUpDto extends AuthSignUpBaseDto {
  readonly address: CreatePatientAdressDto;
}
