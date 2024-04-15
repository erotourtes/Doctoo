import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.users.create({ data });
  }

  async findAll(): Promise<Users[]> {
    return this.prisma.users.findMany();
  }

  async findOne(id: number): Promise<Users> {
    const user: Users = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, data: Prisma.UsersUpdateInput) {
    return this.prisma.users.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.users.delete({
      where: { id },
    });
  }
}
