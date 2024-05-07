import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { forwardRef, Inject } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import { Server } from 'socket.io';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { ResponseChatDto } from './dto/response.dto';
import { ResponseMessageDto } from './dto/responseMessage.dto';
import { SocketGateway } from '../socket/socket.gateway';

export type SocketPayload = { userId?: string; message: any };

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
  namespace: 'chat',
})
export class ChatGateway extends SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => ChatService)) protected chatService: ChatService,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
    protected readonly jwtService: JwtService,
    protected readonly authService: AuthService,
    protected readonly userService: UserService,
  ) {
    super(cacheManager, jwtService, authService, userService);
  }

  afterInit() {
    this.chatService.eventEmitter.on('chat.created', response => {
      this.handleChatCreated(response);
    });
    this.chatService.eventEmitter.on('chat.message.create', response => {
      this.handleCreateMessage(response);
    });
  }

  async handleChatCreated(chat: ResponseChatDto) {
    const userIds = await this.chatService.getUserIdsByChatId(chat.id);
    userIds.forEach(async userId => {
      const receiverSocketId = await this.getSocketId(userId);
      this.server.to(receiverSocketId).emit('chat.created', chat);
    });
  }

  async handleCreateMessage(message: ResponseMessageDto) {
    const userIds = await this.chatService.getUserIdsByChatId(message.chatId);
    userIds.forEach(async userId => {
      const receiverSocketId = await this.getSocketId(userId);
      this.server.to(receiverSocketId).emit(`chat.${message.chatId}.add-message`, message);
    });
  }
}
