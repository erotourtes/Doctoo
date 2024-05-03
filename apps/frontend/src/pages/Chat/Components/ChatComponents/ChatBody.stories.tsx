import type { Meta, StoryObj } from '@storybook/react';

import ChatBody from './ChatBody';
import '@/index.css';
import type { IChat, IChatDoctor, IChatPatient, IMessage } from '@/dataTypes/Chat';
import { Role } from '@/dataTypes/User';
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

const mockMessages: IMessage[] = [
  {
    id: '1',
    text: 'Hello, how can I assist you today?',
    sentAt: new Date(),
    sender: Role.DOCTOR,
    editedAt: new Date(),
    chatId: '1',
    attachments: [],
  },
  {
    id: '2',
    text: 'Hi, I need some help with my results.',
    sentAt: new Date(),
    sender: Role.PATIENT,
    editedAt: new Date(),
    chatId: '1',
    attachments: [],
  },
];

const meta = {
  title: 'Pages/Chat/ChatComponents/ChatBody',
  component: ChatBody,
  parameters: {
    layout: 'fullscreen',
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
} satisfies Meta<typeof ChatBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chat: mockChat,
    chatMessages: mockMessages,
    role: Role.PATIENT,
  },
};

export const WithoutChat: Story = {
  args: {
    chat: null,
    chatMessages: [],
  },
};

export const AsDoctor: Story = {
  args: {
    chat: mockChat,
    chatMessages: mockMessages,
    role: Role.DOCTOR,
  },
};
