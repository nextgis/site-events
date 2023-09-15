<template>
  <div class="app-page">
    <h1 class="text-h3 q-pt-xl q-pb-xl">{{ t('event.schedule') }}</h1>
    <div class="row">
      <div class="col col-md-8">
        <EventList
          :events="upcomingEvents"
          type="upcoming"
          :is-loading="isLoading"
          :is-failed="!!error"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useUpcomingEventsStore } from '@/modules/events/upcomingEventsStore'
import { useAsyncStateToStore } from '@/shared/composables/useAsyncStateToStore'
import { getEvents } from '@/modules/events/api/eventsApi'
import EventList from '@/modules/events/components/EventList.vue'

const { t } = useI18n()
const upcomingEventsStore = useUpcomingEventsStore()
const { upcomingEvents, isLoading, error } = storeToRefs(upcomingEventsStore)
useAsyncStateToStore(
  async () => getEvents({ isHappened: false, sorting: 'asc' }),
  upcomingEventsStore,
  'upcomingEvents',
  []
)
</script>

<style scoped></style>
