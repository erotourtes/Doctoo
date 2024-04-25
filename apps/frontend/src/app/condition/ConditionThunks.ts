import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '@/api/axios.api';
import type { AxiosResponse } from 'axios';
import type { ICondition } from '@/dataTypes/Condition';
import { setConditionData } from './ConditionSlice';

export const getConditionData = createAsyncThunk('condition', async (_, { dispatch }) => {
  const response: AxiosResponse<ICondition[]> = await instance.get('/condition');

  if (response.status !== 200) {
    throw new Error('Failed to fetch condition data GET /condition');
  }

  dispatch(setConditionData(response.data));
});
