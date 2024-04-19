import { IsOptional, IsString } from 'class-validator';

export class UpdateHospitalDto {
  @IsOptional()
  @IsString({ message: 'name should be a string' })
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'country should be a string' })
  readonly country?: string;

  @IsOptional()
  @IsString({ message: 'state should be a string' })
  readonly state?: string;

  @IsOptional()
  @IsString({ message: 'city should be a string' })
  readonly city?: string;

  @IsOptional()
  @IsString({ message: 'street should be a string' })
  readonly street?: string;
}
