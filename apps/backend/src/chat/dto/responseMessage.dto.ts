import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { ResponseAttachmentDto } from './responseMessageAttachment.dto';

export class ResponseMessageDto {
  @ApiProperty({ example: '349c9ffc-1427-459d-a260-1e3f186b9db2', description: 'Unique chat message id.' })
  id: string;

  @ApiProperty({ example: '349c9ffc-1427-459d-a260-1e3f186b9db2', description: 'Unique chat id.' })
  chatId: string;

  @ApiProperty({ example: Role.DOCTOR, description: 'Type sender.' })
  sender: Role;

  @ApiProperty({ example: '2024-05-02T07:41:18.065Z', description: 'Time when sent message.' })
  sentAt: Date;

  @ApiProperty({ example: 'Hello patient!', description: 'Message text' })
  text: string;

  @ApiProperty({ example: '2024-05-02T07:41:18.065Z', description: 'Time when updated message.' })
  editedAt: Date;

  @ApiProperty({ type: ResponseAttachmentDto, description: 'Array of attachments.', isArray: true })
  attachments?: ResponseAttachmentDto[];
}

export class GetMessageResponse {
  @ApiProperty({ type: ResponseMessageDto, description: 'Array of response messages.', isArray: true })
  messages: ResponseMessageDto[];

  @ApiProperty({ type: 'number', description: 'Total number of messages.' })
  totalMessages: number;
}
