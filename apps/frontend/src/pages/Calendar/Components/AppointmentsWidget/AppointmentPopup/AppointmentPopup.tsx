import Icon from '@UI/Icon/Icon';
import { useEffect } from 'react';
import Popup from 'reactjs-popup';
import { AppointmentsListItemProps } from '../AppointmentsListItem';
import AppointmentPopupButtons from './AppointmentPopupBtns';
import AppointmentPopupHeader from './AppointmentPopupHeader';
import dayjs from 'dayjs';

type AppointmentPopupProps = {
  appointmentModal: boolean;
  closeModal: () => void;
  selectedAppointment: AppointmentsListItemProps | undefined;
};

export default function AppointmentPopup({ appointmentModal, closeModal, selectedAppointment }: AppointmentPopupProps) {
  useEffect(() => {
    if (appointmentModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [appointmentModal]);

  const appointmentTime = dayjs(selectedAppointment?.date).format('MMMM D, h:mm a');
  const appointmentStatus = selectedAppointment?.status;

  function cancelAppointment() {
    console.log('Appointment cancelled');
  }

  function bookAgain() {
    console.log('Book again');
  }

  return (
    selectedAppointment && (
      <Popup open={appointmentModal} onClose={closeModal}>
        <div className='flex h-screen w-screen bg-black opacity-20' onClick={closeModal}></div>

        <article className='absolute left-1/4 top-1/4 flex h-2/4 w-3/4 max-w-[700px] flex-col justify-between rounded-xl bg-white p-12'>
          {/* Close icon */}
          <div className='-m-8 self-end'>
            <Icon variant='close' onClick={closeModal} className='cursor-pointer  text-grey-1' />
          </div>

          {/* Header */}
          <AppointmentPopupHeader appointmentTime={appointmentTime} appointmentStatus={appointmentStatus!} />

          {/* Details */}
          <div className='flex h-32 justify-start gap-x-6'>
            {/* Avatar */}
            <img
              src={selectedAppointment.doctor.avatar}
              alt={selectedAppointment.doctor.name}
              className='max-h-28 max-w-28 rounded-lg'
            />

            {/* Details */}
            <div className='flex w-full flex-col'>
              <div className='flex flex-col gap-y-2'>
                {/* Appointment with */}
                <div className='flex h-6 flex-row justify-between text-lg'>
                  <text className='font-medium text-black'>
                    Appointment with <text className='font-semibold text-main'>{selectedAppointment.doctor.name}</text>
                  </text>
                  {/* Reschedule */}
                  <div className='flex cursor-pointer items-end justify-center gap-x-1'>
                    <Icon variant='edit' className='h-[18px] w-[18px] text-grey-1' />
                    <text className='h-5 text-sm font-medium text-grey-1'>Reschedule</text>
                  </div>
                </div>

                {/* Specialization */}
                <text className='text-base font-medium text-grey-1'>{selectedAppointment.doctor.specialization}</text>
              </div>

              <div className='my-4 flex h-fit w-fit items-center justify-center rounded-2xl bg-main-light px-3 py-1 pb-1'>
                <text className='select-none text-sm font-normal text-main-dark'>Top doctor</text>
              </div>

              <div className='flex items-center gap-x-3'>
                <div className='flex cursor-pointer gap-x-1'>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Icon key={i} variant='star' className='h-[18px] w-[18px] text-main-darker' />
                  ))}
                </div>

                <a href='#' className='text-black underline'>
                  128 reviews
                </a>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <AppointmentPopupButtons bookAgain={bookAgain} cancelAppointment={cancelAppointment} />
        </article>
      </Popup>
    )
  );
}
