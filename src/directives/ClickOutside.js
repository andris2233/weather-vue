import Vue from 'vue';

export default Vue.directive('click-outside', {
  bind(el, binding) {
    el.clickHandler = (e) => {
      if (e.target !== el && !el.contains(e.target)) binding.value(e);
    };

    document.addEventListener('mousedown', el.clickHandler);
  },

  unbind(el) {
    document.removeEventListener('mousedown', el.clickHandler);
  },
});
