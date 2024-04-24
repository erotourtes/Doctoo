import { Button } from '../UI/Button/Button';
import Icon from '../UI/Icon/Icon';
import PopupDoctoo from '../UI/Popup/Popup';

interface PaymentPopupProps {
  isOpenModal: boolean;
  setIsOpenModal: (arg0: boolean) => void;
  isSuccessfulPayment: boolean;
  navigateBack: () => void;
}

export const PaymentPopup = ({ isOpenModal, setIsOpenModal, isSuccessfulPayment, navigateBack }: PaymentPopupProps) => {
  return (
    <PopupDoctoo
      popupIsOpen={isOpenModal}
      closePopup={() => setIsOpenModal(false)}
      modalFullClassName='!max-w-[522px] p-10'
      modalBodyClassName=''
    >
      <div className='grid justify-items-start gap-4'>
        {isSuccessfulPayment ? (
          <>
            <h2 className='text-black'>Success!</h2>
            <p>Your appointment have been successfully paid.</p>
            <div className='flex flex-col items-start gap-4 md:flex-row md:items-center'>
              <Button
                type='secondary'
                btnType='button'
                className='flex items-center justify-center gap-1 px-3 md:gap-2 md:px-6'
              >
                <Icon variant='download' />
                Download receipt
              </Button>
              <Button type='primary' btnType='button' className='w-full md:w-fit' onClick={navigateBack}>
                Go to Dashboard
              </Button>
            </div>
          </>
        ) : (
          <>
            <h2 className='text-black'>Error!</h2>
            <p>Sorry, something went wrong there. Try again.</p>
            <Button type='secondary' btnType='button' onClick={() => setIsOpenModal(false)} className='w-full sm:w-fit'>
              Try again
            </Button>
          </>
        )}
      </div>
    </PopupDoctoo>
  );
};
