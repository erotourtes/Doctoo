import type { IAppointment } from '@/dataTypes/Appointment';
import Icon from '@/components/UI/Icon/Icon';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import AppointmentBadges from './ItemBadges';
import AppointmentButtons from './ItemButtons';
import AppointmentLinks from './ItemLinks';
import { useState } from 'react';
import Schedule from '@/components/UI/Schedule/Schedule';

dayjs.extend(utc);

type AppointmentsListItemProps = { appointment: IAppointment; openModal: (appointment: IAppointment) => void };

export default function AppointmentsListItem({ appointment, openModal }: AppointmentsListItemProps) {
  const [rescheduleIsOpen, setRescheduleIsOpen] = useState(false);

  function closeReschedule() {
    setRescheduleIsOpen(false);
  }

  function openReschedule() {
    setRescheduleIsOpen(true);
  }

  const { patientId, doctorId, doctor, videoRecordKey, notes, status, paymentReceiptKey, id, startedAt } = appointment;
  const { firstName, lastName, about, avatarKey, payrate, specializations } = doctor!;
  const fullName = `Dr. ${firstName} ${lastName}`;

  return (
    <>
      <div
        className='flex max-w-[700px] flex-1 cursor-pointer justify-between rounded-xl bg-white p-6 hover:ring-1 hover:ring-main'
        onClick={() => openModal(appointment)}
      >
        <div>
          <div className='flex flex-col gap-y-2'>
            <div className='flex gap-x-2'>
              <Icon variant='date' className='h-6 w-6 text-main' />
              <span className='text-lg font-semibold leading-6 text-black'>
                {dayjs.utc(startedAt, 'H:mm').format('MMMM D, h:mm a')}
              </span>
            </div>

            <span className='text-base font-medium text-black'>
              {fullName} ({specializations[0].name})
            </span>
          </div>

          <div className='flex gap-x-3 gap-y-4'>
            <AppointmentBadges paymentReceiptKey={paymentReceiptKey} status={status} />
          </div>

          <span className='text-base font-normal text-grey-2'>Attached files:</span>
        </div>

        <div className='flex flex-col justify-between'>
          <div className='flex w-[140px] flex-col gap-x-2 gap-y-4 self-end'>
            <AppointmentButtons componentName='listItem' appointment={appointment} openBookModal={openReschedule} />
          </div>

          <div className='self-end'>
            <AppointmentLinks videoRecordKey={videoRecordKey} notes={notes} />
          </div>
        </div>
      </div>

      <Schedule
        closePopup={closeReschedule}
        scheduleIsOpen={rescheduleIsOpen}
        scheduleInfo={{
          patientId: patientId,
          doctorId: doctorId,
          appointmentId: id,
          doctorFirstName: firstName,
          doctorLastName: lastName,
          payrate: payrate,
          avatarKey: avatarKey,
          about: about,
          rating: 5,
          reviewsCount: 128,
        }}
      />
    </>
  );
}
