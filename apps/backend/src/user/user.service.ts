import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create.dto';
import { PatchUserDto } from './dto/patch.dto';
import { ResponseWithoutRelationsUserDto } from './dto/responseWithoutRelations';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(id: string): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }

  async getUserByEmail(email: string): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }

  async getUserPasswordByEmail(email: string): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    return user;
  }

  async createUser(body: CreateUserDto): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.prismaService.user.create({ data: body });

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }

  async patchUser(id: string, body: PatchUserDto): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.prismaService.user.update({ where: { id }, data: body });

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }

  async deletedUser(id: string) {
    await this.prismaService.user.delete({ where: { id } });
  }
}
