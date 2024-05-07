import { getFamilyDoctor } from '@/app/doctor/DoctorThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchReviewsByDoctor } from '@/app/review/ReviewThunks';
import { Button } from '@/components/UI';
import Schedule from '@/components/UI/Schedule/Schedule';
import { useEffect, useState } from 'react';

const BookAppointmentBtn = () => {
  const dispatch = useAppDispatch();
  const doctorUser = useAppSelector(state => state.doctor.familyDoctor);
  const reviews = useAppSelector(state => state.review.reviews);
  const openedChat = useAppSelector(state => state.chat.openedChat);
  const [schedulePopupIsOpen, setSchedulePopupIsOpen] = useState(false);

  useEffect(() => {
    if (openedChat) {
      dispatch(getFamilyDoctor(openedChat.doctorId));
      dispatch(fetchReviewsByDoctor({ doctorId: openedChat.doctorId, includeNames: 'true' }));
    }
  }, [openedChat]);

  function closeSchedulePopup() {
    setSchedulePopupIsOpen(false);
  }

  function openSchedulePopup() {
    setSchedulePopupIsOpen(true);
  }

  return (
    <div className='sticky bottom-0 bg-white p-6'>
      <Button btnType='button' type='primary' className='w-full' onClick={openSchedulePopup}>
        Book appointment
      </Button>
      {openedChat && doctorUser && (
        <Schedule
          closePopup={closeSchedulePopup}
          scheduleIsOpen={schedulePopupIsOpen}
          scheduleInfo={{
            patientId: openedChat.patientId,
            doctorId: openedChat.doctorId,
            doctor: doctorUser,
            reviews: reviews,
          }}
        />
      )}
    </div>
  );
};

export default BookAppointmentBtn;
