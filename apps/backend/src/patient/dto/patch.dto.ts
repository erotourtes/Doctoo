import { PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './create.dto';

export class PatchPatientDto extends PartialType(CreatePatientDto) {}
