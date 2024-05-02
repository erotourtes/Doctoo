import type { IAppointment } from '@/dataTypes/Appointment';
import Icon from '@/components/UI/Icon/Icon';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import AppointmentBadges from './ItemBadges';
import AppointmentButtons from './ItemButtons';
import AppointmentLinks from './ItemLinks';
import { useState } from 'react';
import Schedule from '@/components/UI/Schedule/Schedule';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchReviewsByDoctor } from '@/app/review/ReviewThunks';

dayjs.extend(utc);

type AppointmentsListItemProps = { appointment: IAppointment; openModal: (appointment: IAppointment) => void };

export default function AppointmentsListItem({ appointment, openModal }: AppointmentsListItemProps) {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(state => state.review.reviews);

  const [bookModalIsOpen, setBookModal] = useState(false);

  function closeBookModal() {
    setBookModal(false);
  }

  function openBookModal() {
    dispatch(fetchReviewsByDoctor({ doctorId: appointment.doctorId, includeNames: 'true', skip: '0', take: '2' }));
    setBookModal(true);
  }

  const { patientId, doctorId, doctor, videoRecordKey, notes, status, paymentReceiptKey, id, startedAt } = appointment;
  const { firstName, lastName, specializations } = doctor!;
  const fullName = `Dr. ${firstName} ${lastName}`;

  const firstSpecializationName = specializations.length > 0 ? specializations[0].name : 'Doctor';

  return (
    <>
      <div
        className='flex flex-1 cursor-pointer flex-col justify-between gap-4 rounded-xl bg-white p-2 hover:ring-1 hover:ring-main sm:p-6'
        onClick={() => openModal(appointment)}
      >
        <div className='flex flex-wrap items-start justify-between gap-2'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex gap-x-2'>
              <Icon variant='date' className='h-6 w-6 text-main' />
              <span className='text-lg font-semibold leading-6 text-black'>
                {dayjs.utc(startedAt, 'H:mm').format('MMMM D, h:mm a')}
              </span>
            </div>
            <p className='text-base font-medium text-black'>
              {fullName} ({firstSpecializationName})
            </p>
            <div className='flex gap-x-3 gap-y-4'>
              <AppointmentBadges paymentReceiptKey={paymentReceiptKey} status={status} />
            </div>
          </div>

          <div className='flex flex-col justify-between'>
            <div className='flex w-[140px] flex-col gap-x-2 gap-y-4 self-end'>
              <AppointmentButtons componentName='listItem' appointment={appointment} openBookModal={openReschedule} />
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-between'>
          <div className='flex w-[140px] flex-col gap-x-2 gap-y-4 self-end'>
            <AppointmentButtons componentName='listItem' appointment={appointment} openBookModal={openBookModal} />
          </div>

          <div className='self-end'>
            <AppointmentLinks videoRecordKey={videoRecordKey} notes={notes} />
          </div>
        <div className='flex flex-wrap items-center justify-between gap-4'>
          <p className='text-base font-normal text-grey-2'>Attached files:</p>
          <AppointmentLinks videoRecordKey={videoRecordKey} notes={notes} />
        </div>
      </div>

      <Schedule
        closePopup={closeBookModal}
        scheduleIsOpen={bookModalIsOpen}
        scheduleInfo={{
          patientId: patientId,
          doctorId: doctorId,
          appointmentId: id,
          doctor: doctor!,
          reviews: reviews,
        }}
      />
    </>
  );
}
