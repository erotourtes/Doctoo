import '@/index.css';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Icon from './Icon';

const meta = {
  title: 'Components/Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'account',
    className: 'text-grey-1 size-10',
  },
};
