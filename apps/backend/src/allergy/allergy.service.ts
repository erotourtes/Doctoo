import { Injectable } from '@nestjs/common';
import { CreateAllergyDto } from './dto/create.dto';
import { UpdateAllergyDto } from './dto/update.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AllergyService {
  constructor(private prismaService: PrismaService) {}

  create(createAllergyDto: CreateAllergyDto) {
    const allergy = this.prismaService.allergy.create({ data: createAllergyDto });
    return allergy;
  }

  findAll() {
    const allergies = this.prismaService.allergy.findMany();
    return allergies;
  }

  findOne(id: string) {
    const allergy = this.prismaService.allergy.findUnique({ where: { id } });
    return allergy;
  }

  update(id: string, updateAllergyDto: UpdateAllergyDto) {
    const updatedAllergy = this.prismaService.allergy.update({
      where: { id },
      data: updateAllergyDto,
    });
    return updatedAllergy;
  }

  remove(id: string) {
    const deletedAllergy = this.prismaService.allergy.delete({ where: { id } });
    return deletedAllergy;
  }

  async findAllergiesByPatientId(id: string) {
    const allergies = await this.prismaService.patientAllergy.findMany({
      where: { patientId: id },
      select: {
        allergy: {
          select: { id: true, name: true },
        },
      },
    });

    return allergies;
  }
}
