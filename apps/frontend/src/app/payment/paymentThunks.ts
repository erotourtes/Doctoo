import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const getPaymentIntent = createAsyncThunk(
  'payment',
  async (data: { appointmentDuration: number; pricePerHour: number }) => {
    const { appointmentDuration, pricePerHour } = data;
    const response = await api.POST('/payment', {
      body: {
        appointmentDuration,
        pricePerHour,
      },
    });

    return response.data;
  },
);
