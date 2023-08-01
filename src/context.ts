const getLocaleByHost = () => {
  const host = window.location.host
  console.log(import.meta.env.VITE_RU_HOSTS.split(',').includes(host))
  return import.meta.env.VITE_RU_HOSTS.split(',').includes(host) ? 'ru' : 'en'
}

const locale =
  import.meta.env.MODE === 'development' ? document.documentElement.lang : getLocaleByHost()

const createContext = () => {
  return {
    locale,
    defaultTimezone: locale === 'en' ? 'Europe/Berlin' : 'Europe/Moscow',
    defaultTimezoneSuffix: locale === 'en' ? 'CET' : 'МСК',
    defaultDateTimeFormat: locale === 'en' ? 'MMM D, YYYY HH:mm' : 'D MMMM YYYY, HH:mm',
    defaultTimeFormat: 'HH:mm',
    defaultDateFormat: locale === 'en' ? 'MMM D' : 'D MMMM'
  }
}

export default createContext()
