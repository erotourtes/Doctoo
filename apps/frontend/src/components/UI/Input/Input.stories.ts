import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    label: '',
    placeholder: 'Type your text',
    className: '',
  },
};

// Input to enter the verification code
export const XSInput: Story = {
  args: {
    type: 'text',
    label: '',
    placeholder: '___',
    className: 'w-12 h-12 flex justify-center items-center font-black bg-background',
  },
};

// Input for CVV, expiry date, country code(telephone number)
export const SMInput: Story = {
  args: {
    type: 'text',
    label: 'CVV',
    placeholder: '',
    className: 'w-36 bg-background',
  },
};

// Input for chat search, cardholder name, card number
export const MDInput: Story = {
  args: {
    type: 'text',
    label: 'Cardholder name',
    placeholder: '',
    className: 'w-72 bg-background',
  },
};

export const LGEmailInput: Story = {
  args: {
    type: 'email',
    label: '',
    placeholder: 'Email',
    className: 'w-96 bg-background',
  },
};

export const LGPasswordInput: Story = {
  args: {
    type: 'password',
    label: 'Old Password',
    placeholder: 'Password',
    className: 'w-96 bg-background',
  },
};

// Input for doctor and sympthoms search
export const XLSearchInput: Story = {
  args: {
    type: 'text',
    label: '',
    placeholder: 'Search by doctors, sympthoms',
    className: 'w-96 bg-white',
  },
};
