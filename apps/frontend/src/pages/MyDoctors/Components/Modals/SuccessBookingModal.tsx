import PopupDoctoo from '@/components/UI/Popup/Popup';
import { Button } from '@/components/UI/Button/Button';
import { Link } from 'react-router-dom';

interface SuccessBookingModalProps {
  name: string;
  isSuccessBookingPopupOpen: boolean;
  closeSuccessBookingPopup: () => void;
}

const SuccessBookingModal = ({
  name,
  isSuccessBookingPopupOpen,
  closeSuccessBookingPopup,
}: SuccessBookingModalProps) => {
  const appointmentTime = '`date`';

  return (
    <PopupDoctoo
      popupIsOpen={isSuccessBookingPopupOpen}
      closePopup={closeSuccessBookingPopup}
      modalBodyClassName=''
      modalFullClassName='w-auto'
    >
      <div>
        <h3 className='pb-4 text-2xl font-medium text-black'>Success!</h3>
        <p className='mb-8 max-w-[492px] text-base font-normal text-text'>
          Your appointment with <span className='font-semibold'>{name}</span> have been scheduled on{' '}
          <span className='font-semibold'>{appointmentTime}</span>. You’ll receive a notification before an appointment
          and an invoice after.
        </p>
        <div className='flex gap-4'>
          <Button type={'secondary'} onClick={closeSuccessBookingPopup}>
            Book next appointment
          </Button>
          <Link to={'/dashboard'}>
            <Button type={'primary'}>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </PopupDoctoo>
  );
};

export default SuccessBookingModal;
