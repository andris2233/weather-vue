<template>
  <div class="favorites-list">
    <div class="favorites-list__header">
      Добавлено в избранном
      <i class="material-icons favorites-list__header-icon">star</i>
    </div>

    <div
      v-for="item of array"
      :key="item"
      class="favorites-list__item"
      @click="$emit('select-favorite', item)"
    > {{ item }} </div>
  </div>
</template>

<script>
export default {
  name: 'VFavoriteList',

  props: {
    array: { type: Array, required: true },
  },
};
</script>

<style lang="scss" scoped>
  .favorites-list {
    background-color: rgba($color: #fff, $alpha: 0.2);
    border-radius: 10px;
    color: rgba($color: #000, $alpha: 0.5);
    overflow: hidden;
    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      padding: 15px 0;
      @media (max-width: 500px){
        // padding: 15px;
        flex-direction: column-reverse;
        text-align: center;
      }
      &-icon {
        margin: 0 0 0 5px;
        @media (max-width: 500px){
          margin: 0;
        }
      }
    }
    &__item {
      padding: 13px;
      position: relative;
      transition: .2s;
      cursor: pointer;
      font-size: 1.1rem;
      &::after {
        content: '';
        height: 1px;
        width: 95%;
        background: rgba($color: #fff, $alpha: 0.1);
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      &:hover {
        background-color: rgba($color: #fff, $alpha: 0.1);
      }
    }
  }
</style>
