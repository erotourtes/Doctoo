import type { Meta, StoryObj } from '@storybook/react';
import InputPassword from './InputPassword';

const meta: Meta<typeof InputPassword> = {
  title: 'Components/UI/InputPassword',
  component: InputPassword,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PasswordInput: Story = {
  args: {
    valid: true,
    label: 'Old Password',
    placeholder: 'Password',
    className: 'w-96 bg-background',
  },
};

export const PasswordInputNotValid: Story = {
  args: {
    valid: false,
    label: 'Old Password',
    placeholder: 'Password',
    className: 'w-96 bg-background',
  },
};




