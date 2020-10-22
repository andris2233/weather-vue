<template>
  <div class="notification-item">
    <div class="notification-item__header">
      <div class="notification-item__header-text m-b-10px">
        {{notification.title}}
      </div>
      <i class="notification-item__header-icon material-icons"
         @click="$emit('clear', notification.id)">
        close
      </i>
    </div>
    <div class="notification-item__message">
      {{notification.message}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  .notification-item {
    border-radius: 10px;
    background: linear-gradient(120deg, rgba(199, 236, 243, 0.9), rgba(180, 219, 245, 0.9));
    padding: 10px;
    transition: all .3s;
    &__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      &-text {
        font-size: 1.1rem;
        font-weight: 600;
      }
      &-icon {
        cursor: pointer;
        outline: none;
        opacity: 0.6;
        transition: .2s;
        &:hover {
          opacity: 1;
        }
      }
    }
    &__message {
      color: rgba($color: #000000, $alpha: 0.5);
      font-weight: 600;
    }
  }
</style>
