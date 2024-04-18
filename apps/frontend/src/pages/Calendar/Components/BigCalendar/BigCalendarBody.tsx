import dayjs, { Dayjs } from 'dayjs';
import { getMeetingStatusColor } from '@/utils/getMeetingStatusColor';
import { getMonthDays } from '@/utils/getMonthDays';

const weeks = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

interface BigCalendarBodyProps {
  meetingsForDay?: {
    date: Date | Dayjs;
    status: string;
  }[];
  currentMonth: Dayjs | null;
}

export default function BigCalendarBody({ meetingsForDay, currentMonth }: BigCalendarBodyProps) {
  const days = getMonthDays(currentMonth as Dayjs);
  const today = dayjs();

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between'>
        {weeks.map(day => (
          <div key={day} className='text-grey-2 mb-2 text-center text-xs font-normal not-italic leading-4'>
            {day}
          </div>
        ))}
      </div>
      <div className='grid w-full max-w-[302px] grid-cols-[repeat(7,1fr)] rounded-xl bg-white p-6'>
        {days.map((day, index) => {
          const meetings =
            meetingsForDay && meetingsForDay.filter(meeting => day.isSame(meeting.date, 'day')).slice(0, 3);

          return (
            <div
              className={`grid h-11 w-[36.3px] grid-rows-[6px_30px_2px_6px] justify-items-center text-base font-normal leading-6
              ${day.month() === currentMonth?.month() ? 'text-black' : 'text-grey-4'}
            `}
              key={index}
            >
              <p
                className={`col-[1_/_1] row-[2_/_2] flex h-8 w-8 items-center justify-center 
                ${day.isSame(today, 'day') && 'bg-main-light rounded-full'}
              `}
              >
                {day.format('D')}
              </p>

              {meetings && (
                <ul className='col-[1_/_1] row-[3_/_5] flex items-center gap-1'>
                  {meetings.map((meeting, i) => (
                    <li key={i} className={`h-2 w-2 rounded-full ${getMeetingStatusColor(meeting.status)}`} />
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
