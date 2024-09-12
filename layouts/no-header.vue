<template>
  <q-layout class="the-no-header-layout" view="hhh LpR fff">
    <q-page-container class="the-no-header-layout__page-container q-px-md">
      <q-page
        class="the-no-header-layout__page q-pt-md"
        :class="isFluid ? '' : 'container-md'"
      >
        <slot></slot>
      </q-page>
    </q-page-container>
    <TheFooter />
  </q-layout>
</template>

<script lang="ts">
import TheFooter from "@/components/shared/TheFooter.vue";

export default {
  name: "TheNoHeaderLayout",
};
</script>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const isFluid = computed(() => route.meta.isFluid);
</script>

<style scoped lang="scss">
.the-no-header-layout {
  &__page-container {
    padding-top: 0 !important;
  }

  &__page {
    @media (max-width: $breakpoint-md-min) {
      padding-top: 0 !important;
    }
  }
}
</style>
