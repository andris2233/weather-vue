<template>
  <div id="app">
    <form class="main" @submit.prevent="getWeather">
      <div class="main__container">
        <VSearchbar v-model="query" class="m-b-15px"/>
        <transition name="content" mode="out-in">
          <VWeather v-if="weather" key="weather">
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
          <VLoader v-else-if="loading" key="load"/>
          <VError v-else-if="hasError" key="error">
            {{errorText}}
          </VError>
        </transition>
      </div>
    </form>
  </div>
</template>

<script>
import VSearchbar from '@/components/VSearchbar.vue';
import VError from '@/components/VError.vue';
import VLoader from '@/components/VLoader.vue';
import VWeather from '@/components/VWeather.vue';

import currentWeather from '@/api/current-weather';

export default {
  components: {
    VSearchbar,
    VError,
    VLoader,
    VWeather,
  },
  data() {
    return {
      query: '',
      loading: false,
      weather: null,
      hasError: false,
      statusCode: 200,
      errorLabel: {
        badReq: 'Одно поле ввода, чел... Попробуй че-нибудь другое написать',
        notFound: 'Такого места на планете Земля не существует, проверь правильность написания наименования',
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
      return '';
    },
  },
  methods: {
    async getWeather() {
      let res;
      this.loading = true;
      this.hasError = false;
      this.statusCode = 200;
      try {
        res = await currentWeather.getCurrWeatherByCountry(this.query);
        this.weather = res.data;
      } catch (e) {
        this.statusCode = e.response.status;
        this.weather = null;
        this.loading = false;
        this.hasError = true;
      }
    },
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
}

.main {
  background: linear-gradient(180deg, #0e2555, #1f6ca0, #398eaf);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 0;
  @media (max-width: 850px) {
    padding: 30px 40px;
  }
  @media (max-width: 405px) {
    padding: 30px 20px;
  }
  &__container {
    display: flex;
    flex-direction: column;
    align-items: stretch;

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
}
</style>
