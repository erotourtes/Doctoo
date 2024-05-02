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
      specializationName: 'Therapist',
      avatarKey: {
        name: '44440105-e6d4-45e8-83f7-b1ff18aaa283.png',
        url: 'https://storage.googleapis.com/bucket/44440105-e6d4-45e8-83f7-b1ff18aaa283.png',
      },
    },
    description: 'Doctor data',
  })
  doctor: {
    firstName: string;
    lastName: string;
    specializationName: string;
    avatar: {
      name: string;
      url: string;
    };
  };

  @ApiProperty({
    example: {
      firstName: 'Josh',
      lastName: 'Doe',
      avatarKey: {
        name: '44440105-e6d4-45e8-83f7-b1ff18aaa283.png',
        url: 'https://storage.googleapis.com/bucket/44440105-e6d4-45e8-83f7-b1ff18aaa283.png',
      },
    },
    description: 'Patient name',
  })
  patient: {
    firstName: string;
    lastName: string;
    avatar: {
      name: string;
      url: string;
    };
  };

  @ApiProperty({
    example: {
      sentAt: new Date(),
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
