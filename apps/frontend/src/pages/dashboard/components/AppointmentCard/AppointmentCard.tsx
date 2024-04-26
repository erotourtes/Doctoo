import { Button } from '@/components/UI/Button/Button';
import Icon from '@/components/UI/Icon/Icon';
import type { IAppointment } from '@/dataTypes/Appointment';
import dayjs from 'dayjs';
import DoctorCard from '../DoctorCard/DoctorCard';

type AppointmentCardProps = {
  appointment: IAppointment;
};

export default function AppointmentCard({ appointment }: AppointmentCardProps) {
  const appointmentDate = dayjs(appointment.assignedAt);
  return (
    <>
      <article className='flex h-[64px] min-h-[64px] w-[646px] min-w-[646px] flex-row rounded-xl  bg-[#f1f6f9] '>
        <DoctorCard classNames='' doctor={appointment.doctor!} />
        <div className='my-[8px] border-r border-[#6BC3CD]'></div>
        <div className='flex h-full w-3/5  flex-row items-center'>
          {appointmentDate.diff(new Date(), 'minutes', true) > 5 ? (
            <div className='ml-[16px] flex items-center'>
              <p className='ml-[8px] border-r border-[#6BC3CD] pr-[16px] font-semibold'>
                {appointmentDate.format('MMM D')}
              </p>
              <Icon variant='timer' className='ml-[8px] mr-[8px] size-6 shrink-0 text-[#AFBCBD]' />
              <p>{appointmentDate.format('h:mm A')}</p>
            </div>
          ) : (
            <div className='flex items-center'>
              <Icon variant='timer' className='ml-[8px] mr-[8px] size-6 shrink-0 text-[#FFC249]' />
              <p className='font-semibold text-[#067C88]'>{`Starts in ${appointmentDate.diff(new Date(), 'minutes')} min`}</p>
              <Button type={'primary'} className='ml-[64px] w-[148px]'>
                <div className='flex font-normal'>
                  <Icon variant='plus' />
                  <p>Join now</p>
                </div>
              </Button>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
