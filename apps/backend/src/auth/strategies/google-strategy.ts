import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';
import { ResponseGoogleSignDto } from 'src/auth/dto/google-sign-response.dto';
import authConfig from 'src/config/auth-config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(authConfig.KEY) private readonly authConf: ConfigType<typeof authConfig>,
  ) {
    super({
      clientID: authConf.googleClientID,
      clientSecret: authConf.googleSecret,
      callbackURL: authConf.googleRedirectURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<ResponseGoogleSignDto> {
    const email = profile.emails[0];
    const user = await this.authService.validateGoogleUser(email.value, profile.id);
    if (!user) {
      const user = {
        last_name: profile.name.familyName,
        first_name: profile.name.givenName,
        email: email.value,
        email_verified: email.verified,
        google_id: await this.authService.signGoogleId(profile.id),
        avatar_key: profile.photos[0].value,
      };
      return {
        isSignedUp: false,
        userSignUpData: user,
      };
    }
    return {
      isSignedUp: true,
      user,
    };
  }
}

export class GoogleAuthGuard extends AuthGuard('google') {}
