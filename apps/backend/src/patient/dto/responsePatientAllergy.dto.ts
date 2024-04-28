import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ResponsePatientAllergyDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique patient allergy id.' })
  readonly id: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique patient id.' })
  readonly patientId: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique allergy id.' })
  readonly allergyId: string;
}
