import dayjs, { Dayjs } from 'dayjs';
import weekdayPlugin from 'dayjs/plugin/weekday';

import BigCalendarBody from './BigCalendarBody';
import BigCalendarHeader from './BigCalendarHeader';
import { useState } from 'react';

export default function BigCalendar() {
  dayjs.extend(weekdayPlugin);
  const [currentMonth, setCurrentMonth] = useState<Dayjs | null>(dayjs());

  return (
    <time className='flex flex-col gap-y-4'>
      <BigCalendarHeader currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <BigCalendarBody
        currentMonth={currentMonth}
        meetingsForDay={[
          { date: dayjs(), status: 'Dr. Morethantenwords' },
          { date: new Date(2024, 3, 17), status: 'Dr. Jenkins' },
          { date: new Date(2024, 3, 19), status: 'Test2' },
          { date: new Date(2024, 3, 19), status: 'Test3' },
        ]}
      />
    </time>
  );
}
