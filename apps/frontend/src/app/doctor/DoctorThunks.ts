import { instance } from '@/api/axios.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDoctorData } from './DoctorSlice';

export const getDoctorData = createAsyncThunk('doctor', async (_, { dispatch }) => {
  try {
    const response = await instance.get(`/doctor`);
    if (response.status === 200) {
      dispatch(setDoctorData(response.data));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});
