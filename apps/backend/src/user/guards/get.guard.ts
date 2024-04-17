import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class GetUserGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const {
      params: { id },
    } = context.switchToHttp().getRequest<Request>();

    const isUserExsists = await this.prismaService.user.findUnique({ where: { id } });

    if (!isUserExsists) throw new NotFoundException('A user with this Id not found.');

    return true;
  }
}
