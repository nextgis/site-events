<template>
  <div class="app-page">
    <h1 class="text-h3 q-pt-xl q-pb-xl">{{ t('event.eventsHappened') }}</h1>
    <div class="row">
      <div class="col col-md-8">
        <EventList
          :events="happenedEvents"
          type="happened"
          class="q-pt-md"
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
import { useHappenedEventsStore } from '@/modules/events/happenedEventsStore'
import { useAsyncStateToStore } from '@/shared/composables/useAsyncStateToStore'
import { getEvents } from '@/modules/events/api/eventsApi'
import EventList from '@/modules/events/components/EventList.vue'

const { t } = useI18n()
const happenedEventsStore = useHappenedEventsStore()
const { happenedEvents, isLoading, error } = storeToRefs(happenedEventsStore)
useAsyncStateToStore(
  async () => getEvents({ isHappened: true, sorting: 'desc' }),
  happenedEventsStore,
  'happenedEvents',
  []
)
</script>

<style scoped></style>
