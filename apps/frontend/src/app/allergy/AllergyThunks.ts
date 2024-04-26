import { instance } from '@/api/axios.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAllergyData } from './AllergySlice';

export const getAllAllergies = createAsyncThunk('allergy', async (_, { dispatch }) => {
  const response = await instance.get('/allergies');

  if (response.status !== 200) {
    throw new Error('Failed to fetch allergies');
  }

  dispatch(setAllergyData(response.data));
});
