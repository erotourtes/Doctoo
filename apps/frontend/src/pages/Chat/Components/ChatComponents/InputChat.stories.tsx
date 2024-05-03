import type { Meta, StoryObj } from '@storybook/react';

import InputChat from './InputChat';
import '@/index.css';

const meta = {
  title: 'Pages/Chat/ChatComponents/InputChat',
  component: InputChat,
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
} satisfies Meta<typeof InputChat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    inputValue: '',
    handleChange: e => console.log('Input changed: ', e.target.value),
    onSend: () => console.log('Message sent'),
  },
};

export const WithInitialValue: Story = {
  args: {
    inputValue: 'Hello, how can I assist you today?',
    handleChange: e => console.log('Input changed: ', e.target.value),
    onSend: () => console.log('Message sent'),
  },
};
