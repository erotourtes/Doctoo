import { IntersectionType, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create.dto';
import { CreatePatientDto } from '../../patient/dto/create.dto';
import { IsOptional } from 'class-validator';

class UserPatientDto extends IntersectionType(CreateUserDto, CreatePatientDto) {}

export class AuthSignUpDto extends OmitType(UserPatientDto, [
  'avatarKey',
  'emailVerified',
  'userId',
  'identityCardKey',
]) {
  @IsOptional()
  avatarImgUrl?: string;
}
