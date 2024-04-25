import type { Meta, StoryObj } from '@storybook/react';
import '@/index.css';
import ScheduleBook from './ScheduleBook';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';
import { getAppointmentsByPatientId } from '@/app/appointment/AppointmentThunks';

const meta = {
  title: 'Components/UI/Schedule/ScheduleBook',
  component: ScheduleBook,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <Provider store={store}>
        <div className='flex h-screen w-[700px] p-12'>
          <Story />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof ScheduleBook>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    doctorId: '3',
    patientId: '7',
    closePopup: () => {},
  },
  render: function Render() {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getAppointmentsByPatientId('7'));
    }, [dispatch]);

    return <ScheduleBook doctorId='3' patientId='7' closePopup={() => {}} />;
  },
};
