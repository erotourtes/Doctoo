import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreatePatientDto } from './create.dto';
import { ApiProperty } from '@nestjs/swagger'

export class PatchPatientDto extends PartialType(CreatePatientDto) {
  @IsNumber()
  @ApiProperty({ description: 'The ID of declaration between the patient and the user' })
  readonly declaration_id: number;

  @IsString()
  @ApiProperty({ description: 'The identity card key of the patient' })
  readonly identity_card_key: string;
}
