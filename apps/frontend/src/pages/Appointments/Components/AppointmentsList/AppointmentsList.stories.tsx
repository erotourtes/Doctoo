import type { Meta, StoryObj } from '@storybook/react';
import AppointmentsList from './AppointmentsList';
import '@/index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AppointmentSlice from '@/app/appointment/AppointmentSlice';
import { AppointmentStatus } from '@/dataTypes/Appointment';

const mockAppointments = [
  {
    id: '1',
    doctorId: 'doc1',
    patientId: 'pat1',
    assignedAt: '2022-12-01T10:00:00.000Z',
    notes: 'This is a mock appointment',
    status: AppointmentStatus.CANCELED,
    videoRecordKey: 'video1',
    startedAt: '2022-12-01T10:00:00.000Z',
    endedAt: '2022-12-01T11:00:00.000Z',
    paymentInvoiceKey: 'invoice1',
    paymentReceiptKey: 'receipt1',
    doctor: {
      id: 'doc1',
      userId: 'user1',
      payrate: 100,
      about: 'This is a mock doctor',
      firstName: 'Mocking',
      lastName: 'Mock',
      avatarKey: 'https://i.pravatar.cc/300',
      email: 'dr.mock@example.com',
      phone: '+1234567890',
      specializations: [
        {
          id: 'spec1',
          name: 'Specialization1',
        },
      ],
      hospitals: [
        {
          id: 'hosp1',
          name: 'Mock Hospital',
          country: 'Mockland',
          state: 'Mock State',
          city: 'Mock City',
          street: '123 Mock Street',
          zipCode: 12345,
        },
      ],
    },
  },
];

const mockStore = configureStore({
  reducer: {
    appointment: AppointmentSlice,
  },
  preloadedState: {
    appointment: {
      appointments: mockAppointments,
    },
  },
});

const meta: Meta<typeof AppointmentsList> = {
  title: 'Pages/AppointmentsPage/AppointmentsList',
  component: AppointmentsList,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppointmentsList
      filters={{
        doctors: ['All doctors'],
        statuses: ['All statuses'],
        time: ['All time'],
        order: ['Oldest to latest'],
      }}
    />
  ),
};
