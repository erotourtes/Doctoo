import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Response } from 'express';
import config from 'src/config/config';
import { CreateUserDto } from 'src/user/dto/create.dto';
import { ResponseUserDto } from 'src/user/dto/response.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import authConfig from 'src/config/auth-config';

type JwtPayload = { sub: number };

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(config.KEY) private readonly conf: ConfigType<typeof config>,
    @Inject(authConfig.KEY) private readonly authConf: ConfigType<typeof authConfig>,
  ) {}

  async signupUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  async validateUser(email: string, password: string): Promise<ResponseUserDto | null> {
    const user = await this.userService.findUserByEmail(email);
    const isValid = user && (await this.verifyPassword(password, user.password));
    return isValid ? user : null;
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

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.authConf.saltRounds);
  }

  private async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static readonly JWT_COOKIE_NAME = 'jwt';
}
