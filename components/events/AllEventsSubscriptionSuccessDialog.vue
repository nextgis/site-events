<template>
  <q-dialog
    ref="dialogRef"
    class="all-events-subscription-success-dialog q-pa-md"
    @hide="onDialogHide"
  >
    <q-card class="text-center" style="width: 480px">
      <q-card-section>
        <div class="q-mb-lg">
          <q-icon
            name="mdi-party-popper"
            color="positive"
            size="xl"
            class="q-mb-sm"
          ></q-icon>
          <h5>{{ t("subscription.allEventsSubscriptionSuccessTitle") }}</h5>
        </div>
        <p>
          {{ t("subscription.allEventsSubscriptionSuccessDescr_p1") }}
          <a :href="`mailto: ${props.userData.email}`">{{
            props.userData.email
          }}</a
          >.
        </p>
        <p>{{ t("subscription.allEventsSubscriptionSuccessDescr_p2") }}</p>
        <!-- <p>Также вы можете добавить события NextGIS в свой календарь.</p> -->
        <q-btn
          class="dialog-close q-px-sm"
          flat
          @click="onDialogOK"
          icon="mdi-close"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useDialogPluginComponent } from "quasar";
import { type UserData } from "@/interfaces/UserData";
const { t } = useI18n();

const props = defineProps<{
  userData: UserData;
}>();

defineEmits([...useDialogPluginComponent.emits]);
const { onDialogOK, dialogRef, onDialogHide } = useDialogPluginComponent();
</script>

<style scoped lang="scss"></style>
