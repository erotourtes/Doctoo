import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
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
    let user = this.authService.validateGoogleUser(accessToken);
    if (!user) {
      const name = profile.displayName;
      user = await this.authService.signupUser({ name });
    }
    return user;
  }
}

export class GoogleAuthGuard extends AuthGuard('google') {}
