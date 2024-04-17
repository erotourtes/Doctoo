import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'ui/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const xs: Story = {
  args: {
    type: 'number',
    label: '',
    placeholder: '-',
    className: 'w-12 bg-gray-100',
  },
};

export const sm: Story = {
  args: {
    type: 'text',
    label: 'CVV',
    placeholder: '',
    className: 'w-36 bg-gray-100',
  },
};

export const md: Story = {
  args: {
    type: 'text',
    label: 'Cardholder name',
    placeholder: '',
    className: 'w-72 bg-gray-100',
  },
};

export const lgSearch: Story = {
  args: {
    type: 'text',
    label: '',
    placeholder: 'Search',
    className: 'w-96 bg-gray-100',
  },
};

export const lgPassword: Story = {
  args: {
    type: 'text',
    label: 'Old Password',
    placeholder: 'Password',
    className: 'w-96 bg-gray-100',
  },
};

export const xl: Story = {
  args: {
    type: 'text',
    label: '',
    placeholder: 'Search by doctors, sympthoms',
    className: 'w-96 bg-white',
  },
};
