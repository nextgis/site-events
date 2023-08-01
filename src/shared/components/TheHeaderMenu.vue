<template>
  <nav class="the-header-menu">
    <RouterLink class="the-header-menu__item" to="/upcoming">{{ t('nav.events') }}</RouterLink>
    <RouterLink class="the-header-menu__item" to="/happened">{{ t('nav.archive') }}</RouterLink>
    <RouterLink class="the-header-menu__item nohighlight" to="/#subscribe">{{
      t('nav.subscribe')
    }}</RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
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
