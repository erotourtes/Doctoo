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
      <BigCalendarBody currentMonth={currentMonth} />
    </time>
  );
}
