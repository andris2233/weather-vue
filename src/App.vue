<template>
  <div id="app">
    <form class="main" @submit.prevent="getWeather">
      <VSearchbar v-model="query" class="m-b-15px"/>

      <transition name="content" mode="out-in">
        <div v-if="weather && forecast" key="weather" class="main-content">
          <VWeather
            class="m-b-15px"
            :date="{
              ts: weather.dt,
              timezone: weather.timezone,
              sunset: weather.sys.sunset,
              sunrise: weather.sys.sunrise
            }"
            :icon="weather.weather[0].icon"
          >
            <template #place>{{ weather.name }}</template>

            <template #desc>{{ weather.weather[0].description }}</template>

            <template #temp>{{ weather.main.temp }}</template>
          </VWeather>

          <VForecast
            :weather="forecast.list"
            :timezone="forecast.city.timezone"
            :is-favorite="isFavorite(weather.name)"
            @star-clicked="toFavorite(isFavorite(weather.name))"
            @prev-favorite="prevFavorite"
            @next-favorite="nextFavorite"
            @select-favorite="selectFavoriteByIndex"
            @remove-favorite="$store.dispatch('removeFavorite', $event)"
          />
        </div>

        <VLoader v-else-if="loading" key="load"/>

        <div v-else-if="hasError" key="error" class="main-errors">

          <VError class="m-b-15px">{{ errorText }}</VError>
          <VFavoriteList
            v-if="getAllFavorites.length"
            :array="getAllFavorites"
            @select-favorite="selectFavoriteByName"
          />
        </div>
      </transition>
    </form>
    <VNotificationWrapper />
  </div>
</template>

<script>
import VSearchbar from '@/components/VSearchbar.vue';
import VError from '@/components/VError.vue';
import VLoader from '@/components/VLoader.vue';
import VWeather from '@/components/VWeather.vue';
import VForecast from '@/components/VForecast.vue';
import VFavoriteList from '@/components/VFavoriteList.vue';
import VNotificationWrapper from '@/components/VNotificationWrapper.vue';

import { mapGetters } from 'vuex';
import weatherApi from '@/api/current-weather';
import errorLabel from '@/model/error';
import { errorMaxFavorite, createNotification } from '@/_helper/notification';

export default {
  components: {
    VSearchbar,
    VError,
    VLoader,
    VWeather,
    VForecast,
    VFavoriteList,
    VNotificationWrapper,
  },

  data() {
    return {
      query: '',
      loading: false,
      hasError: false,
      statusCode: 200,

      weather: null,
      forecast: null,

      cacheData: {},
      cacheDuration: 3 * 60000, // min * ms
    };
  },

  computed: {
    errorText() {
      if (this.statusCode === 400) return errorLabel.badReq;
      if (this.statusCode === 404) return errorLabel.notFound;
      if (this.statusCode === -1) return errorLabel.apiKey;

      return errorLabel.default;
    },

    ...mapGetters(['isFavorite', 'getByIndex', 'getAllFavorites', 'canSet']),
  },

  methods: {
    async getWeather() {
      const { cacheDuration } = this;
      const query = this.query.toLowerCase();

      if (!query) {
        this.$store.dispatch(
          'addNotification',
          createNotification(
            'Не заполнено поле ввода!',
            'Пожалуйста, заполните строку поиска и повторите попытку',
          ),
        );

        return;
      }

      this.loading = true;
      this.hasError = false;
      this.weather = null;
      this.forecast = null;

      try {
        const cacheData = this.cacheData[query];

        if (cacheData && cacheData.ts > Date.now() - cacheDuration) {
          setTimeout(() => {
            this.weather = cacheData.weather;
            this.forecast = cacheData.forecast;
          }, 100);
        } else {
          const weather = await weatherApi.getCurrWeatherByCountry(query);
          const forecast = await weatherApi.getForecastWeatherByCountry(query);

          this.cacheData[query] = {
            weather: weather.data,
            forecast: forecast.data,
            ts: Date.now(),
          };

          this.weather = weather.data;
          this.forecast = forecast.data;
        }
      } catch (e) {
        if (e.message === 'apiKey') this.statusCode = -1;
        else this.statusCode = e.response.status;

        this.weather = null;
        this.loading = false;
        this.hasError = true;
      }
    },

    toFavorite(isFav) {
      const { name } = this.weather;
      if (isFav.idx !== -1) {
        this.$store.dispatch('removeFavorite', name);
      } else if (this.canSet) {
        this.$store.dispatch('setFavorite', name);
      } else {
        this.$store.dispatch('addNotification', errorMaxFavorite(name));
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

    selectFavoriteByIndex(index) {
      const query = this.getByIndex(index);

      if (query !== this.query) {
        this.query = query;
        this.getWeather();
      }
    },

    selectFavoriteByName(name) {
      const query = name;

      if (query !== this.query) {
        this.query = query;
        this.getWeather();
      }
    },
  },

  mounted() {
    this.query = this.$store.getters.getFirstFavorite;

    if (this.query) this.getWeather();
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
  height: 100vh;
}

html {
  @media (max-width: 560px) {
    font-size: 13px;
  }
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
  @media (max-width: 450px) {
    padding: 20px 10px;
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
  height: 100%;
  background: linear-gradient(180deg, #0e2555, #1f6ca0, #398eaf);
  width: 100%;
  box-sizing: border-box;
  padding: 30px 0;
  @media (max-width: 850px) {
    padding: 13px;
  }
  @media (max-width: 405px) {
    padding: 10px;
  }
  @media (max-width: 360px) {
    padding: 15px 10px;
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
