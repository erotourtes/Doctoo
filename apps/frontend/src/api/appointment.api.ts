import type { AxiosResponse } from 'axios';
import { instance } from './axios.api';
import type { IAppointment, ICreateAppointment } from '@/dataTypes/Appointment';
import type { AppointmentStatus } from '@/dataTypes/Appointment';
import handleError from './handleError.api';

/* ========== GET ========== */
export async function getAllAppointmentsByPatient(id: string): Promise<IAppointment[] | undefined> {
  try {
    const response: AxiosResponse<IAppointment[]> = await instance.get(`/appointment/all-by-patient/${id}`);
    return response.data;
  } catch (error) {
    handleError(error as Error);
  }
}

export async function getAllAppointmentsByDoctor(id: string): Promise<IAppointment[] | undefined> {
  try {
    const response: AxiosResponse<IAppointment[]> = await instance.get(`/appointment/all-by-doctor/${id}`);
    return response.data;
  } catch (error) {
    handleError(error as Error);
  }
}

export async function getAppointmentById(id: string): Promise<IAppointment | undefined> {
  try {
    const response: AxiosResponse<IAppointment> = await instance.get(`/appointment/${id}`);
    return response.data;
  } catch (error) {
    handleError(error as Error);
  }
}

/* ========== DELETE ========== */
export async function deleteAppointment(id: string): Promise<void> {
  try {
    await instance.delete(`/appointment/${id}`);
  } catch (error) {
    handleError(error as Error);
  }
}

/* ========== POST ========== */
export async function createAppointment(appointment: ICreateAppointment): Promise<IAppointment | undefined> {
  try {
    const response = await instance.post('/appointment', appointment);
    return response.data;
  } catch (error) {
    handleError(error as Error);
  }
}

/* ========== PATCH ========== */
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
): Promise<IAppointment | undefined> {
  try {
    const response = await instance.patch(`/appointment/${id}`, { status });
    return response.data;
  } catch (error) {
    handleError(error as Error);
  }
}

export async function updateAppointmentNotes(id: string, notes: string): Promise<IAppointment | undefined> {
  try {
    const response = await instance.patch(`/appointment/${id}`, { notes });
    return response.data;
  } catch (error) {
    handleError(error as Error);
  }
}

export async function updateAppointmentDate(id: string, date: string): Promise<IAppointment | undefined> {
  try {
    const response = await instance.patch(`/appointment/${id}`, { date });
    return response.data;
  } catch (error) {
    handleError(error as Error);
  }
}
