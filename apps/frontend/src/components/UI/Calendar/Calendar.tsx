import { getMeetingStatusColor } from '@/utils/getMeetingStatusColor';
import { getMonthDays } from '@/utils/getMonthDays';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import weekdayPlugin from 'dayjs/plugin/weekday';
import { useState } from 'react';
import { cn } from '../../../utils/cn';

const weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface CalendarProps {
  meetingsForDay?: {
    date: Date | Dayjs;
    status: string;
  }[];
}

export const Calendar = ({ meetingsForDay }: CalendarProps) => {
  dayjs.extend(weekdayPlugin);
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState<Dayjs | null>(dayjs());

  const currentDate = `${currentMonth?.format('MMMM')} ${currentMonth?.format('YYYY')}`;

  const nextMonth = () => {
    if (currentMonth) {
      setCurrentMonth(currentMonth.add(1, 'month'));
    }
  };

  const prevMonth = () => {
    if (currentMonth) {
      setCurrentMonth(currentMonth.subtract(1, 'month'));
    }
  };

  const days = getMonthDays(currentMonth as Dayjs);

  return (
    <div className='grid w-full max-w-[302px] select-none grid-cols-[repeat(7,1fr)] rounded-xl bg-white p-6'>
      <div className='col-[1_/_span_7] mb-5 flex items-center justify-between'>
        <h3 className='text-lg font-medium not-italic leading-6 text-black'>{currentDate}</h3>
        <div className='flex items-center gap-2'>
          <button onClick={prevMonth}>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M14.7373 5.13947C15.0391 5.35902 15.0881 5.75948 14.8466 6.03392L9.59643 12L14.8466 17.9661C15.0881 18.2405 15.0391 18.641 14.7373 18.8605C14.4354 19.0801 13.9949 19.0356 13.7534 18.7611L8.15339 12.3975C7.94887 12.1651 7.94887 11.8349 8.15339 11.6025L13.7534 5.23885C13.9949 4.96441 14.4354 4.91992 14.7373 5.13947Z'
                fill='#898E96'
              />
            </svg>
          </button>
          <button onClick={nextMonth}>
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M10.2627 5.13947C9.96086 5.35902 9.91191 5.75948 10.1534 6.03392L15.4036 12L10.1534 17.9661C9.91191 18.2405 9.96086 18.641 10.2627 18.8605C10.5646 19.0801 11.0051 19.0356 11.2466 18.7611L16.8466 12.3975C17.0511 12.1651 17.0511 11.8349 16.8466 11.6025L11.2466 5.23885C11.0051 4.96441 10.5646 4.91992 10.2627 5.13947Z'
                fill='#898E96'
              />
            </svg>
          </button>
        </div>
      </div>

      {weeks.map(day => (
        <div key={day} className='mb-2 text-center text-xs font-normal not-italic leading-4 text-grey-2'>
          {day}
        </div>
      ))}

      {days.map((day, index) => {
        const meetings =
          meetingsForDay && meetingsForDay.filter(meeting => day.isSame(meeting.date, 'day')).slice(0, 3);

        return (
          <div
            className={cn(
              day.month() === currentMonth?.month() ? 'text-black' : 'text-grey-4',
              'grid h-11 w-[36.3px] grid-rows-[6px_30px_2px_6px] justify-items-center text-base font-normal leading-6',
            )}
            key={index}
          >
            <p
              className={cn(
                day.isSame(today, 'day') && 'rounded-full bg-main-light',
                'col-[1_/_1] row-[2_/_2] flex h-8 w-8 items-center justify-center',
              )}
            >
              {day.format('D')}
            </p>

            {meetings && (
              <ul className='col-[1_/_1] row-[3_/_5] flex items-center gap-1'>
                {meetings.map((meeting, i) => (
                  <li key={i} className={cn(getMeetingStatusColor(meeting.status), 'h-2 w-2 rounded-full')} />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};
