import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  userId: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  payrate: number;

  @IsString()
  about: string;

  @IsString()
  specializationId: string;
}
