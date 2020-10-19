<template>
  <div class="favorites-menu__item"
       @mouseup="$emit('select', index)">
    <slot />
    <transition name="remove" appear>
      <i v-if="isRemovable"
         class="material-icons m-l-5px"
         @mouseup.stop="$emit('remove', index)">
           remove_circle_outline
      </i>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isRemovable: {
      type: Boolean,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .favorites-menu__item {
    display: flex;
    align-items: center;
    position: relative;

    color: rgba(255, 255, 255, 0.788);
    padding: 6px 10px;
    transition: .2s;
    min-height: 36px;
    &:hover {
      background: rgba($color: #fff, $alpha: 0.2);
    }
    &::after {
      content: '';
      height: 1px;
      width: 80%;
      background: rgba($color: #fff, $alpha: 0.3);
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .remove-enter-active,
  .remove-leave-active {
    transition: 0.3s;
  }

  .remove-enter,
  .remove-leave-to {
    opacity: 0;
    transform: scale(0);
  }
</style>
