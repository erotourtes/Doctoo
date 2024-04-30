import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create.dto';
import { PatchUserDto } from './dto/patch.dto';
import { ResponseUserDto } from './dto/response.dto';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';

// TODO: refactor
export type JwtEmailPayload = { sub?: string; newEmail?: string };

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async isUserExists(id: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('A user with this Id not found.');

    return true;
  }

  private async isEmailExists(email: string): Promise<boolean> {
    const isEmailExists = await this.prismaService.user.findUnique({ where: { email } });

    if (isEmailExists) throw new NotFoundException('A user with this email already exists.');

    return true;
  }

  async getUser(id: string): Promise<ResponseUserDto> {
    await this.isUserExists(id);

    const user = await this.prismaService.user.findUnique({ where: { id } });
    return plainToInstance(ResponseUserDto, user);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    return user;
  }

  async createUser(body: CreateUserDto): Promise<ResponseUserDto> {
    await this.isEmailExists(body.email);

    const user = await this.prismaService.user.create({ data: body });

    return plainToInstance(ResponseUserDto, user);
  }

  async updateSecretCode(id: string, code: string | null): Promise<User> {
    const user = await this.prismaService.user.update({ where: { id }, data: { secretCode: code } });

    return user;
  }

  async patchUser(id: string, body: PatchUserDto): Promise<ResponseUserDto> {
    await this.isUserExists(id);
    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        ...body,
        email: undefined,
      },
    });

    if (body.email && !user.password)
      throw new BadRequestException(
        'You have signed up with a social account. In order to change your email, please set up your password first.',
      );
    else if (body.email) await this.patchUserEmail(id, user.firstName, user.email, body.email);

    return plainToInstance(ResponseUserDto, user);
  }

  async updateEmailVerifiedStatus(id: string, verified: boolean): Promise<User> {
    const user = await this.prismaService.user.update({ where: { id }, data: { emailVerified: verified } });

    return user;
  }

  /**
   * Unlike patchUser, this method doesn't send a verification email,
   * thus is designed to be used internally.
   * @param id userId
   * @param email newEmail
   */
  async changeEmail(id: string, email: string): Promise<void> {
    await this.isUserExists(id);
    await this.isEmailExists(email);

    await this.prismaService.user.update({ where: { id }, data: { email } });
  }

  async deletedUser(id: string): Promise<void> {
    await this.isUserExists(id);

    await this.prismaService.user.delete({ where: { id } });
  }

  private async patchUserEmail(userId: string, userName: string, oldEmail: string, newEmail: string): Promise<void> {
    const payload: JwtEmailPayload = { sub: userId, newEmail };
    const token = await this.jwtService.signAsync(payload, { expiresIn: '1d' });
    await this.mailService.sendEmailChangeMail(newEmail, oldEmail, userName, token);
  }
}
