import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHospitalDto {
  @ApiProperty({ description: 'The name of the hospital' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The country where the hospital is situated' })
  @IsString()
  readonly country: string;

  @ApiProperty({ required: false, description: 'The state where the hospital is situated' })
  @IsOptional()
  readonly state?: string;

  @ApiProperty({ description: 'The city where the hospital is situated' })
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'The street where the hospital is situated' })
  @IsString()
  readonly street: string;

  @ApiProperty({ description: 'The apartment where the hospital is situated' })
  @IsOptional()
  readonly apartment?: string;

  @ApiProperty({ description: 'The zip code of the hospital' })
  @IsNumber()
  readonly zipCode?: number;
}
