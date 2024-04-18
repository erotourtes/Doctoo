import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import '@/index.css';
import PageHeader from './PageHeader';
import { Button } from '@/components/UI/Button/Button';
import Icon from '@/components/icons/Icon';
import { ButtonTypes } from '@/components/UI/Button/ButtonTypes';

const meta = {
  title: 'Components/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'start',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full p-8">
        <Story />
      </div>
    ),
  ]
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconVariant: 'dashboard',
    title: 'Dashboard'
  },
  render: (args) => (
    <PageHeader {...args}>
      <Button type={ButtonTypes.PRIMARY} onClick={() => {}}>Test</Button>
      <Button type={ButtonTypes.SECONDARY} onClick={() => {}}>Test</Button>
    </PageHeader>
  ),
};
