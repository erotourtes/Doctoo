import type { paths } from '@/api';
import type { Role } from './User';

export interface IChatDoctor {
  firstName: string;
  lastName: string;
  specializationName: string;
  avatar: {
    name: string;
    url: string;
  };
}

export interface IChatPatient {
  firstName: string;
  lastName: string;
  avatar: {
    name: string;
    url: string;
  };
}

export interface IChat {
  id: string;
  doctorId: string;
  patientId: string;
  doctor: IChatDoctor;
  patient: IChatPatient;
  lastMessage: {
    sentAt: Date;
    sender: Role;
    text: string;
  } | null;
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

export interface IAttachment {}

export type TUser = paths['/user/me']['get']['responses']['200']['content']['application/json'];
