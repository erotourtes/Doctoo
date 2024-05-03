import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import type { AppointmentStatus, IAppointment, ICreateAppointment } from '../../dataTypes/Appointment';
import api from '../api';
import {
  deleteAppointment,
  setAppointments,
  setChangeAppointmentStatus,
  setNewAppointment,
  setResheduleAppointment,
} from './AppointmentSlice';
import dayjs from 'dayjs';
import handleError from '@/api/handleError.api';

export const getAppointmentsByPatientId = createAsyncThunk('appointment', async (patient_id: string, { dispatch }) => {
  try {
    const { error, data } = await api.GET(`/appointment/patient/{id}`, {
      params: { path: { id: patient_id } },
    });
    if (!error) {
      const res: IAppointment[] = data;

      dispatch(setAppointments(res));
    }
  } catch (e) {
    handleError(e as Error | AxiosError);
  }
});

export const getMyAppointments = createAsyncThunk('appointment', async (_, { dispatch }) => {
  try {
    const { error, data } = await api.GET(`/appointment/my`, {});
    if (!error) {
      const res: IAppointment[] = data;

      dispatch(setAppointments(res));
    }
  } catch (e) {
    handleError(e as Error | AxiosError);
  }
});

export const getLoginedDoctorAppointments = createAsyncThunk('appointment', async (_, { dispatch }) => {
  try {
    const { error, data } = await api.GET(`/appointment/doctor/all`, {});
    if (!error) {
      const res: IAppointment[] = data;

      dispatch(setAppointments(res));
    }
  } catch (e) {
    handleError(e as Error | AxiosError);
  }
});

export const createAppointment = createAsyncThunk(
  'appointment',
  async (appointment: ICreateAppointment, { dispatch }) => {
    try {
      const { error, data } = await api.POST(`/appointment`, {
        body: { ...appointment },
      });
      if (!error) {
        dispatch(setNewAppointment(data));
      }
    } catch (e) {
      handleError(e as Error | AxiosError);
    }
  },
);

export const changeAppointmentStatus = createAsyncThunk(
  'appointment',
  async (data: { id: string; status: AppointmentStatus }, { dispatch }) => {
    try {
      const { error, data: responseData } = await api.PATCH(`/appointment/{id}`, {
        params: { path: { id: data.id } },
        body: { status: data.status },
      });
      if (!error) {
        dispatch(setChangeAppointmentStatus({ id: responseData.id, status: responseData.status as AppointmentStatus }));
      }
    } catch (e) {
      handleError(e as Error | AxiosError);
    }
  },
);

export const rescheduleAppointment = createAsyncThunk(
  'appointment',
  async (request: { id: string; newDate: string }, { dispatch }) => {
    try {
      const startedAt = dayjs.utc(request.newDate);
      const endedAt = startedAt.add(1, 'hour').format('YYYY-MM-DDTHH:mm:ss[Z]');

      const { error, data } = await api.PATCH(`/appointment/{id}`, {
        params: { path: { id: request.id } },
        body: { startedAt: startedAt.format('YYYY-MM-DDTHH:mm:ss[Z]'), endedAt },
      });
      if (!error) {
        dispatch(setResheduleAppointment({ id: data.id, newDate: data.startedAt }));
      }
    } catch (e) {
      handleError(e as Error | AxiosError);
    }
  },
);

export const deleteAppointmentById = createAsyncThunk('appointment', async (appointment_id: string, { dispatch }) => {
  try {
    const { error } = await api.DELETE(`/appointment/{id}`, {
      params: { path: { id: appointment_id } },
    });
    if (!error) {
      dispatch(deleteAppointment(appointment_id));
    }
  } catch (e) {
    handleError(e as Error | AxiosError);
  }
});
