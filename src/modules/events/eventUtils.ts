import { timestampToLocal, isSame, formatDate, formatTime } from '@/shared/utils/dateTimeUtils'
import context from '@/context'

const formatEventDates = (dateStart: number, dateEnd: number): string => {
  const dateStartLocal = timestampToLocal(dateStart)
  const dateEndLocal = timestampToLocal(dateEnd)
  const yearStart = dateStartLocal.year()
  const yearEnd = dateEndLocal.year()
  if (isSame(dateStartLocal, dateEndLocal, 'day'))
    return `${formatDate(dateStartLocal)} ${yearStart}, ${formatTime(dateStartLocal)} 
    – ${formatTime(dateEndLocal)} (${context.defaultTimezoneSuffix})`
  else if (yearStart === yearEnd) {
    return `${formatDate(dateStartLocal)} – ${formatDate(dateEndLocal)} ${yearStart}`
  } else {
    return `${formatDate(dateStartLocal)} ${yearStart} – ${formatDate(dateEndLocal)} ${yearEnd}`
  }
}

export { formatEventDates }
