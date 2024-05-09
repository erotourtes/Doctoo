import AppointmentSlice from '@/app/appointment/AppointmentSlice';
import { Button, PopupDoctoo } from '@/components/UI';
import { AppointmentStatus } from '@/dataTypes/Appointment';
import '@/index.css';
import { configureStore } from '@reduxjs/toolkit';
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import AppointmentsPopup from './AppointmentsPopup';
import { BrowserRouter } from 'react-router-dom';

const mockAppointments = [
  {
    id: '1',
    doctorId: 'doc1',
    patientId: 'pat1',
    createdAt: '2022-12-01T10:00:00.000Z',
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
      rating: 4.5,
      reviewsCount: 30,
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
      appointment: null,
    },
  },
});

const meta: Meta<typeof AppointmentsPopup> = {
  title: 'Pages/AppointmentsPage/AppointmentsPopup',
  component: AppointmentsPopup,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <Provider store={mockStore}>
        <div className='flex h-screen w-screen overflow-hidden bg-background'>
          <main className='main-wrapper flex h-full w-full flex-col gap-6 overflow-auto p-8'>
            <Story />
          </main>
        </div>
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    appointment: {
      id: '1',
      doctorId: 'doc1',
      patientId: 'pat1',
      createdAt: '2022-12-01T10:00:00.000Z',
      notes: 'This is a mock appointment',
      status: AppointmentStatus.PLANNED,
      videoRecordKey: 'video1',
      paymentInvoiceKey: 'invoice1',
      paymentReceiptKey: 'receipt1',
      startedAt: '2022-12-01T10:00:00.000Z',
      endedAt: '2022-12-01T11:00:00.000Z',
      doctor: {
        id: 'doc1',
        userId: 'user1',
        payrate: 100.0,
        about: 'This is a mock doctor',
        firstName: 'Mocking',
        lastName: 'Mock',
        avatarKey: 'https://i.pravatar.cc/300',
        email: 'dr.mock@example.com',
        phone: '+1234567890',
        rating: 4.5,
        reviewsCount: 30,
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
  },
  render: function Render({ appointment }) {
    const [{ popupIsOpen }, updateArgs] = useArgs();

    function closePopup() {
      updateArgs({ popupIsOpen: false });
    }

    function openPopup() {
      updateArgs({ popupIsOpen: true });
    }

    return (
      <BrowserRouter>
        <Button type='primary' onClick={openPopup}>
          Open Pop Up
        </Button>

        <PopupDoctoo
          popupIsOpen={popupIsOpen}
          closePopup={closePopup}
          modalBodyClassName={''}
          modalFullClassName='max-w-[700px]'
        >
          <AppointmentsPopup appointment={appointment} reviews={[]} />
        </PopupDoctoo>
      </BrowserRouter>
    );
  },
};
