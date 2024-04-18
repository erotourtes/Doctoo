import PageHeader from '../PageHeader';
import BigCalendar from './Components/BigCalendar/BigCalendar';
import TodaysAppointments from './Components/TodaysAppointments/TodaysAppointments';

export default function CalendarPage() {
  return (
    <>
      <PageHeader iconVariant='date' title='Calendar'></PageHeader>

      <section className='flex justify-center gap-x-8'>
        <TodaysAppointments />
        <BigCalendar />
      </section>
    </>
  );
}
