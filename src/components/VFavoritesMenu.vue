<template>
  <div class="favorites-menu">
    <VFavoritesMenuItem v-for="(opt, index) of options"
                        :key="opt"
                        :is-removable="removable"
                        :index="index"
                        @select="$emit('select', $event)"
                        @remove="$emit('remove-favorite', options[$event])"
    >
      <template>
        {{opt}}
      </template>
    </VFavoritesMenuItem>
    <div class="favorites-menu__edit">
      <i class="material-icons favorites-menu__edit-icon" @click="removable = !removable">
        {{removable ? 'clear' : 'edit'}}
      </i>
    </div>
  </div>
</template>

<script>
import VFavoritesMenuItem from '@/components/VFavoritesMenuItem.vue';

export default {
  props: {
    options: {
      type: Array,
      requierd: true,
    },
  },
  components: { VFavoritesMenuItem },
  data() {
    return {
      removable: false,
    };
  },
};
</script>

<style lang="scss" scoped>
  .favorites-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    min-width: 200px;

    background: linear-gradient(90deg, rgba(42, 94, 102, 0.9), rgba(43, 110, 165, 0.9));
    border-radius: 10px;
    border: 2px solid rgb(176, 230, 227);

    &__edit {
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
      top: -10px;
      right: -10px;

      background: rgba($color: #2f5d72, $alpha: 0.9);
      color: rgba($color: #fff, $alpha: 0.8);
      width: 25px;
      height: 25px;
      border: 2px solid #fff;
      border-radius: 50%;
      &-icon {
        font-size: 15px;
      }
    }
  }
</style>
