import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import JWTGuard from '../auth/gaurds/jwt.guard';
import { PatientService } from '../patient/patient.service';
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
import { ResponseChatDto } from './dto/response.dto';
import { ClassicNestResponse } from '../utils/ClassicNestResponse';
import { BadRequestResponse } from '../utils/BadRequestResponse';
import { RESPONSE_STATUS } from '../utils/constants';
import { UnauthorizedResponse } from '../utils/UnauthorizedResponse';
import { ResponseMessageDto } from './dto/responseMessage.dto';
import { Role, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChatDto } from './dto/create.dto';

@ApiTags('Chat Endpoints')
@Controller('chat')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly patientService: PatientService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get a chat list',
    description: 'This endpoint retrieves a chat list.',
  })
  @ApiHeader({ name: 'Cookie', example: 'jwt=eyJhbGci...', description: 'JWT token' })
  @ApiOkResponse({ type: ResponseChatDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @UseGuards(JWTGuard)
  async getChatsForPatient(@Req() req: Request) {
    const user: User = req['user'];
    return this.chatService.getChatsByUserId(user.id, user.role);
  }

  @Get('/:chatId')
  @ApiOperation({
    summary: 'Get chat messages',
    description: 'This endpoint retrieves a chat messages.',
  })
  @ApiHeader({ name: 'Cookie', example: 'jwt=eyJhbGci...', description: 'JWT token' })
  @ApiOkResponse({ type: ResponseMessageDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiParam({ name: 'chatId', example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique chat id.' })
  @UseGuards(JWTGuard)
  async getChatMessages(@Param('chatId') chatId: string) {
    return this.chatService.getChatMessages(chatId);
  }

  @Post()
  @ApiOperation({
    summary: 'Create chat',
    description: 'This endpoint created a chat',
  })
  @ApiHeader({ name: 'Cookie', example: 'jwt=eyJhbGci...', description: 'JWT token' })
  @ApiOkResponse({ type: ResponseChatDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ type: ClassicNestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiBody({ type: CreateChatDto })
  @UseGuards(JWTGuard)
  async createChat(@Req() req: Request, @Body() createChatDto: CreateChatDto) {
    const user: User = req['user'];
    const participantId = createChatDto.participantId;

    const patient = await this.patientService.getPatientByUserId(user.role === Role.PATIENT ? user.id : participantId);
    const doctor = await this.prismaService.doctor.findFirst({
      where: { userId: user.role === Role.DOCTOR ? user.id : participantId },
    });

    return this.chatService.createChat(patient.id, doctor.id);
  }
}
