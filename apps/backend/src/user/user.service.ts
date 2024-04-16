import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create.dto';
import { PatchUserDto } from './dto/patch.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    return user;
  }

  async createUser(body: CreateUserDto) {
    const user = await this.prismaService.user.create({ data: body });

    return user;
  }

  async patchUser(id: string, body: PatchUserDto) {
    const user = await this.prismaService.user.update({ where: { id }, data: body });

    return user;
  }

  async deletedUser(id: string) {
    await this.prismaService.user.delete({ where: { id } });
  }
}
