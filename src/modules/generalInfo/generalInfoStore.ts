import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { GeneralInfo } from '@/modules/generalInfo/interfaces/GeneralInfo'

export const useGeneralInfoStore = defineStore('generalInfo', () => {
  const generalInfo: Ref<GeneralInfo | undefined> = ref(undefined)
  const isLoading = ref(false)
  const isReady = ref(false)
  const error = ref(undefined)

  function $reset() {
    generalInfo.value = undefined
    isLoading.value = false
    isReady.value = false
    error.value = undefined
  }

  return { generalInfo, isLoading, isReady, error, $reset }
})
