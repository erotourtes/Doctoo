import type { Meta, StoryObj } from '@storybook/react';
import BigCalendar from './BigCalendar';
import '@/index.css';
import dayjs from 'dayjs';

const meta: Meta<typeof BigCalendar> = {
  title: 'Pages/CalendarPage/Components/BigCalendar',
  component: BigCalendar,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className='flex h-screen w-screen overflow-hidden bg-background'>
        <main className='main-wrapper flex h-full w-5/6 flex-col gap-6 overflow-auto p-8'>
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
    meetingsForDay: [
      {
        doctor: {
          avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png',
          name: 'Dr. Beebee Bubu',
          rating: 5,
          reviews: 128,
          specialization: 'Cardiologist',
        },
        date: dayjs().toDate(),
        status: 'Planned',
      },
      {
        doctor: {
          avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png',
          name: 'Dr. Beebee Bubu',
          rating: 5,
          reviews: 128,
          specialization: 'Cardiologist',
        },
        date: dayjs().toDate(),
        status: 'Planned',
      },
      {
        doctor: {
          avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png',
          name: 'Dr. Beebee Bubu',
          rating: 5,
          reviews: 128,
          specialization: 'Cardiologist',
        },
        date: dayjs().add(1, 'day').toDate(),
        status: 'Planned',
      },
      {
        doctor: {
          avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png',
          name: 'Dr. John',
          rating: 5,
          reviews: 128,
          specialization: 'Cardiologist',
        },
        date: dayjs().subtract(1, 'day').toDate(),
        status: 'Planned',
      },
    ],
  },
};
