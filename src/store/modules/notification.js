export default {
  state: {
    notifications: [],
    removeDuration: 5 * 1000, // sec * ms
  },

  mutations: {
    addNotification(state, notification) {
      if (!state.notifications.find((n) => n.title === notification.title)) {
        const id = Date.now();

        const timeoutId = setTimeout(() => {
          const index = state.notifications.findIndex((n) => n.id === id);
          state.notifications.splice(index, 1);
        }, state.removeDuration);

        state.notifications.unshift({
          id,
          ...notification,
          timeoutId,
        });
      }
    },

    removeNotification(state, id) {
      const idx = state.notifications.findIndex((n) => n.id === id);

      clearTimeout(state.notifications[idx].timeoutId);
      state.notifications.splice(idx, 1);
    },

    clearNotificationTimeout(state, id) {
      const idx = state.notifications.findIndex((n) => n.id === id);

      clearTimeout(state.notifications[idx].timeoutId);
    },

    setNotificationTimeout(state, id) {
      const idx = state.notifications.findIndex((n) => n.id === id);
      const timeoutId = setTimeout(() => {
        const index = state.notifications.findIndex((n) => n.id === id);
        state.notifications.splice(index, 1);
      }, state.removeDuration);
      state.notifications[idx].timeoutId = timeoutId;
    },
  },

  actions: {
    addNotification({ commit }, notification) { commit('addNotification', notification); },

    removeNotification({ commit }, id) { commit('removeNotification', id); },

    clearNotificationTimeout({ commit }, id) { commit('clearNotificationTimeout', id); },

    setNotificationTimeout({ commit }, id) { commit('setNotificationTimeout', id); },
  },

  getters: {
    getNotifications({ notifications }) { return notifications; },
  },
};
