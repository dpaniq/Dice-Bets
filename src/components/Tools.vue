<template>
  <div class="tools">
    <div class="tools__buttons">
      <button
        v-if="gameStatus < 3"
        :class="gameStatus < 2 ? 'disabled' : ''"
        @click="dice"
        :disabled="gameStatus < 2"
      >
        Roll the Dice
      </button>
      <button v-if="gameStatus > 3" @click="newGame">New Bet</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapMutations } from "vuex";

@Component({
  computed: {
    gameStatus() {
      return this.$store.state.dice.gameStatus;
    },
  },

  methods: {
    ...mapMutations(["newGame", "dice"]),
  },
})
export default class Tools extends Vue {}
</script>

<style scoped lang="scss">
.tools {
  margin-top: -4em;
  position: relative;
  width: 100%;

  &__buttons {
    display: flex;
    width: 100%;
    justify-content: center;

    & button {
      padding: 2em 4em;
      background: #4caf50;

      border: 0;
      color: rgb(255, 255, 255);
      font-weight: 800 !important;

      &.disabled {
        background: gray;
        cursor: not-allowed !important;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.05);
        cursor: pointer;
      }
    }
  }
}
</style>
