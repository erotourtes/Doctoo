import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '@/api/axios.api';
import handleError from '@/api/handleError.api';
import { setChatMessages, setChats, setMe } from './ChatSlice';

export const getMe = createAsyncThunk('chat/fetch', async (_, { dispatch }) => {
  try {
    const response = await instance.get(`/user/me`);
    if (response.status === 200) {
      dispatch(setMe(response.data));
    }
  } catch (e) {
    handleError(e as Error);
  }
});

export const getChats = createAsyncThunk('chat/fetch', async (_, { dispatch }) => {
  try {
    const response = await instance.get(`/chat`);
    if (response.status === 200) {
      dispatch(setChats(response.data));
    }
  } catch (e) {
    handleError(e as Error);
  }
});

export const getChatMessages = createAsyncThunk('chatMessages/fetch', async ({ id }: { id: string }, { dispatch }) => {
  try {
    const response = await instance.get(`/chat/${id}`);
    if (response.status === 200) {
      dispatch(setChatMessages(response.data));
    }
  } catch (e) {
    handleError(e as Error);
  }
});
