import { IsNumber, IsOptional, IsString } from 'class-validator';

// TODO: Move this dto to special module
export class AdressDto {
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
