import AppointmentsListItem, { AppointmentsListItemProps } from './AppointmentsListItem';

export default function TodaysAppointments() {
  const todaysAppointments: AppointmentsListItemProps[] = [
    {
      avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png',
      name: 'Dr. Jane Doe',
      specialization: 'Cardiologist',
      time: '10:00 am',
    },
    {
      avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png',
      name: 'Dr. John Doe',
      specialization: 'Neurologist',
      time: '9:00 am',
    },
    {
      avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png',
      name: 'Dr. Altair Freeman',
      specialization: 'Dentist',
      time: '10:00 pm',
    },
  ];
  return (
    <article className='flex h-fit min-w-[300px] flex-col gap-y-5 rounded-xl bg-white'>
      <h3 className='px-6 pt-6 text-base font-normal text-black'>Today's appointments</h3>

      <ul className='flex w-full flex-col gap-y-3 px-6 pb-6'>
        {todaysAppointments.map(({ avatar, name, specialization, time }) => (
          <AppointmentsListItem avatar={avatar} name={name} specialization={specialization} time={time} />
        ))}
      </ul>
    </article>
  );
}
