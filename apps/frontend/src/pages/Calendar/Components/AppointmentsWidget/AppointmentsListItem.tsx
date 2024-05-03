import type { IDoctor } from '@/dataTypes/Doctor';
import dayjs from 'dayjs';

export type AppointmentsListItemProps = {
  doctor: IDoctor | undefined;
  date?: Date | string;
};

export default function AppointmentsListItem({ doctor, date }: AppointmentsListItemProps) {
  const { avatarKey, firstName, lastName, specializations } = doctor as IDoctor;
  const name = `Dr. ${firstName} ${lastName}`;

  const firstSpecializationName = specializations.length > 0 ? specializations[0].name : 'Doctor';

  return (
    <>
      <img
        src={`${import.meta.env.VITE_S3_BASE_URL}/${avatarKey}`}
        alt={name}
        width='48px'
        height='48px'
        className='rounded-lg'
      />

      <div className='flex flex-col items-center gap-y-1 sm:items-start'>
        <span className='text-base font-semibold text-black'>{name}</span>

        <div className='flex text-sm font-medium text-grey-1'>
          <span>
            {firstSpecializationName} • <time>{dayjs(date).utc().format('h:mm a')}</time>
          </span>
        </div>
      </div>
    </>
  );
}
