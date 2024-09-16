export const getBaseApiUrl = (locale: string) => {
  const config = useRuntimeConfig();
  return locale === 'ru' ? config.public.apiUrlRu : config.public.apiUrlEn;
};
