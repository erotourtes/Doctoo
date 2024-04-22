import { Button } from '@/components/UI/Button/Button';
import { ButtonTypes } from '@/components/UI/Button/ButtonTypes';

type AppointmentPopupButtonsProps = { cancelAppointment: () => void; bookAgain: () => void };

export default function AppointmentPopupButtons({ cancelAppointment, bookAgain }: AppointmentPopupButtonsProps) {
  return (
    <div className='mt-5 flex h-10 gap-x-4 self-end text-base font-normal'>
      <Button className='!border-error !text-error' onClick={cancelAppointment} type={ButtonTypes.SECONDARY}>
        Cancel appointment
      </Button>
      <Button onClick={bookAgain} type={ButtonTypes.PRIMARY}>
        Book again
      </Button>
    </div>
  );
}
