import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';
import '@/index.css';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Checkbox',
  },
};

export const Disabled: Story = {
  args: {
    text: 'Checkbox',
    disabled: true,
  },
};
