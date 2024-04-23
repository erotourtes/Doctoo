import { createAsyncThunk } from '@reduxjs/toolkit';
import { setPatientData, updatePatientData } from './PatientSlice';
import { instance } from '@/api/axios.api';
import type { IPatient } from '@/dataTypes/Patient';
import type { IUSer } from '@/dataTypes/User';
import type { AxiosResponse } from 'axios';

export const getPatientData = createAsyncThunk('patient', async (id: string, { dispatch }) => {
  try {
    const patientResponse: AxiosResponse<IPatient> = await instance.get(`/patient/${id}`);
    if (patientResponse.status !== 200) {
      throw new Error('Failed to fetch patient data GET /patient/:id');
    }
    const { userId } = patientResponse.data;
    const userResponse: AxiosResponse<IUSer> = await instance.get(`/user/${userId}`);
    if (patientResponse.status !== 200) {
      throw new Error('Failed to fetch user data GET /user/:id');
    }
    dispatch(setPatientData({ ...patientResponse.data, ...userResponse.data }));
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const patchPatientData = createAsyncThunk(
  'patient',
  async ({ id, data }: { id: string; data: Partial<Omit<IPatient, 'userId'>> }, { dispatch }) => {
    try {
      const response: AxiosResponse<IPatient> = await instance.patch(`/patient/${id}`, data);
      if (response.status === 200) {
        dispatch(updatePatientData(response.data));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const patchUserData = createAsyncThunk(
  'patient',
  async ({ id, data }: { id: string; data: Partial<IUSer> }, { dispatch }) => {
    console.log(data, id);
    try {
      const response: AxiosResponse<IUSer> = await instance.patch(`/user/${id}`, data);
      if (response.status === 200) {
        dispatch(updatePatientData(response.data));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const deletePatient = createAsyncThunk('patient', async (id: string) => {
  try {
    const response: AxiosResponse<string> = await instance.delete(`/patient/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});
