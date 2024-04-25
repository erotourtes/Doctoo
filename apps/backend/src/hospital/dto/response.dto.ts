import { ApiProperty } from '@nestjs/swagger';

export class ResponseHospitalDto {
  readonly id: string;

  @ApiProperty({ description: 'The name of the hospital' })
  readonly name: string;

  @ApiProperty({ description: 'The country where the hospital is situated' })
  readonly country: string;

  @ApiProperty({ nullable: true, description: 'The state where the hospital is situated' })
  readonly state?: string;

  @ApiProperty({ description: 'The city where the hospital is situated' })
  readonly city: string;

  @ApiProperty({ description: 'The street where the hospital is situated' })
  readonly street: string;

  @ApiProperty({ description: 'The apartment where the hospital is situated' })
  readonly apartment?: string;

  @ApiProperty({ description: 'The zip code of the hospital' })
  readonly zipCode?: number;
}
