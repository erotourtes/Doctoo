import PageHeader from '@/pages/PageHeader';
import BigCalendarSkeleton from '../../../Calendar/Components/BigCalendar/BigCalendarSkeleton';
import MyDoctorsCardSkeleton from '../MyDoctorsCard/MyDoctorCardSkeleton';
import NearestAppointmentsSkeletonComponent from '../NerestAppointmentsCard/NearestAppointmentSkeleton';
import NotificationsComponentSkeleton from '../NotificationsComponent/NotificationComponentSkeleton';

const PatientDashboardSkeleton = () => {
  return (
    <div>
      <PageHeader iconVariant='dashboard' title='Dashboard' className='flex-col gap-4 lg:flex-row'>
        <div className='flex w-full flex-col gap-4 sm:flex-row' />
      </PageHeader>
      <div className='flex flex-col gap-6 lg:flex-row'>
        <section className='flex w-full flex-col gap-6 bg-background'>
          <NearestAppointmentsSkeletonComponent />
          <NotificationsComponentSkeleton />
        </section>
        <section className='flex flex-col gap-6'>
          <BigCalendarSkeleton />
          <MyDoctorsCardSkeleton />
        </section>
      </div>
    </div>
  );
};

export default PatientDashboardSkeleton;
