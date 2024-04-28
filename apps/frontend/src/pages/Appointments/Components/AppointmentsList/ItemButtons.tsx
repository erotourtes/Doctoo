import { Button } from '@/components/UI/Button/Button';
import { AppointmentStatus } from '@/dataTypes/Appointment';

type AppointmentButtonsProps = { status: AppointmentStatus };

export default function AppointmentButtons({ status }: AppointmentButtonsProps) {
  switch (status) {
    case AppointmentStatus.PLANNED:
      return (
        <Button type='secondary' btnType='submit' className='border-error text-error'>
          Cancel
        </Button>
      );
    case AppointmentStatus.CANCELED:
      return (
        <Button type='primary' btnType='submit' className='bg-main'>
          Book Again
        </Button>
      );
    case AppointmentStatus.COMPLETED:
      return (
        <>
          <Button type='primary' btnType='submit' className='bg-main'>
            Pay
          </Button>
          <Button type='secondary' btnType='submit' className='border-error text-error'>
            Book Again
          </Button>
        </>
      );
    default:
      return null;
  }
}
