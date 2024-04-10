<template>
  <q-form class="subscription-form" v-bind="$attrs">
    <div class="q-gutter-lg q-my-lg">
      <slot name="prependFields"></slot>
      <q-input
        bg-color="white"
        outlined
        v-model="name"
        :label="t('subscription.yourName')"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || t('error.required')]"
        hide-bottom-space
      />
      <q-input
        bg-color="white"
        outlined
        type="email"
        v-model="email"
        :label="t('subscription.email')"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || t('error.required'),
          (val) => isValidEmail(val) || t('error.email')
        ]"
        hide-bottom-space
      />
      <q-input bg-color="white" outlined v-model="company" :label="t('subscription.company')" />
      <slot name="appendFields"></slot>
    </div>
    <slot name="button">
      <q-btn
        :label="t('event.signup')"
        type="submit"
        color="black"
        :loading="isProcessing"
        size="lmdg"
        class="fit q-py-sm"
        no-caps
      />
    </slot>
  </q-form>
</template>

<script setup lang="ts">
import { useVModels } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface SubscriptionFormProps {
  name?: string
  email?: string
  company?: string
  isProcessing: boolean
}
const props = withDefaults(defineProps<SubscriptionFormProps>(), { isProcessing: false })
const emit = defineEmits(['update:name', 'update:email', 'update:company'])
const { name, email, company } = useVModels(props, emit)
const isValidEmail = (email: string) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
  return emailPattern.test(email)
}
</script>

<style scoped></style>
