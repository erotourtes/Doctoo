import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { config } from 'src/config';
import { CreateUserDto } from 'src/user/dto';

type JwtPayload = { sub: number };

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signupUser(createUserDto: CreateUserDto): Promise<any> {
    const name = createUserDto.name;
    return { name };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = { email, password, id: 1 }; // TODO: use user service
    if (user && user.password === password) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGoogleUser(token: string): Promise<any> {
    const user = { token }; // TODO: use user service
    if (user && user.token === token) {
      const { token: _, ...result } = user;
      return result;
    }
    return null;
  }

  async signJwtToken(userId: number) {
    const payload: JwtPayload = { sub: userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  attachJwtTokenToCookie(res: Response, token: string) {
    res.cookie(AuthService.JWT_COOKIE_NAME, token, { httpOnly: true, secure: config.isProduction });
  }

  async getUserFromJwtToken(token?: string) {
    if (!token) return null;

    const { sub } = await this.jwtService
      .verifyAsync<JwtPayload>(token)
      .catch(() => ({ sub: null }));
    if (!sub) return null;

    const user = { id: sub }; // TODO: use user service
    return user;
  }

  static readonly JWT_COOKIE_NAME = 'jwt';
}
