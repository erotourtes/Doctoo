import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { getMonthDays } from '@/utils/getMonthDays';
import type { AppointmentsListItemProps } from '../AppointmentsWidget/AppointmentsListItem';

const weeks = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

interface BigCalendarBodyProps {
  meetingsForDay?: AppointmentsListItemProps[];
  currentMonth: Dayjs | null;
  chooseDate: React.Dispatch<React.SetStateAction<Date>>;
  setAppointmentsForDay: React.Dispatch<React.SetStateAction<AppointmentsListItemProps[]>>;
}

export default function BigCalendarBody({
  meetingsForDay,
  currentMonth,
  chooseDate,
  setAppointmentsForDay,
}: BigCalendarBodyProps) {
  const days = getMonthDays(currentMonth as Dayjs);
  const today = dayjs();

  function chooseAppointments(date: Dayjs, appointments: AppointmentsListItemProps[]) {
    chooseDate(date.toDate());
    appointments && appointments.length > 0 && setAppointmentsForDay(appointments);
  }

  return (
    <div
      className='h-[85%] overflow-y-scroll'
      style={{
        msOverflowStyle: 'none',
        scrollbarColor: 'transparent transparent',
      }}
    >
      <div className='grid grid-cols-7'>
        {weeks.map(day => (
          <time
            key={day}
            style={{
              color: '#B0B0B0',
            }}
            className='mb-2 pr-4 text-right text-base font-medium'
          >
            {day}
          </time>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-x-[13.17px] gap-y-4 rounded-xl pl-1 pr-1'>
        {days.map((day, index) => {
          const meetings =
            meetingsForDay && meetingsForDay.filter(meeting => day.isSame(meeting.date, 'day')).slice(0, 3);

          const calls =
            meetings && meetings.length > 1
              ? 'Calls'
              : meetings!.length === 1
                ? meetings![0].doctor.name.length > 11
                  ? `${meetings![0].doctor.name.substring(0, 11)}...`
                  : meetings![0].doctor.name
                : '';

          return (
            <div
              onClick={() => chooseAppointments(day, meetings || [])}
              className={`grid-rows-auto grid text-base
              font-normal
              ${day.month() === currentMonth?.month() ? 'text-text' : 'text-grey-3'}
              h-[116px]
              w-[116px]
              cursor-pointer
              select-none rounded-xl
            bg-white
              hover:ring-1
            hover:ring-main
            `}
              key={index}
            >
              <time
                className={`mr-[10px] mt-[10px] flex self-start justify-self-end px-2 py-1
                ${day.isSame(today, 'day') && 'rounded-full bg-main text-white'}
              `}
              >
                {day.format('D')}
              </time>

              {meetings && meetings.length > 0 && (
                <div
                  key={index}
                  className={`mb-3 flex h-7 w-24 items-center bg-main-light ${calls !== 'Calls' ? 'justify-center' : 'justify-between'} self-end justify-self-center rounded-2xl px-3 py-1
                     `}
                >
                  <span className='whitespace-nowrap text-sm font-medium text-black'>{calls}</span>
                  {meetings.length > 1 && (
                    <span className='flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-normal text-black'>
                      {meetings.length}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
