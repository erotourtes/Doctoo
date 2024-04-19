import type { Meta, StoryObj } from '@storybook/react';
import Popup from './Popup';
import '@/index.css';

const meta: Meta<typeof Popup> = {
  title: 'Components/UI/Popup',
  component: Popup,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className='flex h-screen w-screen overflow-hidden bg-background'>
        <main className='main-wrapper flex h-full w-full flex-col gap-6 overflow-auto p-8'>
          <Story />
        </main>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    popupIsOpen: true,
    closePopup: () => console.log('Modal closed'),
  },
};
