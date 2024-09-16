<template>
  <div class="app-page" v-if="event">
    <header class="event-header bg-dark text-white q-mx-nlg q-px-lg q-py-xl q-mb-xl q-dark">
      <div class="event-header__bg"></div>
      <TheHeader class="text-white q-dark" />
      <div class="event-header__inner">
        <h1 class="event-header__title text-h3 q-mt-md">
          {{ event.title }}
        </h1>
        <section class="event-header__meta q-mt-lg">
          <div
            class="event-header__info"
            :class="{
              'event-header__info--online': event.address === 'online',
            }"
          >
            <div class="text-h5 event-header__info-date text-weight-regular">
              {{ eventDatesFormatted }}
            </div>
            <div class="event-header__info-address text-body2" v-if="event.address">
              <q-chip v-if="event.address === 'online'" outline square :label="event.address" dark class="q-ml-md" />
              <a class="text-link q-mt-sm" v-else-if="event.address_link" :href="event.address_link" target="_blank">
                {{ event.address }}
              </a>
              <template v-else>
                <span class="inline-block q-mt-sm">{{ event.address }}</span>
              </template>
            </div>
          </div>
          <!-- <div class="event-header__add-to-calendar">add to calendar</div> -->
          <div class="event-header__happened" v-if="isHappened">
            <q-chip class="q-mx-none" dark color="white" text-color="positive" icon="mdi-check-circle">
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
        <NuxtLink
          class="text-link text-subtitle1 text-weight-medium flex inline items-center q-mt-xl gt-sm"
          :to="isHappened ? localePath('/happened') : localePath('/upcoming')"
        >
          <q-icon class="q-mr-xs" name="mdi-arrow-left text-h6"></q-icon>
          {{ isHappened ? t('event.goToArchive') : t('event.goToEventList') }}
        </NuxtLink>
      </div>
      <div class="col-12 col-md-5 col-lg-4 offset-md-1">
        <q-card flat class="bg-grey-2 q-mb-lg" v-if="event.website">
          <q-card-section class="event-website-card q-pa-lg">
            <h6 class="q-mb-sm">{{ t('event.eventWebsite') }}</h6>
            <a class="event-website-link" :href="event.website" target="_blank">{{ event.website }}</a>
          </q-card-section>
        </q-card>
        <q-card flat class="bg-grey-2 q-mb-lg" v-if="!isHappened && event.link_video_translation">
          <q-card-section class="event-website-card q-pa-lg">
            <h6 class="q-mb-sm">{{ t('event.streamLink') }}</h6>
            <a class="event-website-link" :href="event.link_video_translation" target="_blank">{{
              event.link_video_translation
            }}</a>
            <div class="text-blue-grey-4 text-body2">
              {{ t('event.streamLinkHint') }}
            </div>
          </q-card-section>
        </q-card>
        <q-card class="bg-grey-2" flat v-if="shouldRegistrationBeShown">
          <q-card-section class="event-subscription-card q-pa-lg">
            <template v-if="event.status === 'closed'">
              {{ t('event.registrationClosed') }}
            </template>
            <template v-else
              ><h6 class="q-mb-md">{{ t('event.registration') }}</h6>
              <SubscriptionForm
                class="event-subscription"
                @submit.prevent="subscribe"
                v-model:company="userCompany"
                v-model:email="userEmail"
                v-model:name="userName"
                v-model:phone="userPhone"
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
                    <q-banner rounded class="text-white bg-red" v-for="(error, index) in errors" :key="index">
                      {{ t(`subscription.${error}`) }}
                    </q-banner>
                  </template>
                </template>
              </SubscriptionForm></template
            >
          </q-card-section>
        </q-card>
        <q-card class="bg-grey-2" flat v-if="event.video || event.presentation">
          <q-card-section class="event-resources-card q-pa-lg">
            <h6 class="q-mb-md">{{ t('event.resources') }}</h6>
            <div class="q-gutter-y-md q-mt-none">
              <div class="event-resources__video">
                <iframe
                  width="100%"
                  height="100%"
                  :src="videoUrl"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
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
    <NuxtLink
      class="text-link text-subtitle1 text-weight-medium flex inline items-center q-mt-xl lt-md"
      :to="isHappened ? localePath('/happened') : localePath('/upcoming')"
    >
      <q-icon class="q-mr-xs" name="mdi-arrow-left text-h6"></q-icon>
      {{ isHappened ? t('event.goToArchive') : t('event.goToEventList') }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, computed, type ComputedRef } from 'vue';
