import { ResponseWithoutRelationsUserDto } from '../../user/dto/responseWithoutRelations';

export class ResponseAuthGoogleSignInDto {
  isLoggedIn: boolean;
  user: ResponseWithoutRelationsUserDto;
}
