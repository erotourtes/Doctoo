import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create.dto';
import { PatchUserDto } from './dto/patch.dto';
import { ResponseUserDto } from './dto/response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async isUserExists(id: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('A user with this Id not found.');

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
    const user = await this.prismaService.user.create({ data: body });

    return plainToInstance(ResponseUserDto, user);
  }

  async updateSecretCode(id: string, code: string | null): Promise<User> {
    const user = await this.prismaService.user.update({ where: { id }, data: { secretCode: code } });

    return user;
  }

  async patchUser(id: string, body: PatchUserDto): Promise<ResponseUserDto> {
    await this.isUserExists(id);

    const user = await this.prismaService.user.update({ where: { id }, data: body });

    return plainToInstance(ResponseUserDto, user);
  }

  async updateEmailVerifiedStatus(id: string, verified: boolean): Promise<User> {
    const user = await this.prismaService.user.update({ where: { id }, data: { emailVerified: verified } });

    return user;
  }

  async deletedUser(id: string): Promise<void> {
    await this.isUserExists(id);

    await this.prismaService.user.delete({ where: { id } });
  }
}
