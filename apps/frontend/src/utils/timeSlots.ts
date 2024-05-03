import dayjs from 'dayjs';
import type { DoctorSchedule } from '../dataTypes/Doctor';
import { generateLocalDateFromUTCHour } from './dateUtils';

export function generateTimeSlots(schedule: DoctorSchedule) {
  const endsWork = generateLocalDateFromUTCHour(schedule.endsWorkHourUTC, true);
  if (endsWork.isBefore(dayjs())) return [];
  const slots = [];
  for (let i = schedule.startsWorkHourUTC; i < schedule.endsWorkHourUTC; i++) {
    const current = generateLocalDateFromUTCHour(i, true);
    if (current.isBefore(dayjs()) || schedule.unavailableTimeSlots?.includes(current.toISOString())) continue;
    slots.push(current.toISOString());
  }
  return slots;
}
