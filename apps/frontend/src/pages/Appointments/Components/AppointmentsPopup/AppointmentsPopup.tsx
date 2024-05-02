import type { IAppointment } from '@/dataTypes/Appointment';
import PopupBody from './PopupBody';
import PopupHeader from './PopupHeader';
import AppointmentButtons from '../AppointmentsList/ItemButtons';
import AppointmentLinks from '../AppointmentsList/ItemLinks';
import Schedule from '@/components/UI/Schedule/Schedule';
import { useState } from 'react';
import type { IReview } from '@/dataTypes/Review';
import useWindowWide from '@/hooks/useWindowWide';

type AppointmentPopupProps = { appointment: IAppointment; reviews: IReview[] };

export default function AppointmentsPopup({ appointment, reviews }: AppointmentPopupProps) {
  const [rescheduleIsOpen, setRescheduleIsOpen] = useState(false);
  const tabletWidth = useWindowWide(824);
  const mobileWidth = useWindowWide(500);

  function closeReschedule() {
    setRescheduleIsOpen(false);
  }
  function openReschedule() {
    setRescheduleIsOpen(true);
  }

  const { doctor, startedAt, status, videoRecordKey, notes, patientId, doctorId, id } = appointment;

  return (
    <>
      <div className='flex flex-col justify-between gap-y-8'>
        <div className='flex flex-col gap-y-4'>
          <PopupHeader startTime={startedAt} status={status} />
          {doctor && <PopupBody openReschedule={openReschedule} doctorId={doctorId} status={status} doctor={doctor} />}
        </div>

        <div className={`flex items-center ${tabletWidth ? 'justify-between' : 'mt-2 gap-x-2'}`}>
          <span className={`font-normal text-grey-2 `}>Attached files:</span>

          <div className='self-end'>
            <AppointmentLinks videoRecordKey={videoRecordKey} notes={notes} />
          </div>
        </div>

        <div className={`flex gap-x-4 ${mobileWidth ? 'self-end' : 'self-center'}`}>
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
          doctor: doctor!,
          reviews: reviews,
        }}
        rescheduling={true}
      />
    </>
  );
}
