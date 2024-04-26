import type { Meta, StoryObj } from '@storybook/react';
import AppointmentsWidget from './AppointmentsWidget';
import '@/index.css';

const meta: Meta<typeof AppointmentsWidget> = {
  title: 'Pages/CalendarPage/Components/AppointmentsWidget',
  component: AppointmentsWidget,
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
    appointmentsForDay: [
      {
        doctor: {
          avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png',
          name: 'Dr. Beebee Bubu',
          rating: 5,
          reviews: 128,
          specialization: 'Cardiologist',
        },
        date: new Date('2024-01-01T08:00:00.000Z'),
        status: 'Planned',
      },
      {
        doctor: {
          avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_17.png',
          name: 'Dr. Beebo Boba',
          rating: 5,
          reviews: 128,
          specialization: 'Uriologist',
        },
        date: new Date('2024-01-01T00:00:00.000Z'),
        status: 'Planned',
      },
    ],
    selectedDate: new Date('2024-01-01T00:00:00.000Z'),
  },
};

export const NoAppointments: Story = {
  args: {
    appointmentsForDay: [],
    selectedDate: new Date('2024-01-01T00:00:00.000Z'),
  },
};
