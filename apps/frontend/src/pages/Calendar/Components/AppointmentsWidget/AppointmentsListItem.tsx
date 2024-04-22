import dayjs from 'dayjs';

export type AppointmentsListItemProps = {
  doctor: {
    avatar: string;
    name: string;
    specialization: string;
    rating: number;
    reviews: number;
  };
  date: Date;
  status: 'Planned' | 'Cancelled' | 'Completed';
};

export default function AppointmentsListItem({ doctor, date }: AppointmentsListItemProps) {
  const { avatar, name, specialization } = doctor;
  return (
    <>
      <img src={avatar} alt={name} width='48px' height='48px' className='rounded-lg' />

      <div className='flex flex-col gap-y-1'>
        <span className='text-base font-semibold text-black'>{name}</span>

        <div className='flex text-sm font-medium text-grey-1'>
          <span>
            {specialization} • <time>{dayjs(date).format('h:mm a')}</time>
          </span>
        </div>
      </div>
    </>
  );
}
