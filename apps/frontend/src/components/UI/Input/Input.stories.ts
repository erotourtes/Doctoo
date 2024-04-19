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

export const CVVInput: Story = {
  args: {
    valid: true,
    type: 'text',
    label: 'CVV',
    placeholder: '',
    className: 'w-36 bg-background',
  },
};

export const CVVInputNotValid: Story = {
  args: {
    valid: false,
    type: 'text',
    label: 'CVV',
    placeholder: '',
    className: 'w-36 bg-background',
  },
};

export const CardInput: Story = {
  args: {
    valid: true,
    type: 'text',
    label: 'Cardholder name',
    placeholder: '',
    className: 'w-72 bg-background',
  },
};

export const CardInputNotValid: Story = {
  args: {
    valid: false,
    type: 'text',
    label: 'Cardholder name',
    placeholder: '',
    className: 'w-72 bg-background',
  },
};

export const EmailInput: Story = {
  args: {
    valid: true,
    type: 'email',
    label: 'Email',
    placeholder: 'example@gmail.com',
    className: 'w-96 bg-background',
  },
}

export const EmailInputNotValid: Story = {
  args: {
    valid: false,
    type: 'email',
    label: 'Email',
    placeholder: 'example@gmail.com',
    className: 'w-96 bg-background',
  },
}

export const TextInputValid: Story = {
  args: {
    valid: true,
    type: 'text',
    label: 'text',
    placeholder: 'country',
    className: 'w-96 bg-background',
  },
}

export const TextInputNotValid: Story = {
  args: {
    valid: false,
    type: 'text',
    label: 'text',
    placeholder: 'country',
    className: 'w-96 bg-background',
  },
}

