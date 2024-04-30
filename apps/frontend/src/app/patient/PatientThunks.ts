import type { components, paths } from '@/api';
import { instance } from '@/api/axios.api';
import handleError from '@/api/handleError.api';
import type { TCondition } from '@/dataTypes/Condition';
import type { TAllergy } from '@/dataTypes/Allergy';
import { type TPatient } from '@/dataTypes/Patient';
import type { IUser } from '@/dataTypes/User';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import api from '../api';
import {
  addPatientCondition,
  addPatientAllergy,
  setPatientData,
  setPatientState,
  updatePatientData,
} from './PatientSlice';
import { joinError } from '../../utils/errors';

export const getPatientData = createAsyncThunk('patient', async (id: string, { dispatch }) => {
  try {
    const { data, error } = await api.GET('/patient/{id}', { params: { path: { id } } });

    if (error) {
      throw new Error('Failed to fetch patient data GET /patient/:id');
    }

    dispatch(setPatientData({ ...data, conditions: [] }));
  } catch (e) {
    const error = e as Error;
    handleError(error);
  }
});

export const patchPatientData = createAsyncThunk(
  'patient',
  async ({ id, body }: { id: string; body: Partial<Omit<TPatient, 'userId'>> }, { dispatch }) => {
    const { data, error } = await api.PATCH('/patient/{id}', {
      params: { path: { id } },
      body,
    });

    if (error) throw new Error(joinError(error.message));

    dispatch(updatePatientData({ ...data }));
  },
);

export const patchUserData = createAsyncThunk(
  'patient',
  async ({ id, data }: { id: string; data: Partial<IUser> }, { dispatch }) => {
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

  console.log(data);
  dispatch(
    setPatientData({
      ...data,
      bloodType: data.bloodType,
      gender: data.gender,
      zipCode: data.zipCode ?? 0,
      conditions: [],
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
  async (data: { body: TAllergy[]; id: string }, { dispatch }) => {
    try {
      dispatch(setPatientState({ isLoading: true }));

      const { data: responseData, error } = await api.POST('/patient/{id}/allergy', {
        params: { path: { id: data.id } },
        body: { allergyIds: data.body.map(({ id }) => id) },
      });

      if (error) throw new Error('Failed to create patient allergy');

      if (responseData.count === data.body.length) {
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
type ChangePasswordType = paths['/auth/password/change']['post']['requestBody']['content']['application/json'];
type ErrorResponseType = components['schemas']['ClassicNestResponse'];

export const changePassword = createAsyncThunk<ErrorResponseType, ChangePasswordType>('patient', async body => {
  const { error } = await api.POST('/auth/password/change', { body });
  // TODO: remove casting
  return error as ErrorResponseType;
});

export const createPatientConditions = createAsyncThunk(
  'patient',
  async (data: { body: TCondition[]; id: string }, { dispatch }) => {
    try {
      const body = data.body.map(condition => condition.id);
      dispatch(setPatientState({ isLoading: true }));
      const { data: responseData, error } = await api.POST('/patient/{id}/condition', {
        params: { path: { id: data.id } },
        body: { conditionIds: body },
      });

      if (error) throw new Error('Failed to create patient allergy');

      if (responseData.count === data.body.length) {
        dispatch(addPatientCondition(data.body));
        dispatch(setPatientState({ isLoading: false, isFetched: true }));
      }
    } catch (e) {
      dispatch(setPatientState({ isLoading: false }));
      const error = e as Error;
      handleError(error);
    }
  },
);
