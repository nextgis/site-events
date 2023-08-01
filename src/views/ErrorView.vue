<template>
  <div class="error-view text-center">
    <div class="error-view_inner">
      <div class="text-h1 huge-text error-view__number">404</div>
      <div class="text-h3 q-mt-md q-mb-sm">{{ t('error.404title') }}</div>
      <div class="error-view__descr" v-html="t('error.404description')"></div>
      <q-btn class="q-mt-xl q-px-xl q-mb-xl" @click="back()" color="primary" size="lg" no-caps>
        {{ t('error.goBack') }}
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const back = () => history.back()
</script>

<style scoped lang="scss">
.error-view {
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &__number {
    color: $primary;
    line-height: 1;
  }
}
</style>
