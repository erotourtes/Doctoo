import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';
import { ResponsePatientDto } from '../../patient/dto/response.dto';
import { ResponseUserDto } from '../../user/dto/response.dto';

export class PatientResponseDto extends IntersectionType(
  OmitType(ResponseUserDto, ['secretCode', 'password', 'id']),
  OmitType(ResponsePatientDto, ['userId', 'id']),
) {
  @ApiProperty({ example: randomUUID(), description: 'Unique user id.' })
  userId: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique patient id.' })
  patientId: string;

  @Exclude()
  id?: string;
}
