import { PDFDownloadLink } from '@react-pdf/renderer';
import { useAppSelector } from '@/app/hooks';
import { ReceiptPDF } from './ReceiptPDF';
import { Button } from '@/components/UI/Button/Button';
import Icon from '@/components/UI/Icon/Icon';
import PopupDoctoo from '@/components/UI/Popup/Popup';

interface PaymentPopupProps {
  isOpenModal: boolean;
  setIsOpenModal: (arg0: boolean) => void;
  isSuccessfulPayment: boolean;
  navigateBack: () => void;
  paymentDetails: {
    id: string;
    created: number;
  };
}

export const PaymentPopup = ({
  isOpenModal,
  setIsOpenModal,
  isSuccessfulPayment,
  navigateBack,
  paymentDetails,
}: PaymentPopupProps) => {
  const { doctorName, appointmentDuration, pricePerHour } = useAppSelector(state => state.payment.data);

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
              <PDFDownloadLink
                document={
                  <ReceiptPDF
                    id={paymentDetails.id}
                    date={paymentDetails.created}
                    doctorName={doctorName}
                    appointmentDuration={appointmentDuration}
                    pricePerHour={pricePerHour}
                  />
                }
                fileName='document.pdf'
                className='no-underline'
              >
                <Button
                  type='secondary'
                  btnType='button'
                  className='flex items-center justify-center gap-1 px-3 md:gap-2 md:px-6'
                >
                  <Icon variant='download' />
                  Download receipt
                </Button>
              </PDFDownloadLink>
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
