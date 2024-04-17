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
  user?: ResponseUserDto;
}
