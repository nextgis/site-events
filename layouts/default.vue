<template>
  <q-layout class="the-default-layout" view="hhh LpR fff">
    <TheHeader class="the-default-layout__header text-black q-mt-md" />
    <q-page-container class="q-px-md">
      <q-page class="container-md">
        <slot></slot>
      </q-page>
    </q-page-container>
    <TheFooter />
  </q-layout>
</template>

<script lang="ts">
export default {
  name: "TheDefaultLayout",
};
</script>

<script setup lang="ts">
import TheHeader from "@/components/shared/TheHeader.vue";
import TheFooter from "@/components/shared/TheFooter.vue";
</script>

<style lang="scss" scoped>
.the-default-layout {
  &__header {
    @media (max-width: $breakpoint-md-min) {
      margin-top: 0 !important;
    }
  }
}
</style>
