<template>
  <transition-group
    name="notification"
    class="notification-wrapper"
    tag="div"
  >
    <VNotification
      v-for="notification of getNotifications"
        :key="notification.id"
        :notification="notification"
        class="notification-wrapper__item"
        @clear="clearNotification($event)"
        @mouseover="clearNotificationTimeout($event)"
        @mouseleave="setNotificationTimeout($event)"
      />
  </transition-group>
</template>

<script>
import VNotification from '@/components/VNotification.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'VNotificationWrapper',

  components: { VNotification },

  computed: { ...mapGetters(['getNotifications']) },

  methods: {
    clearNotification(id) {
      this.$store.dispatch('removeNotification', id);
    },

    clearNotificationTimeout(id) {
      this.$store.dispatch('clearNotificationTimeout', id);
    },

    setNotificationTimeout(id) {
      this.$store.dispatch('setNotificationTimeout', id);
    },
  },
};
</script>

<style lang="scss" scoped>
  .notification-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    position: fixed;
    top: 30px;
    right: 10px;

    width: 400px;
    z-index: 10;
    @media (max-width: 560px) {
      right: 0;
      width: 100%;
    }
    &__item {
      margin: 5px;
      @media (max-width: 560px) {
        margin: 5px 20px;
      }
    }
  }
  .notification-enter {
    transform: translate(0, -100px);
    opacity: 0;
  }
  .notification-leave-active {
    position: absolute;
  }
  .notification-leave-to {
    transform: scale(0.9);
    opacity: 0;
  }
</style>
