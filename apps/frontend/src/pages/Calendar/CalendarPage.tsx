import { useState } from 'react';
import PageHeader from '../PageHeader';
import BigCalendar from './Components/BigCalendar/BigCalendar';
import AppointmentsWidget from './Components/AppointmentsWidget/AppointmentsWidget';
import type { AppointmentsListItemProps } from './Components/AppointmentsWidget/AppointmentsListItem';
import { Button } from '@/components/UI/Button/Button';
import { ButtonTypes } from '@/components/UI/Button/ButtonTypes';
import Icon from '@UI/Icon/Icon';
import dayjs from 'dayjs';

const appointments: AppointmentsListItemProps[] = [
  {
    doctor: {
      avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png',
      name: 'Dr. Olololo Lolo',
      rating: 5,
      reviews: 128,

      specialization: 'Cardiologist',
    },
    date: dayjs().toDate(),
    status: 'Planned',
  },
  {
    doctor: {
      avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_6.png',
      name: 'Dr. Bibi Bebe',
      rating: 5,
      reviews: 128,

      specialization: 'Psychiatrist',
    },
    date: dayjs().toDate(),
    status: 'Planned',
  },
  {
    doctor: {
      avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png',
      name: 'Dr. Bobo Baba',
      rating: 4,
      reviews: 108,
      specialization: 'Neurologist',
    },
    date: dayjs().add(1, 'day').toDate(),
    status: 'Planned',
  },
  {
    doctor: {
      avatar: 'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png',
      name: 'Dr. Beebee Bubu',
      rating: 5,
      reviews: 128,
      specialization: 'Cardiologist',
    },
    date: dayjs().subtract(1, 'day').toDate(),
    status: 'Planned',
  },
];

export default function CalendarPageWrapper() {
  const todayAppointment = appointments.filter(appointment => dayjs(appointment.date).isSame(dayjs(), 'day'));
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <CalendarPage todayAppointment={todayAppointment} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
  );
}

export function CalendarPage({
  todayAppointment,
  selectedDate,
  setSelectedDate,
}: {
  todayAppointment: AppointmentsListItemProps[];
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}) {
  const [appointmentsForDay, setAppointmentsForDay] = useState<AppointmentsListItemProps[]>(todayAppointment);

  function exportSchedule() {
    console.log('Export');
  }

  function findDoctor() {
    console.log('Find a doctor');
  }

  return (
    <div className='overflow-hidden'>
      <PageHeader iconVariant='date' title='Calendar'>
        <Button
          className='flex items-center justify-center bg-white'
          onClick={exportSchedule}
          type={ButtonTypes.SECONDARY}
        >
          <Icon variant='download' className='mr-2 items-center justify-center' />
          Export
        </Button>

        <Button onClick={findDoctor} type={ButtonTypes.PRIMARY}>
          Find a doctor
        </Button>
      </PageHeader>

      <section className='flex h-full w-full justify-between'>
        <AppointmentsWidget appointmentsForDay={appointmentsForDay} selectedDate={selectedDate} />
        <BigCalendar
          meetingsForDay={appointments}
          chooseDate={setSelectedDate}
          setAppointmentsForDay={setAppointmentsForDay}
        />
      </section>
    </div>
  );
}
