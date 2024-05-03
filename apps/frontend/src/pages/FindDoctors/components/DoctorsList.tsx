import { useEffect, useState } from 'react';
import { DoctorCard } from '../../../components/UI';
import Schedule from '../../../components/UI/Schedule/Schedule';
import type { ScheduleProps } from '../../../components/UI/Schedule/Schedule';
import type { IDoctor } from '../../../dataTypes/Doctor';
import { NoResults } from './NoResults';
import { fetchReviewsByDoctor } from '../../../app/review/ReviewThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { generateDoctorTags } from '../../../utils/generateDoctorTags';
import { generateTimeSlots } from '../../../utils/timeSlots';

type DoctorsListProps = {
  doctors: IDoctor[];
};

export const DoctorsList = ({ doctors }: DoctorsListProps) => {
  const patient = useAppSelector(state => state.patient.data);
  const dispatch = useAppDispatch();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleModalData, setScheduleModalData] = useState<ScheduleProps['scheduleInfo']>({
    doctor: null,
    doctorId: null,
    patientId: patient.id,
    reviews: [],
  });
  const reviews = useAppSelector(state => state.review.reviews);

  useEffect(() => {
    dispatch(
      fetchReviewsByDoctor({ doctorId: scheduleModalData.doctorId!, take: '2', skip: '0', includeNames: 'true' }),
    );
    setScheduleModalData(prev => ({ ...prev, reviews }));
  }, [scheduleModalData.doctorId]);
  return (
    <div className='mt-2 w-full'>
      {doctors.length ? (
        doctors.map(doctor => (
          <>
            <DoctorCard key={doctor.id} className='my-4'>
              <DoctorCard.ImageWithFavorite
                isFavorite={doctor.isFavorite!}
                url={doctor.avatarKey}
                doctorId={doctor.id}
              />
              <DoctorCard.Name>
                {doctor.firstName} {doctor.lastName}
              </DoctorCard.Name>
              <DoctorCard.Specializations specializations={doctor.specializations} />
              <DoctorCard.Tags tags={generateDoctorTags({ schedule: doctor.schedule, rating: doctor.rating })} />
              <DoctorCard.Rating rating={doctor.rating} reviewsCount={doctor.reviewsCount} />
              <DoctorCard.PayrateLabel payrate={doctor.payrate} />
              <DoctorCard.TimeSlots
                timestamps={generateTimeSlots(doctor.schedule!)}
                onClickMore={() => {
                  setScheduleModalData(prev => ({
                    ...prev,
                    doctor,
                    doctorId: doctor.id,
                  }));
                  setScheduleModalOpen(true);
                }}
                onClickSlot={() => {
                  setScheduleModalData(prev => ({
                    ...prev,
                    doctor,
                    doctorId: doctor.id,
                  }));
                  setScheduleModalOpen(true);
                }}
              />
            </DoctorCard>
          </>
        ))
      ) : (
        <NoResults />
      )}
      <Schedule
        scheduleIsOpen={scheduleModalOpen}
        closePopup={() => setScheduleModalOpen(false)}
        rescheduling={false}
        scheduleInfo={scheduleModalData}
      />
    </div>
  );
};