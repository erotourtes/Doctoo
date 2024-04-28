import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateFavoriteDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique doctor id.' })
  @IsUUID(4)
  readonly doctorId: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique patient id.' })
  @IsUUID(4)
  readonly patientId: string;
}
