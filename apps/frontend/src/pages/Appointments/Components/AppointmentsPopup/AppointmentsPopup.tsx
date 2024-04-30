import type { IAppointment } from '@/dataTypes/Appointment';
import PopupBody from './PopupBody';
import PopupHeader from './PopupHeader';
import AppointmentButtons from '../AppointmentsList/ItemButtons';
import AppointmentLinks from '../AppointmentsList/ItemLinks';
import Schedule from '@/components/UI/Schedule/Schedule';
import { useState } from 'react';

type AppointmentPopupProps = { appointment: IAppointment };

export default function AppointmentsPopup({ appointment }: AppointmentPopupProps) {
  const [rescheduleIsOpen, setRescheduleIsOpen] = useState(false);

  function closeReschedule() {
    setRescheduleIsOpen(false);
  }
  function openReschedule() {
    setRescheduleIsOpen(true);
  }

  const { doctor, startedAt, status, videoRecordKey, notes, patientId, doctorId, id } = appointment;
  const { firstName, lastName, avatarKey, payrate, about, rating, reviewsCount } = doctor!;
  const fullName = `Dr. ${firstName} ${lastName}`;

  return (
    <>
      <div className='flex flex-col justify-between gap-y-8'>
        <div className='flex flex-col gap-y-4'>
          <PopupHeader startTime={startedAt} status={status} />
          <PopupBody
            openReschedule={openReschedule}
            fullName={fullName}
            avatarKey={avatarKey}
            doctorId={doctorId}
            rating={rating}
            reviewsCount={reviewsCount}
          />
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-base font-normal text-grey-2'>Attached files:</span>

          <div className='self-end'>
            <AppointmentLinks videoRecordKey={videoRecordKey} notes={notes} />
          </div>
        </div>

        <div className='flex gap-x-4 self-end'>
          <AppointmentButtons componentName='popup' appointment={appointment} openBookModal={openReschedule} />
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
        rescheduling={true}
      />
    </>
  );
}
