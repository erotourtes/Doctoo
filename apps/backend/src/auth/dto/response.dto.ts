import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { ResponseWithoutRelationsUserDto } from '../../user/dto/responseWithoutRelations';
import { ResponsePatientDto } from '../../patient/dto/response.dto';
import { Exclude } from 'class-transformer';

export class LocalLoginResponseDto {
  is2faEnabled: boolean;
}

export class GoogleSignInResponseDto {
  isLoggedIn: boolean;
  user: ResponseWithoutRelationsUserDto;
}

export class GetMePatientResponseDto extends IntersectionType(
  OmitType(ResponseWithoutRelationsUserDto, ['secretCode', 'password', 'id']),
  OmitType(ResponsePatientDto, ['userId', 'id']),
) {
  @ApiProperty({ description: 'User id' })
  userId: string;

  @ApiProperty({ description: 'Patient id' })
  patientId: string;

  @Exclude()
  id?: string;
}
