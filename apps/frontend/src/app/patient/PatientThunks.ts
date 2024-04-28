import { instance } from '@/api/axios.api';
import { BloodType, Gender, type IPatient } from '@/dataTypes/Patient';
import type { IUser } from '@/dataTypes/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import api from '../api';
import { setPatientData, setPatientState, updatePatientData } from './PatientSlice';

export const getPatientData = createAsyncThunk('patient', async (id: string, { dispatch }) => {
  try {
    const patientResponse: AxiosResponse<IPatient> = await instance.get(`/patient/${id}`);
    if (patientResponse.status !== 200) {
      throw new Error('Failed to fetch patient data GET /patient/:id');
    }
    const { userId } = patientResponse.data;
    const userResponse: AxiosResponse<IUser> = await instance.get(`/user/${userId}`);
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
  async ({ id, data }: { id: string; data: Partial<IUser> }, { dispatch }) => {
    console.log(data, id);
    try {
      const response: AxiosResponse<IUser> = await instance.patch(`/user/${id}`, data);
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

export const authorizePatient = createAsyncThunk('patient', async (_void, { dispatch }) => {
  dispatch(setPatientState({ isLoading: true }));
  const { data, error } = await api.GET('/auth/patient/me');
  if (error || !data) return void dispatch(setPatientState({ isLoading: false }));

  dispatch(
    setPatientData({
      ...data,
      id: data.patientId,
      bloodType: BloodType[data.bloodType],
      gender: Gender[data.gender],
      zipCode: data.zipCode?.toString() || '',
      allergies: [],
      conditions: [],
      vaccinations: [],
      twoFactorAuthToggle: false,
    }),
  );
  dispatch(setPatientState({ isFetched: true, isLoading: false }));
});
