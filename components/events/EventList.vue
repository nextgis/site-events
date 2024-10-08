<template>
  <div :class="['event-list', `event-list--${type}`]">
    <template v-if="events.length > 0">
      <q-card
        v-for="(event, index) in events"
        :key="index"
        class="event-card q-mb-lg flex no-wrap"
        :class="{
          'q-pa-none items-center': type === 'happened',
          'q-pa-md ': type === 'upcoming',
        }"
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
                {{
                  formatEventDates({
                    dateStart: event.date_start,
                    dateEnd: event.date_end,
                    timezone: defaultTimezone,
                    timezoneSuffix: defaultTimezoneSuffix,
                    locale: locale,
                    dateFormat: defaultDateFormat,
                    timeFormat: defaultTimeFormat,
                  })
                }}
              </AppIconText>
            </div>
            <div
              class="event-card__meta gt-sm"
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
              <AppIconText
                v-else
                icon="mdi-map-marker"
                :href="event.address_link"
              >
                {{ event.address }}
              </AppIconText>
            </div>
          </div>
          <h6
            class="event-card__title"
            :class="{ 'q-my-sm': type === 'upcoming' }"
          >
            {{ event.title }}
          </h6>
          <div
            class="event-card__summary gt-xs"
            v-if="type === 'upcoming'"
            v-html="event.summary"
          ></div>
          <div
            class="event-card__meta-info text-blue-grey-4 text-body2 flex q-mt-sm"
            v-if="type === 'happened'"
          >
            <div class="event-card__meta">
              <AppIconText icon="mdi-calendar-range">
                {{
                  formatEventDates({
                    dateStart: event.date_start,
                    dateEnd: event.date_end,
                    timezone: defaultTimezone,
                    timezoneSuffix: defaultTimezoneSuffix,
                    locale: locale,
                    dateFormat: defaultDateFormat,
                    timeFormat: defaultTimeFormat,
                  })
                }}
              </AppIconText>
            </div>
            <div class="event-card__meta gt-xs" v-if="event.video">
              <AppIconText
                :href="event.video"
                icon="mdi-youtube"
                target="_blank"
              >
                {{ t("event.video") }}
              </AppIconText>
            </div>
            <div class="event-card__meta gt-xs" v-if="event.presentation">
              <AppIconText
                :href="event.presentation"
                icon="mdi-presentation"
                target="_blank"
              >
                {{ t("event.presentation") }}
              </AppIconText>
            </div>
          </div>
        </div>
        <NuxtLink
          class="event-card__link"
          :to="localePath(`/event/${event.id}`)"
        ></NuxtLink>
      </q-card>
    </template>
    <q-banner v-else rounded class="bg-grey-3">{{
      t("event.noEvents")
    }}</q-banner>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { toRefs } from "vue";
import { useContext } from "@/composables/shared/useContext";
import { formatEventDates } from "@/utils/eventUtils";
import AppIconText from "@/components/shared/AppIconText.vue";
import type { Event } from "@/interfaces/Event";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const {
  defaultDateFormat,
  defaultTimeFormat,
  defaultTimezone,
  defaultTimezoneSuffix,
} = useContext();

interface EventListProps {
  events: Event[];
  type: "upcoming" | "happened";
  isLoading: boolean;
  isFailed: boolean;
}

const props = defineProps<EventListProps>();
const { events } = toRefs(props);
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
    /* border-color: $dark; */

    &:hover {
      background-color: transparentize(#9023e7, 0.96);
    }

    &__pic {
      width: 135px;
      height: 135px;
      /* border-radius: $generic-border-radius; */
      margin-right: 24px;

      @media (max-width: $breakpoint-sm-min) {
        width: 75px;
        height: 75px;
        margin-right: 12px;
      }
    }

    &__info {
      padding-top: 6px;
    }
  }
}

.event-list--happened {
  .event-card {
    &__pic {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      margin-right: 24px;

      @media (max-width: $breakpoint-sm-min) {
        margin-right: 12px;
      }
    }
    &:hover {
      .event-card__title {
        color: $accent;
      }
    }
  }
}
</style>
