<template>
  <div class="error">
    <div class="error__header">
      <i class="material-icons m-l-5px error__header-icon">error_outline</i>
      <div class="error__header-text m-b-10px">
        Упс, что-то пошло не так!
      </div>
    </div>
    <div class="error__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .error {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    padding: 15px;
    border-radius: 5px;
    background: rgba($color: #fff, $alpha: 0.3);
    color: rgba($color: #000, $alpha: 0.5);

    &__header {
      font-size: 1.6rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &-icon {
        font-size: 40px;
      }
      &-text {
        text-align: center;
      }
    }
    &__content {
      font-size: 1.2rem;
      text-align: center;
    }
  }
</style>
