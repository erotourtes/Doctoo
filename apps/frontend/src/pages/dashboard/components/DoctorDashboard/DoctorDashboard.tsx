import { useEffect, useState } from 'react';
import { Button, InputSearch } from '@/components/UI';
import PageHeader from '@/pages/PageHeader';
import CurrentAppointments from '../CurrentAppointments/CurrentAppointments';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { getMyCurrentAppointments, getMyTodayAppointments } from '@/app/appointment/AppointmentThunks';
import DoctorDashboardCalendar from './DoctorDashboardCalendar';
import TodayAppointments from '../TodayAppointments/TodayAppointments';
import AppointmentPatientPopupProvider from '@/hooks/useAppointmentPatientPopup';

const DoctorDashboard = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const currentDate = new Date();
  const oneHourInMilliseconds = 10 * 60 * 60 * 1000;

  const startDate = new Date(currentDate.getTime() - oneHourInMilliseconds);
  const endDate = new Date(currentDate.getTime() + oneHourInMilliseconds);

  useEffect(() => {
    dispatch(getMyCurrentAppointments({ startDate, endDate }));
    dispatch(getMyTodayAppointments());
  }, [dispatch]);

  const currentAppointments = useAppSelector(state => state.appointment.currentAppointments);
  const todayAppointments = useAppSelector(state => state.appointment.todayAppointments);
  function handleSubmit(value: string) {
    setSearch(value);
  }

  return (
    <div>
      <AppointmentPatientPopupProvider>
        <PageHeader iconVariant={'dashboard'} title='Dashboard'>
          <InputSearch
            value={search}
            setValue={handleSubmit}
            variant='white'
            placeholder='Search by surname, symptom'
          />
          <Button type='primary' btnType='button'>
            Find a patient
          </Button>
        </PageHeader>
        <div className='flex w-full gap-6'>
          <div className='flex flex-1 flex-col gap-8'>
            <CurrentAppointments appointments={currentAppointments} />
            <DoctorDashboardCalendar />
          </div>
          <TodayAppointments appointments={todayAppointments} />
        </div>
      </AppointmentPatientPopupProvider>
    </div>
  );
};
export default DoctorDashboard;
