import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ResponseSpecializationDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique specialisation id.' })
  readonly id: string;

  @ApiProperty({ example: 'Surgeon', description: 'Specialization name.' })
  readonly name: string;
}
