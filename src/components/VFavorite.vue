<template>
  <div class="favorite">
    <div class="controls">
      <i class="material-icons controls-icon m-r-5px">
        keyboard_arrow_left
      </i>
      <i class="material-icons controls-icon">
        keyboard_arrow_right
      </i>
    </div>
    <i class="material-icons favorite-icon"
       @click="$emit('star-clicked')">
        {{ isFavorite ? 'star' : 'star_border' }}
    </i>
  </div>
</template>

<script>
export default {
  name: 'VFavorite',
  props: {
    isFavorite: {
      type: Boolean,
      required: true,
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
    }
    .controls {
      display: flex;
      align-items: center;
    }
  }
</style>
