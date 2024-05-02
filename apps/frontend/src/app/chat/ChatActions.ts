import type { Dispatch } from '@reduxjs/toolkit';
import socket from './socket';
import type { IChat, IMessage } from '@/dataTypes/Chat';
import { addMessage, setNewChat } from './ChatSlice';

export const joinChat = (userId: string) => () => {
  socket.emit('join', { userId });
  socket.on('connected', (data: any) => console.log(data));
};

export const sendMessage =
  ({ userId, chatId, message }: { userId: string; chatId: string; message: string }) =>
  () => {
    socket.emit('sendMessage', { userId, chatId, message });
  };

export const handleNewChat = () => (dispatch: Dispatch) => {
  socket.on('chats', (chat: IChat) => {
    dispatch(setNewChat(chat));
  });
};

export const handleNewMessages = (chats: IChat[]) => (dispatch: Dispatch) => {
  chats.forEach(chat => {
    socket.on(chat.id, (payload: IMessage) => {
      dispatch(addMessage(payload));
    });
  });
};
