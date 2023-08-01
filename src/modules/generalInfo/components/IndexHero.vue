<template>
  <article
    v-if="generalInfo"
    class="index-hero index-article q-px-lg q-py-xl flex column justify-center items-center bg-dark text-white"
  >
    <div class="index-hero__bg"></div>
    <TheHeader class="text-white q-dark" />
    <div class="inedx-hero__content text-center">
      <h1 class="text-h3" v-html="generalInfo.hero_title" />
      <div class="text-h6 q-mt-md" v-html="generalInfo.hero_description" />
      <q-btn
        no-caps
        color="white"
        text-color="dark"
        size="xl"
        class="index-hero__button q-mt-xl"
        to="#subscribe"
        >{{ generalInfo.hero_button_text }}</q-btn
      >
    </div>
  </article>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useGeneralInfoStore } from '@/modules/generalInfo/generalInfoStore'
import TheHeader from '@/shared/components/TheHeader.vue'

const generalInfoStore = useGeneralInfoStore()
const { generalInfo } = storeToRefs(generalInfoStore)
</script>

<style scoped lang="scss">
.index-hero {
  position: relative;
  height: 653px;
  margin-left: -24px;
  margin-right: -24px;

  &__bg {
    position: absolute;
    top: -14px;
    right: 24px;
    width: calc(100% - 24px);
    height: 723px;
    overflow: hidden;
    background: url('/img/events_hero_bg.svg') top right no-repeat;

    @media (max-width: $breakpoint-md-min) {
      background: url('/img/events_hero_bg_md.svg') top right no-repeat;
    }
  }

  &__bg-pic {
    position: absolute;
    right: 24px;
    top: 0;
  }

  &__content {
    position: relative;
  }

  &__button {
    width: 300px;
    height: 72px;
  }

  :deep(.the-header) {
    left: 24px;
    right: 24px;
  }
}
</style>
