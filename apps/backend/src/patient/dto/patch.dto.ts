import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CreatePatientDto } from './create.dto';

class PrePatchPatientDto extends OmitType(CreatePatientDto, ['userId']) {}

export class PatchPatientDto extends PartialType(PrePatchPatientDto) {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The ID of declaration between the patient and the user' })
  readonly declarationId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Identity card key of the patient' })
  readonly identityCardKey?: string;
}
