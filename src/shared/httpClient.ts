import axios from 'axios'
import context from '@/context'

const httpClient = axios.create({
  baseURL: `${
    context.locale === 'ru' ? import.meta.env.VITE_API_URL_RU : import.meta.env.VITE_API_URL_EN
  }/wp-json/ng/v1/`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default httpClient
