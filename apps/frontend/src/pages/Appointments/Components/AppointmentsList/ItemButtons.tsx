import { changeAppointmentStatus } from '@/app/appointment/AppointmentThunks';
import { useAppDispatch } from '@/app/hooks';
import { setPaymentData } from '@/app/payment/paymentSlice';
import { PopupDoctoo } from '@/components/UI';
import { Button } from '@/components/UI/Button/Button';
import type { IAppointment } from '@/dataTypes/Appointment';
import { AppointmentStatus } from '@/dataTypes/Appointment';
import { useState } from 'react';
import { useNavigate } from 'react-router';

type AppointmentButtonsProps = {
  appointment: IAppointment;
  componentName: 'popup' | 'listItem';
  openBookModal?: () => void;
  isDoctor?: boolean;
};

export default function AppointmentButtons({
  componentName,
  appointment,
  openBookModal,
  isDoctor = false,
}: AppointmentButtonsProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { status, id, doctor, startedAt } = appointment;

  const data = {
    appointmentId: id,
    status: 'planned',
    date: startedAt,
    doctorName: `Dr. ${doctor?.firstName} ${doctor?.lastName}`,
    doctorSpecialization: doctor?.specializations || [],
    appointmentDuration: 1,
    pricePerHour: doctor?.payrate || 0,
  };

  const [approve, setApprove] = useState(false);

  function navigateToPayment() {
    navigate('/payment');
    dispatch(setPaymentData({ data }));
  }

  function enableApproveButton(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    setApprove(true);
  }

  function disableApproveButton() {
    setApprove(false);
  }

  function handleCancelAppointment() {
    setApprove(false);
    dispatch(changeAppointmentStatus({ id: id, status: AppointmentStatus.CANCELED }));
  }

  function handleBookAgain(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (!openBookModal) return;
    event.stopPropagation();
    openBookModal();
  }

  function BookAgainButton() {
    return (
      <Button type='secondary' btnType='button' onClick={handleBookAgain}>
        Book again
      </Button>
    );
  }

  function CancelButton({ text }: { text: string }) {
    return (
      !approve && (
        <Button type='secondary' btnType='button' className='border-error text-error' onClick={enableApproveButton}>
          {text}
        </Button>
      )
    );
  }

  function PayButton() {
    return (
      !approve &&
      status === 'PENDING_PAYMENT' && (
        <Button type='secondary' btnType='button' onClick={navigateToPayment}>
          Pay
        </Button>
      )
    );
  }

  function CancelInPopup() {
    return (
      approve && (
        <div className='flex items-center gap-x-2'>
          <span>
            Are you sure you want to <span className='font-bold text-error'>cancel</span> this appointment?
          </span>
          <Button type='primary' btnType='button' className='bg-main font-bold' onClick={handleCancelAppointment}>
            Yes
          </Button>
          <Button type='secondary' btnType='button' onClick={disableApproveButton}>
            No
          </Button>
        </div>
      )
    );
  }

  function CancelInList() {
    return (
      <PopupDoctoo
        popupIsOpen={approve}
        closePopup={() => setApprove(false)}
        modalBodyClassName=''
        modalFullClassName='!w-1/4'
      >
        <div className='flex flex-col items-center justify-center gap-x-2 gap-y-6'>
          <span className='text-center'>
            Are you sure you want to <span className='font-bold text-error'>cancel</span> this appointment?
          </span>
          <div className='flex gap-x-6'>
            <Button type='primary' btnType='button' className='bg-main font-bold' onClick={handleCancelAppointment}>
              Yes
            </Button>
            <Button type='secondary' btnType='button' onClick={disableApproveButton}>
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
          {!approve && componentName === 'popup' && <CancelButton text='Cancel appointment' />}
          {componentName === 'listItem' && <CancelButton text='Cancel' />}
          {componentName === 'popup' ? <CancelInPopup /> : <CancelInList />}
        </div>
      );

    case AppointmentStatus.CANCELED:
      return <BookAgainButton />;

    case AppointmentStatus.PENDING_PAYMENT:
      return (
        <div className={`flex ${componentName === 'popup' ? 'flex gap-x-4' : 'flex-col'} gap-y-2`}>
          {!approve && <CancelButton text='Cancel' />}
          {approve && (componentName === 'popup' ? <CancelInPopup /> : <CancelInList />)}
          {!isDoctor && <PayButton />}
        </div>
      );

    case AppointmentStatus.COMPLETED:
      return (
        <>
          <PayButton />
          <BookAgainButton />
        </>
      );
    default:
      return null;
  }
}
