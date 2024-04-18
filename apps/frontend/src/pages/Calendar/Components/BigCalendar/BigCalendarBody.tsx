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
  console.log(meetingsForDay);

  return (
    <div className='flex w-fit flex-col'>
      <div className='grid grid-cols-7'>
        {weeks.map(day => (
          <time key={day} className='text-grey-2 mb-2 pr-4 text-right text-xs font-normal not-italic leading-4'>
            {day}
          </time>
        ))}
      </div>

      <div className='bg-background grid h-full grid-cols-7 rounded-xl'>
        {days.map((day, index) => {
          const meetings =
            meetingsForDay && meetingsForDay.filter(meeting => day.isSame(meeting.date, 'day')).slice(0, 3);

          const calls =
            meetings && meetings.length > 1
              ? 'Calls'
              : meetings!.length === 1
                ? meetings![0].status.length > 11
                  ? `${meetings![0].status.substring(0, 11)}...`
                  : meetings![0].status
                : '';

          return (
            <div
              className={`grid-rows-auto grid h-[116px] w-[116px] text-base font-normal leading-6
              ${day.month() === currentMonth?.month() ? 'text-text' : 'text-grey-3'}
               hover:ring-main m-1
               cursor-pointer select-none rounded-xl
               bg-white
               hover:ring-1
            `}
              key={index}
            >
              <time
                className={`mr-[10px] mt-[10px] flex self-start justify-self-end px-2 py-1
                ${day.isSame(today, 'day') && 'bg-main rounded-full text-white'}
              `}
              >
                {day.format('D')}
              </time>

              {meetings && meetings.length > 0 && (
                <div
                  key={index}
                  className={`bg-main-light mb-3 flex h-7 w-24 items-center ${calls !== 'Calls' ? 'justify-center' : 'justify-between'} self-end justify-self-center rounded-2xl px-3 py-1
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
