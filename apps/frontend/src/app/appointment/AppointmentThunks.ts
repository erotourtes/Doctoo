import { instance } from '@/api/axios.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosResponse } from 'axios';
import type { IAppointment, ICreateAppointment } from '../../dataTypes/Appointment';
import {
  deleteAppointment,
  setAppointmentCanceled,
  setAppointmentCompleted,
  setAppointments,
  setNewAppointment,
} from './AppointmentSlice';

export const getAppointmentsByPatientId = createAsyncThunk('appointment', async (patient_id: string, { dispatch }) => {
  try {
    const response: AxiosResponse<any[]> = await instance.get(`/appointment/all-by-patient/${patient_id}`);
    if (response.status === 200) {
      const data: IAppointment[] = response.data.map(appointment => {
        const { user, ...doctorWithoutUser } = appointment.doctor;
        delete doctorWithoutUser.id;
        const status = appointment.status.charAt(0) + appointment.status.slice(1).toLowerCase();

        return {
          ...appointment,
          status,
          doctor: {
            ...doctorWithoutUser,
            ...user,
          },
        };
      });

      dispatch(setAppointments(data));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const createAppointment = createAsyncThunk(
  'appointment',
  async (appointment: ICreateAppointment, { dispatch }) => {
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

export const cancelAppointmentById = createAsyncThunk('appointment', async (appointment_id: string, { dispatch }) => {
  try {
    const response: AxiosResponse<string> = await instance.patch(`/appointment/${appointment_id}`);
    if (response.status === 200) {
      dispatch(setAppointmentCanceled(appointment_id));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const completeAppointmentById = createAsyncThunk('appointment', async (appointment_id: string, { dispatch }) => {
  try {
    const response: AxiosResponse<string> = await instance.patch(`/appointment/${appointment_id}`);
    if (response.status === 200) {
      dispatch(setAppointmentCompleted(appointment_id));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});

export const deleteAppointmentById = createAsyncThunk('appointment', async (appointment_id: string, { dispatch }) => {
  try {
    const response = await instance.delete(`/appointment/${appointment_id}`);
    if (response.status === 204) {
      dispatch(deleteAppointment(appointment_id));
    }
  } catch (e) {
    const error = e as Error;
    throw error;
  }
});
