import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { Profile, Strategy } from 'passport-google-oauth20';
import auth from '../../config/auth';
import { AuthService } from '../auth.service';
import { ResponseAuthGoogleSignInDto } from '../dto/responseGoogleSignIn.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(auth.KEY) private readonly authConfig: ConfigType<typeof auth>,
  ) {
    super({
      clientID: authConfig.GOOGLE_CLIENT_ID,
      clientSecret: authConfig.GOOGLE_CLIENT_SECRET,
      callbackURL: authConfig.googleRedirectURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<ResponseAuthGoogleSignInDto> {
    // TODO: Question about emails array.
    const email = profile.emails[0];

    const user = await this.authService.validateGoogleUser(email.value, profile.id);

    if (!user) {
      const { name, id, photos } = profile;
      const googleId = await this.authService.signGoogleId(id);

      const user = {
        lastName: name.familyName,
        firstName: name.givenName,
        email: email.value,
        emailVerified: email.verified, // TODO: We should manually verify email through our service.
        googleId,
        avatarKey: photos[0].value, // TODO: This picture must be loaded to out storage, only object key required.
      };

      return plainToInstance(ResponseAuthGoogleSignInDto, { isSignedUp: false, userSignUpData: user });
    }

    return plainToInstance(ResponseAuthGoogleSignInDto, { isSignedUp: true, user });
  }
}

export class GoogleAuthGuard extends AuthGuard('google') {}
