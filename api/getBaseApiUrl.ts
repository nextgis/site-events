export const getBaseApiUrl = (locale: string) =>
  locale === "ru"
    ? import.meta.env.VITE_API_URL_RU
    : import.meta.env.VITE_API_URL_EN;
