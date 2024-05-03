import type { Meta, StoryObj } from '@storybook/react';

import ChatHeader from './ChatHeader';
import '@/index.css';
import type { IChatDoctor, IChatPatient } from '@/dataTypes/Chat';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const mockDoctorParticipant: IChatDoctor = {
  firstName: 'Jane',
  lastName: 'Doe',
  specializationName: 'Pediatrics',
  avatar: {
    name: 'jane.doe.png',
    url: 'https://thispersondoesnotexist.com',
  },
};
const mockPatientParticipant: IChatPatient = {
  firstName: 'John',
  lastName: 'Doe',
  avatar: {
    name: 'john.doe.png',
    url: 'https://thispersondoesnotexist.com',
  },
};

const meta = {
  title: 'Pages/Chat/ChatComponents/ChatHeader',
  component: ChatHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <Provider store={store}>
        <div className='bg-grey-5 p-10'>
          <div className='w-[474px] bg-white'>
            <Story />
          </div>
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof ChatHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    participant: mockDoctorParticipant,
  },
};

export const PatientParticipant: Story = {
  args: {
    participant: mockPatientParticipant,
  },
};

export const WhenParticipantEmpty: Story = {
  args: {
    participant: undefined,
  },
};
