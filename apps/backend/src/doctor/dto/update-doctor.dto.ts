import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorDto {
  @ApiProperty({ required: false, type: Number, description: 'The pay rate of the doctor', example: 100 })
  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'payrate should be a number' })
  @Min(0, { message: 'payrate should not be less than 0' })
  @Type(() => Number)
  payrate: number;

  @ApiProperty({
    required: false,
    type: String,
    description: 'About me section of the doctor',
    example: 'Experienced cardiologist with a focus on patient care',
  })
  @IsOptional()
  @IsString({ message: 'about_me should be a string' })
  about_me: string;
}
