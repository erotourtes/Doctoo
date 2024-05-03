import type { Meta, StoryObj } from '@storybook/react';

import MessageItem from './Message';
import '@/index.css';

const meta = {
  title: 'Pages/Chat/ChatComponents/MessageItem',
  component: MessageItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='bg-background p-10'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sender: 'participant',
    text: 'Hello, how can I assist you today?',
    sentAt: new Date(),
  },
};

export const MessageFromMe: Story = {
  args: {
    sender: 'me',
    text: 'Hi, I need some help with my results.',
    sentAt: new Date(),
  },
};
