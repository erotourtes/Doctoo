import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreatedChatDto {
  @ApiProperty({ example: '349c9ffc-1427-459d-a260-1e3f186b9db2', description: 'Unique chat id.' })
  id: string;

  @ApiProperty({ example: '349c9ffc-1427-459d-a260-1e3f186b9db2', description: 'Unique patient id.' })
  patientId: string;

  @ApiProperty({ example: '349c9ffc-1427-459d-a260-1e3f186b9db2', description: 'Unique doctor id.' })
  doctorId: string;

  @ApiProperty({ example: '200', description: 'Numbers missed messages in doctor.' })
  missedMessagesDoctor: number;

  @ApiProperty({ example: '200', description: 'Numbers missed messages in patient.' })
  missedMessagesPatient: number;
}
