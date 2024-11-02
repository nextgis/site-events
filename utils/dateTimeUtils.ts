import dayjs, { type Dayjs, type OpUnitType, type UnitType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import('dayjs/locale/ru');

type AppDate = Dayjs;
dayjs.extend(utc);
dayjs.extend(timezone);

const getTimestamp = (date: AppDate): number => date.valueOf();
const parseUTCDate = (date: string | number): AppDate => dayjs.utc(date);

const timestampToDate = ({
  timestamp,
  locale,
  timezone,
}: {
  timestamp: number;
  locale: string;
  timezone: string;
}): AppDate => {
  return dayjs.utc(timestamp).tz(timezone).locale(locale);
};

const formatDate = ({ date, format }: { date: AppDate; format: string }): string => date.format(format);

const formatTime = ({ date, format }: { date: AppDate; format: string }): string => date.format(format);

const isBefore = (date: AppDate): boolean => dayjs().isBefore(date);
const isAfter = (date: AppDate, unit: OpUnitType | undefined): boolean => dayjs().isAfter(date, unit);
const isSame = (date1: AppDate, date2: AppDate, unit: UnitType | undefined = undefined): boolean =>
  date1.isSame(date2, unit);

const getUserTimezone = () => dayjs.tz.guess();

const getUtcOffset = () => dayjs().utcOffset();

export {
  getTimestamp,
  parseUTCDate,
  timestampToDate,
  isBefore,
  isAfter,
  isSame,
  formatDate,
  formatTime,
  getUserTimezone,
  getUtcOffset,
  type AppDate,
};
