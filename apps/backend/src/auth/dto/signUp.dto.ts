import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create.dto';
import { CreatePatientDto } from '../../patient/dto/create.dto';
import { IsOptional } from 'class-validator';

export class AuthSignUpUserDto extends OmitType(CreateUserDto, ['avatarKey', 'emailVerified']) {
  @IsOptional()
  avatarImgUrl?: string;
}

export class AuthSignUpPatientDto extends OmitType(CreatePatientDto, ['userId']) {}
