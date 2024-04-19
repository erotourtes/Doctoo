import '@/index.css';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';
import { ButtonTypes } from './ButtonTypes';

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary button',
    type: ButtonTypes.PRIMARY,
  },
};

export const DisabledPrimary: Story = {
  args: {
    children: 'Disabled primary button',
    type: ButtonTypes.PRIMARY,
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary button',
    type: ButtonTypes.SECONDARY,
  },
};

export const DisabledSecondary: Story = {
  args: {
    children: 'Disabled secondary button',
    type: ButtonTypes.SECONDARY,
    disabled: true,
  },
};
