import type { Meta, StoryObj } from '@storybook/react';
import '@/index.css';
import ScheduleHeader from './ScheduleHeader';

const meta = {
  title: 'Components/UI/Schedule/ScheduleHeader',
  component: ScheduleHeader,
  parameters: {
    layout: 'start',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className='w-[700px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ScheduleHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatar: 'https://via.placeholder.com/112',
    fullName: 'Dr. John Doe',
    // rating: 4.5,
    reviewsCount: 100,
    specialization: 'General Practitioner',
    payrate: 100,
  },
};
