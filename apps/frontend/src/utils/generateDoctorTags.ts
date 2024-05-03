import dayjs from 'dayjs';
import type { DoctorSchedule } from '../dataTypes/Doctor';
import { generateLocalDateFromUTCHour } from './dateUtils';

export function generateDoctorTags({ schedule, rating }: { schedule?: DoctorSchedule; rating?: number }) {
  const tags = [];
  if (schedule) {
    const startsWorking = generateLocalDateFromUTCHour(schedule.startsWorkHourUTC);
    const endsWorking = generateLocalDateFromUTCHour(schedule.endsWorkHourUTC);
    const now = dayjs();
    const nextPossibleSlot = dayjs()
      .set('hour', dayjs().hour() + 1)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .toISOString();
    if (
      startsWorking.diff(now, 'hours') <= 1 &&
      now < endsWorking &&
      !schedule.unavailableTimeSlots?.includes(nextPossibleSlot)
    )
      tags.push('Available now');
  }
  if (rating && rating >= 4.5) tags.push('Top doctor');
  return tags;
}
