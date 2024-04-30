import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ReviewsHeader from './ReviewsHeader';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { fetchReviewsByDoctor } from '@/app/review/ReviewThunks';
import { getDoctorData } from '@/app/doctor/DoctorThunks';
import Schedule from '@/components/UI/Schedule/Schedule';
import ReviewsBody from './ReviewsBody';
import ReviewsPagination from './ReviewsPagination';
import { IDoctor } from '@/dataTypes/Doctor';
import { IReview } from '@/dataTypes/Review';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ReviewsPage() {
  const dispatch = useAppDispatch();
  const doctorId = useQuery().get('doctorId');

  const doctor = useAppSelector(state => state.doctor.doctors).find((doctor: IDoctor) => doctor.id === doctorId);
  const reviews = useAppSelector(state => state.review.reviews).filter(
    (review: IReview) => review.doctorId === doctorId,
  );

  const [scheduleOpened, setScheduleOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviewsCount, setTotalReviewsCount] = useState(0);

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(totalReviewsCount / reviewsPerPage);

  function openSchedule() {
    setScheduleOpened(true);
  }

  function closeSchedule() {
    setScheduleOpened(false);
  }

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getDoctorData());
  }, [dispatch]);

  useEffect(() => {
    if (!doctor) return;
    setTotalReviewsCount(doctor.reviewsCount);
  }, [doctor]);

  useEffect(() => {
    if (!doctorId) return;

    const skip = ((currentPage - 1) * reviewsPerPage).toString();
    const take = reviewsPerPage.toString();

    dispatch(fetchReviewsByDoctor({ doctorId, includeNames: 'true', skip: skip, take: take }));
  }, [doctorId, dispatch, currentPage]);

  return (
    <section className='flex flex-col justify-center gap-y-10'>
      {doctor && (
        <>
          <ReviewsHeader openSchedule={openSchedule} doctor={doctor} />

          <ReviewsBody reviews={reviews} />

          <ReviewsPagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={totalPages} />

          <Schedule
            closePopup={closeSchedule}
            scheduleIsOpen={scheduleOpened}
            scheduleInfo={{
              patientId: '',
              doctorId: doctor.id,
              doctorFirstName: doctor.firstName,
              doctorLastName: doctor.lastName,
              payrate: doctor.payrate,
              avatarKey: doctor.avatarKey,
              about: doctor.about,
              rating: doctor.rating,
              reviewsCount: doctor.reviewsCount,
            }}
          />
        </>
      )}
    </section>
  );
}
