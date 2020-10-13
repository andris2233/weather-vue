<template>
  <div :class="{'searchbar_active': focused}"
       class="searchbar" @click="focused=true;
       $refs.input.focus()"
  >
    <i class="searchbar__icon material-icons">
      search
    </i>
    <input ref="input"
           class="searchbar__input"
           type="text"
           :placeholder="placeholder"
           @input="$emit('input', $event.target.value)"
           @focus="focused=true"
           @blur="focused=false"
    >
  </div>
</template>

<script>
export default {
  name: 'VSearchbar',
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Search',
    },
  },
  data() {
    return {
      search: '',
      focused: false,
    };
  },
};
</script>

<style lang="scss">
  .searchbar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 20px;
    background: rgba(255, 255, 255, .3);
    padding: 0 10px;

    transition: .3s;

    &__input {
      background: none;
      outline: none;
      border: 0;
      height: 50px;
      width: 100%;
      font-size: 1.3rem;
      &::placeholder {
        color: rgba($color: #000000, $alpha: 0.8);
      }
    }

    &__icon {
      outline: none;
    }

    &_active {
      background: rgba(255, 255, 255, .7);
      box-shadow: 0 0 10px rgba(71, 197, 255, 0.5);
    }
  }
</style>
