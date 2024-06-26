<template>
  <q-inner-loading v-if="isLoading" showing color="primary" />
  <div class="text-center" v-else-if="error">{{ t('app.smthWentWrong') }}</div>
  <div class="app-page" v-else-if="event && isReady">
    <header class="event-header bg-dark text-white q-mx-nlg q-px-lg q-py-xl q-mb-xl q-dark">
      <div class="event-header__bg"></div>
      <TheHeader class="text-white q-dark" />
      <div class="event-header__inner">
        <h1 class="event-header__title text-h3 q-mt-md">{{ event.title }}</h1>
        <section class="event-header__meta q-mt-lg">
          <div
            class="event-header__info"
            :class="{ 'event-header__info--online': event.address === 'online' }"
          >
            <div class="text-h5 event-header__info-date text-weight-regular">
              {{ eventDatesFormatted }}
            </div>
            <div class="event-header__info-address text-body2" v-if="event.address">
              <q-chip
                v-if="event.address === 'online'"
                outline
                square
                :label="event.address"
                dark
                class="q-ml-md"
              />
              <a
                class="text-link q-mt-sm"
                v-else-if="event.address_link"
                :href="event.address_link"
                target="_blank"
              >
                {{ event.address }}
              </a>
              <template v-else>
                <span class="inline-block q-mt-sm">{{ event.address }}</span>
              </template>
            </div>
          </div>
          <!-- <div class="event-header__add-to-calendar">add to calendar</div> -->
          <div class="event-header__happened" v-if="isHappened">
            <q-chip
              class="q-mx-none"
              dark
              color="white"
              text-color="positive"
              icon="mdi-check-circle"
            >
              {{ t('event.eventIsHappened') }}
            </q-chip>
          </div>
        </section>
      </div>
    </header>
    <div class="event-content row q-col-gutter-lg">
      <div class="col-12 col-md-6 col-lg-7">
        <div v-if="event.content" v-html="event.content"></div>
        <picture class="event-content__pic" v-if="event.image_url">
          <source :srcset="event.image_url || undefined" />
          <img class="q-mt-md" :src="event.image_url || undefined" />
        </picture>
        <RouterLink
          class="text-link text-subtitle1 text-weight-medium flex inline items-center q-mt-xl gt-sm"
          :to="isHappened ? '/happened' : '/upcoming'"
        >
          <q-icon class="q-mr-xs" name="mdi-arrow-left text-h6"></q-icon>
          {{ isHappened ? t('event.goToArchive') : t('event.goToEventList') }}
        </RouterLink>
      </div>
      <div class="col-12 col-md-5 col-lg-4 offset-md-1">
        <q-card flat class="bg-grey-2 q-mb-lg" v-if="event.website">
          <q-card-section class="event-website-card q-pa-lg">
            <h5 class="q-mb-md">{{ t('event.eventWebsite') }}</h5>
            <a class="event-website-link" :href="event.website" target="_blank">{{
              event.website
            }}</a>
          </q-card-section>
        </q-card>
        <q-card class="bg-grey-2" flat v-if="!isHappened && event.type !== 'outer'">
          <q-card-section class="event-subscription-card q-pa-lg">
            <h5 class="q-mb-lg">{{ t('event.registration') }}</h5>
            <SubscriptionForm
              class="event-subscription"
              @submit.prevent="subscribe"
              v-model:company="userCompany"
              v-model:email="userEmail"
              v-model:name="userName"
              :isProcessing="isSubscribeFormSending"
            >
              <template v-slot:appendFields>
                <div>
                  <q-toggle
                    class="event-subscription__all-events"
                    v-model="shouldSubscribeForAllEvents"
                    :label="t('event.subscribeToAllEventsCheckbox')"
                  />
                </div>
                <template v-if="errors.length > 0">
                  <q-banner
                    rounded
                    class="text-white bg-red"
                    v-for="(error, index) in errors"
                    :key="index"
                  >
                    {{ t(`subscription.${error}`) }}
                  </q-banner>
                </template>
              </template>
            </SubscriptionForm>
          </q-card-section>
        </q-card>
        <q-card class="bg-grey-2" flat v-else-if="event.video || event.presentation">
          <q-card-section class="event-resources-card q-pa-lg">
            <h5 class="q-mb-lg">{{ t('event.resources') }}</h5>
            <div class="q-gutter-y-md q-mt-none">
              <div class="event-resources__video">
                <VueYtframe
                  :video-id="videoId"
                  :player-vars="{ autoplay: 0, listType: 'user_uploads' }"
                />
              </div>
              <div v-if="event.presentation">
                <AppIconText :href="event.presentation" icon="mdi-presentation" target="_blank">
                  {{ t('event.presentation') }}
                </AppIconText>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <RouterLink
      class="text-link text-subtitle1 text-weight-medium flex inline items-center q-mt-xl lt-md"
      :to="isHappened ? '/happened' : '/upcoming'"
    >
      <q-icon class="q-mr-xs" name="mdi-arrow-left"></q-icon>
      {{ isHappened ? 'Вернуться в архив' : 'Вернуться к списку событий' }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, type Ref, computed, type ComputedRef } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAsyncState } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { show404 } from '@/router'
