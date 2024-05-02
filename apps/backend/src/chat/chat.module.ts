import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PatientModule } from '../patient/patient.module';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from '../user/user.module';
import { MinioModule } from '../minio/minio.module';

@Module({
  imports: [EventEmitterModule.forRoot(), PatientModule, UserModule, MinioModule],
  controllers: [ChatController],
  providers: [PrismaService, ChatGateway, ChatService, EventEmitter2],
  exports: [ChatService],
})
export class ChatModule {}
