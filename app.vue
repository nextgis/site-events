<template>
  <NuxtLayout class="app-layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useAsyncDataToStore } from "./composables/shared/useAsyncDataToStore";
import { useGeneralInfoStore } from "@/store/generalInfoStore";
import { getGeneralInfo } from "@/api/generalInfoApi";

const { locale } = useI18n();
const generalInfoStore = useGeneralInfoStore();

useAsyncDataToStore(
  async () => getGeneralInfo(locale.value),
  generalInfoStore,
  "generalInfo"
);
</script>

<style lang="scss">
@use "@/assets/styles/main.scss" as *;
</style>
