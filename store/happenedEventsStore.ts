import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHappenedEventsStore = defineStore('happenedEvents', () => {
  const happenedEvents = ref([])
  const isLoading = ref(false)
  const isReady = ref(false)
  const error = ref(undefined)

  function $reset() {
    happenedEvents.value = []
    isLoading.value = false
    isReady.value = false
    error.value = undefined
  }

  return { happenedEvents, isLoading, isReady, error, $reset }
})
