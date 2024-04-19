import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { CreatePatientDto } from './create.dto';

class PrePatchPatientDto extends OmitType(CreatePatientDto, ['userId']) {}

export class PatchPatientDto extends PartialType(PrePatchPatientDto) {
  @IsNumber()
  readonly declarationId: string;
}
