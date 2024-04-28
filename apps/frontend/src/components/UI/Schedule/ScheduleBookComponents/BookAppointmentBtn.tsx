import type { Dayjs } from 'dayjs';
import { Button } from '../../Button/Button';

type BookAppointmentButtonProps = {
  selectDate: Dayjs | null;
  handleBookAppointment: () => void;
};

export default function BookAppointmentButton({ selectDate, handleBookAppointment }: BookAppointmentButtonProps) {
  return (
    <div className='px-12'>
      <Button
        disabled={selectDate === undefined}
        btnType='button'
        type='primary'
        className={`w-full ${selectDate === undefined && 'cursor-not-allowed'}`}
        onClick={handleBookAppointment}
      >
        Book appointment
      </Button>
    </div>
  );
}
