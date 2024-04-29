import { instance } from '@/api/axios.api';
import { type TPatient } from '@/dataTypes/Patient';
import type { IUser } from '@/dataTypes/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import api from '../api';
import { setPatientData, setPatientState, updatePatientData } from './PatientSlice';
import handleError from '@/api/handleError.api';
import type { TCondition } from '@/dataTypes/Condition';

export const getPatientData = createAsyncThunk('patient', async (id: string, { dispatch }) => {
  try {
    const { data, error } = await api.GET('/patient/{id}', { params: { path: { id } } });

    if (error) {
      throw new Error('Failed to fetch patient data GET /patient/:id');
    }

    dispatch(updatePatientData({ ...data }));
    //TODO: Delete the line above, and uncomment after PR #214 is merged
    // dispatch(setPatientData({ ...data }));
  } catch (e) {
    const error = e as Error;
    handleError(error);
  }
});

export const patchPatientData = createAsyncThunk(
  'patient',
  async ({ id, data }: { id: string; data: Partial<Omit<TPatient, 'userId'>> }, { dispatch }) => {
    try {
      const response: AxiosResponse<TPatient> = await instance.patch(`/patient/${id}`, data);
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
      bloodType: data.bloodType,
      gender: data.gender,
      zipCode: data.zipCode ?? 0,
      allergies: [],
      twoFactorAuthToggle: false,
    }),
  );
  dispatch(setPatientState({ isFetched: true, isLoading: false }));
});

export const logoutPatient = createAsyncThunk('patient', async (_void, { dispatch }) => {
  const { error } = await api.GET('/auth/logout');
  if (error) throw new Error('Failed to logout');
  dispatch(setPatientState({ isFetched: false }));
});

export const createPatientAllergies = createAsyncThunk(
  'patient',
  async (data: { body: TCondition[]; id: string }, { dispatch }) => {
    try {
      const body = data.body.map(condition => ({ conditionId: condition.id }));
      dispatch(setPatientState({ isLoading: true }));
      const { data: responseData, error } = await api.POST('/patient/{id}/condition', {
        params: { path: { id: data.id } },
        body,
      });

      if (error) throw new Error('Failed to create patient allergy');

      if (responseData === data.body.length) {
        dispatch(addPatientAllergy(data.body));
        dispatch(setPatientState({ isLoading: false, isFetched: true }));
      }
    } catch (e) {
      dispatch(setPatientState({ isLoading: false }));
      const error = e as Error;
      handleError(error);
    }
  },
);
