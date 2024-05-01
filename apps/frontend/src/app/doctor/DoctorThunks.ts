import { instance } from '@/api/axios.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDeleteDoctor, setDoctorData, setNewDoctor, setPatchDoctorData, setPatientDoctorData } from './DoctorSlice';
import type { paths } from '../../api';
import api from '../api';
import type { IDoctor } from '../../dataTypes/Doctor';

export type GetDoctorDataPayload = {
  doctors: IDoctor[];
  count: number;
};

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

      dispatch(setPatientDoctorData(res));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const createDoctor = createAsyncThunk('doctor', async (doctor: IDoctor, { dispatch }) => {
  try {
    const response = await instance.post(`/doctor`, doctor);
    if (response.status === 201) {
      dispatch(setNewDoctor(response.data));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const patchDoctorData = createAsyncThunk(
  'doctor',
  async ({ id, data }: { id: string; data: Partial<IDoctor> }, { dispatch }) => {
    try {
      const response = await instance.patch(`/doctor/${id}`, data);
      if (response.status === 200) {
        dispatch(setPatchDoctorData(response.data));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const deleteDoctor = createAsyncThunk('doctor', async (doctor_id: string, { dispatch }) => {
  try {
    const response = await instance.delete(`/doctor/${doctor_id}`);
    if (response.status === 200) {
      dispatch(setDeleteDoctor(response.data));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const getMyDoctorData = createAsyncThunk('doctor', async (_, { dispatch }) => {
  try {
    const { error, data } = await api.GET(`/doctor/doctors/my`, {});
    if (!error) {
      const res: paths['/doctor/doctors/my']['get']['responses']['200']['content']['application/json'] = data;

      dispatch(setPatientDoctorData(res));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});
