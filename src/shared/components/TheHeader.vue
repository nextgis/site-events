<template>
  <q-header class="the-header q-py-md">
    <div class="container-md flex items-center">
      <div class="the-header__name flex items-center">
        <div class="the-header__logo">
          <a class="nolink" :href="nextisUrl">
            <svg
              class="the-header__logo-pic"
              data-v-d64f80a8=""
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 818.8 111.5"
              xml:space="preserve"
              width="130px"
              height="17.69px"
            >
              <path
                data-v-d64f80a8=""
                d="M0,111.5V0.1h7.4l69.9,69.8V0.1h22.3v111.4h-8.2L22.3,42.4v69.1
            H0"
                class="logo-pic__item--dark"
              ></path>
              <path
                data-v-d64f80a8=""
                d="M225.8,111.5V0.1l-81.9-0.1v20.8h59.6v23.8h-34v20.7h34v25.3H144
            v20.8L225.8,111.5"
                class="logo-pic__item--dark"
              ></path>
              <path
                data-v-d64f80a8=""
                d="M502.3,0.1v20.8h-37.1v90.6h-22.3V20.9h-37.1V0.1L502.3,0.1"
                class="logo-pic__item--dark"
              ></path>
              <path
                data-v-d64f80a8=""
                d="M550.4,95.5c-10.7-10.6-16-23.9-16-39.9
            c0.1-15.7,5.4-28.8,16-39.5c10.6-10.7,23.9-16,39.6-16c15.9,0,29.5,5,40.9,14.9l-14.9,16.3c-7.6-5.9-16.3-8.9-26.1-8.9
            c-10,0-18.1,3.2-24.2,9.4c-6.1,6.2-9.2,14.1-9.2,23.8c0.1,10.4,3.2,18.6,9.3,24.7c6.1,6.1,14.2,9.1,24.2,9.1c8,0,14.2-1.6,18.5-4.8
            V65.4l-14.9,0.1V44.7H631v52c-11.3,9.9-25,14.9-40.9,14.9C574.3,111.5,561,106.1,550.4,95.5"
                class="logo-pic__item--light"
              ></path>
              <path
                data-v-d64f80a8=""
                d="M674.9,111.5h22.2V0h-22.2V111.5z"
                class="logo-pic__item--light"
              ></path>
              <path
                data-v-d64f80a8=""
                d="M801.4,3.8c5.7,2.5,11,6.2,16,11.2l-14.9,14.9
            c-5-6-11.9-8.9-20.8-8.9c-8.9,0-14.6,2.1-17.1,6.3c-2.5,4.2-2.5,7.8,0,10.8c2.5,3,8.2,5.2,17.1,6.7c9.4,1,18,4.1,25.6,9.3
            c7.7,5.2,11.5,13.5,11.5,24.9c0,8.9-4.1,16.6-12.3,23c-8.2,6.4-17.7,9.7-28.6,9.7c-10.3,0-19-1.5-25.9-4.4
            c-6.9-3-12.9-6.9-17.8-11.9L749,80.3c5,6,13.4,9.4,25.3,10.4c9.9,0,16.1-2.1,18.5-6.3c2.5-4.2,2.5-8.4,0-12.6
            c-2.4-4.2-8.6-6.8-18.5-7.8c-8.9-1-17.1-3.7-24.5-8.2c-7.4-4.5-11.2-12.1-11.2-23c0-9.9,4.2-17.8,12.7-23.7c8.4-6,17.1-9,26-9
            C787.6,0.1,795.7,1.3,801.4,3.8"
                class="logo-pic__item--light"
              ></path>
              <path
                data-v-d64f80a8=""
                d="M340.2,43.3l31.6-43.2h-26.2L327,25.4L340.2,43.3"
                class="logo-pic__item--dark"
              ></path>
              <path
                data-v-d64f80a8=""
                d="M332.8,53.5L293.6,0.1h-26.2l39,53.4l-42.6,58h26.5L332.8,53.5"
                class="logo-pic__item--light"
              ></path>
              <path
                data-v-d64f80a8=""
                d="M340.2,63.6l-13.2,18l21.9,29.9h26.4L340.2,63.6"
                class="logo-pic__item--dark"
              ></path>
            </svg>
          </a>
        </div>
        <RouterLink class="text-link" to="/">Events</RouterLink>
      </div>
      <q-space />
      <TheHeaderMenu />
    </div>
  </q-header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import TheHeaderMenu from './TheHeaderMenu.vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const nextisUrl = `https://nextgis.${locale.value === 'ru' ? 'ru' : 'com'}`
</script>

<style scoped lang="scss">
.the-header {
  background-color: transparent !important;
  font-size: 18px;
  font-family: 'Ubuntu', 'Roboto', '-apple-system', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 500;
  left: 16px;
  right: 16px;

  &__name {
    white-space: nowrap;
  }

  &__logo {
    position: relative;
    display: block;
    padding-right: 16px;
    margin-right: 14px;

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: -2px;
      bottom: 0;
      width: 2px;
      height: 20px;
      background-color: rgba(0, 0, 0, 0.24);
    }
  }

  &__logo-pic {
    display: block;
    width: 120px;
    height: auto;
  }

  .logo-pic__item--dark {
    fill: #231f20;
  }

  .logo-pic__item--light {
    fill: $accent;
  }
  &.q-dark .the-header__logo {
    &:after {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
  &.q-dark .logo-pic__item--dark,
  &.q-dark .logo-pic__item--light {
    fill: white;
  }
}
</style>
