import { IntersectionType, OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreatePatientDto } from '../../patient/dto/create.dto';
import { CreateUserDto } from '../../user/dto/create.dto';

class UserPatientDto extends IntersectionType(CreateUserDto, CreatePatientDto) {}

export class AuthSignUpDto extends OmitType(UserPatientDto, ['avatarKey', 'emailVerified', 'userId']) {
  @IsOptional()
  avatarImgUrl?: string;
}
