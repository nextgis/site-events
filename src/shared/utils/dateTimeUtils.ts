import dayjs, { type Dayjs, type UnitType } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import context from '@/context'
import('dayjs/locale/ru')

type AppDate = Dayjs
dayjs.extend(utc)
dayjs.extend(timezone)

const getTimestamp = (date: AppDate): number => date.valueOf()
const parseUTCDate = (date: string | number): AppDate => dayjs.utc(date)
const timestampToLocal = (timestamp: number): AppDate => {
  return dayjs.utc(timestamp).tz(context.defaultTimezone).locale(context.locale)
}

const formatDate = (date: AppDate): string => date.format(context.defaultDateFormat)

const formatTime = (date: AppDate): string => date.format(context.defaultTimeFormat)

const isBefore = (date: AppDate): boolean => dayjs().isBefore(date)
const isAfter = (date: AppDate): boolean => dayjs().isAfter(date)
const isSame = (date1: AppDate, date2: AppDate, unit: UnitType | undefined = undefined): boolean =>
  date1.isSame(date2, unit)

export {
  getTimestamp,
  parseUTCDate,
  timestampToLocal,
  isBefore,
  isAfter,
  isSame,
  formatDate,
  formatTime,
  type AppDate
}
