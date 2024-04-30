import PageHeader from '../PageHeader';
import NearestAppointmentsComponent from './components/NerestAppointmentsCard/NearestAppointments';
import { Calendar } from '@/components/UI/Calendar/Calendar';
import MyDoctorsCard from './components/MyDoctorsCard/MyDoctorsCard';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { getMytDoctorData } from '@/app/doctor/DoctorThunks';
import { useEffect, useState } from 'react';
import NotificationsComponent from './components/NotificationsComponent/NotificationsComponent';
import { AppointmentStatus, type IAppointment } from '@/dataTypes/Appointment';
import dayjs from 'dayjs';
import { Button, InputSearch } from '@/components/UI';
import { getMyAppointments } from '@/app/appointment/AppointmentThunks';

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMytDoctorData());
    dispatch(getMyAppointments());
  }, [dispatch]);

  const [search, setSearch] = useState('');

  function handleSubmit(value: string) {
    setSearch(value);
  }
  const doctors = useAppSelector(state => state.doctor.doctors);
  const appointments = useAppSelector(state => state.appointment.appointments);
  const nearestAppointments = appointments
    .filter((appointment: IAppointment) => {
      const appointmentDate = dayjs(appointment.assignedAt);
      const nextSevenDays = dayjs().add(7, 'day');
      return (
        appointmentDate.isBefore(nextSevenDays) ||
        (appointmentDate.isSame(nextSevenDays, 'day') && appointment.status == AppointmentStatus.PLANNED)
      );
    })
    .sort((a: IAppointment, b: IAppointment) => {
      return dayjs(a.assignedAt).diff(dayjs(b.assignedAt));
    })
    .slice(0, 5);
  return (
    <div>
      <PageHeader iconVariant={'dashboard'} title='Dashboard'>
        <InputSearch value={search} setValue={handleSubmit} variant='white' placeholder='Search by doctor, symptom' />

        <Button type='primary' btnType='button'>
          Find a doctor
        </Button>
      </PageHeader>
      <div className='flex flex-row'>
        <section className='flex w-full min-w-[694px] flex-col  overflow-y-auto bg-background pt-7'>
          <NearestAppointmentsComponent appointments={nearestAppointments} />
          <NotificationsComponent />
        </section>
        <section className='flex flex-col pt-7'>
          <Calendar
            meetingsForDay={appointments.map((appointment: IAppointment) => ({
              date: new Date(appointment.assignedAt),
              status: appointment.status,
            }))}
          />
          <MyDoctorsCard doctors={doctors} />
        </section>
      </div>
    </div>
  );
};
export default DashboardPage;
