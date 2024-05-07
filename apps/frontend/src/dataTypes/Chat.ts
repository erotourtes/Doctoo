import type { paths } from '@/api';
import type { Role } from './User';

export interface IChatDoctor {
  firstName: string;
  lastName: string;
  specializations: string[];
  avatarKey: string;
}

export interface IChatPatient {
  firstName: string;
  lastName: string;
  avatarKey: string;
}

export interface LastMessage {
  sentAt: Date;
  sender: Role;
  text: string;
}

export interface IChat {
  id: string;
  doctorId: string;
  patientId: string;
  doctor: IChatDoctor;
  patient: IChatPatient;
  lastMessage: LastMessage | null;
}

export interface GetChatsResponse {
  chats: IChat[];
  totalChats: number;
}

export interface IMessage {
  id: string;
  chatId: string;
  sender: Role;
  sentAt: Date;
  text: string;
  editedAt: Date;
  attachments: IAttachment[];
}

export interface GetMessagesResponse {
  messages: IMessage[];
  totalMessages: number;
}

export interface IAttachment {
  id: string;
  messageId: string;
  attachmentKey: string;
}

export interface IAttachment {}

export type TUser = paths['/user/me']['get']['responses']['200']['content']['application/json'];
