<template>
  <article
    v-if="generalInfo"
    class="index-subscription index-article bg-grey-2 text-center flex column justify-center items-center"
  >
    <div class="index-subscription__bg"></div>
    <slot name="prepend"></slot>
    <div class="index-subscription__inner fit">
      <h2 class="text-h4 q-mb-lg">{{ generalInfo.subscribe_title }}</h2>
      <div class="text-left q-mb-lg" v-html="generalInfo.subscribe_description"></div>
      <SubscriptionForm
        @submit.prevent="subscribe"
        v-model:company="userCompany"
        v-model:email="userEmail"
        v-model:phone="userPhone"
        v-model:name="userName"
        :isProcessing="isSubscribeFormSending"
      >
        <template v-slot:appendFields>
          <template v-if="errors.length > 0">
            <q-banner rounded class="text-white bg-red" v-for="(error, index) in errors" :key="index">
              {{ t(`subscription.${error}`) }}
            </q-banner>
          </template>
        </template>
        <template v-slot:button>
          <q-btn
            class="fit"
            :label="generalInfo.subscribe_button_text"
            type="submit"
            color="black"
            :loading="isSubscribeFormSending"
            no-caps
            size="lg"
          />
        </template>
      </SubscriptionForm>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useGeneralInfoStore } from '@/store/generalInfoStore';
import SubscriptionForm from '@/components/events/SubscriptionForm.vue';
import { useSubscriptionForm } from '@/composables/events/useSubscriptionForm';

const { t } = useI18n();

const generalInfoStore = useGeneralInfoStore();
const { generalInfo } = storeToRefs(generalInfoStore);

const { userName, userEmail, userPhone, userCompany, subscribe, isSubscribeFormSending, errors } = useSubscriptionForm({
  shouldSubscribeForAllEvents: ref(true),
});
</script>

<style lang="scss" scoped>
.index-subscription {
  overflow: hidden;
  position: relative;

  &__bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: calc(100% + 110px);
    overflow: hidden;
    background: url('/img/index_subscription_bg.png') center top no-repeat;
    background-size: auto 881px;
  }

  &__inner {
    position: relative;
    max-width: 640px;
    padding-top: 64px;
    padding-bottom: 80px;
  }
}
</style>
