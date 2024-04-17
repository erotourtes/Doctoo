import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';
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
      callbackURL: 'http://localhost:3000/api/v1/auth/login/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails[0];
    let user: User = await this.authService.validateGoogleUser(email.value, profile.id);
    if (!user) {
      user = await this.authService.signupUser({
        last_name: profile.name.familyName,
        first_name: profile.name.givenName,
        email: email.value,
        email_verified: email.verified,
        google_id: profile.id,
        password: null,
        phone: null,
        avatar_key: null,
      });
    }
    return user;
  }
}

export class GoogleAuthGuard extends AuthGuard('google') {}
