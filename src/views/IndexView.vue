<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { storeToRefs } from 'pinia'
import { useAsyncStateToStore } from '@/shared/composables/useAsyncStateToStore'
import { useUpcomingEventsStore } from '@/modules/events/upcomingEventsStore'
import { useHappenedEventsStore } from '@/modules/events/happenedEventsStore'
import { getEvents } from '@/modules/events/api/eventsApi'
import { useGeneralInfoStore } from '@/modules/generalInfo/generalInfoStore'
import { getGeneralInfo } from '@/modules/generalInfo/api/generalInfoApi'
import IndexHero from '@/modules/generalInfo/components/IndexHero.vue'
import IndexEventsUpcoming from '@/modules/generalInfo/components/IndexEventsUpcoming.vue'
import IndexEventsHappened from '@/modules/generalInfo/components/IndexEventsHappened.vue'
import IndexSubscription from '@/modules/generalInfo/components/IndexSubscription.vue'

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

const upcomingEventsStore = useUpcomingEventsStore()
useAsyncStateToStore(
  async () => getEvents({ isHappened: false }),
  upcomingEventsStore,
  'upcomingEvents',
  []
)

const happenedEventsStore = useHappenedEventsStore()
useAsyncStateToStore(
  async () => getEvents({ isHappened: true }),
  happenedEventsStore,
  'happenedEvents',
  []
)
</script>

<template>
  <q-inner-loading v-if="isLoading" showing color="primary" />
  <div class="text-center" v-else-if="isFailed">Something went wrong. Try to reload the page.</div>
  <template v-else-if="isReady">
    <div class="container-md app-page">
      <IndexHero />
      <IndexEventsUpcoming />
    </div>
    <IndexSubscription id="subscribe" class="q-px-md q-mx-nmd" />
    <div class="container-md">
      <IndexEventsHappened />
    </div>
  </template>
</template>
