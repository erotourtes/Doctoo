import type { Meta, StoryObj } from '@storybook/react';

import ChatItem from './ChatItem';
import '@/index.css';
import { Role } from '@/dataTypes/User';
import type { IChat, IChatDoctor, IChatPatient } from '@/dataTypes/Chat';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const mockChat: IChat = {
  id: '1',
  patientId: '1',
  patient: {
    firstName: 'John',
    lastName: 'Doe',
    avatar: {
      name: 'john.doe.png',
      url: 'https://thispersondoesnotexist.com',
    },
  } as IChatPatient,
  doctorId: '2',
  doctor: {
    firstName: 'Jane',
    lastName: 'Doe',
    specializationName: 'Pediatrics',
    avatar: {
      name: 'jane.doe.png',
      url: 'https://thispersondoesnotexist.com',
    },
  } as IChatDoctor,
  lastMessage: {
    sender: Role.DOCTOR,
    text: 'Hello, how can I assist you today?',
    sentAt: new Date(),
  },
};

const meta = {
  title: 'Pages/Chat/ChatComponents/ChatItem',
  component: ChatItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <Provider store={store}>
        <div className='bg-grey-5 p-10'>
          <Story />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof ChatItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chat: mockChat,
    active: false,
  },
};

export const Active: Story = {
  args: {
    chat: mockChat,
    active: true,
  },
  parameters: {
    user: {
      role: Role.DOCTOR,
    },
  },
};
