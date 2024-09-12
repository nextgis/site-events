<script setup lang="ts">
import { useAsyncDataToStore } from "@/composables/shared/useAsyncDataToStore";
import { useUpcomingEventsStore } from "@/store/upcomingEventsStore";
import { useHappenedEventsStore } from "@/store/happenedEventsStore";
import { getEvents } from "@/api/eventsApi";
import IndexHero from "@/components/generalInfo/IndexHero.vue";
import IndexEventsUpcoming from "@/components/generalInfo/IndexEventsUpcoming.vue";
import IndexEventsHappened from "@/components/generalInfo/IndexEventsHappened.vue";
import IndexSubscription from "@/components/generalInfo/IndexSubscription.vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

definePageMeta({
  layout: "no-header",
  isFluid: true,
});

useHead({
  title: () =>
    `${import.meta.env.VITE_DEFAULT_APP_TITLE} — ${t("app.seotitle")}`,
});

const upcomingEventsStore = useUpcomingEventsStore();
useAsyncDataToStore(
  async () =>
    getEvents({ isHappened: false, sorting: "asc", locale: locale.value }),
  upcomingEventsStore,
  "upcomingEvents"
);

const happenedEventsStore = useHappenedEventsStore();
useAsyncDataToStore(
  async () =>
    getEvents({ isHappened: true, sorting: "desc", locale: locale.value }),
  happenedEventsStore,
  "happenedEvents"
);
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
