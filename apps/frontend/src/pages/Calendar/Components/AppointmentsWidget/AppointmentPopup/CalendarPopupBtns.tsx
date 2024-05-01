import { useState } from 'react';
import { Button } from '@/components/UI/Button/Button';
import { useAppDispatch } from '@/app/hooks';
import { changeAppointmentStatus } from '@/app/appointment/AppointmentThunks';
import { AppointmentStatus } from '@/dataTypes/Appointment';

type CalendarPopupBtnsProps = {
  appointmentId: string;
  openBookModal: () => void;
};

export default function CalendarPopupBtns({ appointmentId, openBookModal }: CalendarPopupBtnsProps) {
  const dispatch = useAppDispatch();

  const [approve, setApprove] = useState(false);

  function handleCancelAppointment() {
    setApprove(false);
    dispatch(changeAppointmentStatus({ id: appointmentId, status: AppointmentStatus.CANCELED }));
  }

  function handleBookAgain() {
    if (!openBookModal) return;
    openBookModal();
  }

  return (
    <div className='flex justify-end gap-x-2'>
      {approve ? (
        <div className='flex items-center gap-x-2'>
          <span>
            Are you sure you want to <span className='font-bold text-error'>cancel</span> this appointment?
          </span>

          <Button type='primary' btnType='button' onClick={handleCancelAppointment}>
            Yes
          </Button>

          <Button type='secondary' btnType='button' onClick={() => setApprove(false)}>
            No
          </Button>
        </div>
      ) : (
        <>
          <Button
            type='secondary'
            btnType='button'
            className='border-error text-error'
            onClick={() => setApprove(true)}
          >
            Cancel appointment
          </Button>

          <Button type='primary' btnType='button' onClick={handleBookAgain}>
            Book again
          </Button>
        </>
      )}
    </div>
  );
}
