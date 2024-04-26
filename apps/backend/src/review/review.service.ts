import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Review } from '@prisma/client';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';
import { PatchReviewDto } from './dto/patch.dto';
import { AvgRateResponse, ResponseReviewDto, ResponseReviewDtoWithNames } from './dto/response.dto';

interface FindAllByDoctorIdOptions {
  includeNames?: boolean;
  skip?: number;
  take?: number;
  doctorId?: string;
}

@Injectable()
export class ReviewService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
  ) {}

  async createReview(patientId: string, doctorId: string, rate: number, text?: string): Promise<ResponseReviewDto> {
    await this.patientService.getPatient(patientId);
    await this.doctorService.getDoctor(doctorId);

    return this.prismaService.review.create({
      data: {
        patient: { connect: { id: patientId } },
        doctor: { connect: { id: doctorId } },
        rate,
        text,
      },
      select: {
        id: true,
        rate: true,
        text: true,
        doctorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getReviews(options: FindAllByDoctorIdOptions = { includeNames: false }): Promise<ResponseReviewDtoWithNames[]> {
    return this.prismaService.review.findMany({
      where: { doctorId: options.doctorId },
      skip: options.skip,
      take: options.take,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        rate: true,
        text: true,
        doctorId: true,
        createdAt: true,
        updatedAt: true,
        ...(options.includeNames && {
          doctor: {
            select: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          patient: {
            select: {
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        }),
      },
    });
  }

  async getAvgRateByDoctorId(doctorId: string): Promise<AvgRateResponse> {
    await this.doctorService.getDoctor(doctorId);

    const result = await this.prismaService.review.aggregate({
      where: { doctorId: doctorId },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _avg: {
        rate: true,
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _count: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        _all: true,
      },
    });

    const {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _avg: { rate },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _count: { _all: count },
    } = result;
    return { avg: rate, count };
  }

  async getReview(id: string): Promise<Review> {
    const review = await this.prismaService.review.findFirst({
      where: { id: id },
    });
    if (!review) throw new NotFoundException({ message: `Review with id ${id} does not exist` });
    return review;
  }

  async patchReview(reviewId: string, patientId: string, patchReviewDto: PatchReviewDto): Promise<ResponseReviewDto> {
    const patient = await this.patientService.getPatient(patientId);

    const review = await this.getReview(reviewId);

    if (review && patient.id !== review.patientId)
      throw new UnauthorizedException({
        message: `Patient with id ${patient.id} is not authorized to update review with id ${review.id}`,
      });

    return this.prismaService.review.update({
      where: { id: reviewId },
      data: patchReviewDto,
      select: {
        id: true,
        rate: true,
        text: true,
        doctorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteReview(reviewId: string, patientId: string): Promise<ResponseReviewDto> {
    const patient = await this.patientService.getPatient(patientId);

    const review = await this.getReview(reviewId);

    if (review && patient.id !== review.patientId)
      throw new UnauthorizedException({
        message: `Patient with id ${patient.id} is not authorized to delete review with id ${review.id}`,
      });

    return this.prismaService.review.delete({
      where: { id: reviewId },
      select: {
        id: true,
        rate: true,
        text: true,
        doctorId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
