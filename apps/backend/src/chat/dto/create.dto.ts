import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly chatId: string;

  @IsNotEmpty()
  @IsString()
  readonly sender: Role;

  @IsNotEmpty()
  @IsString()
  readonly text: string;
}

export class CreateChatDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Unique user id (doctor or patient).' })
  participantId: string;
}
