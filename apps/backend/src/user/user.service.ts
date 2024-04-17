import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create.dto';
import { PatchUserDto } from './dto/patch.dto';
import { ResponseUserDto } from './dto/response.dto';
import { ResponseWithoutRelationsUserDto } from './dto/responseWithoutRelations';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(id: string): Promise<ResponseUserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { doctors: true, patients: true },
    });

    return user;
  }

  async createUser(body: CreateUserDto): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.prismaService.user.create({ data: body });

    return user;
  }

  async patchUser(id: string, body: PatchUserDto): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.prismaService.user.update({ where: { id }, data: body });

    return user;
  }

  async deletedUser(id: string) {
    await this.prismaService.user.delete({ where: { id } });
  }
}
