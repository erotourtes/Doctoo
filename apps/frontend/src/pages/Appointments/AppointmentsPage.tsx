import { Button } from '@/components/UI/Button/Button';
import PageHeader from '../PageHeader';
import InputSearch from '@/components/UI/Input/InputSearch';
import { useState, useReducer, useEffect } from 'react';
import AppointmentsList from './Components/AppointmentsList/AppointmentsList';
import { Calendar } from '@/components/UI/Calendar/Calendar';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import dayjs from 'dayjs';
import AppointmentsFilters from './Components/AppointmentsFilters/AppointmentsFilters';
import { getAppointmentsByPatientId } from '@/app/appointment/AppointmentThunks';

export type FilterState = {
  time: string[];
  statuses: string[];
  doctors: string[];
  order: string[];
};

export type FilterAction =
  | { type: 'SET_TIME'; payload: string[] }
  | { type: 'SET_STATUSES'; payload: string[] }
  | { type: 'SET_DOCTORS'; payload: string[] }
  | { type: 'SET_ORDER'; payload: string[] };

const initialFilterState: FilterState = {
  time: ['All time'],
  statuses: ['All statuses'],
  doctors: ['All doctors'],
  order: ['Latest to oldest'],
};

export default function AppointmentsPage() {
  const dispatch = useAppDispatch();
  const appointments = useAppSelector(state => state.appointment.appointments);
  const [filterState, dispatchFilterAction] = useReducer(filterReducer, initialFilterState);

  useEffect(() => {
    dispatch(getAppointmentsByPatientId('7'));
  }, []);

  const meetingsForDay = appointments.map(appointment => ({
    date: dayjs(appointment.assignedAt).toDate(),
    status: appointment.status.toUpperCase(),
  }));


  const [search, setSearch] = useState('');

  function handleSubmit(value: string) {
    setSearch(value);
  }

  function filterReducer(state: FilterState, action: FilterAction): FilterState {
    switch (action.type) {
      case 'SET_TIME':
        return { ...state, time: action.payload };
      case 'SET_STATUSES':
        return { ...state, statuses: action.payload };
      case 'SET_DOCTORS':
        return { ...state, doctors: action.payload };
      case 'SET_ORDER':
        return { ...state, order: action.payload };
      default:
        return state;
    }
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
          <AppointmentsFilters state={filterState} dispatch={dispatchFilterAction} appointments={appointments} />
          {appointments.length === 0 ? <NoAppointments /> : <AppointmentsList filters={filterState} />}
        </div>

        <div className=''>
          <Calendar meetingsForDay={meetingsForDay} />
        </div>
      </section>
    </section>
  );
}
