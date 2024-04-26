import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import JWTGuard from '../auth/gaurds/jwt.guard';
import { PatientService } from '../patient/patient.service';
import { CreateReviewDto } from './dto/create.dto';
import { ReviewService } from './review.service';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AvgRateResponse, ResponseReviewDto, ResponseReviewDtoWithNames } from './dto/response.dto';
import { PatchReviewDto } from './dto/patch.dto';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { UnauthorizedResponse } from '../utils/UnauthorizedResponse';
import { InternalServerErrorResponse } from '../utils/InternalServerErrorResponse';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly patientService: PatientService,
  ) {}

  @ApiOperation({
    summary: 'Create a new review',
    description: 'This endpoint creates a new review.',
  })
  @ApiHeader({
    name: 'Cookie',
    description:
      'JWT token (example: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmOGM1YjJmNC1hMzNkLTRkYWMtYWFjMS0zZDk5NDUzNjdhOTkiLCJpYXQiOjE3MTQwNDc2MzYsImV4cCI6MTcxNDY1MjQzNn0.INySOp4IgImr-enRhksOp_s_RPjn-yNkugpw6ba9JGQ; Path=/; HttpOnly)',
    required: true,
  })
  @ApiBody({ type: CreateReviewDto })
  @ApiCreatedResponse({ type: ResponseReviewDto, description: 'Review created' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'Not found' })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse, description: 'Unauthorized' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Post('doctor/:doctorId')
  @UseGuards(JWTGuard)
  async createReview(
    @Req() req: Request,
    @Param('doctorId') doctorId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const user = req['user'];
    const patient = await this.patientService.getPatientByUserId(user.id);

    return this.reviewService.createReview(patient.id, doctorId, createReviewDto.rate, createReviewDto.text);
  }

  @ApiOperation({
    summary: 'Get a list reviews',
    description: 'This endpoint get a list reviews.',
  })
  @ApiParam({ name: 'includeNames', type: 'boolean', required: false })
  @ApiParam({ name: 'skip', type: 'number', required: false })
  @ApiParam({ name: 'take', type: 'number', required: false })
  @ApiOkResponse({ type: [ResponseReviewDtoWithNames], description: 'Reviews list' })
  @ApiNotFoundResponse({ type: BadRequestResponse, description: 'Not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get()
  getReviews(
    @Query('includeNames') includeNames?: string,
    @Query('skip') skipQuery?: string,
    @Query('take') takeQuery?: string,
  ) {
    const skip = skipQuery ? Number(skipQuery) : undefined;
    const take = takeQuery ? Number(takeQuery) : undefined;

    if (skipQuery && isNaN(skip)) {
      throw new BadRequestException('Skip query parameter must be a number');
    }
    if (takeQuery && isNaN(take)) {
      throw new BadRequestException('Take query parameter must be a number');
    }

    return this.reviewService.getReviews({
      includeNames: includeNames === 'true',
      skip,
      take,
    });
  }

  @ApiOperation({
    summary: 'Get a list reviews by doctorId',
    description: 'This endpoint get a list reviews by doctorId.',
  })
  @ApiParam({ name: 'includeNames', type: 'boolean', required: false })
  @ApiParam({ name: 'skip', type: 'number', required: false })
  @ApiParam({ name: 'take', type: 'number', required: false })
  @ApiOkResponse({ type: [ResponseReviewDto], description: 'Reviews list' })
  @ApiNotFoundResponse({ type: BadRequestResponse, description: 'Not found' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get('doctor/:doctorId')
  getReviewsByDoctorId(
    @Param('doctorId') doctorId: string,
    @Query('includeNames') includeNames: string,
    @Query('skip') skipQuery: string,
    @Query('take') takeQuery: string,
  ) {
    const skip = skipQuery ? Number(skipQuery) : undefined;
    const take = takeQuery ? Number(takeQuery) : undefined;

    if (skipQuery && isNaN(skip)) {
      throw new BadRequestException('Skip query parameter must be a number');
    }
    if (takeQuery && isNaN(take)) {
      throw new BadRequestException('Take query parameter must be a number');
    }

    return this.reviewService.getReviews({
      doctorId: doctorId,
      includeNames: includeNames === 'true',
      skip,
      take,
    });
  }

  @ApiOperation({
    summary: 'Get the average rating of a doctor',
    description: 'This endpoint returns the average rating and the number of reviews for a specific doctor.',
  })
  @ApiParam({ name: 'doctorId', type: 'string', required: true })
  @ApiOkResponse({ type: AvgRateResponse, description: 'Average rating and count' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'Not found' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get('doctor/:doctorId/average')
  async getAvgRateByDoctorId(@Param('doctorId') doctorId: string) {
    return this.reviewService.getAvgRateByDoctorId(doctorId);
  }

  @ApiOperation({
    summary: 'Get a review',
    description: 'This endpoint returns a review by its ID.',
  })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiOkResponse({ type: ResponseReviewDto, description: 'Review' })
  @ApiNotFoundResponse({ type: ClassicNestResponse, description: 'Not found' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Get(':id')
  async getReview(@Param('id') id: string) {
    const review = await this.reviewService.getReview(id);
    delete review.patientId;

    return review;
  }

  @ApiOperation({
    summary: 'Update a review',
    description: 'This endpoint updates a review.',
  })
  @ApiHeader({
    name: 'Cookie',
    description:
      'JWT token (example: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmOGM1YjJmNC1hMzNkLTRkYWMtYWFjMS0zZDk5NDUzNjdhOTkiLCJpYXQiOjE3MTQwNDc2MzYsImV4cCI6MTcxNDY1MjQzNn0.INySOp4IgImr-enRhksOp_s_RPjn-yNkugpw6ba9JGQ; Path=/; HttpOnly)',
    required: true,
  })
  @ApiBody({ type: PatchReviewDto })
  @ApiOkResponse({ type: ResponseReviewDto, description: 'Review updated' })
  @ApiNotFoundResponse({ type: BadRequestResponse, description: 'Not found' })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse, description: 'Unauthorized' })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: 'Bad request' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Patch('/:reviewId')
  @UseGuards(JWTGuard)
  async patchReview(@Req() req: Request, @Param('reviewId') reviewId: string, @Body() patchReviewDto: PatchReviewDto) {
    const user = req['user'];
    const patient = await this.patientService.getPatientByUserId(user.id);

    return this.reviewService.patchReview(reviewId, patient.id, patchReviewDto);
  }

  @ApiOperation({
    summary: 'Delete a review',
    description: 'This endpoint deletes a review.',
  })
  @ApiHeader({
    name: 'Cookie',
    description:
      'JWT token (example: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmOGM1YjJmNC1hMzNkLTRkYWMtYWFjMS0zZDk5NDUzNjdhOTkiLCJpYXQiOjE3MTQwNDc2MzYsImV4cCI6MTcxNDY1MjQzNn0.INySOp4IgImr-enRhksOp_s_RPjn-yNkugpw6ba9JGQ; Path=/; HttpOnly)',
    required: true,
  })
  @ApiNoContentResponse({ description: 'Review deleted' })
  @ApiNotFoundResponse({ type: BadRequestResponse, description: 'Not found' })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse, description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorResponse, description: 'Internal server error' })
  @Delete('/:reviewId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JWTGuard)
  async deleteReview(@Req() req: Request, @Param('reviewId') reviewId: string) {
    const user = req['user'];
    const patient = await this.patientService.getPatientByUserId(user.id);

    return this.reviewService.deleteReview(reviewId, patient.id);
  }
}
