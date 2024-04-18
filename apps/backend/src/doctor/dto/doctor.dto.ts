import { Type } from 'class-transformer';
import { ResponseWithoutRelationsUserDto } from '../../user/dto/responseWithoutRelations';
import { ApiProperty } from '@nestjs/swagger';

export class DoctorDto {
  @ApiProperty({ description: 'The ID of the doctor', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  id: string;

  @ApiProperty({ description: 'The pay rate of the doctor', example: 100 })
  payrate: number;

  @ApiProperty({
    description: 'About me section of the doctor',
    example: 'Experienced doctor with a focus on patient care',
  })
  about_me: string;

  @ApiProperty({
    description: 'The ID of the user associated with the doctor',
    example: 'acde070d-8c4c-4f0d-9d8a-162843c10333',
  })
  user_id: string;

  @ApiProperty({ type: ResponseWithoutRelationsUserDto, description: 'The user object associated with the doctor' })
  @Type(() => ResponseWithoutRelationsUserDto)
  user: ResponseWithoutRelationsUserDto;

  @ApiProperty({ description: 'The ID of the specialization', example: 'acde070d-8c4c-4f0d-9d8a-162843c10333' })
  specialization_id: string;
}
