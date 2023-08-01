import httpClient from '@/shared/httpClient'
import { type UserData } from '../interfaces/UserData'
import { getTimestamp, parseUTCDate } from '@/shared/utils/dateTimeUtils'
import type { EventFromApi, Event } from '../interfaces/Event'

interface getEventsOptions {
  isHappened: boolean
}

const formatEvent = (event: EventFromApi): Event => {
  return {
    ...event,
    date_start: getTimestamp(parseUTCDate(event.date_start)),
    date_end: getTimestamp(parseUTCDate(event.date_end))
  }
}

const getEvents = ({ isHappened }: getEventsOptions) =>
  httpClient
    .get(`/events?happened=${isHappened}`)
    .then((resp) => resp.data?.map((event: EventFromApi) => formatEvent(event)))

const getEvent = async (id: number) =>
  httpClient.get(`/event/${id}`).then((resp) => resp.data && formatEvent(resp.data))

const subscribeToEvent = (id: number, userData: UserData) =>
  httpClient.post(`event/${id}/subscribe`, userData).then((resp) => resp.data)

const subscribeToAllEvents = (userData: UserData) =>
  httpClient
    .post(`event/${import.meta.env.VITE_ALL_EVENTS_ID_RU}/subscribe`, userData)
    .then((resp) => resp.data)

export { getEvents, getEvent, subscribeToEvent, subscribeToAllEvents }
