import type { Meta, StoryObj } from '@storybook/react';
import Settings from './settingsPage';
import { fn } from '@storybook/test';
const meta = {
  title: 'Example/Settings',
  component: Settings,
  
  args: {
    onClick: fn()
  },
} satisfies Meta<typeof Settings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};