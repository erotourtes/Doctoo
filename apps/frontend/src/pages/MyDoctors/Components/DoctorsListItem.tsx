import type { IDoctor } from '@/dataTypes/Doctor';
import Schedule from '@/components/UI/Schedule/Schedule';
import { DoctorCard } from '@/components/UI';
import type { IAppointment } from '@/dataTypes/Appointment';
import { useAppSelector } from '../../../app/hooks';
import { useState } from 'react';

interface DoctorsListItemProps {
  key: string;
  doctor: IDoctor;
  appointments: IAppointment[];
}

const DoctorsListItem = ({ key, doctor }: DoctorsListItemProps) => {
  const [schedulePopupIsOpen, setSchedulePopupIsOpen] = useState(false);

  const patient = useAppSelector(state => state.patient);

  function closeSchedulePopup() {
    setSchedulePopupIsOpen(false);
  }
  function openSchedulePopup() {
    setSchedulePopupIsOpen(true);
  }

  const patient = useAppSelector(state => state.patient.data);

  const fullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;

  return (
    <>
      <div key={key}>
        <DoctorCard>
          <DoctorCard.Image url={doctor.avatarKey} />
          <DoctorCard.Name>{fullName}</DoctorCard.Name>
          <DoctorCard.Specializations specializations={doctor.specializations ? doctor.specializations : []} />
          <DoctorCard.Tags tags={[]} />
          <DoctorCard.Rating rating={doctor.rating} reviewsCount={doctor.reviewsCount} />
          <DoctorCard.BookButton onClick={() => openSchedulePopup()} />
        </DoctorCard>
      </div>

      {
        <Schedule
          closePopup={closeSchedulePopup}
          scheduleIsOpen={schedulePopupIsOpen}
          scheduleInfo={{
            patientId: patient.id,
            doctorId: doctor.id,
            doctor: doctor,
          }}
        />
      }
    </>
  );
};

export default DoctorsListItem;
