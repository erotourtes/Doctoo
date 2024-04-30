import type { Meta, StoryObj } from '@storybook/react';
import DoctorCard from './DoctorCard';

const meta: Meta<typeof DoctorCard> = {
  title: 'Pages/DashboardPage/Components/DoctorCard',
  component: DoctorCard,
  decorators: [Story => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    doctor: {
      id: '4',
      userId: '2',
      payrate: 180,
      about: 'Specialized in cardiology',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '0966984495',
      email: 'jane.smith@example.com',
      avatarKey: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_15.png',
      specializations: [],
      hospitals: [],
      rating: 4.5,
      reviewsCount: 30,
    },
  },
};

export const WithCostomStyles: Story = {
  args: {
    classNames: 'bg-[#f1f6f9]',
    doctor: {
      id: '4',
      userId: '2',
      payrate: 180,
      about: 'Specialized in cardiology',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '0966984495',
      email: 'jane.smith@example.com',
      avatarKey: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_15.png',
      specializations: [],
      hospitals: [],
      rating: 4.5,
      reviewsCount: 30,
    },
  },
};
