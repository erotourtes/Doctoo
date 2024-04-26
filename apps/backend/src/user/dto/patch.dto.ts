import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create.dto';

export class PatchUserDto extends PartialType(CreateUserDto) {}

export class PatchUserWithoutCredentialsDto extends OmitType(PatchUserDto, ['password', 'googleId']) {}
