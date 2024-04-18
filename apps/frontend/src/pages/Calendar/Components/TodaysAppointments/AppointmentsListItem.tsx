export type AppointmentsListItemProps = {
  avatar: string;
  name: string;
  specialization: string;
  time: string;
};

export default function AppointmentsListItem({ avatar, name, specialization, time }: AppointmentsListItemProps) {
  return (
    <li className='bg-background hover:bg-grey-5 flex cursor-pointer gap-x-2 rounded-xl px-4 py-2'>
      <img src={avatar} alt={name} width='48px' height='48px' className='rounded-lg' />

      <div className='flex flex-col gap-y-1'>
        <span className='text-base font-semibold text-black'>{name}</span>

        <div className='text-grey-1 flex text-sm font-medium'>
          <span>
            {specialization} • <time>{time}</time>
          </span>
        </div>
      </div>
    </li>
  );
}
