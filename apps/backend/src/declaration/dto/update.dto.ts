import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';
import { IsNotEmptyString } from '../../validators/IsNotEmptyString';

export class UpdateDeclarationDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique doctor id.' })
  @IsUUID(4)
  @IsNotEmptyString()
  readonly doctorId: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique patient id.' })
  @IsUUID(4)
  @IsNotEmptyString()
  readonly patientId: string;
}
