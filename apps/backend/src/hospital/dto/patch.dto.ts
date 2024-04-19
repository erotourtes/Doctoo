import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { AdressDto } from '../../Adress.dto';

export class PatchHospitalDto extends PartialType(AdressDto) {
  @IsOptional()
  @IsString()
  readonly name?: string;
}
