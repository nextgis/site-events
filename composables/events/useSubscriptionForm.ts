import { watch, type Ref, ref } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { AxiosError } from 'axios';
import { subscribeToEvent } from '@/api/eventsApi';
import EventErrorService from '@/services/EventErrorService';
import EventSubscriptionSuccessDialog from '@/components/events/EventSubscriptionSuccessDialog.vue';
import AllEventsSubscriptionSuccessDialog from '@/components/events/AllEventsSubscriptionSuccessDialog.vue';
import SubscriptionErrorDialog from '@/components/events/SubscriptionErrorDialog.vue';
import { useGeneralInfoStore } from '@/store/generalInfoStore';
import { type UserData } from '@/interfaces/UserData';
import { type Event } from '@/interfaces/Event';

interface UseSubscriptionFormOptions {
  shouldSubscribeForAllEvents: Ref<boolean>;
  eventData?: Ref<Event | null>;
}

const useSubscriptionForm = ({ shouldSubscribeForAllEvents, eventData }: UseSubscriptionFormOptions) => {
  const $q = useQuasar();
  const { locale } = useI18n();

  const generalInfoStore = useGeneralInfoStore();
  const { generalInfo } = storeToRefs(generalInfoStore);

  const userName: Ref<string | undefined> = ref(undefined);
  const userEmail: Ref<string | undefined> = ref(undefined);
  const userPhone: Ref<string | undefined> = ref(undefined);
  const userCompany: Ref<string | undefined> = ref(undefined);

  const userData = computed(
    (): UserData => ({
      name: userName.value,
      email: userEmail.value,
      phone: userPhone.value,
      company: userCompany.value,
    }),
  );

  const callSubscribeApi = () => {
    if (!shouldSubscribeForAllEvents.value && eventData?.value?.id) {
      return subscribeToEvent({
        id: eventData.value.id,
        userData: userData.value,
        locale: locale.value,
        refEventId: eventData.value.id,
      });
    }

    if (shouldSubscribeForAllEvents.value && generalInfo.value) {
      return subscribeToEvent({
        id: Number(generalInfo.value.id_all_events),
        userData: userData.value,
        locale: locale.value,
        refEventId: eventData?.value?.id,
      });
    }
    throw new Error('Insufficient data from store to make a request');
  };

  const eventErrorService = new EventErrorService();
  const errors: Ref<string[]> = ref(eventErrorService.errors);

  const {
    execute: subscribe,
    state: subscriptionState,
    isLoading: isSubscribeFormSending,
    error: subscriptionError,
    isReady: isSubscrptionSucceded,
  } = useAsyncState(callSubscribeApi, undefined, {
    immediate: false,
    onSuccess() {
      const SuccessDialogComponent = eventData?.value
        ? EventSubscriptionSuccessDialog
        : AllEventsSubscriptionSuccessDialog;

      const SuccessDialogComponentProps = eventData?.value
        ? {
            userData: userData.value,
            eventData: eventData.value,
            isSubscribedForAllEvents: shouldSubscribeForAllEvents.value,
          }
        : { userData: userData.value };

      $q.dialog({
        component: SuccessDialogComponent,
        componentProps: SuccessDialogComponentProps,
      });
    },
    onError(error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data && eventErrorService.isUserError(error.response.data.error_id)) {
          eventErrorService.addError(error.response.data.error_id);
        } else {
          $q.dialog({
            component: SubscriptionErrorDialog,
            componentProps: {
              error,
            },
          });
        }
      } else throw error;
    },
  });

  watch(
    () => userData.value.email,
    () => {
      errors.value = eventErrorService.removeIrrelevantErrors(['email']);
    },
  );

  return {
    subscribe,
    subscriptionState,
    isSubscribeFormSending,
    isSubscrptionSucceded,
    subscriptionError,
    errors,
    userName,
    userEmail,
    userCompany,
    userPhone,
  };
};

export { useSubscriptionForm };
