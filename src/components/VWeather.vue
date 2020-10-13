<template>
  <div class="weather">
    <div class="weather__place m-b-5px">
      <slot name="place" />
    </div>
    <div class="weather__desc m-b-5px">
      <slot name="desc" />
    </div>
    <div class="weather__temp">
      <slot name="temp" />°C
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
  .weather {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    background: rgba($color: #fff, $alpha: 0.3);
    border-radius: 10px;
    padding: 15px;
    color: rgba($color: #000, $alpha: 0.5);
    &__place {
      font-size: 1.4rem;
      font-weight: 600;
    }
    &__temp {
      font-size: 2rem;
      color: rgba($color: #fff, $alpha: 0.7);
      text-shadow: 2px 2px 3px rgba($color: #000, $alpha: 0.7);
      font-weight: 600;
    }
  }

</style>
