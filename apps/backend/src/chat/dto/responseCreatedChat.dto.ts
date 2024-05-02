import { ApiProperty } from '@nestjs/swagger';
import { randomInt, randomUUID } from 'crypto';

export class ResponseCreatedChatDto {
  @ApiProperty({ example: randomUUID(), description: 'Unique chat id.' })
  id: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique patient id.' })
  patientId: string;

  @ApiProperty({ example: randomUUID(), description: 'Unique doctor id.' })
  doctorId: string;

  @ApiProperty({ example: randomInt(500), description: 'Numbers missed messages in doctor.' })
  missedMessagesDoctor: number;

  @ApiProperty({ example: randomInt(500), description: 'Numbers missed messages in patient.' })
  missedMessagesPatient: number;
}
