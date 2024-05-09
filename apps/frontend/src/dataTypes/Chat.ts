import type { paths } from '@/api';

export type TChats = paths['/chat']['get']['responses']['200']['content']['application/json'];

export type TChat = paths['/chat/{chatId}']['get']['responses']['200']['content']['application/json'];

export type TParticipant = TChat['participant'];

export type TMessages = paths['/chat/{chatId}/messages']['get']['responses']['200']['content']['application/json'];

export type TMessage = TMessages['messages'][0];

export type TMessageAppointment = TMessage['appointment'];

export type TAttachment = TMessage['attachments'][0];

export type TUser = paths['/user/me']['get']['responses']['200']['content']['application/json'];
