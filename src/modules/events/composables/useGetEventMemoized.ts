import { useMemoize } from '@vueuse/core'
import { getEvent } from '@/modules/events/api/eventsApi'
import { type Event } from '../interfaces/Event'

const getEventMemoized = useMemoize(async (id: number): Promise<Event> => getEvent(id))

const useGetEventMemoized = () => {
  return { getEventMemoized }
}

export { useGetEventMemoized }
