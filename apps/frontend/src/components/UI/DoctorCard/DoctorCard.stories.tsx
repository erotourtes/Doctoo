import type { Meta, StoryObj } from '@storybook/react';
import DoctorCard from './DoctorCard';

const meta: Meta<typeof DoctorCard> = {
  title: 'Components/UI/DoctorCard',
  component: DoctorCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatarUrl: '',
    name: '',
    specialization: '',
    reviews: 0,
    tags: [],
    buttons: [],
    isBookMode: false,
  },
};

export const BookMode: Story = {
  args: {
    avatarUrl: '',
    name: '',
    specialization: '',
    reviews: 0,
    tags: [],
    buttons: [],
    isBookMode: true,
  },
};
