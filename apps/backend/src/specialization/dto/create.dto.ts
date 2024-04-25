import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSpecializationDto {
  @ApiProperty({ example: 'Surgeon', description: 'Spesialization name' })
  @IsString({ message: 'name should be a string' })
  readonly name: string;
}
