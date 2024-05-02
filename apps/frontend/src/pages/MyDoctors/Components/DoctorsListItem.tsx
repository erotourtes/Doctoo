import type { IDoctor } from '@/dataTypes/Doctor';
import { useEffect, useState } from 'react';
import Schedule from '@/components/UI/Schedule/Schedule';
import { DoctorCard } from '@/components/UI';
import type { IAppointment } from '@/dataTypes/Appointment';
import { authorizePatient } from '../../../app/patient/PatientThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

interface DoctorsListItemProps {
  key: string;
  doctor: IDoctor;
  appointments: IAppointment[];
}

const DoctorsListItem = ({ key, doctor }: DoctorsListItemProps) => {
  const [schedulePopupIsOpen, setSchedulePopupIsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const patient = useAppSelector(state => state.patient);

  useEffect(() => {
    dispatch(authorizePatient());
  }, []);

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
            patientId: patient.data.id,
            doctorId: doctor.id,
            doctor: doctor,
          }}
        />
      }
    </>
  );
};

export default DoctorsListItem;
