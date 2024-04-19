import { ResponseAuthSignUpUserDto } from './responseGoogleSignUp.dto';

// TODO: Should we just return user object?
export class ResponseAuthGoogleSignInDto {
  isSignedUp: boolean;
  userSignUpData?: {
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    googleId: string;
    avatarKey: string;
  };
  user?: ResponseAuthSignUpUserDto;
}
