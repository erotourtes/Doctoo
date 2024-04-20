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
    avatarUrl: 'https://picsum.photos/id/237/512/512',
    name: 'Doctor Name',
    specialization: 'Dentist',
    reviews: 15,
    tags: ['Best doctor', 'Available'],
    buttons: ['1:00 pm', '2:00 pm', '3:00 pm'],
    isBookMode: false,
    payrate: 60,
    className: '',
  },
};

export const BookMode: Story = {
  args: {
    avatarUrl: 'https://picsum.photos/id/237/512/512',
    name: 'Doctor Name',
    specialization: 'Dentist',
    reviews: 15,
    tags: ['Best doctor', 'Available'],
    buttons: ['1:00 pm', '2:00 pm', '3:00 pm'],
    isBookMode: true,
    payrate: 60,
    className: '',
  },
};
