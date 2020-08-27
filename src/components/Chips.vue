<template>
  <div class="chips">
    <div class="chips__chips-button">
      <button class="tool" v-on:click="undo" :disabled="gameStatus >= 3">
        <img :src="getChipImage('undo')" alt="undo" />
      </button>

      <button
        v-for="(chip, index) in chips"
        @click="makeChipBet(chip.cost)"
        :key="index"
        :src="getChipImage(chip.cost)"
        :disabled="balance < chip.cost"
      >
        <img
          :class="balance < chip.cost ? 'disabled' : ''"
          :src="getChipImage(chip.cost)"
          :alt="chip.cost"
        />
      </button>

      <button class="tool" v-on:click="repeat" :disabled="balance <= 0 || gameStatus >= 3">
        <img :src="getChipImage('repeat')" alt="repeat" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapMutations } from "vuex";

@Component({
  computed: {
    chips() {
      return this.$store.state.dice.chips;
    },

    balance() {
      return this.$store.state.balance;
    },

    gameStatus() {
      return this.$store.state.dice.gameStatus;
    }
  },

  methods: {
    ...mapMutations(["undo", "repeat"]),

    getChipImage(chip) {
      if (/^\d+$/.test(chip)) {
        return require("@/assets/img/chips/chip_" + chip + ".png");
      }
      return require("@/assets/img/" + chip + ".png");
    },

    makeChipBet(cost) {
      this.$store.commit({
        type: "makeChipBet",
        cost,
      });
    },
  },
})
export default class Chips extends Vue {}
</script>

<style scoped lang="scss">
.chips {
  margin: 0 auto;
  position: relative;

  &__chips-button {
    display: flex;
    flex-direction: row;
    justify-content: center;

    & button {
      margin: 1em;
      position: relative;
      border: 0;
      background: none;

      cursor: pointer;

      width: 80px;
      height: 100px;

      &:nth-child(1),
      &:nth-child(8) {
        margin-top: -2em;
      }

      &:nth-child(2),
      &:nth-child(7) {
        margin-top: 1em;
      }

      &:nth-child(3),
      &:nth-child(6) {
        margin-top: 2em;
      }

      &:nth-child(4),
      &:nth-child(5) {
        margin-top: 3em;
      }

      & img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 100%;

        &.disabled {
          filter: grayscale(100);
        }

        &:hover {
          cursor: pointer;
          margin-top: 1em;
          border-bottom: 1px solid yellow;
        }
      }

      &.tool img:hover {
        filter: brightness(2);
        margin-top: 0;
        border-bottom: 0;
      }

      &:active,
      :hover {
        border: 0;
        box-shadow: none;
      }
    }
  }

}
</style>
