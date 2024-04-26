import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create.dto';
import { PatchUserDto } from './dto/patch.dto';
import { ResponseWithoutRelationsUserDto } from './dto/responseWithoutRelations';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private async isUserExists(id: string): Promise<boolean> {
    const isUserExsists = await this.prismaService.user.findUnique({ where: { id } });

    if (!isUserExsists) throw new NotFoundException('A user with this Id not found.');

    return true;
  }

  async getUser(id: string): Promise<ResponseWithoutRelationsUserDto> {
    await this.isUserExists(id);

    const user = await this.prismaService.user.findUnique({ where: { id } });

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }

  async getUserByEmail(email: string): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.prismaService.user.findFirst({ where: { email } });

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }

  async getUserWithSecretsByEmail(email: string): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    return user;
  }

  async createUser(body: CreateUserDto): Promise<ResponseWithoutRelationsUserDto> {
    const user = await this.prismaService.user.create({ data: body });

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }

  async set2faCode(id: string, code: string | null) {
    await this.prismaService.user.update({ where: { id }, data: { secretCode: code } });
  }

  async patchUser(id: string, body: PatchUserDto): Promise<ResponseWithoutRelationsUserDto> {
    await this.isUserExists(id);

    const user = await this.prismaService.user.update({ where: { id }, data: body });

    return plainToInstance(ResponseWithoutRelationsUserDto, user);
  }

  /**
   * Sets user email to verified; Indicates whether the user completed 2 stages of registration
   * @param id User ID
   * @param verified Indicates whether the user email is verified
   */
  async setVerified(id: string, verified: boolean) {
    await this.prismaService.user.update({ where: { id }, data: { emailVerified: verified } });
  }

  async deletedUser(id: string) {
    await this.isUserExists(id);

    await this.prismaService.user.delete({ where: { id } });
  }
}
