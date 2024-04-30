import Icon from '@UI/Icon/Icon';
import AppointmentPopupButtons from './AppointmentPopupBtns';
import AppointmentPopupHeader from './AppointmentPopupHeader';
import dayjs from 'dayjs';
import { PopupDoctoo, Tag } from '@/components/UI';
import type { IAppointment } from '@/dataTypes/Appointment';
import type { IDoctor } from '@/dataTypes/Doctor';

type AppointmentPopupProps = {
  appointmentModal: boolean;
  closeModal: () => void;
  selectedAppointment: IAppointment;
};

export default function AppointmentPopup({ appointmentModal, closeModal, selectedAppointment }: AppointmentPopupProps) {
  const appointmentTime = dayjs(selectedAppointment?.assignedAt).format('MMMM D, h:mm a');
  const appointmentStatus = selectedAppointment?.status;

  function cancelAppointment() {
    console.log('Appointment cancelled');
  }

  function bookAgain() {
    console.log('Book again');
  }

  const doctor = selectedAppointment?.doctor;
  const { avatarKey, firstName, lastName, specializations, reviewsCount } = doctor as IDoctor;
  const name = `Dr. ${firstName} ${lastName}`;

  return (
    selectedAppointment && (
      <PopupDoctoo
        popupIsOpen={appointmentModal}
        closePopup={closeModal}
        modalFullClassName='max-w-[700px]'
        modalBodyClassName='flex max-w-[604px] flex-col gap-7'
      >
        <AppointmentPopupHeader appointmentTime={appointmentTime} appointmentStatus={appointmentStatus!} />

        <div className='flex flex-col gap-6 sm:flex-row sm:justify-start'>
          <img src={avatarKey} alt={name} className='max-h-28 max-w-28 rounded-lg' />

          <div className='flex w-full flex-col gap-4'>
            <div className='flex flex-col gap-y-2'>
              <div className='flex flex-col-reverse items-start justify-between gap-4 text-lg sm:flex-row'>
                <p className='font-medium text-black'>
                  Appointment with <span className='font-semibold text-main'>{name}</span>
                </p>

                <button className='flex items-end justify-center gap-x-1'>
                  <Icon variant='edit' className='h-[18px] w-[18px] text-grey-1' />
                  <span className='text-sm font-medium text-grey-1'>Reschedule</span>
                </button>
              </div>

              <span className='text-base font-medium text-grey-1'>
                {specializations ? specializations[0]?.name : 'Doctor'}
              </span>
            </div>

            <Tag icon={false} text='Top doctor' className='w-fit' />

            {reviewsCount > 0 && (
              <div className='flex flex-col items-start gap-3 sm:flex-row sm:items-center'>
                <div className='flex cursor-pointer gap-x-1'>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon key={i} variant='star' className='h-[18px] w-[18px] text-main-darker' />
                  ))}
                </div>

                <a href='#' className='text-black underline'>
                  {reviewsCount}
                </a>
              </div>
            )}
          </div>
        </div>

        <AppointmentPopupButtons bookAgain={bookAgain} cancelAppointment={cancelAppointment} />
      </PopupDoctoo>
    )
  );
}
