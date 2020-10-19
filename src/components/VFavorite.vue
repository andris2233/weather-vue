<template>
  <div class="favorite">
    <div class="controls">
      <i class="material-icons controls-icon m-r-5px"
         @click="$emit('prev-favorite')">
        keyboard_arrow_left
      </i>
      <i class="material-icons controls-icon"
         @click="$emit('next-favorite')">
        keyboard_arrow_right
      </i>
    </div>
    <transition-group v-if="getAllFavorites.length" name="dots"
                      tag="div"
                      class="pages">
      <div v-for="(dot, index) in getAllFavorites"
          :key="dot"
          :class="{'pages__circle-active': index === isFavorite.idx,
                   'm-r-5px': index !== getAllFavorites.length - 1}"
          class="pages__circle">
      </div>
    </transition-group>
    <i class="material-icons favorite-icon"
       @click="$emit('star-clicked')">
        {{ isFavorite.idx !== -1 ? 'star' : 'star_border' }}
    </i>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'VFavorite',
  props: {
    isFavorite: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getAllFavorites']),
  },
};
</script>

<style lang="scss" scoped>
  .favorite {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 5px 10px;
    border-radius: 20px;
    background: linear-gradient(90deg, #103b4db0, #0a345075, #0e3b4d75);
    box-shadow: inset 0 1px 7px rgba($color: #000000, $alpha: 0.3);
    color: rgba($color: rgb(177, 250, 255), $alpha: 0.5);
    i {
      cursor: pointer;
      outline: none;
      transition: .2s;
      &:hover {
        color: rgba($color: #fff, $alpha: 0.7);
      }
    }
    .controls {
      display: flex;
      align-items: center;
    }
    .pages {
      display: flex;
      align-items: center;
      position: relative;
      transition: .2s;
      padding: 5px;
      border-radius: 3px;
      &:hover {
        box-shadow: 0 0 0 2px rgba($color: #fff, $alpha: 0.3);
      }
      &__circle {
        transition: .2s;
        border-radius: 50%;
        background : rgba($color: #fff, $alpha: 0.4);
        padding: 3px;
        &-active {
          background : #fff;
          transform: scale(1.5);
        }
      }
    }
  }

  .dots-enter-active,
  .dots-leave-active {
    transition: .2s;
  }

  .dots-leave-active {
    position: absolute;
  }

  .dots-enter,
  .dots-leave-to {
    opacity: 0;
    transform: scale(0);
  }

  .dots-move {
    transition: 0.2s;
  }
</style>
