<template>
  <div class="favorites-list">
    <div class="favorites-list__header">
      Добавленно в избранном
      <i class="material-icons favorites-list__header-icon m-l-5px">
        star
      </i>
    </div>
    <div v-for="item of getAllFavorites"
         :key="item"
         class="favorites-list__item">
      {{item}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'VFavoriteList',
  computed: {
    ...mapGetters(['getAllFavorites']),
  },
};
</script>

<style lang="scss" scoped>
  .favorites-list {
    background-color: rgba($color: #fff, $alpha: 0.2);
    border-radius: 10px;
    color: rgba($color: #000, $alpha: 0.5);
    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      padding: 15px 0;
    }
    &__item {
      padding: 10px 15px;
      position: relative;
      &::after {
        content: '';
        height: 1px;
        width: 95%;
        background: rgba($color: #fff, $alpha: 0.1);
        font-weight: 600;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>
