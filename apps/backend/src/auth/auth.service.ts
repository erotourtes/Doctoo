import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';
import config from 'src/config/config';
import { CreateUserDto } from 'src/user/dto/create.dto';
import { ResponseUserDto } from 'src/user/dto/response.dto';
import { UserService } from 'src/user/user.service';

type JwtPayload = { sub: number };

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(config.KEY) private readonly conf: ConfigType<typeof config>,
  ) {}

  async signupUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = { email, password, id: 1 }; // TODO: use user service
    if (user && user.password === password) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async validateGoogleUser(email: string, google_id: string): Promise<ResponseUserDto | null> {
    const user = await this.userService.findUserByEmail(email);
    if (user && user.google_id === google_id) {
      return user;
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
    res.cookie(AuthService.JWT_COOKIE_NAME, token, { httpOnly: true, secure: this.conf.nodeEnv === 'production' });
  }

  async getUserFromJwtToken(token?: string) {
    if (!token) return null;

    const { sub } = await this.jwtService.verifyAsync<JwtPayload>(token).catch(() => ({ sub: null }));
    if (!sub) return null;

    const user = { id: sub }; // TODO: use user service
    return user;
  }

  static readonly JWT_COOKIE_NAME = 'jwt';
}
