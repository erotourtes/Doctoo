import { changeAppointmentStatus } from '@/app/appointment/AppointmentThunks';
import { useAppDispatch } from '@/app/hooks';
import { PopupDoctoo } from '@/components/UI';
import { Button } from '@/components/UI/Button/Button';
import { AppointmentStatus } from '@/dataTypes/Appointment';
import { useState } from 'react';

type AppointmentButtonsProps = {
  status: AppointmentStatus;
  componentName: 'popup' | 'listItem';
  appointmentId: string;
};

export default function AppointmentButtons({ status, componentName, appointmentId }: AppointmentButtonsProps) {
  const dispatch = useAppDispatch();

  const [approve, setApprove] = useState(false);

  function enableApproveButton() {
    setApprove(true);
  }

  function disableApproveButton() {
    setApprove(false);
  }

  function handleCancelAppointment() {
    setApprove(false);
    dispatch(changeAppointmentStatus({ id: appointmentId, status: AppointmentStatus.CANCELED }));
  }

  function CancelInPopup() {
    return (
      approve && (
        <div className='flex gap-x-2'>
          <span>
            Are you sure you want to <span className='font-bold text-error'>cancel</span> this appointment?
          </span>
          <Button type='primary' btnType='button' className='bg-main font-bold' onClick={handleCancelAppointment}>
            Yes
          </Button>
          <Button type='secondary' btnType='button' className='bg-main' onClick={disableApproveButton}>
            No
          </Button>
        </div>
      )
    );
  }

  function CancelInList() {
    return (
      <PopupDoctoo popupIsOpen={approve} closePopup={() => setApprove(false)} modalBodyClassName={''}>
        <div className='flex flex-col gap-x-2'>
          <span>
            Are you sure you want to <span className='font-bold text-error'>cancel</span> this appointment?
          </span>
          <div className='flex gap-x-6'>
            <Button type='primary' btnType='button' className='bg-main font-bold' onClick={handleCancelAppointment}>
              Yes
            </Button>
            <Button type='secondary' btnType='button' className='bg-main' onClick={disableApproveButton}>
              No
            </Button>
          </div>
        </div>
      </PopupDoctoo>
    );
  }

  switch (status) {
    case AppointmentStatus.PLANNED:
      return (
        <div className='flex flex-col gap-y-2'>
          <Button type='secondary' btnType='button' className='border-error text-error' onClick={enableApproveButton}>
            {componentName === 'popup' ? 'Cancel appointment' : 'Cancel'}
          </Button>
          {componentName === 'popup' ? <CancelInPopup /> : <CancelInList />}
        </div>
      );
    case AppointmentStatus.CANCELED:
      return (
        <Button type='primary' btnType='button' className='bg-main'>
          Book again
        </Button>
      );
    case AppointmentStatus.COMPLETED:
      return (
        <>
          <Button type='primary' btnType='button' className='bg-main'>
            Pay
          </Button>
          <Button type='secondary' btnType='button' className='border-error text-error'>
            Book again
          </Button>
        </>
      );
    default:
      return null;
  }
}
