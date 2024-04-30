import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { RESPONSE_STATUS } from '../utils/constants';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create.dto';
import { GetDoctorsQuery } from './dto/get.query';
import { PatchDoctorDto } from './dto/patch.dto';
import { ResponseDoctorDto } from './dto/response.dto';
import JWTGuard from '../auth/gaurds/jwt.guard';
import { UserDec } from '../user/user.decorator';
import { UnauthorizedResponse } from '../utils/UnauthorizedResponse';
import { ResponseDoctorListDto } from './dto/response-list.dto';

@ApiTags('Doctor Endpoints')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Create doctor' })
  @ApiOkResponse({ type: ResponseDoctorDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBody({ type: CreateDoctorDto })
  createDoctor(@Body() body: CreateDoctorDto) {
    return this.doctorService.createDoctor(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiOkResponse({ type: ResponseDoctorListDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  getDoctors(@Query() query: GetDoctorsQuery) {
    return this.doctorService.getDoctors(query);
  }

  @Get('doctors/:id')
  @ApiOperation({ summary: 'Get all doctors by patient' })
  @ApiOkResponse({ type: ResponseDoctorDto, isArray: true, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique patient id.' })
  async getPatientDoctors(@Param('id') id: string): Promise<ResponseDoctorDto[]> {
    return await this.doctorService.getPatientDoctors(id);
  }

  @Get('doctors/my')
  @UseGuards(JWTGuard)
  @ApiOperation({ summary: 'Get my doctors' })
  @ApiHeader({ name: 'Cookie', example: 'jwt=eyJhbGci...', description: 'JWT token' })
  @ApiOkResponse({ type: ResponseDoctorDto, isArray: true, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  async getMyDoctors(@UserDec() userInfo): Promise<ResponseDoctorDto[]> {
    return await this.doctorService.getPatientDoctors(userInfo.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor' })
  @ApiOkResponse({ type: ResponseDoctorDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique doctor id.' })
  getDoctor(@Param('id') id: string) {
    return this.doctorService.getDoctor(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update doctor' })
  @ApiOkResponse({ type: ResponseDoctorDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique doctor id.' })
  @ApiBody({ type: PatchDoctorDto })
  patchDoctor(@Param('id') id: string, @Body() body: PatchDoctorDto) {
    return this.doctorService.patchDoctor(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete doctor' })
  @ApiOkResponse({ description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'id', example: randomUUID(), description: 'Unique doctor id.' })
  deleteDoctor(@Param('id') id: string) {
    return this.doctorService.deleteDoctor(id);
  }
}
