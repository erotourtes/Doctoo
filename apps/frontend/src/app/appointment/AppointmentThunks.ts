import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCurrentAppointments, planAppointment, cancelAppointment, completeAppointment } from './AppointmentSlice';
import { instance } from '@/api/axios.api';
import { AxiosResponse } from 'axios';
import AppointmentModel from './AppointmentModel';

export const getCurrentAppointments = createAsyncThunk('appointment', async (_, { dispatch }) => {
  try {
    const response: AxiosResponse<AppointmentModel[]> = await instance.get(`/appointment`);
    if (response.status === 200) {
      dispatch(setCurrentAppointments(response.data));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const createAppointment = createAsyncThunk(
  'appointment',
  async (appointment: AppointmentModel, { dispatch }) => {
    try {
      const response: AxiosResponse<AppointmentModel> = await instance.post(`/appointment`, appointment);
      if (response.status === 201) {
        dispatch(planAppointment(response.data));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const cancelAppointmentById = createAsyncThunk('appointment', async (appointment_id: string, { dispatch }) => {
  try {
    const response: AxiosResponse<string> = await instance.delete(`/appointment/${appointment_id}`);
    if (response.status === 200) {
      dispatch(cancelAppointment(appointment_id));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const completeAppointmentById = createAsyncThunk('appointment', async (appointment_id: string, { dispatch }) => {
  try {
    const response: AxiosResponse<string> = await instance.put(`/appointment/${appointment_id}`);
    if (response.status === 200) {
      dispatch(completeAppointment(appointment_id));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const deleteAppointmentById = createAsyncThunk('appointment', async (appointment_id: string, { dispatch }) => {
  try {
    const response: AxiosResponse<string> = await instance.delete(`/appointment/${appointment_id}`);
    if (response.status === 200) {
      dispatch(cancelAppointment(appointment_id));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});
