import type { Meta, StoryObj } from '@storybook/react';

import ChatList from './ChatList';
import '@/index.css';
import type { IChat } from '@/dataTypes/Chat';
import { Role } from '@/dataTypes/User';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { BrowserRouter } from 'react-router-dom';

const mockChats: IChat[] = [
  {
    id: '1',
    patientId: '1',
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      avatarKey: 'john.doe.png',
    },
    doctorId: '2',
    doctor: {
      firstName: 'Jane',
      lastName: 'Doe',
      specializations: ['Pediatrics'],
      avatarKey: 'jane.doe.png',
    },
    lastMessage: {
      sender: Role.PATIENT,
      text: 'Hello, how can I assist you today?',
      sentAt: new Date(),
    },
  },
  {
    id: '2',
    patientId: '3',
    patient: {
      firstName: 'Bob',
      lastName: 'Smith',
      avatarKey: 'bob.smith.png',
    },
    doctorId: '4',
    doctor: {
      firstName: 'Alice',
      lastName: 'Smith',
      specializations: ['Pediatrics'],
      avatarKey: 'alice.smith.png',
    },
    lastMessage: {
      sender: Role.PATIENT,
      text: 'Hi, I need some help with my results.',
      sentAt: new Date(),
    },
  },
];

const meta = {
  title: 'Pages/ChatPage/ChatComponents/ChatList/ChatList',
  component: ChatList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <Provider store={store}>
        <BrowserRouter>
          <div className='bg-grey-5 p-10'>
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
} satisfies Meta<typeof ChatList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chats: mockChats,
  },
};

export const Empty: Story = {
  args: {
    chats: [],
  },
};
