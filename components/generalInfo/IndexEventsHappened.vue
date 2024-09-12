<template>
  <article
    class="index-events-happened index-article"
    v-if="happenedEvents && happenedEvents.length > 0"
  >
    <h2 class="text-h4 q-mb-xl">
      <NuxtLink :to="localePath('/happened')">{{
        t("event.eventsHappened")
      }}</NuxtLink>
    </h2>

    <div class="row">
      <div class="col col-md-8 col-lg-6">
        <EventList
          v-if="lastHappenedEvents"
          :events="lastHappenedEvents"
          type="happened"
          :is-loading="isLoading"
          :is-failed="!!error"
        />
        <NuxtLink
          v-if="happenedEvents.length > 5"
          class="text-link text-subtitle1 text-weight-medium inline items-center q-mt-md"
          :to="localePath('/happened')"
        >
          {{ t("event.goToEventsHappened") }}
          <q-icon class="q-ml-xs" name="mdi-arrow-right text-h6"></q-icon>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useHappenedEventsStore } from "@/store/happenedEventsStore";
import EventList from "@/components/events/EventList.vue";
import { computed, type ComputedRef } from "vue";
import type { Event } from "@/interfaces/Event";

const localePath = useLocalePath();
const { t } = useI18n();

const happenedEventsStore = useHappenedEventsStore();
const { happenedEvents, isLoading, error } = storeToRefs(happenedEventsStore);
const lastHappenedEvents: ComputedRef<Event[]> = computed(() =>
  happenedEvents.value.slice(0, 5)
);
</script>

<style scoped lang="scss">
.index-events-happened {
  position: relative;
}
</style>
