import CalendarPopupBtns from './CalendarPopupBtns';
import { PopupDoctoo } from '@/components/UI';
import type { IAppointment } from '@/dataTypes/Appointment';
import type { IDoctor } from '@/dataTypes/Doctor';
import CalendarPopupHeader from './CalendarPopupHeader';
import CalendarPopupBody from './CalendarPopupBody';
import Schedule from '@/components/UI/Schedule/Schedule';
import { useState } from 'react';

type AppointmentPopupProps = {
  appointmentModal: boolean;
  closeModal: () => void;
  selectedAppointment: IAppointment;
};

export default function AppointmentPopup({ appointmentModal, closeModal, selectedAppointment }: AppointmentPopupProps) {
  const [rescheduleIsOpen, setRescheduleIsOpen] = useState(false);
  const [bookAgainIsOpen, setBookAgainIsOpen] = useState(false);
  const [bookMode, setBookMode] = useState({
    book: false,
    reschedule: false,
  });

  function closeReschedule() {
    setRescheduleIsOpen(false);
  }

  function openReschedule() {
    setBookMode({ book: false, reschedule: true });
    setRescheduleIsOpen(true);
  }

  function openBookAgain() {
    setBookMode({ book: true, reschedule: false });
    setBookAgainIsOpen(true);
  }

  function closeBookAgain() {
    setBookAgainIsOpen(false);
  }

  const { startedAt, status, doctorId, patientId, id } = selectedAppointment;

  const doctor = selectedAppointment.doctor;
  const { avatarKey, firstName, lastName, reviewsCount, rating, about, payrate } = doctor as IDoctor;
  const fullName = `Dr. ${firstName} ${lastName}`;

  return (
    selectedAppointment && (
      <>
        <PopupDoctoo
          popupIsOpen={appointmentModal}
          closePopup={closeModal}
          modalFullClassName='max-w-[700px]'
          modalBodyClassName='flex max-w-[604px] flex-col gap-y-8'
        >
          <div>
            <CalendarPopupHeader startTime={startedAt} status={status} />

            <CalendarPopupBody
              fullName={fullName}
              avatarKey={avatarKey}
              openReschedule={openReschedule}
              doctorId={doctorId}
              rating={rating}
              reviewsCount={reviewsCount}
              status={status}
            />
          </div>

          <CalendarPopupBtns openBookModal={openBookAgain} appointmentId={id} />
        </PopupDoctoo>

        <Schedule
          closePopup={bookMode.reschedule ? closeReschedule : closeBookAgain}
          scheduleIsOpen={bookMode.reschedule ? rescheduleIsOpen : bookAgainIsOpen}
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
          rescheduling={bookMode.reschedule}
        />
      </>
    )
  );
}
