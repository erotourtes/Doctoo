import type { Meta, StoryObj } from '@storybook/react';
import Tag from './Tag'
import '@/index.css';

const meta = {
  component: Tag,
  title: "Components/UI/Tag",
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>

export default meta

type Story = StoryObj<typeof meta>

export const Icon: Story = {
  args: {
    icon: true,
    text: "tag"
  }
}

export const NoIcon: Story = {
  args: {
    icon: false,
    text: "tag"
  }
}


