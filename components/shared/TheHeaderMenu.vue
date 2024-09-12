<template>
  <nav class="the-header-menu">
    <NuxtLink class="the-header-menu__item" :to="localePath(`/upcoming`)">{{
      t("nav.events")
    }}</NuxtLink>
    <NuxtLink class="the-header-menu__item" :to="localePath('/happened')">{{
      t("nav.archive")
    }}</NuxtLink>
    <NuxtLink
      class="the-header-menu__item nohighlight"
      :to="localePath('/#subscribe')"
      >{{ t("nav.subscribe") }}</NuxtLink
    >
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<style scoped lang="scss">
.the-header-menu__item {
  margin-left: 24px;
  text-decoration: none;
  color: black;

  &.router-link-active {
    color: $accent;
  }

  &:first-child {
    margin-left: 0;
  }
}
.q-dark {
  .the-header-menu__item {
    color: white;
  }
  .router-link-active:not(.nohighlight) {
    color: rgba(255, 255, 255, 0.64);
  }
}
</style>
