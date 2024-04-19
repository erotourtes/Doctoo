import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHospitalDto {
  @IsString()
  readonly name: string;

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
