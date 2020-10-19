import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
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
      if (index) {
        state.favorites.splice(index, 1);
        localStorage.setItem('favoritePlaces', JSON.stringify(state.favorites));
      }
    },
  },
  actions: {
    setFavorite({ commit }, place) {
      commit('setFavorite', place);
    },
    removeFavorite({ commit, favorites }, place) {
      const index = favorites.findIndex((item) => item === place);
      commit('removeFavorite', index);
    },
  },
  getters: {
    getFirstFavorite({ favorites }) {
      return favorites.length ? favorites[0] : '';
    },
    canSet({ favorites, maxLength }) {
      return favorites.length < maxLength;
    },
    isFavorite({ favorites }) {
      return (place) => favorites.includes(place);
    },
  },
});
