import { Button } from '@/components/UI/Button/Button';
import { ButtonTypes } from '@/components/UI/Button/ButtonTypes';

type AppointmentPopupButtonsProps = { cancelAppointment: () => void; bookAgain: () => void };

export default function AppointmentPopupButtons({ cancelAppointment, bookAgain }: AppointmentPopupButtonsProps) {
  return (
    <div className='flex flex-col-reverse justify-center gap-4 text-base font-normal sm:flex-row sm:self-end'>
      <Button className='!border-error !text-error' onClick={cancelAppointment} type={ButtonTypes.SECONDARY}>
        Cancel appointment
      </Button>
      <Button onClick={bookAgain} type={ButtonTypes.PRIMARY}>
        Book again
      </Button>
    </div>
  );
}
