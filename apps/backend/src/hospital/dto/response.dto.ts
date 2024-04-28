import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class ResponseHospitalDto {
  @ApiProperty({ example: randomUUID(), description: "The hospital's unique id." })
  readonly id: string;

  @ApiProperty({ example: 'Ichilov and Assuta', description: 'The full name of the hospital is.' })
  readonly name: string;

  @ApiProperty({ example: 'USA', description: 'The country where the hospital is located.' })
  readonly country: string;

  @ApiPropertyOptional({ example: 'Oregon', description: 'The address of the state where the hospital is located.' })
  readonly state?: string;

  @ApiProperty({ example: 'Salem', description: 'The name of the city where this hospital is located.' })
  readonly city: string;

  @ApiProperty({ example: 'St. Big Bells', description: 'The name of the street where this hospital is located.' })
  readonly street: string;

  @ApiProperty({ example: 0o200, description: "The hospital's zip code." })
  readonly zipCode?: number;
}
