import BigCalendar from './Components/BigCalendar/BigCalendar';
import TodaysAppointments from './Components/TodaysAppointments/TodaysAppointments';

export default function CalendarPage() {
  return (
    <>
      {/* <PageHeader iconVariant={'settings'} title='Test'> */}
      {/* </PageHeader> */}

      <section className='flex justify-center gap-x-8'>
        <TodaysAppointments />
        <BigCalendar />
      </section>
    </>
  );
}
