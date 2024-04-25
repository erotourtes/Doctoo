import { ApiProperty } from '@nestjs/swagger';

export class ResponseSpecializationDto {
  @ApiProperty({ example: '1', description: 'Spesialization id' })
  readonly id: string;

  @ApiProperty({ example: 'Surgeon', description: 'Spesialization name' })
  readonly name: string;
}
