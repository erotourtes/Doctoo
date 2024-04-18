import type { Meta, StoryObj } from '@storybook/react';

import CalendarPage from './CalendarPage';
import '@/index.css';

const meta: Meta<typeof CalendarPage> = {
  title: 'Pages/CalendarPage',
  component: CalendarPage,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function () {
    return (
      <div className='bg-background h-screen w-screen py-12'>
        <CalendarPage />;
      </div>
    );
  },
};
