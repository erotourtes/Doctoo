import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { setUserData } from './UserSlice';
import handleError from '@/api/handleError.api';

export const getUserData = createAsyncThunk('user', async (_, { dispatch }) => {
  try {
    const { data, error } = await api.GET('/user/me');

    if (error) {
      throw new Error('Failed to fetch patient data GET /user/me');
    }

    dispatch(setUserData({ ...data }));
  } catch (e) {
    const error = e as Error;
    handleError(error);
  }
});
