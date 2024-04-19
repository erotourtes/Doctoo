import { BloodType, Gender } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create.dto';

// TODO: Ask auth developer about this dto.
export class AuthSignUpDto extends CreateUserDto {
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
  readonly zipCode?: number;
}
