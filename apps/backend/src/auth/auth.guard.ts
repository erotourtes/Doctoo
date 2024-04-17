import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies[AuthService.JWT_COOKIE_NAME];
    const user = await this.authService.getUserFromJwtToken(token);
    if (!user) throw new UnauthorizedException();
    request['user'] = user;
    return true;
  }
}
