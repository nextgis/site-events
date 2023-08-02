import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// https://vitejs.dev/config/

export default ({ mode }: { mode: any }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  const configOptions = {
    plugins: [
      vue({
        template: { transformAssetUrls }
      }),
      quasar({
        sassVariables: 'src/quasar-variables.sass'
      }),
      VueI18nPlugin({
        include: [resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/**')],
        strictMessage: false,
        runtimeOnly: false
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/wp-json/ng/v1/': {
          target: process.env.VITE_API_URL_RU,
          changeOrigin: true,
          secure: false
        }
      }
    }
  }

  return defineConfig(configOptions)
}
