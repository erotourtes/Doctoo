import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '@/api/axios.api';
import type { AxiosResponse } from 'axios';
import type { TCondition } from '@/dataTypes/Condition';
import { setConditionData } from './ConditionSlice';
import handleError from '@/api/handleError.api';

export const getConditionData = createAsyncThunk('condition', async (_, { dispatch }) => {
  try {
    const response: AxiosResponse<TCondition[]> = await instance.get('/condition');

    if (response.status !== 200) {
      throw new Error('Failed to fetch condition data GET /condition');
    }

    dispatch(setConditionData(response.data));
  } catch (e) {
    const error = e as Error;
    handleError(error);
  }
});
