import type { Dispatch } from '@reduxjs/toolkit';
import type { IChat, IMessage } from '@/dataTypes/Chat';
import { addMessage, setNewChat } from './ChatSlice';
import type { Socket } from 'socket.io-client';

export const handleNewChat = (socket: Socket) => (dispatch: Dispatch) => {
  socket.on('chat.created', (chat: IChat) => {
    dispatch(setNewChat(chat));
  });
};

export const handleNewMessages = (socket: Socket, chats: IChat[]) => (dispatch: Dispatch) => {
  chats.forEach(chat => {
    socket.on(`chat.${chat.id}.add-message`, (payload: IMessage) => {
      dispatch(addMessage(payload));
    });
  });
};
