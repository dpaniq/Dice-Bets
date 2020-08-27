<template>
  <div id="app">
    <Deck />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Deck from '@/components/Deck.vue';

@Component({
  components: {
    Deck
  }
})

export default class App extends Vue {}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,100&display=swap');
* {
  font-family: 'Roboto', sans-serif;
  font-weight: 100;

  &:focus {
    outline: 0;
  }
}
</style>
