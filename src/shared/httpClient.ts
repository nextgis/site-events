import axios from 'axios'

const httpClient = axios.create({
  baseURL: `${import.meta.env.DEV ? import.meta.env.VITE_API_URL_RU : ''}/wp-json/ng/v1/`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default httpClient
