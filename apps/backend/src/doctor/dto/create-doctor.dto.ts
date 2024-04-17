import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator'

export class CreateDoctorDto {
  @IsString({ message: 'user_id should be a string' })
  user_id: string;

  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'payrate should be a number' })
  @Min(0, { message: 'payrate should not be less than 0' })
  @Type(() => Number)
  payrate: number;

  @IsString({ message: 'about_me should be a string' })
  about_me: string;

  @IsString({ message: 'specialization_id should be a string' })
  specialization_id: string;
}