import { isAfter, parseUTCDate } from '@/utils/dateTimeUtils';
import { useI18n } from 'vue-i18n';
import { useSubscriptionForm } from '@/composables/events/useSubscriptionForm';
import { useContext } from '@/composables/shared/useContext';
import TheHeader from '@/components/shared/TheHeader.vue';
import SubscriptionForm from '@/components/events/SubscriptionForm.vue';
import AppIconText from '@/components/shared/AppIconText.vue';
import { formatEventDates } from '@/utils/eventUtils';
import { getEvent } from '@/api/eventsApi';

const { locale, t } = useI18n();
const localePath = useLocalePath();
const { defaultTimezone, defaultDateFormat, defaultTimezoneSuffix, defaultTimeFormat } = useContext();

const route = useRoute();
const { data: event, error } = await useAsyncData('event', () => getEvent(Number(route.params.id), locale.value));

definePageMeta({
  layout: 'no-header',
});

const pageOgImage = computed(() => event.value?.preview_image_url);

useHead(() => ({
  title: event.value
    ? `${event.value.title} — ${import.meta.env.VITE_DEFAULT_APP_TITLE}`
    : import.meta.env.VITE_DEFAULT_APP_TITLE,
  meta: [
    {
      name: 'description',
      content: event.value?.summary.replace(/<[^>]*>/g, ''),
    },
    {
      property: 'og:title',
      content: () => (event.value ? `${event.value.title}` : import.meta.env.VITE_DEFAULT_APP_TITLE),
    },
    {
      property: 'og:image',
      content: pageOgImage,
    },
    {
      name: 'og:description',
      content: event.value?.summary.replace(/<[^>]*>/g, ''),
    },
  ],
}));

watchEffect(() => {
  if (error.value?.statusCode) {
    throw createError({
      statusCode: 404,
      message: 'Event is not found',
      fatal: true,
    });
  }
});

const shouldSubscribeForAllEvents: Ref<boolean> = ref(false);

const isHappened: ComputedRef<boolean | undefined> = computed(() =>
  event.value ? isAfter(parseUTCDate(event.value?.date_end), 'minute') : undefined,
);

const shouldRegistrationBeShown = computed(() => event.value.type === 'inner' && !isHappened.value);

const eventDatesFormatted: ComputedRef<string | null> = computed(
  () =>
    event.value &&
    formatEventDates({
      dateStart: event.value.date_start,
      dateEnd: event.value.date_end,
      timezone: defaultTimezone.value,
      timezoneSuffix: defaultTimezoneSuffix.value,
      locale: locale.value,
      dateFormat: defaultDateFormat.value,
      timeFormat: defaultTimeFormat,
    }),
);

const videoUrl: ComputedRef<string | undefined> = computed(() => {
  if (event.value && event.value.video) {
    const eventVideoWithoutSlash = event.value.video.endsWith('/') ? event.value.video.slice(0, -1) : event.value.video;
    const videoUrlParts = eventVideoWithoutSlash.split('/');
    const videoId = videoUrlParts[videoUrlParts.length - 1];
    const eventVideoUrl = event.value.video;
    if (eventVideoUrl.includes('www.youtube.com') || eventVideoUrl.includes('youtu.be'))
      return `https://www.youtube.com/embed/${videoId}`;

    if (eventVideoUrl.includes('rutube.ru')) return `https://rutube.ru/play/embed/${videoId}`;
  }
  return undefined;
});

const { userName, userEmail, userCompany, userPhone, subscribe, isSubscribeFormSending, errors } = useSubscriptionForm({
  shouldSubscribeForAllEvents,
  eventData: event,
});
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
