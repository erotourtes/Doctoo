import type { IAppointment } from '@/dataTypes/Appointment';
import Icon from '@/components/UI/Icon/Icon';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import AppointmentBadges from './ItemBadges';
import AppointmentButtons from './ItemButtons';
import AppointmentLinks from './ItemLinks';

dayjs.extend(utc);

type AppointmentsListItemProps = { appointment: IAppointment; openModal: () => void };

export default function AppointmentsListItem({ appointment, openModal }: AppointmentsListItemProps) {
  const { doctor, videoRecordKey, notes, status, paymentInvoiceKey, paymentReceiptKey } = appointment;
  const { firstName, lastName } = doctor;
  const fullName = `Dr. ${firstName} ${lastName}`;

  return (
    <div
      className='flex max-w-[700px] flex-1 cursor-pointer justify-between rounded-xl bg-white p-6 hover:ring-1 hover:ring-main'
      onClick={openModal}
    >
      <div>
        <div className='flex flex-col gap-y-2'>
          <div className='flex gap-x-2'>
            <Icon variant='date' className='h-6 w-6 text-main' />
            <span className='text-lg font-semibold leading-6 text-black'>
              {dayjs(appointment.assignedAt).utc().format('MMM D, h:mm a')}
            </span>
          </div>

          <span className='text-base font-medium text-black'>{fullName} (placeholder)</span>
        </div>

        <div className='flex gap-x-3 gap-y-4'>
          <AppointmentBadges
            paymentReceiptKey={paymentReceiptKey}
            paymentInvoiceKey={paymentInvoiceKey}
            status={status}
          />
        </div>

        <span className='text-base font-normal text-grey-2'>Attached files:</span>
      </div>

      <div className='flex flex-col justify-between'>
        <div className='flex flex-col gap-x-2 self-end'>
          <AppointmentButtons status={status} />
        </div>

        <div className='self-end'>
          <AppointmentLinks videoRecordKey={videoRecordKey} notes={notes} />
        </div>
      </div>
    </div>
  );
}
