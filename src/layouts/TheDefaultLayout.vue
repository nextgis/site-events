<template>
  <q-layout class="the-default-layout" view="hhh LpR fff">
    <TheHeader class="text-black q-mt-md" />
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
  name: 'TheDefaultLayout'
}
</script>

<script setup lang="ts">
import TheHeader from '@/shared/components/TheHeader.vue'
import TheFooter from '@/shared/components/TheFooter.vue'
</script>

<style lang="scss" scoped></style>
