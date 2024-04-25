import { Injectable } from '@nestjs/common';
import { CreateConditionDto } from './dto/create.dto';
import { UpdateConditionDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConditionService {
  constructor(private prismaService: PrismaService) {}

  async create(createConditionDto: CreateConditionDto) {
    const condition = await this.prismaService.condition.create({ data: createConditionDto });
    return condition;
  }

  async findAll() {
    const conditions = await this.prismaService.condition.findMany();
    return conditions;
  }

  async findOne(id: string) {
    const condition = await this.prismaService.condition.findUnique({ where: { id } });
    return condition;
  }

  async update(id: string, updateConditionDto: UpdateConditionDto) {
    const condition = await this.prismaService.condition.update({
      where: { id },
      data: updateConditionDto,
    });
    return condition;
  }

  async remove(id: string) {
    const condition = await this.prismaService.condition.delete({ where: { id } });
    return condition;
  }

  async findConditionsByPatientId(id: string) {
    const rawConditions = await this.prismaService.patientCondition.findMany({
      where: { patientId: id },
      select: {
        condition: {
          select: { id: true, name: true },
        },
      },
    });

    const conditions = rawConditions.map(c => c.condition);

    return conditions;
  }
}
