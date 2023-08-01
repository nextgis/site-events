import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Event } from '@/modules/events/interfaces/Event'

export const useUpcomingEventsStore = defineStore('upcomingEvents', () => {
  const upcomingEvents: Ref<Event[]> = ref([])
  const isLoading = ref(false)
  const isReady = ref(false)
  const error = ref(undefined)

  function $reset() {
    upcomingEvents.value = []
    isLoading.value = false
    isReady.value = false
    error.value = undefined
  }

  function getEvent(id: number): Event | undefined {
    return upcomingEvents.value.find((event: Event) => {
      return event.id === id
    })
  }

  return { upcomingEvents, isLoading, isReady, error, $reset, getEvent }
})
