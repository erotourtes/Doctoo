import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ description: 'The ID of the user', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'The pay rate of the doctor', example: 100 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  payrate: number;

  @ApiProperty({
    description: 'About section of the doctor',
    example: 'Experienced doctor with a focus on patient care',
  })
  @IsString()
  about: string;

  @ApiProperty({ description: 'The ID of the specialization', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  @IsString()
  specializationId: string;
}