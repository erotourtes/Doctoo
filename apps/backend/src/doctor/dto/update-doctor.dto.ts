import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDoctorDto {
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'payrate should be a number' })
  @Min(0, { message: 'payrate should not be less than 0' })
  @Type(() => Number)
  payrate: number;

  @IsOptional()
  @IsString({ message: 'about_me should be a string' })
  about_me: string;
}
