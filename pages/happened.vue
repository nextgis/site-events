<template>
  <div class="app-page">
    <h1 class="text-h3 q-pt-xl q-pb-xl">{{ t("event.eventsHappened") }}</h1>
    <div class="row">
      <div class="col col-md-8">
        <EventList
          :events="happenedEvents"
          type="happened"
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
import { useHappenedEventsStore } from "@/store/happenedEventsStore";
import { useAsyncDataToStore } from "@/composables/shared/useAsyncDataToStore";
import { getEvents } from "@/api/eventsApi";
import EventList from "@/components/events/EventList.vue";

definePageMeta({
  layout: "default",
});

const { t, locale } = useI18n();
useHead({
  title: () =>
    `${t("event.eventsHappened")} — ${import.meta.env.VITE_DEFAULT_APP_TITLE}`,
});

const happenedEventsStore = useHappenedEventsStore();
const { happenedEvents, isLoading, error } = storeToRefs(happenedEventsStore);
useAsyncDataToStore(
  async () =>
    getEvents({ isHappened: true, sorting: "desc", locale: locale.value }),
  happenedEventsStore,
  "happenedEvents"
);
</script>

<style scoped></style>
