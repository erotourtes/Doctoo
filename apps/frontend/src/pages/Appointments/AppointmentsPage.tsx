import { Button } from '@/components/UI/Button/Button';
import PageHeader from '../PageHeader';
import InputSearch from '@/components/UI/Input/InputSearch';
import { useState, useReducer, useEffect } from 'react';
import AppointmentsList from './Components/AppointmentsList/AppointmentsList';
import { Calendar } from '@/components/UI/Calendar/Calendar';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import dayjs from 'dayjs';
import AppointmentsFilters from './Components/AppointmentsFilters/AppointmentsFilters';
import { getMyAppointments } from '@/app/appointment/AppointmentThunks';
import NoAppointments from './NoAppointments';
import { filterReducer, initialFilterState } from './filterReducer';

export default function AppointmentsPage() {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(state => state.appointment.appointments);
  const [filterState, dispatchFilterAction] = useReducer(filterReducer, initialFilterState);

  useEffect(() => {
    dispatch(getMyAppointments());
  }, []);

  const meetingsForDay = appointments.map(appointment => ({
    date: dayjs(appointment.startedAt).toDate(),
    status: appointment.status.toUpperCase(),
  }));

  const [search, setSearch] = useState('');

  function handleSubmit(value: string) {
    setSearch(value);
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
          <AppointmentsFilters state={filterState} dispatch={dispatchFilterAction} appointments={appointments} />
          {appointments.length === 0 ? (
            <NoAppointments findDoctor={() => {}} />
          ) : (
            <AppointmentsList appointments={appointments} filters={filterState} />
          )}
        </div>

        <div className=''>
          <Calendar meetingsForDay={meetingsForDay} />
        </div>
      </section>
    </section>
  );
}
