import type { Meta, StoryObj } from '@storybook/react';

import AttachedFiles from './AttachedFiles';
import '@/index.css';
import { BrowserRouter } from 'react-router-dom';
import type { IAttachment } from '@/dataTypes/Chat';
import { fn } from '@storybook/test';
import { Icon } from '@/components/UI';

const mockAttachments: IAttachment[] = [
  {
    id: '1',
    messageId: 'msg1',
    attachmentKey: 'file1.pdf',
  },
  {
    id: '2',
    messageId: 'msg1',
    attachmentKey: 'file2.docx',
  },
  // Add more mock data as needed
];

const meta = {
  title: 'Pages/ChatPage/ChatComponents/AttachedFiles/AttachedFiles',
  component: AttachedFiles,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <BrowserRouter>
        <div className='max-w-80 bg-grey-4 p-10'>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof AttachedFiles>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chatAttachedFiles: mockAttachments,
  },
};

export const WithBeforeChildren: Story = {
  args: {
    chatAttachedFiles: mockAttachments,
    beforeChildren: (
      <button type='button' onClick={fn}>
        <Icon variant='arrow-right' className='size-10 rotate-180 text-grey-1 transition-all hover:text-dark-grey' />
      </button>
    ),
  },
};
