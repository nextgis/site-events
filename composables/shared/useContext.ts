const useContext = () => {
  const { locale } = useI18n();
  const defaultTimeFormat = "HH:mm";

  const defaultTimezone = computed(() =>
    locale.value === "en" ? "Europe/Berlin" : "Europe/Moscow"
  );
  const defaultDateTimeFormat = computed(() =>
    locale.value === "en" ? "MMM D, YYYY HH:mm" : "D MMMM YYYY, HH:mm"
  );

  const defaultTimezoneSuffix = computed(() =>
    locale.value === "en" ? "CET" : "МСК"
  );
  const defaultDateFormat = computed(() =>
    locale.value === "en" ? "MMM D" : "D MMMM"
  );

  return {
    defaultTimezone,
    defaultDateTimeFormat,
    defaultTimezoneSuffix,
    defaultTimeFormat,
    defaultDateFormat,
  };
};

export { useContext };
