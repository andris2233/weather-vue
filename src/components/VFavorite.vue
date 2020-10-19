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
    <div class="pages" @click="showSelect = true">
      <transition name="select" appear>
        <VFavoritesMenu v-if="showSelect"
                        v-click-outside="hideSelect"
                        :options="getAllFavorites"
                        class="pages-select"
                        @select="selectFavorite($event)"/>
      </transition>
      <div v-for="(dot, index) in getAllFavorites"
          :key="dot"
          :class="{'pages__circle-active': index === isFavorite.idx,
                   'm-r-5px': index !== getAllFavorites.length - 1}"
          class="pages__circle">
      </div>
    </div>
    <i class="material-icons favorite-icon"
       @click="$emit('star-clicked')">
        {{ isFavorite.idx !== -1 ? 'star' : 'star_border' }}
    </i>
  </div>
</template>

<script>
import VFavoritesMenu from '@/components/VFavoritesMenu.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'VFavorite',
  props: {
    isFavorite: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showSelect: false,
    };
  },
  components: { VFavoritesMenu },
  computed: {
    ...mapGetters(['getAllFavorites']),
  },
  methods: {
    hideSelect() {
      this.showSelect = false;
    },
    selectFavorite(index) {
      this.$emit('select-favorite', index);
      setTimeout(() => {
        this.hideSelect();
      }, 100);
    },
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
      cursor: pointer;
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
      &-select {
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%) scale(1);
      }
    }
  }

  .select-enter-active,
  .select-leave-active {
    transition: .2s;
  }

  .select-enter,
  .select-leave-to {
    opacity: 0;
  }
</style>
