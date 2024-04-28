import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ResponseAllergyDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique allergy id.' })
  readonly id: string;

  @ApiProperty({ example: 'Penicillin', description: 'The full name of the allergy is.' })
  readonly name: string;
}
