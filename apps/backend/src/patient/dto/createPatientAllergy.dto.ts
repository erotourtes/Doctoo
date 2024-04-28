import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreatePatientAllergyDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique allergy id.' })
  @IsUUID(4)
  readonly allergyId: string;
}
