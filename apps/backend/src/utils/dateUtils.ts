export function generateDate(hour: number) {
  const currentDate = new Date();
  currentDate.setHours(hour, 0, 0, 0);

  return currentDate;
}

export function getDateWithDaysOffset(originalDate: Date, offsetDays: number) {
  const originalUnixTime = originalDate.valueOf();
  const unixTimeWithOffset = originalUnixTime + offsetDays * 24 * 60 * 60 * 1000;
  return new Date(unixTimeWithOffset);
}

export function getMidnightOfDate(originalDate: Date) {
  const newDate = new Date(originalDate);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}
