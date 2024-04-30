import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create.dto';
import { CreatePatientAllergyDto } from './dto/createPatientAllergy.dto';
import { PatchPatientDto } from './dto/patch.dto';
import { ResponsePatientDto } from './dto/response.dto';
import { ResponseAllergyDto } from './dto/responseAllergy.dto';
import { ResponseConditionDto } from './dto/responseCondition.dto';
import { ResponsePatientAllergyDto } from './dto/responsePatientAllergy.dto';
import { CreatePatientConditionDto } from './dto/createPatientCondition.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prismaService: PrismaService) {}

  async isPatientByIdExists(id: string): Promise<boolean> {
    const patient = await this.prismaService.patient.findUnique({ where: { id } });

    if (!patient) throw new NotFoundException('A patient with this Id not found.');

    return true;
  }

  async isPatientByUserIdExists(userId: string): Promise<boolean> {
    const patient = await this.prismaService.patient.findFirst({ where: { user: { id: userId } } });

    if (!patient) throw new NotFoundException('A patient with this Id not found.');

    return true;
  }

  async getPatient(id: string): Promise<ResponsePatientDto> {
    await this.isPatientByIdExists(id);

    const patient = await this.prismaService.patient.findUnique({
      where: { id },
      include: {
        user: { select: { firstName: true, lastName: true, avatarKey: true } },
        allergies: { select: { allergy: { select: { id: true, name: true } } } },
        conditions: {
          select: {
            condition: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async getPatientByUserId(userId: string): Promise<ResponsePatientDto> {
    await this.isPatientByUserIdExists(userId);

    // TODO: only 1 patient for user
    const patient = await this.prismaService.patient.findFirst({
      where: { user: { id: userId } },
      include: { user: true },
    });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async createPatient(body: CreatePatientDto): Promise<ResponsePatientDto> {
    const isPatientAlreadyCreated = await this.prismaService.patient.findFirst({
      where: { user: { id: body.userId } },
    });

    if (isPatientAlreadyCreated) throw new NotFoundException('A patient with this user Id already created.');

    const patient = await this.prismaService.patient.create({ data: body });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async patchPatient(id: string, body: PatchPatientDto): Promise<ResponsePatientDto> {
    await this.isPatientByIdExists(id);

    const patient = await this.prismaService.patient.update({ where: { id }, data: body });

    return plainToInstance(ResponsePatientDto, patient);
  }

  async createPatientAllergies(id: string, body: CreatePatientAllergyDto): Promise<ResponsePatientAllergyDto> {
    const isAllergiesAdded = await this.prismaService.patientAllergy.findMany({
      where: { id: { in: body.allergyIds } },
    });

    if (isAllergiesAdded.length) {
      throw new BadRequestException("Patient's already have some allergy from presented list.");
    }

    const allergies = await this.prismaService.patientAllergy.createMany({
      data: body.allergyIds.map(allergyId => ({ patientId: id, allergyId })),
      skipDuplicates: true,
    });

    return plainToInstance(ResponsePatientAllergyDto, allergies);
  }

  async createPatientConditions(id: string, conditions: CreatePatientConditionDto[]): Promise<number> {
    conditions.forEach(async ({ conditionId }) => {
      const isPatientAlreadyHaveCondition = await this.prismaService.patientCondition.findUnique({
        where: { id, conditionId },
      });

      if (isPatientAlreadyHaveCondition)
        throw new BadRequestException('Patient with this Id already have condition with this Id.');
    });

    const { count } = await this.prismaService.patientCondition.createMany({
      data: conditions.map(({ conditionId }) => ({ patientId: id, conditionId })),
    });
    console.log(count);
    return count;
  }
  async getPatientConditions(patientId: string): Promise<ResponseConditionDto[]> {
    await this.isPatientByIdExists(patientId);

    const rawConditions = await this.prismaService.patientCondition.findMany({
      where: { patientId },
      select: { condition: { select: { id: true, name: true } } },
    });

    const conditions = rawConditions.map(record => record.condition);

    return plainToInstance(ResponseConditionDto, conditions);
  }

  async getPatientAllergies(id: string): Promise<ResponseAllergyDto[]> {
    await this.isPatientByIdExists(id);

    const rawAllergies = await this.prismaService.patientAllergy.findMany({
      where: { patientId: id },
      select: { allergy: { select: { name: true, id: true } } },
    });

    const allergies = rawAllergies.map(record => record.allergy);

    return plainToInstance(ResponseAllergyDto, allergies);
  }

  async deletePatient(id: string): Promise<void> {
    await this.isPatientByIdExists(id);

    await this.prismaService.patient.delete({ where: { id } });
  }
}
