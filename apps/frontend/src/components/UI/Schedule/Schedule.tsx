import type { Dayjs } from 'dayjs';
import PopupDoctoo from '../Popup/Popup';
import ScheduleAbout from './ScheduleAbout';
import ScheduleBook from './ScheduleBook';
import ScheduleHeader from './ScheduleHeader';
import ScheduleTestimonials from './ScheduleTestimonials';
import dayjs from 'dayjs';
import ScheduleSuccessModal from './ScheduleSuccessModal';
import { useState } from 'react';

type ScheduleProps = {
  closePopup: () => void;
  scheduleIsOpen: boolean;
  scheduleInfo: {
    patientId: string;
    doctorId: string;
    doctorFirstName: string;
    doctorLastName: string;
    payrate: number;
    avatarKey: string;
    about: string;
    rating: number;
    reviewsCount: number;
    appointmentId?: string;
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
  const { doctorFirstName, doctorLastName, payrate, avatarKey, about, doctorId, patientId, appointmentId } =
    scheduleInfo;
  const doctorFullName = `Dr. ${doctorFirstName} ${doctorLastName}`;
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
          // rating={4.5}
          reviewsCount={128}
          specialization='Specialization'
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

        <ScheduleTestimonials
          review='Dr Alexander was great! Very knowledgeable about my concerns! Full of helpful information and suggestions! My experience was awesome!'
          patientName='Patient Name'
        />
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
