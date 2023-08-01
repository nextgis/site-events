import { createI18n } from 'vue-i18n'
import context from '@/context'
import messages from '@intlify/unplugin-vue-i18n/messages'

// window.location.host === 'nextgis.ru' ? 'ru' : 'en'

const i18n = createI18n({
  legacy: false,
  globalInjection: false,
  locale: context.locale,
  fallbackLocale: 'en',
  availableLocales: ['en', 'ru'],
  messages: messages
})

export default i18n
