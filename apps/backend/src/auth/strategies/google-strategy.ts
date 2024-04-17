import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';
import { config } from 'src/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: config.clientID,
      clientSecret: config.clientSecret,
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
