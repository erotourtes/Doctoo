import { instance } from '@/api/axios.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDoctorData } from './DoctorSlice';
import api from '../api';
import type { IDoctor } from '@/dataTypes/Doctor';

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

export const getPatientDoctorData = createAsyncThunk('doctor', async (patient_id: string, { dispatch }) => {
  try {
    const { error, data } = await api.GET(`/doctor/patient-dactors/{id}`, { params: { path: { id: patient_id } } });
    if (!error) {
      const res: IDoctor[] = data;

      dispatch(setDoctorData(res));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});
