import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreatePatientDto } from './create.dto';
import { ApiProperty } from '@nestjs/swagger';

class PrePatchPatientDto extends OmitType(CreatePatientDto, ['userId']) {}

export class PatchPatientDto extends PartialType(PrePatchPatientDto) {
  @IsNumber()
  @ApiProperty({ description: 'The ID of declaration between the patient and the user' })
  readonly declarationId: string;
}
