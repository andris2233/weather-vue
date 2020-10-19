<template>
  <div id="app">
    <form class="main" @submit.prevent="getWeather">
      <VSearchbar v-model="query" class="m-b-15px"/>
      <transition name="content" mode="out-in">
        <div v-if="weather && forecast"
              key="weather"
              class="main-content"
        >
          <VWeather class="m-b-15px"
                    :date="{
                      ts: weather.dt,
                      timezone: weather.timezone,
                      sunset: weather.sys.sunset,
                      sunrise: weather.sys.sunrise
                    }"
                    :icon="weather.weather[0].icon"
          >
            <template #place>
              {{weather.name}}
            </template>
            <template #desc>
              {{weather.weather[0].description}}
            </template>
            <template #temp>
              {{weather.main.temp}}
            </template>
          </VWeather>
          <VForecast :weather="forecast.list"
                     :timezone="forecast.city.timezone"
                     :is-favorite="isFavorite(weather.name)"
                     @star-clicked="toFavorite(isFavorite(weather.name))"
                     @prev-favorite="prevFavorite"
                     @next-favorite="nextFavorite"
                     @select-favorite="selectFavorite($event)"/>
        </div>
        <VLoader v-else-if="loading" key="load"/>
        <VError v-else-if="hasError" key="error">
          {{errorText}}
        </VError>
      </transition>
    </form>
  </div>
</template>

<script>
import VSearchbar from '@/components/VSearchbar.vue';
import VError from '@/components/VError.vue';
import VLoader from '@/components/VLoader.vue';
import VWeather from '@/components/VWeather.vue';
import VForecast from '@/components/VForecast.vue';

import weatherApi from '@/api/current-weather';
import { mapGetters } from 'vuex';

export default {
  components: {
    VSearchbar,
    VError,
    VLoader,
    VWeather,
    VForecast,
  },
  data() {
    return {
      query: '',
      loading: false,
      weather: null,
      forecast: null,
      hasError: false,
      statusCode: 200,
      errorLabel: {
        badReq: 'Одно поле ввода, чел... Попробуй че-нибудь другое написать',
        notFound: 'Такого места на планете Земля не существует, проверь правильность написания наименования',
        apiKey: 'Необходимо указать apiKey',
        default: 'Сервис в данный момент не доступен',
      },
    };
  },
  computed: {
    errorText() {
      if (this.statusCode === 400) {
        return this.errorLabel.badReq;
      }
      if (this.statusCode === 404) {
        return this.errorLabel.notFound;
      }
      if (this.statusCode === -1) {
        return this.errorLabel.apiKey;
      }
      return this.errorLabel.default;
    },
    ...mapGetters(['isFavorite', 'getByIndex']),
  },
  methods: {
    async getWeather() {
      let weather;
      let forecast;
      this.loading = true;
      this.hasError = false;
      this.statusCode = 200;
      try {
        weather = await weatherApi.getCurrWeatherByCountry(this.query);
        this.weather = weather.data;
        forecast = await weatherApi.getForecastWeatherByCountry(this.query);
        this.forecast = forecast.data;
      } catch (e) {
        if (e.message === 'apiKey') {
          this.statusCode = -1;
        } else {
          this.statusCode = e.response.status;
        }
        this.weather = null;
        this.loading = false;
        this.hasError = true;
      }
    },
    toFavorite(isFav) {
      const { name } = this.weather;
      if (isFav.idx !== -1) {
        this.$store.dispatch('removeFavorite', name);
      } else {
        this.$store.dispatch('setFavorite', name);
      }
    },
    prevFavorite() {
      const { name } = this.weather;
      const prev = this.$store.getters.prevFavorite(name);
      if (prev && prev !== this.query) {
        this.query = prev;
        this.getWeather();
      }
    },
    nextFavorite() {
      const { name } = this.weather;
      const next = this.$store.getters.nextFavorite(name);
      if (next && next !== this.query) {
        this.query = next;
        this.getWeather();
      }
    },
    selectFavorite(index) {
      this.query = this.getByIndex(index);
      this.getWeather();
    },
  },
  mounted() {
    this.query = this.$store.getters.getFirstFavorite;
    if (this.query) {
      this.getWeather();
    }
  },
};
</script>

<style lang="scss">
@import '@/assets/generate.scss';

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  overflow: hidden;
}

.main {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  &-content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
    overflow: auto !important;
  }

  margin: 0 auto;
  width: 800px;
  height: 100%;
  padding: 30px;

  background-color: rgba(0, 0, 0, .3);
  border-radius: 20px;
  @media (max-width: 850px) {
    width: 100%;
    margin: 0;
  }
  @media (max-width: 560px) {
    padding: 30px 15px;
  }
}

.content-enter-active,
.content-leave-active {
  transition: .2s
}

.content-enter,
.content-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  background: linear-gradient(180deg, #0e2555, #1f6ca0, #398eaf);
  width: 100%;
  box-sizing: border-box;
  padding: 30px 0;
  @media (max-width: 850px) {
    padding: 30px 40px;
  }
  @media (max-width: 405px) {
    padding: 30px 20px;
  }
  @media (max-width: 360px) {
    padding: 30px 10px;
  }
}

/* width */
::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba($color: #000000, $alpha: 0.4);
  border-radius: 10px;
}

::-webkit-scrollbar-corner {
  background: rgba($color: #000000, $alpha: 0);
}
</style>
