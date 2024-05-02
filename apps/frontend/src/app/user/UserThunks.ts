import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { setUserState } from './UserSlice';

export const logoutThunk = createAsyncThunk('logout', async (_void, { dispatch }) => {
  const { error } = await api.GET('/auth/logout');
  if (error) throw new Error('Failed to logout');
  dispatch(setUserState({ isFetched: false }));
});
