import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDeclarationDto } from './dto/create.dto';
import { ResponseDeclarationDto } from './dto/response.dto';
import { UpdateDeclarationDto } from './dto/update.dto';
@Injectable()
export class DeclarationService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(body: CreateDeclarationDto): Promise<ResponseDeclarationDto> {
    const doctorPromise = await this.prismaService.doctor.findUnique({ where: { id: body.doctorId } });
    const patientPromise = await this.prismaService.patient.findUnique({ where: { id: body.patientId } });

    const [doctorExist, patientExist] = await Promise.all([doctorPromise, patientPromise]);

    if (!doctorExist) {
      throw new NotFoundException('Doctor with that id not found');
    }

    if (!patientExist) {
      throw new NotFoundException('Patient with that id not found');
    }

    const declarationExist = await this.prismaService.declaration.findUnique({
      where: { patientId: body.patientId },
    });

    if (declarationExist) throw new BadRequestException('Declaration with that patient already exist');

    const declaration = await this.prismaService.declaration.create({ data: body });

    return plainToInstance(ResponseDeclarationDto, declaration);
  }

  async findAll(): Promise<ResponseDeclarationDto[]> {
    return await this.prismaService.declaration.findMany();
  }

  async findOne(id: number): Promise<ResponseDeclarationDto> {
    const declaration = await this.prismaService.declaration.findUnique({
      where: { id },
    });

    return plainToInstance(ResponseDeclarationDto, declaration);
  }

  async update(id: number, body: UpdateDeclarationDto): Promise<ResponseDeclarationDto> {
    const declarationExist = await this.prismaService.declaration.findUnique({
      where: { patientId: body.patientId, doctorId: body.doctorId },
    });

    if (declarationExist) throw new NotFoundException('Declaration with that patient and doctor already exist');

    const declaration = await this.prismaService.declaration.update({
      where: { id },
      data: body,
    });

    return plainToInstance(ResponseDeclarationDto, declaration);
  }

  async delete(id: number) {
    const declaration = await this.prismaService.declaration.findUnique({
      where: { id },
    });

    if (!declaration) throw new BadRequestException('Declaration with that id not found');

    await this.prismaService.declaration.delete({
      where: { id },
    });
  }
}
