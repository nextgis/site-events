<template>
  <component class="app-icon-link text-link" :is="href ? 'a' : 'span'" :href="href" :target="target">
    <q-icon :name="icon" class="app-icon-link__icon q-mr-sm" />
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

interface AppIconLinkProps {
  href?: string;
  icon: string;
  target?: '_self' | '_blank';
}

const props = withDefaults(defineProps<AppIconLinkProps>(), { target: '_self' });
const { href } = toRefs(props);
</script>

<style scoped lang="scss">
.app-icon-link__icon {
  position: relative;
  top: -1px;
  font-size: 18px;
}
</style>
