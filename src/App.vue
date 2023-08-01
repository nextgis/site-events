<script setup lang="ts">
import { computed, type ComputedRef } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const layout: ComputedRef<string> = computed(() => {
  const routeLayout = route?.meta?.layout
  if (routeLayout) {
    return `The${routeLayout}Layout`
  }
  return 'div'
})
</script>

<template>
  <component :is="layout" v-bind="route?.meta?.layoutProps || {}">
    <RouterView />
  </component>
</template>
