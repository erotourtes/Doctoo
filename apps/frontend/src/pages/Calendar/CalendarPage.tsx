import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import PageHeader from '../PageHeader';
import BigCalendar from './Components/BigCalendar/BigCalendar';
import AppointmentsWidget from './Components/AppointmentsWidget/AppointmentsWidget';
import { Button, Icon } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getMyAppointments } from '@/app/appointment/AppointmentThunks';
import type { IAppointment } from '@/dataTypes/Appointment';

export default function CalendarPage() {
  const today = new Date();
  const dispatch = useAppDispatch();

  const [appointmentsForDay, setAppointmentsForDay] = useState<IAppointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const allAppointments = useAppSelector(state => state.appointment.appointments);

  useEffect(() => {
    dispatch(getMyAppointments());
  }, [dispatch]);

  useEffect(() => {
    const filteredAppointments = allAppointments.filter(appointment =>
      dayjs(appointment.assignedAt).isSame(selectedDate, 'day'),
    );
    setAppointmentsForDay(filteredAppointments);
  }, [selectedDate, allAppointments]);

  function handleDateChange(newDate: Date) {
    setSelectedDate(newDate);
  }

  function exportSchedule() {
    console.log('Export');
  }

  function findDoctor() {
    console.log('Find a doctor');
  }

  return (
    <div className='max-w-[1286px]'>
      <PageHeader iconVariant='date' title='Calendar' className='flex flex-col gap-2 sm:flex-row'>
        <Button
          className=' flex items-center justify-center bg-white p-2 sm:px-6'
          onClick={exportSchedule}
          type='secondary'
        >
          <Icon variant='download' className='mr-2 items-center justify-center' />
          Export
        </Button>

        <Button onClick={findDoctor} type='primary' className='p-2 sm:px-6'>
          Find a doctor
        </Button>
      </PageHeader>

      <section className='flex w-full flex-col-reverse gap-12 sm:flex-col md:justify-between md:gap-4 lg:flex-row'>
        <AppointmentsWidget appointmentsForDay={appointmentsForDay} selectedDate={selectedDate} />
        <BigCalendar meetingsForDay={allAppointments} chooseDate={handleDateChange} />
      </section>
    </div>
  );
}
