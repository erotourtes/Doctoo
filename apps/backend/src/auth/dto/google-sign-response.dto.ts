import { Exclude } from 'class-transformer';
import { ResponseUserDto } from 'src/user/dto/response.dto';

export class ResponseGoogleSignDto {
  isSignedUp: boolean;
  userSignUpData?: {
    last_name: string;
    first_name: string;
    email: string;
    email_verified: boolean;
    google_id: string;
    avatar_key: string;
  };
  user?: ResponseSignUpUserDto;
}

export class ResponseSignUpUserDto extends ResponseUserDto {
  @Exclude()
  override password: string;

  @Exclude()
  override google_id: string;
}
