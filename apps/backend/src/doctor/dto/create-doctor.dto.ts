import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ description: 'The ID of the user', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @IsString({ message: 'user_id should be a string' })
  user_id: string;

  @ApiProperty({ description: 'The pay rate of the doctor', example: 100 })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'payrate should be a number' })
  @Min(0, { message: 'payrate should not be less than 0' })
  @Type(() => Number)
  payrate: number;

  @ApiProperty({ description: 'About me section of the doctor', example: 'Experienced cardiologist with a focus on patient care' })
  @IsString({ message: 'about_me should be a string' })
  about_me: string;

  @ApiProperty({ description: 'The ID of the specialization', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @IsString({ message: 'specialization_id should be a string' })
  specialization_id: string;
}
