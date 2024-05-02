import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Chat, ChatMessage, Role } from '@prisma/client';
import { CreateMessageDto } from './dto/create.dto';
import { ResponseChatDto } from './dto/response.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { MinioService } from '../minio/minio.service';
import { ChatCreatedEvent } from './events/chat-created.event';

@Injectable()
export class ChatService {
  constructor(
    private prismaService: PrismaService,
    private eventEmitter: EventEmitter2,
    private readonly minioService: MinioService,
  ) {}

  @OnEvent('chat.created')
  async createChatEvent(chatCreatedEvent: ChatCreatedEvent) {
    const isExistsChat = await this.isExistsChatByDoctorAndPatient(
      chatCreatedEvent.patientId,
      chatCreatedEvent.doctorId,
    );

    if (!isExistsChat) {
      this.prismaService.chat.create({
        data: {
          patientId: chatCreatedEvent.patientId,
          doctorId: chatCreatedEvent.doctorId,
        },
      });
    }
  }

  async createChat(patientId: string, doctorId: string): Promise<ResponseChatDto> {
    const isExistsChat = this.isExistsChatByDoctorAndPatient(patientId, doctorId);
    if (isExistsChat) {
      throw new ConflictException('Chat exists');
    }
    const chat = await this.prismaService.chat.create({
      data: {
        patientId,
        doctorId,
      },
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
                specialization: {
                  select: {
                    name: true,
                  },
                },
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
          orderBy: {
            sentAt: 'desc',
          },
          select: {
            sentAt: true,
            sender: true,
            text: true,
          },
        },
      },
    });
    const transformedChat = await this.transformedChat(chat);
    // this.eventEmitter.emit('chat.created', transformedChat);
    return transformedChat;
  }

  async getChatsByUserId(userId: string, role: Role): Promise<ResponseChatDto[]> {
    let where;
    if (role === Role.PATIENT) {
      where = {
        patient: {
          userId,
        },
      };
    }
    if (role === Role.DOCTOR) {
      where = {
        doctor: {
          userId,
        },
      };
    }

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
              take: 1,
              select: {
                specialization: {
                  select: {
                    name: true,
                  },
                },
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
          orderBy: {
            sentAt: 'desc',
          },
          select: {
            sentAt: true,
            sender: true,
            text: true,
          },
        },
      },
    });

    return this.transformedChats(chats);
  }

  async isExistsChatByDoctorAndPatient(patientId: string, doctorId: string): Promise<boolean> {
    return this.prismaService.chat.findFirst({
      where: {
        patientId,
        doctorId,
      },
    })
      ? true
      : false;
  }

  async findChatById(id: string): Promise<Chat | null> {
    return this.prismaService.chat.findFirst({
      where: {
        id,
      },
    });
  }

  async findChatByParticipants(patientId: string, doctorId: string): Promise<Chat | null> {
    return this.prismaService.chat.findFirst({
      where: {
        OR: [
          { patientId, doctorId },
          { patientId: doctorId, doctorId: patientId },
        ],
      },
    });
  }

  async createMessage(createMessageDto: CreateMessageDto): Promise<ChatMessage> {
    const { chatId, sender, text } = createMessageDto;

    // Fetch the chat to get the current unread messages count
    const chat = await this.prismaService.chat.findUnique({
      where: {
        id: chatId,
      },
    });

    if (!chat) {
      throw new Error('Chat not found');
    }

    // Determine the recipient (doctor or patient) based on the sender
    const isDoctor = sender === Role.DOCTOR;
    const recipient = isDoctor ? 'missedMessagesPatient' : 'missedMessagesDoctor';

    // Create the message and increment the unread messages count for the recipient
    return this.prismaService.$transaction(async prisma => {
      const message = await prisma.chatMessage.create({
        data: {
          chatId,
          sender,
          text,
        },
      });

      await prisma.chat.update({
        where: {
          id: chatId,
        },
        data: {
          [recipient]: {
            increment: 1,
          },
        },
      });

      return message;
    });
  }

  async getChatMessages(chatId: string): Promise<ChatMessage[]> {
    return this.prismaService.chatMessage.findMany({
      where: {
        chatId: chatId,
      },
      orderBy: {
        sentAt: 'desc',
      },
      include: {
        attachments: true,
      },
    });
  }

  private async transformedChat(chat: any): Promise<ResponseChatDto> {
    if (!chat) return null;
    const doctor = chat.doctor;
    const patient = chat.patient;

    const lastMessage = chat.messages[0]
      ? {
          sentAt: chat.messages[0].sentAt,
          sender: chat.messages[0].sender,
          text: chat.messages[0].text,
        }
      : null;

    const doctorAvatar = await this.getAvatar(doctor.user.avatarKey);
    const patientAvatar = await this.getAvatar(patient.user.avatarKey);

    return {
      id: chat.id,
      doctorId: chat.doctorId,
      doctor: {
        firstName: doctor.user.firstName,
        lastName: doctor.user.lastName,
        specializationName: doctor.specializations[0]?.specialization.name || null,
        avatar: doctorAvatar,
      },
      patientId: chat.patientId,
      patient: {
        firstName: patient.user.firstName,
        lastName: patient.user.lastName,
        avatar: patientAvatar,
      },
      lastMessage: lastMessage,
    };
  }

  private async getAvatar(avatarKey: string) {
    return this.minioService.getFileByName(avatarKey);
  }

  private async transformedChats(chats: any): Promise<ResponseChatDto[]> {
    const transformedChats = chats.map(chat => this.transformedChat(chat));

    return Promise.all(transformedChats);
  }
}
