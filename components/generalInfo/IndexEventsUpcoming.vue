<template>
  <article class="index-events-upcoming index-article">
    <h2 class="text-h4 q-mb-lg">
      <NuxtLink :to="localePath('/upcoming')">{{
        t("event.schedule")
      }}</NuxtLink>
    </h2>
    <div class="row">
      <div class="col-12 col-md-8">
        <EventList
          v-if="upcomingEvents"
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
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

import { useUpcomingEventsStore } from "@/store/upcomingEventsStore";
import EventList from "@/components/events/EventList.vue";

const localePath = useLocalePath();

const { t } = useI18n();
const upcomingEventsStore = useUpcomingEventsStore();
const { upcomingEvents, isLoading, error } = storeToRefs(upcomingEventsStore);
</script>

<style scoped lang="scss">
.index-events-upcoming {
  position: relative;
}
</style>
