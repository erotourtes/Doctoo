import type { Meta, StoryObj } from '@storybook/react';
import ScheduleSuccessModal from './ScheduleSuccessModal';
import '@/index.css';
import { useArgs } from '@storybook/preview-api';
import { Button } from '../Button/Button';
import dayjs from 'dayjs';

const meta: Meta<typeof ScheduleSuccessModal> = {
  title: 'Components/UI/Schedule/ScheduleSuccessModal',
  component: ScheduleSuccessModal,
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
    popupIsOpen: false,
    closePopup: () => {},
  },
  render: function Render() {
    const [{ popupIsOpen }, updateArgs] = useArgs();

    function closePopup() {
      updateArgs({ popupIsOpen: false });
    }

    function openPopup() {
      updateArgs({ popupIsOpen: true });
    }

    return (
      <>
        <Button type='primary' onClick={openPopup}>
          Open Pop Up
        </Button>
        <ScheduleSuccessModal popupIsOpen={popupIsOpen} closePopup={closePopup} date={dayjs()} />
      </>
    );
  },
};
