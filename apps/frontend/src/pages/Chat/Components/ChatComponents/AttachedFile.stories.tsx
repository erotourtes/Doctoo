import type { Meta, StoryObj } from '@storybook/react';

import AttachedFile from './AttachedFile';
import '@/index.css';

const meta = {
  title: 'Pages/Chat/ChatComponents/AttachedFile',
  component: AttachedFile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='max-w-80 bg-background p-10'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AttachedFile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileName: 'Results_James_Anderson.pdf',
  },
};

export const LongFileName: Story = {
  args: {
    fileName: 'Very_long_file_name_that_should_break_to_the_next_line.pdf',
  },
};
