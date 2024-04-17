import { Dayjs } from 'dayjs';

export const getMonthDays = (currentMonth: Dayjs) => {
  const firstDayOfMonth = currentMonth.startOf('month');
  const firstDayOfWeek = firstDayOfMonth.startOf('week').weekday(1);
  const lastDayOfMonth = currentMonth.endOf('month').endOf('week');

  const days = [];
  let currentDay = firstDayOfWeek;

  while (currentDay.isBefore(lastDayOfMonth)) {
    days.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }

  while (currentDay.day() !== 1) {
    days.push(currentDay);
    currentDay = currentDay.add(1, 'day');
  }

  return days;
};