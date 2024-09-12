<template>
  <q-footer class="the-footer bg-grey-10 text-grey-4 q-px-md q-py-lg q-dark text-body2">
    <div class="container-md flex">
      <div class="q-mb-md">
        <span class="q-mr-md">© NextGIS</span>
        <a class="text-link q-mr-md" href="mailto: edu@nextgis.com">edu@nextgis.com</a>
      </div>
      <q-space />
      <nav class="the-footer-menu q-mb-md">
        <a
          :href="`${nextisUrl}/terms/`"
          target="_blank"
          class="q-mr-md the-footer-menu__item text-link"
        >
          {{ t('app.terms') }}
        </a>
        <a
          :href="`${nextisUrl}/privacy/`"
          class="q-mr-md the-footer-menu__item text-link"
          target="_blank"
        >
          {{ t('app.privacy') }}
        </a>
        <a :href="`${nextisUrl}/contact/`" class="the-footer-menu__item text-link" target="_blank">
          {{ t('app.contacts') }}
        </a>
      </nav>
    </div>
  </q-footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const nextisUrl = `https://nextgis.${locale.value === 'ru' ? 'ru' : 'com'}`
</script>

<style scoped lang="scss">
.the-footer {
  color: #dedede;
  :deep(a) {
    color: #dedede;
  }
}
</style>
