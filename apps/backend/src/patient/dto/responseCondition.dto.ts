import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ResponseConditionDto {
  @ApiProperty({ example: randomUUID(), description: 'Condition id' })
  readonly id: string;

  @ApiProperty({ example: 'Asthma', description: 'Condition name' })
  readonly name: string;
}
