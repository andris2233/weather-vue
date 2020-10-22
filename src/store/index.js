import Vue from 'vue';
import Vuex from 'vuex';

import favorites from './modules/favorites';
import notification from './modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    favorites,
    notification,
  },
});
