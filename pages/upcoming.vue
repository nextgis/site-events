<template>
  <div class="app-page">
    <h1 class="text-h3 q-pt-xl q-pb-xl">{{ t("event.schedule") }}</h1>
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
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { useUpcomingEventsStore } from "@/store/upcomingEventsStore";
import { useAsyncDataToStore } from "@/composables/shared/useAsyncDataToStore";
import { getEvents } from "@/api/eventsApi";
import EventList from "@/components/events/EventList.vue";

const { t, locale } = useI18n();
definePageMeta({
  layout: "default",
});
useHead({
  title: () =>
    `${t("event.scheduleDetailed")} — ${
      import.meta.env.VITE_DEFAULT_APP_TITLE
    }`,
});

const upcomingEventsStore = useUpcomingEventsStore();
const { upcomingEvents, isLoading, error } = storeToRefs(upcomingEventsStore);
useAsyncDataToStore(
  async () =>
    getEvents({ isHappened: false, sorting: "asc", locale: locale.value }),
  upcomingEventsStore,
  "upcomingEvents"
);
</script>

<style scoped></style>
