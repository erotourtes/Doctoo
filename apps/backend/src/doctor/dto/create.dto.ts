import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsUUID, Min } from 'class-validator';
import { randomUUID } from 'crypto';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class CreateDoctorDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique user id.' })
  @IsUUID(4)
  userId: string;

  @ApiProperty({ example: 100, description: "Doctor's hourly rate." })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  payrate: number;

  @ApiProperty({
    example: 'Experienced doctor with a focus on patient care.',
    description: 'A full description of the doctor.',
  })
  @IsNotEmptyString()
  about: string;

  @ApiProperty({ example: [randomUUID()], description: 'A list of ids specialties that the doctor covers.' })
  @IsUUID(4, { each: true, message: 'Each value must be in UUID format.' })
  specializationIds: string[];

  @ApiProperty({ example: [randomUUID()], description: 'List of hospitals where the doctor works.' })
  @IsUUID(4, { each: true, message: 'Each value must be in UUID format.' })
  hospitalIds: string[];
}
