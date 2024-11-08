// import httpClient from "@/api/httpClient";
import { type UserData } from '@/interfaces/UserData';
import { getTimestamp, parseUTCDate } from '@/utils/dateTimeUtils';
import type { EventFromApi, Event } from '@/interfaces/Event';
import axios from 'axios';
import { getBaseApiUrl } from './getBaseApiUrl';

interface getEventsOptions {
  isHappened: boolean;
  sorting: 'asc' | 'desc';
  locale: string;
}

const formatEvent = (event: EventFromApi): Event => {
  return {
    ...event,
    date_start: getTimestamp(parseUTCDate(event.date_start)),
    date_end: getTimestamp(parseUTCDate(event.date_end)),
  };
};

const getEvents = ({ isHappened, sorting, locale }: getEventsOptions) => {
  const baseUrl = getBaseApiUrl(locale);
  return axios
    .get(`${baseUrl}/wp-json/ng/v1/events?happened=${isHappened}&sorting=${sorting}`)
    .then((resp) => resp.data?.map((event: EventFromApi) => formatEvent(event)));
};

const getEvent = async (id: number, locale: string) => {
  const baseUrl = getBaseApiUrl(locale);
  return axios.get(`${baseUrl}/wp-json/ng/v1/event/${id}`).then((resp) => resp.data && formatEvent(resp.data));
};

const subscribeToEvent = ({
  id,
  userData,
  locale,
  refEventId,
}: {
  id: number;
  userData: UserData;
  locale: string;
  refEventId?: number | null;
}) => {
  const baseUrl = getBaseApiUrl(locale);
  return axios
    .post(`${baseUrl}/wp-json/ng/v1/event/${id}/subscribe`, { ...userData, ref_event_id: refEventId })
    .then((resp) => resp.data);
};

export { getEvents, getEvent, subscribeToEvent };
