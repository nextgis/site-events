import { getUserTimezone, getUtcOffset } from '@/utils/dateTimeUtils';
import { useI18n } from '#imports';

const useContext = () => {
  const { locale } = useI18n();
  const defaultTimeFormat = 'HH:mm';

  const defaultTimezone = computed(() => getUserTimezone());
  const defaultDateTimeFormat = computed(() => (locale.value === 'en' ? 'MMM D, YYYY HH:mm' : 'D MMMM YYYY, HH:mm'));

  const defaultTimezoneSuffix = computed(() => {
    const utcOffset = getUtcOffset();
    const formattedUtcOffset =
      utcOffset % 60 === 0 ? utcOffset / 60 : `${Math.floor(utcOffset / 60)}:${utcOffset % 60}`;
    return utcOffset < 0 ? `UTC${formattedUtcOffset}` : `UTC+${formattedUtcOffset}`;
  });
  const defaultDateFormat = computed(() => (locale.value === 'en' ? 'MMM D' : 'D MMMM'));

  return {
    defaultTimezone,
    defaultDateTimeFormat,
    defaultTimezoneSuffix,
    defaultTimeFormat,
    defaultDateFormat,
  };
};

export { useContext };
