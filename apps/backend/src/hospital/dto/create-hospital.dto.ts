import { IsOptional, IsString } from 'class-validator';

export class CreateHospitalDto {
  @IsString({ message: 'name should be a string' })
  readonly name: string;

  @IsString({ message: 'country should be a string' })
  readonly country: string;

  @IsOptional()
  @IsString({ message: 'state should be a string' })
  readonly state?: string;

  @IsString({ message: 'city should be a string' })
  readonly city: string;

  @IsString({ message: 'street should be a string' })
  readonly street: string;
}
