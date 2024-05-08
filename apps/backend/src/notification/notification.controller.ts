import { Controller, Get, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseNotificationDto } from './dto/response.dto';
import { RESPONSE_STATUS } from '../utils/constants';
import { BadRequestResponse } from '../utils/BadRequestResponse';

@ApiTags('Notification Endpoints')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get(':patientId')
  @ApiOperation({ summary: 'Get all notification for patient' })
  @ApiOkResponse({ type: ResponseNotificationDto, description: RESPONSE_STATUS.SUCCESS })
  @ApiBadRequestResponse({ type: BadRequestResponse, description: RESPONSE_STATUS.ERROR })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async getNotificationsForPatient(@Param('patientId') patientId: string): Promise<Notification[]> {
    return await this.notificationService.getNotificationsForPatient(patientId);
  }
}
