<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAsyncStateToStore } from '@/shared/composables/useAsyncStateToStore'
import { useGeneralInfoStore } from '@/modules/generalInfo/generalInfoStore'
import { getGeneralInfo } from '@/modules/generalInfo/api/generalInfoApi'

const generalInfoStore = useGeneralInfoStore()
useAsyncStateToStore(getGeneralInfo, generalInfoStore, 'generalInfo', {})
const {
  generalInfo,
  isLoading: isGeneralInfoLoading,
  error: generalInfoError
} = storeToRefs(generalInfoStore)

const isReady: ComputedRef<boolean> = computed(() => !!generalInfo && !isGeneralInfoLoading.value)
const isLoading: ComputedRef<boolean> = computed(() => isGeneralInfoLoading.value)
const isFailed: ComputedRef<boolean> = computed(() => !!generalInfoError.value)

const route = useRoute()
const layout: ComputedRef<string> = computed(() => {
  const routeLayout = route?.meta?.layout
  if (routeLayout) {
    return `The${routeLayout}Layout`
  }
  return 'div'
})
</script>

<template>
  <component :is="layout" v-bind="route?.meta?.layoutProps || {}">
    <q-inner-loading v-if="isLoading" showing color="primary" />
    <div class="text-center" v-else-if="isFailed">
      Something went wrong. Try to reload the page.
    </div>
    <RouterView v-else-if="isReady" />
  </component>
</template>
