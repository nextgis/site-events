import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Dialog } from 'quasar'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
import iconSet from 'quasar/icon-set/mdi-v7'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { registerLayouts } from '@/layouts/registerLayouts'

// @ts-expect-error
import VueYtframe from 'vue3-ytframe'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueYtframe)
app.use(Quasar, {
  iconSet,
  plugins: {
    Dialog
  }
})

registerLayouts(app)

app.mount('#app')
