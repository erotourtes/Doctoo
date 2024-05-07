import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class ResponseChatDto {
  @ApiProperty({ example: '349c9ffc-1427-459d-a260-1e3f186b9db2', description: 'Unique chat id.' })
  id: string;

  @ApiProperty({ example: '349c9ffc-1427-459d-a260-1e3f186b9db2', description: 'Unique doctor id.' })
  doctorId: string;

  @ApiProperty({ example: '349c9ffc-1427-459d-a260-1e3f186b9db2', description: 'Unique patient id.' })
  patientId: string;

  @ApiProperty({
    example: {
      firstName: 'Josh',
      lastName: 'Doe',
      specializations: ['Therapist'],
      avatarKey: '44440105-e6d4-45e8-83f7-b1ff18aaa283.png',
    },
    description: 'Doctor data',
  })
  doctor: {
    firstName: string;
    lastName: string;
    specializations: string[];
    avatarKey: string;
  };

  @ApiProperty({
    example: {
      firstName: 'Josh',
      lastName: 'Doe',
      avatarKey: '44440105-e6d4-45e8-83f7-b1ff18aaa283.png',
    },
    description: 'Patient name',
  })
  patient: {
    firstName: string;
    lastName: string;
    avatarKey: string;
  };

  @ApiProperty({
    example: {
      sentAt: '2024-05-02T07:41:18.065Z',
      sender: Role.DOCTOR,
      text: 'last message text',
    },
    description: 'Got last message.',
  })
  lastMessage: {
    sentAt: Date;
    sender: Role;
    text: string;
  } | null;
}

export class GetChatsResponse {
  @ApiProperty({ type: ResponseChatDto, description: 'Array of response chats.', isArray: true })
  chats: ResponseChatDto[];

  @ApiProperty({ type: 'number', description: 'Total number of chats.' })
  totalChats: number;
}
