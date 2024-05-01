import Icon from '@/components/UI/Icon/Icon';
import dayjs from 'dayjs';
import AppointmentBadges from '@/pages/Appointments/Components/AppointmentsList/ItemBadges';
import type { AppointmentStatus } from '@/dataTypes/Appointment';

type CalendarPopupHeaderProps = { startTime: string; status: AppointmentStatus };

export default function CalendarPopupHeader({ startTime, status }: CalendarPopupHeaderProps) {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-x-3'>
        <Icon variant='date' className='h-10 w-10 rounded-full bg-background p-[6px] pb-2  text-main' />
        <span className='text-xl font-semibold  text-black'>{dayjs.utc(startTime).format('MMMM D, h:mm a')}</span>
      </div>

      <AppointmentBadges status={status} />
    </div>
  );
}