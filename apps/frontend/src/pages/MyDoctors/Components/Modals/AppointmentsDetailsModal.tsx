import PopupDoctoo from '@/components/UI/Popup/Popup';
import MyDoctorCard from '../Card/MyDoctorCard';
import { Button } from '@/components/UI/Button/Button';
import { useState } from 'react';
import SuccessBookingModal from './SuccessBookingModal';
import AppointmentsCalendar from '../AppointmentsCalendar/AppointmentsCalendar';
import type { Specialization } from '@/dataTypes/Doctor';

interface AppointmentDetailsPopupProps {
  avatarKey: string;
  name: string;
  specializations: Specialization[];
  tags: string[];
  reviewsNumber: number;
  rating: number;
  bookButtonElement?: React.ReactNode;
  bookPrice: number;
  about?: string;
  isAppointmentsDetailsPopupOpen: boolean;
  closeAppointmentsDetailsPopup: () => void;
}

const AppointmentDetailsPopup = ({
  closeAppointmentsDetailsPopup,
  isAppointmentsDetailsPopupOpen,
  avatarKey,
  name,
  reviewsNumber,
  specializations,
  tags,
  rating,
  bookPrice,
  about,
}: AppointmentDetailsPopupProps) => {
  const [isSuccessBookingPopupOpen, setIsSuccessBookingPopupOpen] = useState(false);

  function handleBookingAppointment() {
    // booking ...
    closeAppointmentsDetailsPopup();
    setIsSuccessBookingPopupOpen(true);
  }

  function closeSuccessBookingPopup() {
    setIsSuccessBookingPopupOpen(false);
  }

  return (
    <>
      <PopupDoctoo
        popupIsOpen={isAppointmentsDetailsPopupOpen}
        closePopup={closeAppointmentsDetailsPopup}
        modalBodyClassName='max-w-[604px]'
        modalFullClassName='w-[50%]'
      >
        <div className='flex flex-col gap-8'>
          <MyDoctorCard
            avatarKey={avatarKey}
            name={name}
            specializations={specializations}
            tags={tags}
            reviewsNumber={reviewsNumber}
            rating={rating}
            variant={'withBookPrice'}
            bookPrice={bookPrice}
          />
          <AppointmentsCalendar />
          <Button className='w-full' onClick={handleBookingAppointment} type={'primary'}>
            Book appointment
          </Button>
          <div>
            <h1 className='mb-2 text-lg font-semibold text-black'>About me</h1>
            <p className='text-base text-text'>{about}</p>
          </div>
        </div>
      </PopupDoctoo>

      <SuccessBookingModal
        isSuccessBookingPopupOpen={isSuccessBookingPopupOpen}
        closeSuccessBookingPopup={closeSuccessBookingPopup}
        name={name}
      />
    </>
  );
};

export default AppointmentDetailsPopup;
