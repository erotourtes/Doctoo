import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import weekdayPlugin from 'dayjs/plugin/weekday';

import BigCalendarBody from './BigCalendarBody';
import BigCalendarHeader from './BigCalendarHeader';
import { useState } from 'react';
import type { AppointmentsListItemProps } from '../AppointmentsWidget/AppointmentsListItem';

type BigCalendar = {
  chooseDate: React.Dispatch<React.SetStateAction<Date>>;
  setAppointmentsForDay: React.Dispatch<React.SetStateAction<AppointmentsListItemProps[]>>;
  meetingsForDay: AppointmentsListItemProps[];
};

export default function BigCalendar({ chooseDate, meetingsForDay, setAppointmentsForDay }: BigCalendar) {
  dayjs.extend(weekdayPlugin);
  const [currentMonth, setCurrentMonth] = useState<Dayjs | null>(dayjs());

  return (
    <time className='flex flex-col gap-y-4'>
      <BigCalendarHeader currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />

      <BigCalendarBody
        currentMonth={currentMonth}
        meetingsForDay={meetingsForDay}
        chooseDate={chooseDate}
        setAppointmentsForDay={setAppointmentsForDay}
      />
    </time>
  );
}
