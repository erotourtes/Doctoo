import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseConditionDto } from '../patient/dto/responseCondition.dto';
import { CreateConditionDto } from './dto/create.dto';
import { UpdateConditionDto } from './dto/update.dto';

@Injectable()
export class ConditionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createConditionDto: CreateConditionDto): Promise<ResponseConditionDto> {
    const condition = await this.prismaService.condition.create({ data: createConditionDto });

    return plainToInstance(ResponseConditionDto, condition);
  }

  async getConditions(): Promise<ResponseConditionDto[]> {
    const conditions = await this.prismaService.condition.findMany();

    return plainToInstance(ResponseConditionDto, conditions);
  }

  async getCondition(id: string): Promise<ResponseConditionDto> {
    const condition = await this.prismaService.condition.findUnique({ where: { id } });

    return plainToInstance(ResponseConditionDto, condition);
  }

  async patch(id: string, body: UpdateConditionDto): Promise<ResponseConditionDto> {
    const condition = await this.prismaService.condition.update({
      where: { id },
      data: body,
    });

    return plainToInstance(ResponseConditionDto, condition);
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.condition.delete({ where: { id } });
  }
}
