import Vue from 'vue';
import ClickOutside from '@/directives/ClickOutside';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;
Vue.use(ClickOutside);

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
