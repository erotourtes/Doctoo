import { OmitType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreatePatientDto } from '../../patient/dto/create.dto';
import { CreateUserDto } from '../../user/dto/create.dto';

export class AuthSignUpUserDto extends OmitType(CreateUserDto, ['avatarKey']) {
  @IsOptional()
  avatarImgUrl?: string;
}

export class AuthSignUpPatientDto extends OmitType(CreatePatientDto, ['userId']) {}
