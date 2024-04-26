import type { Meta, StoryObj } from '@storybook/react';
import AppointmentPopup from './AppointmentPopup';
import '@/index.css';

const meta: Meta<typeof AppointmentPopup> = {
  title: 'Pages/CalendarPage/Components/AppointmentPopup',
  component: AppointmentPopup,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className='flex h-screen w-screen overflow-hidden bg-background'>
        <main className='main-wrapper flex h-full w-full flex-col gap-6 overflow-auto p-8'>
          <Story />
        </main>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    appointmentModal: true,
    selectedAppointment: {
      doctor: {
        avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png',
        name: 'Dr. Beebee Bubu',
        rating: 5,
        reviews: 128,
        specialization: 'Cardiologist',
      },
      date: new Date('2024-01-01T00:00:00.000Z'),
      status: 'Planned',
    },
    closeModal: () => console.log('Modal closed'),
  },
};
