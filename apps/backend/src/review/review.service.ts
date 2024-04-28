import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Review } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';
import { AvgRateResponse } from './dto/avgRateResponse.dto';
import { PatchReviewDto } from './dto/patch.dto';
import { ResponseReviewDto } from './dto/response.dto';
import { ResponseReviewDtoWithNames } from './dto/responseWithNames.dto';

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

    const review = this.prismaService.review.create({
      data: { patient: { connect: { id: patientId } }, doctor: { connect: { id: doctorId } }, rate, text },
      select: { id: true, rate: true, text: true, doctorId: true, createdAt: true, updatedAt: true },
    });

    return plainToInstance(ResponseReviewDto, review);
  }

  async getReviews(options: FindAllByDoctorIdOptions = { includeNames: false }): Promise<ResponseReviewDtoWithNames[]> {
    const reviews = await this.prismaService.review.findMany({
      where: { doctorId: options.doctorId },
      skip: options.skip,
      take: options.take,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        rate: true,
        text: true,
        doctorId: true,
        createdAt: true,
        updatedAt: true,
        ...(options.includeNames && {
          doctor: { select: { user: { select: { firstName: true, lastName: true } } } },
          patient: { select: { user: { select: { firstName: true, lastName: true } } } },
        }),
      },
    });

    return plainToInstance(ResponseReviewDtoWithNames, reviews);
  }

  async getAvgRateByDoctorId(doctorId: string): Promise<AvgRateResponse> {
    await this.doctorService.getDoctor(doctorId);

    const result = await this.prismaService.review.aggregate({
      where: { doctorId: doctorId },
      _avg: { rate: true },
      _count: { _all: true },
    });

    const {
      _avg: { rate },
      _count: { _all: count },
    } = result;

    return plainToInstance(AvgRateResponse, { avg: rate, count });
  }

  async getReview(id: string): Promise<Review> {
    const review = await this.prismaService.review.findFirst({ where: { id: id } });

    if (!review) throw new NotFoundException({ message: `Review with id ${id} does not exist` });

    return review;
  }

  async patchReview(reviewId: string, patientId: string, body: PatchReviewDto): Promise<ResponseReviewDto> {
    const patient = await this.patientService.getPatient(patientId);

    const review = await this.getReview(reviewId);

    if (review && patient.id !== review.patientId) {
      throw new UnauthorizedException({ message: 'Patient is not authorized to update review with this Id.' });
    }

    const patchedReview = this.prismaService.review.update({
      where: { id: reviewId },
      data: body,
      select: { id: true, rate: true, text: true, doctorId: true, createdAt: true, updatedAt: true },
    });

    return plainToInstance(ResponseReviewDto, patchedReview);
  }

  async deleteReview(reviewId: string, patientId: string): Promise<void> {
    const patient = await this.patientService.getPatient(patientId);

    const review = await this.getReview(reviewId);

    if (review && patient.id !== review.patientId) {
      throw new UnauthorizedException({
        message: `Patient with id ${patient.id} is not authorized to delete review with id ${review.id}`,
      });
    }

    await this.prismaService.review.delete({ where: { id: reviewId } });
  }
}
