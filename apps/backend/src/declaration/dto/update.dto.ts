import { PartialType } from '@nestjs/swagger';
import { CreateDeclarationDto } from './create.dto';

export class UpdateDeclarationDto extends PartialType(CreateDeclarationDto) {}
