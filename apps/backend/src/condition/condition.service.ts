import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from './dto/create.dto';
import { UpdateConditionDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConditionService {
  constructor(private prismaService: PrismaService) {}

  async createCondition(createConditionDto: CreateConditionDto) {
    const condition = await this.prismaService.condition.create({ data: createConditionDto });
    return condition;
  }

  async findAllConditions() {
    const conditions = await this.prismaService.condition.findMany();
    return conditions;
  }

  async findCondition(id: string) {
    const condition = await this.prismaService.condition.findUnique({ where: { id } });
    return condition;
  }

  async updateCondition(id: string, body: UpdateConditionDto) {
    const condition = await this.prismaService.condition.update({
      where: { id },
      data: body,
    });
    return condition;
  }

  async removeCondition(id: string) {
    const condition = await this.prismaService.condition.delete({ where: { id } });
    return condition;
  }
}
