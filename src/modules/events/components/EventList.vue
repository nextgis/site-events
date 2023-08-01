<template>
  <q-inner-loading v-if="isLoading" showing color="primary" />
  <div v-else-if="isFailed">{{ t('app.smthWentWrong') }}</div>
  <div else :class="['event-list', `event-list--${type}`]">
    <q-card
      v-for="(event, index) in events"
      :key="index"
      class="event-card q-mb-lg flex no-wrap"
      :class="{ 'q-pa-none items-center': type === 'happened', 'q-pa-md ': type === 'upcoming' }"
      flat
      :bordered="type === 'upcoming'"
    >
      <picture class="event-card__pic">
        <source :srcset="event.preview_image_url || undefined" />
        <img :src="event.preview_image_url || undefined" />
      </picture>
      <div class="event-card__info">
        <div
          class="event-card__meta-info text-blue-grey-4 text-body2 flex"
          v-if="type === 'upcoming'"
        >
          <div class="event-card__meta">
            <AppIconText icon="mdi-calendar-range">
              {{ formatEventDates(event.date_start, event.date_end) }}
            </AppIconText>
          </div>
          <div
            class="event-card__meta"
            :class="{ 'q-ml-nsm': event.address === 'online' }"
            v-if="event.address"
          >
            <q-chip
              v-if="event.address === 'online'"
              outline
              square
              :label="event.address"
              size="sm"
              color="blue-grey-4"
              class="q-ma-none q-pa-xs"
            />
            <AppIconText v-else icon="mdi-map-marker" :href="event.address_link">
              {{ event.address }}
            </AppIconText>
          </div>
        </div>
        <h6 class="event-card__title" :class="{ 'q-my-sm': type === 'upcoming' }">
          {{ event.title }}
        </h6>
        <div class="event-card__summary" v-if="type === 'upcoming'" v-html="event.summary"></div>
        <div
          class="event-card__meta-info text-blue-grey-4 text-body2 flex q-mt-sm"
          v-if="type === 'happened'"
        >
          <div class="event-card__meta">
            <AppIconText icon="mdi-calendar-range">
              {{ formatEventDates(event.date_start, event.date_end) }}
            </AppIconText>
          </div>
          <div class="event-card__meta" v-if="event.video">
            <AppIconText :href="event.video" icon="mdi-youtube" target="_blank">
              {{ t('event.video') }}
            </AppIconText>
          </div>
          <div class="event-card__meta" v-if="event.presentation">
            <AppIconText :href="event.presentation" icon="mdi-presentation" target="_blank">
              {{ t('event.presentation') }}
            </AppIconText>
          </div>
        </div>
      </div>
      <router-link class="event-card__link" :to="`/event/${event.id}`"></router-link>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { toRefs } from 'vue'
import { RouterLink } from 'vue-router'
import { formatEventDates } from '@/modules/events/eventUtils'
import AppIconText from '@/shared/components/AppIconText.vue'
import type { Event } from '@/modules/events/interfaces/Event'

const { t } = useI18n()

interface EventListProps {
  events: Event[]
  type: 'upcoming' | 'happened'
  isLoading: boolean
  isFailed: boolean
}

const props = defineProps<EventListProps>()
const { events } = toRefs(props)
</script>

<style lang="scss" scoped>
.event-card {
  position: relative;
  overflow: hidden;

  &__pic {
    display: inline-block;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__info {
    flex-shrink: 1;
  }

  &__summary :deep(p:last-child) {
    margin-bottom: 0;
  }

  &__title {
    line-height: 1.2;
  }

  &__meta {
    margin-right: 24px;
    &-icon {
      position: relative;
      top: -1px;
      margin-right: 2px;
      font-size: 18px;
    }

    :deep(a) {
      position: relative;
      z-index: 10;
    }
  }

  &__meta-info {
    align-items: center;
  }
}

.event-card__link {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.event-list--upcoming {
  .event-card {
    border-color: $dark;

    &:hover {
      background-color: transparentize(#9023e7, 0.96);
    }

    &__pic {
      width: 135px;
      height: 135px;
      border-radius: $generic-border-radius;
      margin-right: 24px;
    }

    &__info {
      padding-top: 6px;
    }
  }
}

.event-list--happened {
  .event-card {
    &__pic {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 24px;
    }
    &:hover {
      .event-card__title {
        color: $accent;
      }
    }
  }
}
</style>
