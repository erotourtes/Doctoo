import type { Meta, StoryObj } from '@storybook/react';
import '@/index.css';
import type { IChat, IChatDoctor, IChatPatient, IMessage } from '@/dataTypes/Chat';
import { Role } from '@/dataTypes/User';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import ChatBody from './ChatBody';

const mockChat: IChat = {
  id: '1',
  patientId: '1',
  patient: {
    firstName: 'John',
    lastName: 'Doe',
    avatarKey: 'john.doe.png',
  } as IChatPatient,
  doctorId: '2',
  doctor: {
    firstName: 'Jane',
    lastName: 'Doe',
    specializations: ['Pediatrics'],
    avatarKey: 'jane.doe.png',
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
  title: 'Pages/ChatPage/ChatComponents/ChatBody/ChatBody',
  component: ChatBody,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <Provider store={store}>
        <div className='h-[700px] bg-grey-5 p-10'>
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

export const WihoutMessages: Story = {
  args: {
    chat: mockChat,
    chatMessages: [],
    role: Role.PATIENT,
  },
};

export const AsDoctor: Story = {
  args: {
    chat: mockChat,
    chatMessages: mockMessages,
    role: Role.DOCTOR,
  },
};
