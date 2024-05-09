import { Button, Icon } from '@/components/UI';
import type { TMessageAppointment } from '@/dataTypes/Chat';
import { cn } from '@/utils/cn';
import { AppointmentStatus } from '@/dataTypes/Appointment';
import { formatDateChat } from '@/utils/formatDateChat';

type AppointmentMessageProps = {
  appointment: Exclude<TMessageAppointment, null>;
  className?: string;
  onClickViewDetails?: (appointmentId: string) => void;
};

const AppointmentMessage = ({ appointment, className, onClickViewDetails = () => {} }: AppointmentMessageProps) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div className='flex flex-wrap items-center justify-center gap-2'>
        <Icon variant='file' className='text-grey-1' />
        <span className=''>Appointment at {formatDateChat(appointment.startedAt, true)}</span>
        <span
          onClick={() => {
            onClickViewDetails(appointment.id);
          }}
          className='cursor-pointer font-medium text-main underline underline-offset-2 transition-all hover:text-main-medium'
        >
          View details
        </span>
      </div>

      {appointment?.status === AppointmentStatus.COMPLETED && (
        <Button type='secondary' className='bg-white'>
          <div className='flex items-center gap-2'>
            <Icon variant='download' />
            <span>Download summary</span>
          </div>
        </Button>
      )}
    </div>
  );
};

export default AppointmentMessage;