import { isAfter, parseUTCDate } from '@/shared/utils/dateTimeUtils'
import { useGetEventMemoized } from '@/modules/events/composables/useGetEventMemoized'
import { useSubscriptionForm } from '@/modules/events/composables/useSubscriptionForm'
import TheHeader from '@/shared/components/TheHeader.vue'
import SubscriptionForm from '@/modules/events/components/SubscriptionForm.vue'
import AppIconText from '@/shared/components/AppIconText.vue'
import { type UserData } from '@/modules/events/interfaces/UserData'
import { formatEventDates } from '@/modules/events/eventUtils'
import { AxiosError } from 'axios'

const props = defineProps<{ id: number }>()
const { id } = toRefs(props)
const { getEventMemoized } = useGetEventMemoized()
const { t } = useI18n()
const route = useRoute()

const {
  state: event,
  isReady,
  isLoading,
  error
} = useAsyncState(getEventMemoized(id.value), undefined, {
  onError(error) {
    if (error instanceof AxiosError && error && error.response && error.response.status === 404) {
      show404(route)
    }
  }
})

const userName: Ref<string | undefined> = ref(undefined)
const userEmail: Ref<string | undefined> = ref(undefined)
const userCompany: Ref<string | undefined> = ref(undefined)
const shouldSubscribeForAllEvents: Ref<boolean> = ref(false)

const isHappened: ComputedRef<boolean | undefined> = computed(() =>
  event.value ? isAfter(parseUTCDate(event.value?.date_start)) : undefined
)

const eventDatesFormatted: ComputedRef<string | undefined> = computed(
  () => event.value && formatEventDates(event.value.date_start, event.value.date_end)
)

const videoId: ComputedRef<string | undefined> = computed(() => {
  if (event.value && event.value.video) {
    const videoUrlParts = event.value.video.split('/')
    return videoUrlParts[videoUrlParts.length - 1]
  }
  return undefined
})

const userData = computed(
  (): UserData => ({
    name: userName.value,
    email: userEmail.value,
    company: userCompany.value
  })
)

const { subscribe, isSubscribeFormSending, errors } = useSubscriptionForm({
  userData,
  shouldSubscribeForAllEvents,
  eventData: event
})
</script>

<style lang="scss" scoped>
.event-header {
  position: relative;
  padding-top: 64px;
  border-radius: 6px;
  background: url('/img/events_hero_bg_md.svg') top right no-repeat;
  overflow: hidden;

  &__bg {
    position: absolute;
    top: -14px;
    right: 24px;
    width: calc(100% - 24px);
    background: url('/img/events_hero_bg_md.svg') top right no-repeat;
    height: 723px;
  }

  &__inner {
    position: relative;
  }

  :deep(.the-header) {
    left: 24px;
    right: 24px;
  }

  &__title {
    @media (min-width: $breakpoint-md-min) {
      max-width: 75%;
    }
  }

  &__add-to-calendar {
    margin-left: 64px;
  }

  &__info {
    opacity: 0.8;

    &--online {
      display: flex;
    }
  }

  &__meta {
    @media (min-width: $breakpoint-sm-min) {
      display: flex;
    }
  }

  &__happened {
    margin-top: 24px;
    @media (min-width: $breakpoint-sm-min) {
      margin-left: 48px;
      margin-top: 0;
    }
  }
}
.event-subscription-card,
.event-resources-card,
.event-website-card {
  background-image: url('/img/event_subscription_bg.svg');
  background-position: bottom right;
  background-repeat: no-repeat;
}

.event-website-link {
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
}

.event-subscription__all-events {
  align-items: start !important;
}

.event-resources {
  &__video {
    height: 235px;
  }
}
</style>
