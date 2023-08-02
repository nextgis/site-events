import { watch, type Ref, ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { subscribeToEvent } from '@/modules/events/api/eventsApi'
import EventErrorService from '../EventErrorService'
import EventSubscriptionSuccessDialog from '@/modules/events/components/EventSubscriptionSuccessDialog.vue'
import AllEventsSubscriptionSuccessDialog from '@/modules/events/components/AllEventsSubscriptionSuccessDialog.vue'
import SubscriptionErrorDialog from '@/modules/events/components/SubscriptionErrorDialog.vue'
import { useGeneralInfoStore } from '@/modules/generalInfo/generalInfoStore'
import { type UserData } from '@/modules/events/interfaces/UserData'
import { type Event } from '@/modules/events/interfaces/Event'
import { AxiosError } from 'axios'

interface UseSubscriptionFormOptions {
  userData: Ref<UserData>
  shouldSubscribeForAllEvents: Ref<boolean>
  eventData?: Ref<Event | undefined>
}

const useSubscriptionForm = ({
  userData,
  shouldSubscribeForAllEvents,
  eventData
}: UseSubscriptionFormOptions) => {
  const $q = useQuasar()

  const generalInfoStore = useGeneralInfoStore()
  const { generalInfo } = storeToRefs(generalInfoStore)

  const callSubscribeApi = () => {
    if (!shouldSubscribeForAllEvents.value && eventData?.value) {
      return subscribeToEvent(eventData.value.id, userData.value)
    }

    if (shouldSubscribeForAllEvents.value && generalInfo.value) {
      return subscribeToEvent(Number(generalInfo.value.id_all_events), userData.value)
    }
    throw new Error('Insufficient data from store to make a request')
  }

  const eventErrorService = new EventErrorService()
  const errors: Ref<string[]> = ref(eventErrorService.errors)

  const {
    execute: subscribe,
    state: subscriptionState,
    isLoading: isSubscribeFormSending,
    error: subscriptionError,
    isReady: isSubscrptionSucceded
  } = useAsyncState(callSubscribeApi, undefined, {
    immediate: false,
    onSuccess() {
      const SuccessDialogComponent = eventData?.value
        ? EventSubscriptionSuccessDialog
        : AllEventsSubscriptionSuccessDialog

      const SuccessDialogComponentProps = eventData?.value
        ? {
            userData: userData.value,
            eventData: eventData.value,
            isSubscribedForAllEvents: shouldSubscribeForAllEvents.value
          }
        : { userData: userData.value }

      $q.dialog({
        component: SuccessDialogComponent,
        componentProps: SuccessDialogComponentProps
      })
    },
    onError(error) {
      if (error instanceof AxiosError) {
        if (
          error.response &&
          error.response.data &&
          eventErrorService.isUserError(error.response.data.error_id)
        ) {
          eventErrorService.addError(error.response.data.error_id)
        } else {
          $q.dialog({
            component: SubscriptionErrorDialog,
            componentProps: {
              error
            }
          })
        }
      } else throw error
    }
  })

  watch(
    () => userData.value.email,
    () => {
      errors.value = eventErrorService.removeIrrelevantErrors(['email'])
    }
  )

  return {
    subscribe,
    subscriptionState,
    isSubscribeFormSending,
    isSubscrptionSucceded,
    subscriptionError,
    errors
  }
}

export { useSubscriptionForm }
