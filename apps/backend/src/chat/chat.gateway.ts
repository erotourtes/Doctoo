import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Injectable, Logger } from '@nestjs/common';
// import { OnEvent } from '@nestjs/event-emitter';
import { Role } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { PatientService } from '../patient/patient.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
// import { ResponseChatDto } from './dto/response.dto';

@Injectable()
@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');
  private users: { [id: string]: { socket: Socket } } = {};

  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly patientService: PatientService,
    private readonly prismaService: PrismaService,
  ) {}

  handleConnection(socket: Socket) {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }

  @SubscribeMessage('join')
  async handleJoinPatient(@ConnectedSocket() socket: Socket, @MessageBody() payload: { userId: string }) {
    const { userId } = payload;
    const user = await this.userService.getUser(userId);
    if (user.role === Role.PATIENT) {
      const patient = await this.patientService.getPatientByUserId(user.id);
      this.users[`PATIENT_${patient.id}`] = { socket };
      this.logger.log(`Patient joined: ${patient.id}`);
    }
    if (user.role === Role.DOCTOR) {
      const doctor = await this.prismaService.doctor.findFirst({
        where: { userId: user.id },
      });
      this.users[`DOCTOR_${doctor.id}`] = { socket };
      this.logger.log(`Doctor joined: ${doctor.id}`);
    }
    socket.emit('connected', 'Successfully connected. userId: ' + userId);
  }

  // @OnEvent('chat.created')
  // handleChatCreated(chat: ResponseChatDto) {
  //   const patientSocket = this.users[`PATIENT_${chat.patientId}`]?.socket;
  //   const doctorSocket = this.users[`DOCTOR_${chat.doctorId}`]?.socket;
  //   if (patientSocket) {
  //     patientSocket.emit('chats', chat);
  //   }
  //   if (doctorSocket) {
  //     doctorSocket.emit('chats', chat);
  //   }
  // }

  @SubscribeMessage('sendMessage')
  async handleMessageDoctor(@MessageBody() payload: { userId: string; chatId: string; message: string }) {
    const { userId, chatId, message } = payload;
    const user = await this.userService.getUser(userId);
    const chat = await this.chatService.findChatById(chatId);
    const createdMessage = await this.chatService.createMessage({
      chatId: chat.id,
      sender: user.role,
      text: message,
    });

    const patientSocket = this.users[`${Role.PATIENT}_${chat.patientId}`]?.socket;
    const doctorSocket = this.users[`${Role.DOCTOR}_${chat.doctorId}`]?.socket;

    if (patientSocket) {
      patientSocket.emit(chatId, createdMessage);
    }
    if (doctorSocket) {
      doctorSocket.emit(chatId, createdMessage);
    }
  }
}
