import { timestampToDate, isSame, formatDate, formatTime } from '@/utils/dateTimeUtils';

const formatEventDates = ({
  dateStart,
  dateEnd,
  locale,
  timezone,
  timezoneSuffix,
  dateFormat,
  timeFormat,
}: {
  dateStart: number;
  dateEnd: number;
  locale: string;
  timezone: string;
  timezoneSuffix: string;
  dateFormat: 'MMM D' | 'D MMMM';
  timeFormat: string;
}): string => {
  const dateStartLocal = timestampToDate({
    timestamp: dateStart,
    locale,
    timezone,
  });
  const dateEndLocal = timestampToDate({
    timestamp: dateEnd,
    locale,
    timezone,
  });
  const yearStart = dateStartLocal.year();
  const yearEnd = dateEndLocal.year();
  if (isSame(dateStartLocal, dateEndLocal, 'day'))
    return `${formatDate({
      date: dateStartLocal,
      format: dateFormat,
    })} ${yearStart}, ${formatTime({
      date: dateStartLocal,
      format: timeFormat,
    })} 
    – ${formatTime({
      date: dateEndLocal,
      format: timeFormat,
    })} (${timezoneSuffix})`;
  else if (yearStart === yearEnd) {
    return `${formatDate({
      date: dateStartLocal,
      format: dateFormat,
    })} ${formatTime({
      date: dateStartLocal,
      format: timeFormat,
    })} – ${formatDate({
      date: dateEndLocal,
      format: dateFormat,
    })} ${formatTime({
      date: dateEndLocal,
      format: timeFormat,
    })}, ${yearStart} (${timezoneSuffix}) `;
  } else {
    return `${formatDate({
      date: dateStartLocal,
      format: dateFormat,
    })} ${yearStart} – ${formatDate({
      date: dateEndLocal,
      format: dateFormat,
    })} ${yearEnd}`;
  }
};

export { formatEventDates };
