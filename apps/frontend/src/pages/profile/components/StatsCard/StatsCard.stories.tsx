import type { Meta, StoryObj } from '@storybook/react';
import StatsCard from './StatsCard';

const meta: Meta<typeof StatsCard> = {
  title: 'Pages/ProfilePage/StatsCard',
  component: StatsCard,
  decorators: [
    Story => (
      <div className='h-screen bg-background p-8'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Stoty = StoryObj<typeof meta>;

export const Height: Stoty = {
  args: {
    title: 'Height, cm',
    value: '174',
    iconVariant: 'height',
  },
};
