<script setup lang="ts">
import { useAsyncStateToStore } from '@/shared/composables/useAsyncStateToStore'
import { useUpcomingEventsStore } from '@/modules/events/upcomingEventsStore'
import { useHappenedEventsStore } from '@/modules/events/happenedEventsStore'
import { getEvents } from '@/modules/events/api/eventsApi'
import IndexHero from '@/modules/generalInfo/components/IndexHero.vue'
import IndexEventsUpcoming from '@/modules/generalInfo/components/IndexEventsUpcoming.vue'
import IndexEventsHappened from '@/modules/generalInfo/components/IndexEventsHappened.vue'
import IndexSubscription from '@/modules/generalInfo/components/IndexSubscription.vue'

const upcomingEventsStore = useUpcomingEventsStore()
useAsyncStateToStore(
  async () => getEvents({ isHappened: false, sorting: 'asc' }),
  upcomingEventsStore,
  'upcomingEvents',
  []
)

const happenedEventsStore = useHappenedEventsStore()
useAsyncStateToStore(
  async () => getEvents({ isHappened: true, sorting: 'desc' }),
  happenedEventsStore,
  'happenedEvents',
  []
)
</script>

<template>
  <div class="container-md">
    <IndexHero />
    <IndexEventsUpcoming />
  </div>
  <IndexSubscription id="subscribe" class="q-px-md q-mx-nmd" />
  <div class="container-md">
    <IndexEventsHappened />
  </div>
</template>
