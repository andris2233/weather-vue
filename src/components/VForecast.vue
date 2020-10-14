<template>
  <div class="forecast">
    <div class="forecast-wrapper">
      <div v-for="(row, index) of weatherList"
           :key="index"
           class="forecast__row">
        <div class="forecast__row-item__filled">
          {{displayDate(row)}}
        </div>
        <div v-for="(item, idx) in row"
            :key="idx"
            class="forecast__row-item"
        >
          <div class="forecast__row-item-header">
            <img class="forecast__row-item-icon m-b-5px"
                :src="item.icon"
                :style="{display: item.icon ? 'inline-block' : 'none'}"
            >
            <div class="forecast__row-item-date m-b-5px">
              {{item.dt ? dayFormat(item.dt) : ''}}
            </div>
          </div>
          <div class="forecast__row-item-temp">
            {{item.temp ? `${item.temp}°C` : ''}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import timezoneDate from '../_helper/timezoneDate';
import iconLink from '../api/icon-link';

export default {
  props: {
    weather: {
      type: Array,
      default: () => [],
    },
    timezone: {
      type: Number,
      required: true,
    },
  },
  computed: {
    weatherList() {
      const { weather, timezone } = this;
      if (!weather) {
        return [];
      }
      const resultList = [];
      let curDay = timezoneDate(weather[0].dt * 1000, timezone).getDate();
      let day = [];
      for (let i = 0; i < weather.length; i++) {
        const iDay = timezoneDate(weather[i].dt * 1000, timezone).getDate();
        if (iDay !== curDay) {
          resultList.push(day);
          day = [];
          curDay = iDay;
        } else {
          day.push({
            temp: weather[i].main.temp.toFixed(1),
            dt: timezoneDate(weather[i].dt * 1000, timezone),
            icon: iconLink(weather[i].weather[0].icon),
          });
        }
      }
      while (resultList[0].length < 7) {
        resultList[0].unshift({});
      }
      while (day.length < 7) {
        day.push({});
      }
      resultList.push(day);
      return resultList;
    },
  },
  methods: {
    dayFormat(dt) {
      return `${dt.getHours()}:00`;
    },
    displayDate(array) {
      const withDate = array.find((item) => item.dt);
      if (!withDate) {
        return '';
      }
      const date = withDate.dt.toLocaleDateString();
      return date.substring(0, date.length - 5);
    },
  },
};
</script>

<style lang="scss" scoped>
  .forecast {
    background-color: rgba($color: #fff, $alpha: 0.2);
    border-radius: 10px;
    padding: 15px;
    color: rgba($color: #000, $alpha: 0.5);
    height: 100%;
    overflow: auto !important;
    &-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto !important;
      width: 100%;
      height: 100%;
    }
    &__row {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      &-item {
        flex: 1;
        border-radius: 5px;
        border: 2px solid rgba($color: #fff, $alpha: .2);
        margin: 5px;
        padding: 5px;
        min-width: 72px;
        transition: .2s;
        &:hover {
          background: rgba($color: #fff, $alpha: 0.1)
        }
        &__filled {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          margin: 5px;
          border: 2px solid rgba($color: #fff, $alpha: .2);
          font-size: 1.2rem;
          font-weight: 600;
          color: rgba($color: #fff, $alpha: 0.6);
          min-width: 60px;
        }
        &-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        &-icon {
          width: 20px;
          height: 20px;
        }
        &-date {
          font-size: 0.9rem;
          font-weight: 600;
        }
        &-temp {
          font-size: 1rem;
          font-weight: 600;
          color: rgba($color: #fff, $alpha: 0.6);
          text-shadow: 1px 1px 2px rgba($color: #000, $alpha: 0.7);
        }
      }
    }
  }
</style>