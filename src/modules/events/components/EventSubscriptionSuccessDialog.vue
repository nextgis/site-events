<template>
  <q-dialog ref="dialogRef" class="event-subscription-success-dialog q-pa-md" @hide="onDialogHide">
    <q-card>
      <q-card-section class="text-center">
        <div class="q-mb-lg">
          <q-icon name="mdi-party-popper" color="positive" size="xl" class="q-mb-sm"></q-icon>
          <h5>
            {{
              t('subscription.eventSubscripitionSuccessTitle', { title: props.eventData.title })
            }}»
          </h5>
        </div>
        <p v-if="props.eventData.address === 'online'">
          {{ t('subscription.eventSubscriptionSuccessDescr_link') }}
          <a :href="`mailto: ${props.userData.email}`"> {{ props.userData.email }} </a>.
        </p>
        <p v-else>
          {{ t('subscription.eventSubscriptionSuccessDescr_details') }}
          <a :href="`mailto: ${props.userData.email}`">{{ props.userData.email }}</a
          >.
        </p>
        <p v-if="props.isSubscribedForAllEvents">
          {{ t('subscription.eventSubscriptionSuccessDescr_allEvents') }}
        </p>
        <q-btn class="dialog-close q-px-sm" flat @click="onDialogOK" icon="mdi-close"></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { useI18n } from 'vue-i18n'
import { type UserData } from '@/modules/events/interfaces/UserData'
import { type Event } from '../interfaces/Event'
const { t } = useI18n()

const props = defineProps<{
  userData: UserData
  eventData: Event
  isSubscribedForAllEvents: true
}>()

defineEmits([...useDialogPluginComponent.emits])
const { onDialogOK, dialogRef, onDialogHide } = useDialogPluginComponent()
</script>

<style scoped lang="scss"></style>
