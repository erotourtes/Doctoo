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
      avatar: {
        name: 'john.doe.png',
        url: 'https://thispersondoesnotexist.com',
      },
    },
    doctorId: '2',
    doctor: {
      firstName: 'Jane',
      lastName: 'Doe',
      specializationName: 'Pediatrics',
      avatar: {
        name: 'jane.doe.png',
        url: 'https://i.pravatar.cc/300',
      },
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
      avatar: {
        name: 'bob.smith.png',
        url: 'https://thispersondoesnotexist.com',
      },
    },
    doctorId: '4',
    doctor: {
      firstName: 'Alice',
      lastName: 'Smith',
      specializationName: 'Pediatrics',
      avatar: {
        name: 'alice.smith.png',
        url: 'https://thispersondoesnotexist.com',
      },
    },
    lastMessage: {
      sender: Role.PATIENT,
      text: 'Hi, I need some help with my results.',
      sentAt: new Date(),
    },
  },
];

const meta = {
  title: 'Pages/Chat/ChatComponents/ChatList',
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
