import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreatePatientDto } from './create.dto';
<<<<<<< Updated upstream
=======
import { ApiProperty } from '@nestjs/swagger';
>>>>>>> Stashed changes

class PrePatchPatientDto extends OmitType(CreatePatientDto, ['userId']) {}

export class PatchPatientDto extends PartialType(PrePatchPatientDto) {
  @IsNumber()
  @ApiProperty({ description: 'The ID of declaration between the patient and the user' })
  readonly declarationId: string;

  @IsString()
  @ApiProperty({ description: 'Identity card key of the patient' })
  readonly identityCardKey: string;
}
