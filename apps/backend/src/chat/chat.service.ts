import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Chat, ChatMessage, Role } from '@prisma/client';
import { ResponseChatDto } from './dto/response.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { MinioService } from '../minio/minio.service';
import { ChatCreatedEvent } from './events/chat-created.event';
import { ResponseMessageDto } from './dto/responseMessage.dto';
import { ResponseAttachmentDto } from './dto/responseMessageAttachment.dto';
import { TCreateMessage } from './dto/create.dto';

@Injectable()
export class ChatService {
  constructor(
    private prismaService: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  eventEmitter: EventEmitter2 = new EventEmitter2();

  @OnEvent('chat.create')
  async createChatEvent(chatCreatedEvent: ChatCreatedEvent) {
    await this.createChat(chatCreatedEvent.patientId, chatCreatedEvent.doctorId);
  }

  async createChat(patientId: string, doctorId: string): Promise<ResponseChatDto> {
    const existsChat = await this.isExistsChatByDoctorAndPatient(patientId, doctorId);
    if (existsChat) {
      throw new ConflictException('Chat already exists');
    }

    const chat = await this.prismaService.chat.create({
      data: { patientId, doctorId },
      select: {
        id: true,
        doctorId: true,
        doctor: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatarKey: true,
              },
            },
            specializations: {
              take: 1,
              select: {
                specialization: { select: { name: true } },
              },
            },
          },
        },
        patientId: true,
        patient: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatarKey: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: { sentAt: 'desc' },
          select: {
            sentAt: true,
            sender: true,
            text: true,
          },
        },
      },
    });

    const formatedChat = await this.transformedChat(chat);

    this.eventEmitter.emit('chat.created', formatedChat);
    return formatedChat;
  }

  async getChatsByUserId(
    userId: string,
    role: Role,
    skip = 0,
    take?: number,
  ): Promise<{ chats: ResponseChatDto[]; totalChats: number }> {
    const where =
      role === Role.PATIENT
        ? {
            patient: {
              userId,
            },
          }
        : {
            doctor: {
              userId,
            },
          };
    const totalChats = await this.prismaService.chat.count({ where });

    const chats = await this.prismaService.chat.findMany({
      where,
      select: {
        id: true,
        doctorId: true,
        doctor: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatarKey: true,
              },
            },
            specializations: {
              select: {
                specialization: { select: { name: true } },
              },
            },
          },
        },
        patientId: true,
        patient: {
          select: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                avatarKey: true,
              },
            },
          },
        },
        messages: {
          take: 1,
          orderBy: { sentAt: 'desc' },
          select: {
            sentAt: true,
            sender: true,
            text: true,
          },
        },
      },
      skip,
      take,
    });

    const transformedChats = await Promise.all(chats.map(chat => this.transformedChat(chat)));

    return { chats: transformedChats, totalChats };
  }

  async isExistsChatByDoctorAndPatient(patientId: string, doctorId: string): Promise<boolean> {
    const chat = await this.prismaService.chat.findFirst({ where: { patientId, doctorId } });
    return !!chat;
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
    }

    this.eventEmitter.emit('chat.message.create', message);
    return message;
  }

  async getChatMessages(
    chatId: string,
    skip = 0,
    take?: number,
  ): Promise<{ messages: ChatMessage[]; totalMessages: number }> {
    const where = { chatId };
    const totalMessages = await this.prismaService.chatMessage.count({ where });
    const messages = await this.prismaService.chatMessage.findMany({
      where,
      orderBy: { sentAt: 'desc' },
      include: { attachments: true },
      skip,
      take,
    });

    return { messages, totalMessages };
  }

  private async transformedChat(chat: any): Promise<ResponseChatDto> {
    if (!chat) return null;

    const doctor = chat.doctor;
    const patient = chat.patient;
    const lastMessage = chat.messages[0] ? { ...chat.messages[0] } : null;
    const specializations = doctor.specializations.map((s: any) => s.specialization.name);

    return {
      id: chat.id,
      doctorId: chat.doctorId,
      doctor: {
        firstName: doctor.user.firstName,
        lastName: doctor.user.lastName,
        specializations,
        avatarKey: doctor.user.avatarKey,
      },
      patientId: chat.patientId,
      patient: {
        firstName: patient.user.firstName,
        lastName: patient.user.lastName,
        avatarKey: patient.user.avatarKey,
      },
      lastMessage,
    };
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
}
