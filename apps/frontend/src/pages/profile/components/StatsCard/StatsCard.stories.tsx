import type { Meta, StoryObj } from '@storybook/react';
import StatsCard from './StatsCard';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const meta: Meta<typeof StatsCard> = {
  title: 'Pages/ProfilePage/StatsCard',
  component: StatsCard,
  decorators: [
    Story => (
      <div className='h-screen bg-background p-8'>
        <Provider store={store}>
          <Story />
        </Provider>
      </div>
    ),
  ],
};

export default meta;

type Stoty = StoryObj<typeof meta>;

export const Height: Stoty = {
  render: () => <StatsCard title='Height,cm' value='174' iconVariant='height' variant='input' />,
};
