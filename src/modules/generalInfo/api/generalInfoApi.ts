import httpClient from '@/shared/httpClient'
import type { GeneralInfo } from '../interfaces/GeneralInfo'

const getGeneralInfo = (): Promise<GeneralInfo> => {
  return httpClient.get('/events_main_info?language=en').then((resp) => resp.data)
}

export { getGeneralInfo }
