import PageHeader from '../PageHeader';
import NearestAppointmentsComponent from './components/NerestAppointmentsCard/NearestAppointments';
import { Calendar } from '@/components/UI/Calendar/Calendar';
import MyDoctorsCard from './components/MyDoctorsCard/MyDoctorsCard';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { getPatientDoctorData } from '@/app/doctor/DoctorThunks';
import { useEffect } from 'react';
import NotificationsComponent from './components/NotificationsComponent/NotificationsComponent';
import type { IAppointment } from '@/dataTypes/Appointment';

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPatientDoctorData('8'));
  }, []);
  const doctors = useAppSelector(state => state.doctor.doctors);
  const appointments = useAppSelector(state => state.appointment.appointments);

  return (
    <div>
      <PageHeader iconVariant={'dashboard'} title='Dashboard' />
      <div className='flex flex-row'>
        <section className='flex w-full min-w-[694px] flex-col  overflow-y-auto bg-background pt-7'>
          <NearestAppointmentsComponent appointments={appointments} />
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
