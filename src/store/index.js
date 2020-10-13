import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    key: 'c3f70fc04c5deaafe53df4a379f3a654',
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    getKey(state) {
      return state.key;
    },
  },
});
