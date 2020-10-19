<template>
  <div class="weather">
    <transition name="weather" appear>
      <div class="weather-wrapper">
        <div class="weather-column m-r-10px">
          <div class="weather__place m-b-5px">
            <slot name="place" />
          </div>
          <div class="weather__date m-b-5px">
            {{formatDate}}
          </div>
          <div class="weather__desc m-b-5px">
            <slot name="desc" />
            <img v-if="icon"
                 class="weather__desc-img"
                 :src="descImg"
                 alt=""
            >
          </div>
          <div class="weather__temp">
            <slot name="temp" />°C
          </div>
        </div>
        <transition name="image" appear>
          <img :src="dayTypes[dayImage]"
              class="weather__image"
              alt=""
          >
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import moon from '../assets/moon.png';
import sun from '../assets/sun.png';
import timezoneDate from '../_helper/timezoneDate';
import iconLink from '../api/icon-link';

export default {
  props: {
    date: {
      type: Object,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  data() {
    return {
      dayTypes: [
        sun,
        moon,
      ],
    };
  },
  computed: {
    formatDate() {
      const { ts, timezone } = this.date;
      const date = timezoneDate(ts * 1000, timezone);
      return date.toLocaleString();
    },
    dayImage() {
      const {
        ts,
        timezone,
        sunset,
        sunrise,
      } = this.date;
      const date = timezoneDate(ts * 1000, timezone);
      const sunsetDate = timezoneDate(sunset * 1000, timezone);
      const sunriseDate = timezoneDate(sunrise * 1000, timezone);
      return date < sunsetDate && date > sunriseDate ? 0 : 1;
    },
    descImg() {
      return iconLink(this.icon, '@2x');
    },
  },
};
</script>

<style lang="scss" scoped>
  .weather {
    background-color: rgba($color: #fff, $alpha: 0.2);
    border-radius: 10px;
    padding: 15px;
    color: rgba($color: #000, $alpha: 0.5);
    &-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      @media (max-width: 560px) {
        justify-content: space-between;
      }
    }
    &-column {
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
    &__place {
      font-size: 1.4rem;
      font-weight: 600;
    }
    &__temp {
      font-size: 2rem;
      color: rgba($color: #fff, $alpha: 0.7);
      text-shadow: 2px 2px 3px rgba($color: #000, $alpha: 0.7);
      font-weight: 600;
      @media (max-width: 405px) {
        font-size: 1.6rem;
      }
    }
    &__date {
      font-size: 1.2rem;
      font-weight: 600;
    }
    &__desc {
      display: flex;
      align-items: center;
      &-img {
        width: 30px;
        height: 30px;
      }
    }
    &__image {
      width: 140px;
      height: 140px;
      opacity: 0.5;
      @media (max-width: 485px) {
        display: none;
      }
    }
  }

  .weather-enter-active,
  .weather-leave-active {
    transition: .3s;
  }

  .weather-enter,
  .weather-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }

  .image-enter-active,
  .image-leave-active {
    transition: all ease 1s;
  }

  .image-enter,
  .image-leave-to {
    opacity: 0;
    transform: rotate(180deg);
  }

</style>
