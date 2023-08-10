<template>
  <article class="index-events-upcoming index-article">
    <h2 class="text-h4 q-mb-lg">
      <RouterLink :to="{ name: 'events_upcoming' }">{{ t('event.schedule') }}</RouterLink>
    </h2>
    <div class="row">
      <div class="col-12 col-md-8">
        <EventList
          :events="upcomingEvents"
          type="upcoming"
          :is-loading="isLoading"
          :is-failed="!!error"
        />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { useUpcomingEventsStore } from '@/modules/events/upcomingEventsStore'
import EventList from '@/modules/events/components/EventList.vue'

const { t } = useI18n()
const upcomingEventsStore = useUpcomingEventsStore()
const { upcomingEvents, isLoading, error } = storeToRefs(upcomingEventsStore)
</script>

<style scoped lang="scss">
.index-events-upcoming {
  position: relative;
}
</style>
