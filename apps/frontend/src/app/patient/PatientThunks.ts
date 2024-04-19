import { createAsyncThunk } from '@reduxjs/toolkit';
import { setPatientData } from './PatientSlice';
import { instance } from '@/api/axios.api';

export const getPatientData = createAsyncThunk('patient', async (_, { dispatch }) => {
  try {
    const response = await instance.get(`/patient`);
    if (response.status === 200) {
      dispatch(setPatientData(response.data));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});
