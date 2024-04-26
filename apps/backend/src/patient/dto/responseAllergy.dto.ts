import { ApiProperty } from '@nestjs/swagger';

export class ResponseAllergyDto {
  @ApiProperty({ description: 'The ID of the allergy' })
  readonly id: string;

  @ApiProperty({ description: 'The name of the allergy' })
  readonly name: string;
}
