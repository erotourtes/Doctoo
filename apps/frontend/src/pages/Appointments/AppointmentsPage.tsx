import { Button } from '@/components/UI/Button/Button';
import PageHeader from '../PageHeader';
import InputSearch from '@/components/UI/Input/InputSearch';
import { useState, useReducer } from 'react';
import AppointmentsFilter, { filterReducer } from './Components/AppointmentsFilter/AppointmentsFilter';
import AppointmentsList from './Components/AppointmentsList/AppointmentsList';
import { Calendar } from '@/components/UI/Calendar/Calendar';
import { useAppSelector } from '@/app/hooks';
import dayjs from 'dayjs';

export default function AppointmentsPage() {
  const appointments = useAppSelector(state => state.appointment.appointments);

  const meetingsForDay = appointments.map(appointment => ({
    date: dayjs(appointment.assignedAt),
    status: appointment.status.toLowerCase(),
  }));

  const [search, setSearch] = useState('');
  const [filterState, dispatchFilter] = useReducer(filterReducer, {
    time: 'All time',
    statuses: 'All statuses',
    doctors: 'All doctors',
    order: 'Latest to oldest',
  });

  function handleSubmit(value: string) {
    setSearch(value);
  }

  function NoAppointments() {
    return (
      <div className='flex h-full flex-col items-center justify-center gap-y-4 bg-white'>
        <div className='text-center'>
          <p className='text-base font-normal text-text'>Seems like you don’t have any appointments.</p>
          <p className='text-base font-normal text-text'>Let’s find a doctor and book one </p>
        </div>

        <Button type='secondary' btnType='button'>
          Find a doctor
        </Button>
      </div>
    );
  }

  return (
    <section className='overflow-hidden'>
      <PageHeader iconVariant='appointments' title='Appointments'>
        <InputSearch value={search} setValue={handleSubmit} variant='white' placeholder='Search by doctor, symptom' />

        <Button type='primary' btnType='button'>
          Find a doctor
        </Button>
      </PageHeader>

      <section className='flex h-screen justify-between gap-x-5'>
        <div className='flex h-4/5 flex-1 flex-col gap-y-6'>
          <AppointmentsFilter state={filterState} dispatch={dispatchFilter} />
          {appointments.length === 0 ? <NoAppointments /> : <AppointmentsList />}
        </div>

        <div className=''>
          <Calendar meetingsForDay={meetingsForDay} />
        </div>
      </section>
    </section>
  );
}
