<template>
  <div class="favorites-menu">
    <VFavoritesMenuItem v-for="(opt, index) of options"
                        :key="opt"
                        :is-removable="removable"
                        :index="index"
                        @select="$emit('select', $event)"
    >
      <template>
        {{opt}}
      </template>
    </VFavoritesMenuItem>
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
  }
</style>
