import { useMemoize } from "@vueuse/core";
import { getEvent } from "@/api/eventsApi";
import { type Event } from "@/interfaces/Event";

const getEventMemoized = useMemoize(
  async (id: number, locale: string): Promise<Event> => getEvent(id, locale)
);

const useGetEventMemoized = () => {
  return { getEventMemoized };
};

export { useGetEventMemoized };
