import { Inject } from '@nestjs/common';
import { Response, Request } from 'express';
import config from '../../config/config';
import { ConfigType } from '@nestjs/config';

export class AuthRequestHelper {
  static readonly JWT_COOKIE_NAME = 'jwt';

  constructor(
    @Inject(config.KEY)
    private readonly configObject: ConfigType<typeof config>,
  ) {}

  attachJwtTokenToCookie(res: Response, token: string) {
    const secure = this.configObject.NODE_ENV === 'production';

    res.cookie(AuthRequestHelper.JWT_COOKIE_NAME, token, { httpOnly: true, secure });
  }

  clearJwtTokenFromCookie(res: Response) {
    res.clearCookie(AuthRequestHelper.JWT_COOKIE_NAME);
  }

  getJwtTokenFromCookie(req: Request): string {
    return req.cookies[AuthRequestHelper.JWT_COOKIE_NAME];
  }

  redirectToFrontendHomePage(res: Response) {
    res.redirect(this.configObject.FRONTEND_URL);
  }

  redirectToFrontendSignUpPage(res: Response, token: string) {
    const { FRONTEND_URL, FRONTEND_SIGNUP_PATH } = this.configObject;
    res.redirect(`${FRONTEND_URL}/${FRONTEND_SIGNUP_PATH}?token=${token}`);
  }
}
