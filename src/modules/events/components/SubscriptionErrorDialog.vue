<template>
  <q-dialog ref="dialogRef" class="subscription-error-dialog q-pa-md" @hide="onDialogHide">
    <q-card>
      <q-card-section class="text-center">
        <div class="q-mb-lg">
          <q-icon name="mdi-alert-circle" color="negative" size="xl" class="q-mb-sm"></q-icon>
          <h5>{{ t('subscription.errorTitle') }}</h5>
        </div>
        <p>{{ t('subscription.errorDescription') }}</p>
        <p class="text-blue-grey-4">
          {{ props.error.message }}
        </p>
        <q-btn class="dialog-close q-px-sm" flat @click="onDialogOK" icon="mdi-close"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { useI18n } from 'vue-i18n'
import { type AxiosError } from 'axios'

const { t } = useI18n()
const props = defineProps<{
  error: AxiosError
}>()

defineEmits([...useDialogPluginComponent.emits])
const { onDialogOK, dialogRef, onDialogHide } = useDialogPluginComponent()
</script>
