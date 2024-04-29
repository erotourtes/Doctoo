import Icon from '@/components/UI/Icon/Icon';
import dayjs from 'dayjs';
import AppointmentBadges from '../AppointmentsList/ItemBadges';
import type { AppointmentStatus } from '@/dataTypes/Appointment';

type PopupHeaderProps = { assignedAt: string; status: AppointmentStatus };

export default function PopupHeader({ assignedAt, status }: PopupHeaderProps) {
  return (
    <div className='flex justify-between'>
      <div className='flex items-center gap-x-3'>
        <Icon variant='date' className='h-10 w-10 rounded-full bg-background p-[6px] pb-2  text-main' />
        <text className='text-xl font-semibold  text-black'>{dayjs(assignedAt).format('MMMM D, h:mm a')}</text>
      </div>

      <AppointmentBadges status={status} />
    </div>
  );
}
