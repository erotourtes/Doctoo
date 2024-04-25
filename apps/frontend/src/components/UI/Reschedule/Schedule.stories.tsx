import type { Meta, StoryObj } from '@storybook/react';
import '@/index.css';
import Schedule from './Schedule';
import { useArgs } from '@storybook/preview-api';
import { Button } from '../Button/Button';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';
import { getAppointmentsByPatientId } from '@/app/appointment/AppointmentThunks';

const meta = {
  title: 'Components/UI/Schedule/Schedule',
  component: Schedule,
  parameters: {
    layout: 'start',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <div className='flex h-screen w-screen overflow-hidden bg-background'>
        <Provider store={store}>
          <Story />
        </Provider>
      </div>
    ),
  ],
} satisfies Meta<typeof Schedule>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scheduleInfo: {
      doctorFirstName: 'John',
      doctorLastName: 'Doe',
      payrate: 100,
      avatarKey: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png',
      about:
        'It is important to have a doctor who is interested in your long-term health and happiness. My hope is that every person I talk to feels that I am interested in them personally and want to do all that I can to help them feel better now, and provide suggestions for ongoing wellness. My advice to everyone? Laugh at least once a day… humor is truly the best medicine!',
      doctorId: '3',
      patientId: '7',
      rating: 4,
      reviewsCount: 80,
    },
    scheduleIsOpen: true,
    closePopup: () => {},
  },

  render: function Render({ scheduleInfo }) {
    const [{ scheduleIsOpen }, updateArgs] = useArgs();
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getAppointmentsByPatientId('7'));
    }, [dispatch]);

    function closePopup() {
      updateArgs({ scheduleIsOpen: false });
    }

    function openPopup() {
      updateArgs({ scheduleIsOpen: true });
    }

    return (
      <>
        <Button type='primary' onClick={openPopup}>
          Open Schedule Modal
        </Button>
        <Schedule scheduleInfo={scheduleInfo} scheduleIsOpen={scheduleIsOpen} closePopup={closePopup} />
      </>
    );
  },
};
