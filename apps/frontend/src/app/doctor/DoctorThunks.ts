import { instance } from '@/api/axios.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { paths } from '../../api';
import api from '../api';
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

export const getPatientDoctorData = createAsyncThunk('doctor', async (patient_id: string, { dispatch }) => {
  try {
    const { error, data } = await api.GET(`/doctor/doctors/{id}`, { params: { path: { id: patient_id } } });
    if (!error) {
      const res: paths['/doctor/doctors/{id}']['get']['responses']['200']['content']['application/json'] = data;

      dispatch(setDoctorData(res));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const getMytDoctorData = createAsyncThunk('doctor', async (_, { dispatch }) => {
  try {
    const { error, data } = await api.GET(`/doctor/doctors/my`, {});
    if (!error) {
      const res: paths['/doctor/doctors/my']['get']['responses']['200']['content']['application/json'] = data;

      dispatch(setDoctorData(res));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});
