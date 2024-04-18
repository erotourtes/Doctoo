import { BloodType, Gender } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create.dto';

export class SignUpDto extends CreateUserDto {
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

  @IsNumber()
  readonly declaration_id: number;

  @IsString()
  readonly identity_card_key: string;

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
