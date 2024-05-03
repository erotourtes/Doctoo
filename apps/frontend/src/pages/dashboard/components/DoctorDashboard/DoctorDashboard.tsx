import { useEffect, useState } from 'react';
import { Button, InputSearch } from '@/components/UI';
import PageHeader from '@/pages/PageHeader';
import CurrentAppointments from '../CurrentAppointments/CurrentAppointments';
import TodayAppointments from '../TodayAppointments/TodayAppointments';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getLoginedDoctorAppointments } from '@/app/appointment/AppointmentThunks';
import BigCalendar from '@/pages/Calendar/Components/BigCalendar/BigCalendar';
const DoctorDashboard = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLoginedDoctorAppointments());
  }, [dispatch]);

  const appointments = useAppSelector(state => state.appointment.appointments);
  function handleSubmit(value: string) {
    setSearch(value);
  }

  return (
    <div>
      <PageHeader iconVariant={'dashboard'} title='Dashboard'>
        <InputSearch value={search} setValue={handleSubmit} variant='white' placeholder='Search by surname, symptom' />

        <Button type='primary' btnType='button'>
          Find a patient
        </Button>
      </PageHeader>
      <div className='flex w-full gap-6'>
        <div className='flex flex-col gap-8'>
          <CurrentAppointments appointments={appointments} patients={appointments.map(a => a.patient!)} />
          <BigCalendar
            meetingsForDay={appointments}
            chooseDate={(newDate: Date) => {
              console.log(newDate);
            }}
          />
        </div>
        <TodayAppointments appointments={appointments} patients={appointments.map(a => a.patient!)} />
        <div />
      </div>
    </div>
  );
};
export default DoctorDashboard;
