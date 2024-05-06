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

  const patient = useAppSelector(state => state.patient.data);

  function closeSchedulePopup() {
    setSchedulePopupIsOpen(false);
  }
  function openSchedulePopup() {
    setSchedulePopupIsOpen(true);
  }

  const fullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;

  return (
    <>
      <div key={key}>
        <DoctorCard>
          <DoctorCard.Image url={doctor.avatarKey} className='min-h-[70]' />
          <DoctorCard.Name>{fullName}</DoctorCard.Name>
          <DoctorCard.Specializations
            specializations={doctor.specializations ? doctor.specializations : []}
            className='overflow-hidden text-ellipsis'
          />
          <DoctorCard.Tags tags={[]} />
          <DoctorCard.Rating rating={doctor.rating} reviewsCount={doctor.reviewsCount} doctorId={doctor.id} />
          <DoctorCard.BookButton onClick={() => openSchedulePopup()} className='min-width-auto!' />
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
            reviews: [],
          }}
        />
      }
    </>
  );
};

export default DoctorsListItem;
