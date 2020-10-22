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
          const idx = state.notifications.find((n) => n.id === id);
          state.notifications.splice(idx, 1);
        }, state.removeDuration);
        state.notifications.unshift({
          id,
          ...notification,
          timeoutId,
        });
      }
    },
    removeNotification(state, id) {
      const idx = state.notifications.find((n) => n.id === id);
      clearTimeout(state.notifications[idx]);
      state.notifications.splice(idx, 1);
    },
  },
  actions: {
    addNotification({ commit }, notification) {
      commit('addNotification', notification);
    },
    removeNotification({ commit }, id) {
      commit('removeNotification', id);
    },
  },
  getters: {
    getNotifications({ notifications }) {
      return notifications;
    },
  },
};
