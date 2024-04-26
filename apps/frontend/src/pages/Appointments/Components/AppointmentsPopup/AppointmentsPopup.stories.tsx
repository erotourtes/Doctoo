import type { Meta, StoryObj } from '@storybook/react';
import AppointmentsPopup from './AppointmentsPopup';
import '@/index.css';
import { Button } from '@/components/UI';
import { useArgs } from '@storybook/preview-api';
import { PopupDoctoo } from '@/components/UI';
import { AppointmentStatus } from '@/dataTypes/Appointment';

const meta: Meta<typeof AppointmentsPopup> = {
  title: 'Pages/AppointmentsPage/AppointmentsPopup',
  component: AppointmentsPopup,
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
    appointment: {
      id: '1',
      doctorId: 'doc1',
      patientId: 'pat1',
      assignedAt: '2022-12-01T10:00:00.000Z',
      notes: 'This is a mock appointment',
      status: AppointmentStatus.PLANNED,
      appointmentDuration: 60,
      videoRecordKey: 'video1',
      paymentInvoiceKey: 'invoice1',
      paymentReceiptKey: 'receipt1',
      doctor: {
        id: 'doc1',
        userId: 'user1',
        payrate: 100.0,
        about: 'This is a mock doctor',
        firstName: 'Mocking',
        lastName: 'Mock',
        avatarKey: 'https://i.pravatar.cc/300',
        email: 'dr.mock@example.com',
        phone: '+1234567890',
        specializations: [
          {
            id: 'spec1',
            name: 'Specialization1',
          },
        ],
        hospitals: [
          {
            name: 'Mock Hospital',
            country: 'Mockland',
            state: 'Mock State',
            city: 'Mock City',
            street: '123 Mock Street',
            apartment: '1A',
            zipCode: 12345,
          },
        ],
      },
    },
  },
  render: function Render({ appointment }) {
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

        <PopupDoctoo
          popupIsOpen={popupIsOpen}
          closePopup={closePopup}
          modalBodyClassName={''}
          modalFullClassName='max-w-[700px]'
        >
          <AppointmentsPopup appointment={appointment} />
        </PopupDoctoo>
      </>
    );
  },
};
