import { DateTime } from 'luxon';

export const getEventDate = (eventStartTime: string) => {
  return eventStartTime ? DateTime.fromISO(eventStartTime).toFormat('dd MMM y') : "No Date Specified";
}
export const getEventTime = (eventStartTime: string, eventEndTime: string) => {
  return eventStartTime ? DateTime.fromISO(eventStartTime).toLocaleString(DateTime.TIME_SIMPLE)
    + (eventEndTime ? " - " + DateTime.fromISO(eventEndTime).toLocaleString(DateTime.TIME_SIMPLE) : "")
    : "No time specified";
}