import { ApiProperty } from '@nestjs/swagger';

export class ResponseCondtionDto {
  @ApiProperty({ example: '1', description: 'Condition id' })
  readonly id: string;

  @ApiProperty({ example: 'Asthma', description: 'Condition name' })
  readonly name: string;
}
