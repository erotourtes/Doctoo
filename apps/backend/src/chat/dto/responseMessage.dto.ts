import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { randomUUID } from 'crypto';

export class ResponseMessageDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique chat message id.' })
  id: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique chat id.' })
  chatId: string;

  @ApiProperty({ example: Role.DOCTOR, description: 'Type sender.' })
  sender: Role;

  @ApiProperty({ example: new Date(), description: 'Time when sent message.' })
  sentAt: Date;

  @ApiProperty({ example: 'Hello patient!', description: 'Message text' })
  text: string;

  @ApiProperty({ example: new Date(), description: 'Time when updated message.' })
  editedAt: Date;
}
