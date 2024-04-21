import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import auth from '../config/auth';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(auth.KEY) readonly authObject: ConfigType<typeof auth>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: authObject.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload || payload.sub == undefined) return null;
    const user = await this.authService.getUser(payload.sub);

    return user;
  }
}

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[AuthService.JWT_COOKIE_NAME];
  }
  return token;
};

export type JwtPayload = { sub?: string };

@Injectable()
export default class JWTGuard extends AuthGuard('jwt') {}
