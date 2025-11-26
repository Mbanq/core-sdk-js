import moment from 'moment-timezone';

export default (
  date: Date = new Date(),
  isUtc: boolean = false,
  timezone: string = process.env.TIMEZONE ?? 'Europe/Berlin'
): moment.Moment => {
  return moment(date.getTime()).tz(timezone).utc(!isUtc);
};
