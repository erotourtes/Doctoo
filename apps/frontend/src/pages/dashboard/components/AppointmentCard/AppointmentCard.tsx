import { Button } from '@/components/UI/Button/Button';
import Icon from '@/components/UI/Icon/Icon';
import type { IAppointment } from '@/dataTypes/Appointment';
import dayjs from 'dayjs';
import ShortInfoCard from '../ShortInfoCard/ShortInfoCard';

type AppointmentCardProps = {
  appointment: IAppointment;
  withQuickNotes: boolean;
};

export default function AppointmentCard({ appointment, withQuickNotes = false }: AppointmentCardProps) {
  const appointmentDate = dayjs(appointment.assignedAt);
  const isLate = appointmentDate.diff(new Date(), 'minutes') <= 0;
  return (
    <>
      <article className='flex h-[64px] min-h-[64px] w-[646px] min-w-[646px] flex-row rounded-xl  bg-[#f1f6f9] '>
        <ShortInfoCard
          classNames=''
          fullName={`Dr. ${appointment.doctor!.firstName + ' ' + appointment.doctor!.lastName}`}
          about={appointment.doctor!.about}
          avatarKey={appointment.doctor!.avatarKey}
        />
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
            <div className='flex items-center justify-between'>
              <Icon
                variant='timer'
                className={`ml-[8px] mr-[8px] size-6 shrink-0 ${isLate ? 'text-[#ED5252]' : 'text-[#FFC249]'}`}
              />
              <p
                className={`font-semibold ${isLate ? 'text-[#ED5252]' : 'text-[#067C88]'}`}
              >{`Starts in ${isLate ? 0 : appointmentDate.diff(new Date(), 'minutes')} min`}</p>
              {withQuickNotes ? <Icon variant='quick-notes' className='ml-[16px] text-[#067C88]' /> : <></>}
              <Button type={'primary'} className={`ml-[64px] max-w-[148px] ${withQuickNotes ? 'px-2 ' : ''}`}>
                <div className={`${withQuickNotes ? '' : 'flex'} 'font-normal'`}>
                  {withQuickNotes ? <></> : <Icon variant='plus' />}
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
