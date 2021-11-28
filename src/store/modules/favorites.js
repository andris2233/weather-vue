export default {
  state: {
    favorites: JSON.parse(localStorage.getItem('favoritePlaces') || '[]'),
    maxLength: 5,
  },

  mutations: {
    setFavorite(state, place) {
      const { favorites, maxLength } = state;
      if (favorites.length < maxLength) {
        state.favorites.push(place);
        localStorage.setItem('favoritePlaces', JSON.stringify(state.favorites));
      }
    },

    removeFavorite(state, index) {
      if (index || index === 0) {
        state.favorites.splice(index, 1);
        localStorage.setItem('favoritePlaces', JSON.stringify(state.favorites));
      }
    },
  },

  actions: {
    setFavorite({ commit }, place) { commit('setFavorite', place); },

    removeFavorite({ commit, state }, place) {
      const index = state.favorites.findIndex((item) => item === place);
      commit('removeFavorite', index);
    },
  },

  getters: {
    getFirstFavorite({ favorites }) { return favorites.length ? favorites[0] : ''; },

    getAllFavorites({ favorites }) { return favorites; },

    canSet({ favorites, maxLength }) { return favorites.length < maxLength; },

    isFavorite({ favorites }) {
      return (place) => ({
        idx: favorites.findIndex((p) => p === place),
        len: favorites.length,
      });
    },

    prevFavorite({ favorites }) {
      return (place) => {
        if (!favorites.length) return null;

        const indexOfPlace = favorites.findIndex((p) => p === place);

        if (indexOfPlace !== -1) {
          if (indexOfPlace === 0) return favorites[favorites.length - 1];

          return favorites[indexOfPlace - 1];
        }

        return favorites[0];
      };
    },

    nextFavorite({ favorites }) {
      return (place) => {
        if (!favorites.length) return null;

        const indexOfPlace = favorites.findIndex((p) => p === place);

        if (indexOfPlace !== -1) {
          if (indexOfPlace === favorites.length - 1) return favorites[0];

          return favorites[indexOfPlace + 1];
        }

        return favorites[0];
      };
    },

    getByIndex({ favorites }) { return (index) => favorites[index]; },
  },
};
