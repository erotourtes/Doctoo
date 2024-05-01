import type { Dayjs } from 'dayjs';
import PopupDoctoo from '../Popup/Popup';
import ScheduleAbout from './ScheduleAbout';
import ScheduleBook from './ScheduleBook';
import ScheduleHeader from './ScheduleHeader';
import ScheduleTestimonials from './ScheduleTestimonials';
import dayjs from 'dayjs';
import ScheduleSuccessModal from './ScheduleSuccessModal';
import { useState } from 'react';
import type { IDoctor } from '@/dataTypes/Doctor';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { IReview } from '@/dataTypes/Review';
import { useEffect } from 'react';
import { fetchReviewsByDoctor } from '@/app/review/ReviewThunks';

type ScheduleProps = {
  closePopup: () => void;
  scheduleIsOpen: boolean;
  scheduleInfo: {
    patientId: string;
    appointmentId?: string;
    doctorId: string;
    doctor: IDoctor;
  };
  currentDay?: Dayjs;
  rescheduling?: boolean;
};

export default function Schedule({
  scheduleInfo,
  closePopup,
  scheduleIsOpen,
  currentDay = dayjs(),
  rescheduling,
}: ScheduleProps) {
  const { doctorId, patientId, appointmentId, doctor } = scheduleInfo;
  const { avatarKey, firstName, lastName, payrate, rating, reviewsCount, about, specializations } = doctor;

  const doctorFullName = `Dr. ${firstName} ${lastName}`;

  const dispatch = useAppDispatch();
  const reviews = useAppSelector(state => state.review.reviews).filter(
    (review: IReview) => review.doctorId === doctorId,
  );

  useEffect(() => {
    if (!doctorId) return;

    dispatch(fetchReviewsByDoctor({ doctorId, includeNames: 'true', skip: '0', take: '2' }));
  }, [doctorId, dispatch]);

  const [appointmentSelectedDate, setAppointmentSelectedDate] = useState<Dayjs | undefined>(undefined);
  const [successfullModal, setSuccessfullModal] = useState(false);

  function openSuccessulModal() {
    setSuccessfullModal(true);
  }

  return (
    <>
      <PopupDoctoo
        popupIsOpen={scheduleIsOpen}
        closePopup={closePopup}
        modalBodyClassName='flex flex-col gap-y-6'
        modalFullClassName='p-8 max-w-[700px] max-h-[700px] overflow-y-auto'
      >
        <ScheduleHeader
          fullName={doctorFullName}
          avatar={avatarKey}
          payrate={payrate}
          rating={rating}
          reviewsCount={reviewsCount}
          doctorId={doctorId}
          specialization={specializations && specializations[0].name}
        />

        <ScheduleBook
          currentDay={currentDay}
          doctorId={doctorId}
          patientId={patientId}
          closePopup={closePopup}
          appointmentId={appointmentId}
          rescheduling={rescheduling}
          openSuccessulModal={openSuccessulModal}
          setAppointmentSelectedDate={setAppointmentSelectedDate}
        />

        <ScheduleAbout about={about} />

        <ScheduleTestimonials reviews={reviews} doctorId={doctorId} />
      </PopupDoctoo>

      {appointmentSelectedDate && (
        <ScheduleSuccessModal
          popupIsOpen={successfullModal}
          closePopup={() => setSuccessfullModal(false)}
          date={appointmentSelectedDate}
        />
      )}
    </>
  );
}
