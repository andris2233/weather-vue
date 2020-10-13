<template>
  <div id="app">
    <main class="main">
      <div class="main__container">
        <VSearchbar v-model="query"/>
      </div>
    </main>
  </div>
</template>

<script>
import VSearchbar from '@/components/VSearchbar.vue';

export default {
  components: { VSearchbar },
  data() {
    return {
      query: '',
    };
  },
};
</script>

<style lang="scss">

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.main {
  background: linear-gradient(180deg, #0e2555, #5ED5D1);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 0;
  @media (max-width: 850px) {
    padding: 30px 40px;
  }
  &__container {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    margin: 0 auto;
    width: 800px;
    height: 100%;
    padding: 30px;

    background-color: rgba(0, 0, 0, .3);
    border-radius: 20px;
    @media (max-width: 850px) {
      width: 100%;
      margin: 0;
    }
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
}
</style>
