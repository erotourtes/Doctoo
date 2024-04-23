import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setAppointments,
  setNewAppointment,
  setAppointmentCanceled,
  setAppointmentCompleted,
} from './AppointmentSlice';
import { instance } from '@/api/axios.api';
import type { AxiosResponse } from 'axios';
import { IAppointment } from '@/dataTypes/Appointment';
import handleError from '@/api/handleError.api';

export const getAppointmentsByPatientId = createAsyncThunk(
  'appointment/getByPatientId',
  async (id: string, { dispatch }) => {
    try {
      const response: AxiosResponse<IAppointment[]> = await instance.get(`/appointment/all-by-patient/${id}`);
      if (response.status === 200) {
        dispatch(setAppointments(response.data));
      }
    } catch (error) {
      handleError(error as Error);
    }
  },
);

export const createAppointment = createAsyncThunk(
  'appointment/create',
  async (appointment: IAppointment, { dispatch }) => {
    try {
      const response: AxiosResponse<IAppointment> = await instance.post(`/appointment`, appointment);
      if (response.status === 201) {
        dispatch(setNewAppointment(response.data));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const cancelAppointmentById = createAsyncThunk(
  'appointment/cancelById',
  async (appointment_id: string, { dispatch }) => {
    try {
      const response: AxiosResponse<string> = await instance.delete(`/appointment/${appointment_id}`);
      if (response.status === 200) {
        dispatch(setAppointmentCanceled(appointment_id));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const completeAppointmentById = createAsyncThunk(
  'appointment/completeById',
  async (appointment_id: string, { dispatch }) => {
    try {
      const response: AxiosResponse<string> = await instance.put(`/appointment/${appointment_id}`);
      if (response.status === 200) {
        dispatch(setAppointmentCompleted(appointment_id));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const deleteAppointmentById = createAsyncThunk(
  'appointment/deleteById',
  async (appointment_id: string, { dispatch }) => {
    try {
      const response: AxiosResponse<string> = await instance.delete(`/appointment/${appointment_id}`);
      if (response.status === 200) {
        dispatch(setAppointmentCanceled(appointment_id));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);
