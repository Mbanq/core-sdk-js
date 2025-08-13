import moment from 'moment-timezone';

export default (
  date: Date = new Date(),
  isUtc: boolean = false,
  timezone: string = process.env.TIMEZONE ?? 'Europe/Berlin'
): moment.Moment => {
  return moment(date.getTime()).tz(timezone).utc(!isUtc);
};

export const nowDateStr = (
  date: Date = new Date(),
  timezone: string = process.env.TIMEZONE ?? 'Europe/Berlin'
): string => {
  return moment(date.getTime()).tz(timezone).toISOString().slice(0, 10);
};
