import type { Meta, StoryObj } from '@storybook/react';
import MyDoctorCard from './MyDoctorCard';

import '@/index.css';

const meta: Meta<typeof MyDoctorCard> = {
  title: 'pages/MyDoctorsPage/MyDoctorCard',
  component: MyDoctorCard,
  parameters: {},
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    avatarKey: '',
    name: 'Dr. John',
    specializations: [],
    tags: ['Best Doctor'],
    reviewsNumber: 0,
    rating: 3,
    variant: 'withBookButton',
    bookPrice: 150,
    about: 'about doctor',
  },
};
