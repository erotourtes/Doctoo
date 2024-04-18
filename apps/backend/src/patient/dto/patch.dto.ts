import { PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { CreatePatientDto } from './create.dto';

export class PatchPatientDto extends PartialType(CreatePatientDto) {
  @IsNumber()
  readonly declaration_id: number;

  @IsString()
  readonly identity_card_key: string;
}
