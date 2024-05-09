import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Chat, Role, Appointment } from '@prisma/client';
import { ResponseChatDto } from './dto/response.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { MinioService } from '../minio/minio.service';
import { ChatAppointmentCreatedEvent } from './events/chat-appointment-created.event';
import { ResponseMessageDto } from './dto/responseMessage.dto';
import { ResponseAttachmentDto } from './dto/responseMessageAttachment.dto';
import { CreateChatServiceDto, TCreateMessage } from './dto/create.dto';
import { plainToClass } from 'class-transformer';
import { ChatAppointmentUpdatedEvent } from './events/chat-appointment-updated.event copy';

@Injectable()
export class ChatService {
  constructor(
    private prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  eventEmitter: EventEmitter2 = new EventEmitter2();

  @OnEvent('chat.appointment-created')
  async createAppointmentCreatedEvent(chatAppointmentCreatedEvent: ChatAppointmentCreatedEvent) {
    const existsChat = await this.existsChatByDoctorAndPatient(
      chatAppointmentCreatedEvent.patientId,
      chatAppointmentCreatedEvent.doctorId,
    );
    let chatId = '';
    if (existsChat) {
      chatId = existsChat.id;
    } else {
      const chat = await this.createChat(chatAppointmentCreatedEvent);
      chatId = chat.id;
    }
    await this.createAppointmentMessage(chatId, chatAppointmentCreatedEvent.appointment);
  }

  @OnEvent('chat.appointment-updated')
  async createAppointmentUpdatedEvent(chatAppointmentUpdatedEvent: ChatAppointmentUpdatedEvent) {
    this.updateAppointmentMessage(chatAppointmentUpdatedEvent.appointment);
  }

  async createChat(createChatDto: CreateChatServiceDto): Promise<ResponseChatDto> {
    const existsChat = await this.existsChatByDoctorAndPatient(createChatDto.patientId, createChatDto.doctorId);
    if (existsChat) {
      throw new ConflictException('Chat already exists');
    }

    const participant =
      createChatDto.role === Role.PATIENT ? Role.DOCTOR.toLowerCase() : Role.PATIENT.toLocaleLowerCase();
    const chat = await this.prismaService.chat.create({
      data: {
        patientId: createChatDto.patientId,
        doctorId: createChatDto.doctorId,
      },
      include: {
        [participant]: {
          include: {
            user: true,
            ...([participant === Role.DOCTOR.toLowerCase()]
              ? {
                  specializations: {
                    select: {
                      specialization: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                }
              : undefined),
          },
        },
        messages: { orderBy: { sentAt: 'desc' }, take: 1 },
      },
    });

    const lastMessage = chat.messages[0];
    const participantData = chat[participant];

    const formatedChat = plainToClass(ResponseChatDto, {
      ...chat,
      lastMessage: lastMessage,
      participant: participantData,
    });

    this.eventEmitter.emit('chat.created', formatedChat);

    return formatedChat;
  }

  async getChatsByUserId(
    userId: string,
    role: Role,
    skip = 0,
    take?: number,
  ): Promise<{ chats: ResponseChatDto[]; totalChats: number }> {
    const participant = role === Role.PATIENT ? Role.DOCTOR.toLowerCase() : Role.PATIENT.toLocaleLowerCase();
    const totalChats = await this.prismaService.chat.count({ where: { [role.toLowerCase()]: { userId } } });

    let includeFields: any = {
      user: true,
    };

    // Conditionally include specializations based on the role
    if (participant === Role.DOCTOR.toLowerCase()) {
      includeFields = {
        ...includeFields,
        specializations: {
          select: {
            specialization: {
              select: {
                name: true,
              },
            },
          },
        },
      };
    }

    const chats = await this.prismaService.chat.findMany({
      where: { [role.toLowerCase()]: { userId } },
      include: {
        [participant]: {
          include: includeFields,
        },
        messages: { orderBy: { sentAt: 'desc' }, take: 1 },
      },
      skip,
      take,
    });

    const formatedChats = chats.map(chat => {
      const lastMessage = chat.messages[0];
      const participantData = chat[participant];
      return plainToClass(ResponseChatDto, {
        ...chat,
        lastMessage: lastMessage,
        participant: participantData,
      });
    });

    return { chats: formatedChats, totalChats: totalChats };
  }

  async existsChatByDoctorAndPatient(patientId: string, doctorId: string): Promise<Chat> {
    const chat = await this.prismaService.chat.findFirst({ where: { patientId, doctorId } });
    return chat;
  }

  async getChatByIdAndUserId(chatId: string, userId: string, role: Role): Promise<ResponseChatDto> {
    const participant = role === Role.PATIENT ? Role.DOCTOR.toLowerCase() : Role.PATIENT.toLocaleLowerCase();
    const chat = await this.prismaService.chat.findFirst({
      where: {
        id: chatId,
        OR: [
          {
            doctor: {
              user: {
                id: userId,
              },
            },
          },
          {
            patient: {
              user: {
                id: userId,
              },
            },
          },
        ],
      },
      include: {
        [participant]: {
          include: {
            user: true,
            ...([participant === Role.DOCTOR.toLowerCase()]
              ? {
                  specializations: {
                    select: {
                      specialization: {
                        select: {
                          name: true,
                        },
                      },
                    },
                  },
                }
              : undefined),
          },
        },
        messages: { orderBy: { sentAt: 'desc' }, take: 1 },
      },
    });

    const lastMessage = chat.messages[0];
    const participantData = chat[participant];

    const formatedChat = plainToClass(ResponseChatDto, {
      ...chat,
      lastMessage: lastMessage,
      participant: participantData,
    });

    return formatedChat;
  }

  async findChatById(id: string): Promise<Chat | null> {
    return this.prismaService.chat.findFirst({ where: { id } });
  }

  async getUserIdsByChatId(id: string) {
    const chat = await this.prismaService.chat.findFirst({
      where: { id },
      select: {
        doctor: {
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        patient: {
          select: {
            user: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    return [chat.doctor.user.id, chat.patient.user.id];
  }

  async createMessage(createMessageData: TCreateMessage): Promise<ResponseMessageDto> {
    const { chatId, sender, text, sentAt, files } = createMessageData;
    let uploadedFiles: string[] = [];

    const chat = await this.prismaService.chat.findUnique({ where: { id: chatId } });
    if (!chat) {
      throw new Error('Chat not found');
    }

    const recipient = sender === Role.DOCTOR ? 'missedMessagesPatient' : 'missedMessagesDoctor';
    const message = await this.prismaService.$transaction(async prisma => {
      const newMessage: ResponseMessageDto = await prisma.chatMessage.create({
        data: { chatId, sender, text, sentAt },
      });
      await prisma.chat.update({ where: { id: chatId }, data: { [recipient]: { increment: 1 } } });

      return newMessage;
    });

    if (files && files.length > 0) {
      uploadedFiles = await Promise.all(files.map(async file => (await this.minioService.upload(file)).name));
      message.attachments = await this.addAttachmentsByMessageId(message.id, uploadedFiles);

      if (message.sender === Role.DOCTOR) {
        const event = {
          patientId: chat.patientId,
          doctorId: chat.doctorId,
          fileId: uploadedFiles,
        };

        this.eventEmitter.emit('file.received', event);
      }
    }

    const formatedMessage = plainToClass(ResponseMessageDto, message);
    this.eventEmitter.emit('chat.message.create', formatedMessage);
    return formatedMessage;
  }

  async getChatMessages(
    chatId: string,
    skip = 0,
    take?: number,
  ): Promise<{ messages: ResponseMessageDto[]; totalMessages: number }> {
    const where = { chatId };
    const totalMessages = await this.prismaService.chatMessage.count({ where });
    const messages = await this.prismaService.chatMessage.findMany({
      where,
      orderBy: { sentAt: 'desc' },
      include: {
        attachments: true,
        appointment: {
          select: { id: true, startedAt: true, status: true },
        },
      },
      skip,
      take,
    });

    const formatedMessages = plainToClass(ResponseMessageDto, messages);

    return { messages: formatedMessages, totalMessages };
  }

  private async addAttachmentsByMessageId(
    messageId: string,
    uploadedFiles: string[],
  ): Promise<ResponseAttachmentDto[]> {
    const data = uploadedFiles.map(attachmentKey => ({ messageId, attachmentKey }));

    await this.prismaService.messageAttachment.createMany({ data });

    return this.getMessageAttachmentsByMessageId(messageId);
  }

  async getMessageAttachmentsByMessageId(messageId: string): Promise<ResponseAttachmentDto[]> {
    return this.prismaService.messageAttachment.findMany({ where: { messageId } });
  }

  async getAttachmentsByChatId(chatId: string): Promise<ResponseAttachmentDto[]> {
    return this.prismaService.messageAttachment.findMany({
      where: {
        message: {
          chat: {
            id: chatId,
          },
        },
      },
      orderBy: {
        message: {
          sentAt: 'desc',
        },
      },
    });
  }

  async createAppointmentMessage(chatId: string, appointment: Appointment) {
    const message = await this.prismaService.chatMessage.create({
      data: {
        chatId,
        sentAt: appointment.createdAt,
        text: `Appointment`,
        appointmentId: appointment.id,
      },
      include: {
        appointment: {
          select: { id: true, startedAt: true, status: true },
        },
      },
    });
    const formatedMessage = plainToClass(ResponseMessageDto, message);
    this.eventEmitter.emit('chat.message.create', formatedMessage);
    return formatedMessage;
  }

  async updateAppointmentMessage(appointment: Appointment) {
    const message = await this.prismaService.chatMessage.findFirst({
      where: {
        chat: {
          doctorId: appointment.doctorId,
          patientId: appointment.patientId,
        },
        appointmentId: appointment.id,
      },
      include: {
        appointment: {
          select: { id: true, startedAt: true, status: true },
        },
      },
    });
    const formatedMessage = plainToClass(ResponseMessageDto, message);
    this.eventEmitter.emit('chat.message.update', formatedMessage);
    return formatedMessage;
  }
}
