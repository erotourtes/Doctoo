import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { PaymentPage } from './PaymentPage';

const meta: Meta<typeof PaymentPage> = {
  title: 'Pages/PaymentPage',
  component: PaymentPage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <BrowserRouter>
      <Provider store={store}>
        <PaymentPage />
      </Provider>
    </BrowserRouter>
  ),
};
