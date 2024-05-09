import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '@/api/axios.api';
import handleError from '@/api/handleError.api';
import { addMessage, openChat, setChatAttachments, setChatMessages, setChats, setNewChat } from './ChatSlice';

export const getChats = createAsyncThunk('chat/fetchChats', async (_, { dispatch }) => {
  try {
    const response = await instance.get(`/chat`);
    if (response.status === 200) {
      dispatch(setChats(response.data));
    }
  } catch (e) {
    handleError(e as Error);
  }
});

export const getChat = createAsyncThunk('chat/fetchChat', async (chatId: string, { dispatch }) => {
  try {
    const response = await instance.get(`/chat/${chatId}`);
    if (response.status === 200) {
      dispatch(openChat(response.data));
    }
  } catch (e) {
    handleError(e as Error);
  }
});

export const getChatMessages = createAsyncThunk('chat/fetchMessages', async (chatId: string, { dispatch }) => {
  try {
    const response = await instance.get(`/chat/${chatId}/messages`);
    if (response.status === 200) {
      dispatch(setChatMessages(response.data));
    }
  } catch (e) {
    handleError(e as Error);
  }
});

export const createChat = createAsyncThunk('chat/createChat', async (createChatData, { dispatch }) => {
  try {
    const response = await instance.post(`/chat`, createChatData);
    if (response.status === 200) {
      dispatch(setNewChat(response.data));
    }
  } catch (e) {
    handleError(e as Error);
  }
});

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ chatId, messageData }: { chatId: string; messageData: FormData }, { dispatch }) => {
    try {
      const response = await instance.post(`/chat/${chatId}/messages`, messageData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        dispatch(addMessage(response.data));
      }
    } catch (e) {
      handleError(e as Error);
    }
  },
);

export const getChatAttachments = createAsyncThunk('chat/sendMessage', async (chatId: string, { dispatch }) => {
  try {
    const response = await instance.get(`/chat/${chatId}/attachments`);
    if (response.status === 200) {
      dispatch(setChatAttachments(response.data));
    }
  } catch (e) {
    handleError(e as Error);
  }
});
