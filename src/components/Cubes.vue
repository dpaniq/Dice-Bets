<template>
  <div class="cubes">
    <div class="cubes__pseudo-buttons">
      <div
        class="cubes__pseudo-buttons__img"
        v-for="(cube, index) in cubes"
        @click="makeCubeBet(cube.id)"
        :key="index"
        :disabled="false"
      >
        <div class="cubes__chips-stack" v-if="cube.picked">
          <img
            v-for="(chip, index) in toFormStack(cube.name)"
            :key="index"
            :src="getChipImage(chip.name)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Bet, Stack } from '../intefaces/interface'

@Component({
  computed: {
    cubes() {
      return this.$store.state.dice.cubes;
    },
  },

  methods: {
    getChipImage(chip) {
      return require("@/assets/img/chips/chip_" + chip + ".png");
    },

    makeCubeBet(cube) {
      this.$store.commit({
        type: "makeCubeBet",
        cube,
      });
    },

    toFormStack(cube: number): Stack[] | [] {
      const bets = this.$store.state.dice.bets.length
        ? this.$store.state.dice.bets
        : [];

      const bet = bets.find((b: Bet) => b.cube === cube);
      const stack: Stack[] = [];

      if (bet) {
        for (const chip of bet.chips) {
          for (const _ in [...Array(chip.occurance).keys()]) {
            stack.push({ name: chip.name });
          }
        }
        return stack
      }
      return []
    },
  },
})

export default class Cubes extends Vue {}
</script>

<style scoped lang="scss">
.cubes {
  position: relative;
  width: 100%;
  height: 28em;

  margin: 0 auto;
  margin-top: -12em;

  background-image: url("~@/assets/img/cubes.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  & .cubes__pseudo-buttons {
    position: absolute;
    
    bottom: 7.8em;

    width: 100%;

    display: flex;  
    flex-direction: row;
    justify-content: center;


    &__img {
      margin: .32em;
      width: 72px;
      height: 72px;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 200px 50px rgba($color: #ffffff, $alpha: .1);
      }

      &:nth-child(1) {
        margin-top: 1.75em;
        transform: rotate(25deg);
      }

      &:nth-child(2) {
        margin-top: 3.35em;
        transform: rotate(10deg);
      }

      &:nth-child(3) {
        margin-top: 3.5em;
        transform: rotate(5deg);
      }
  
      &:nth-child(4) {
        margin-top: 3.5em;
        transform: rotate(-5deg);
      } 

      &:nth-child(5) {
        margin-top: 3.35em;
        transform: rotate(-10deg);
      }

      &:nth-child(6) {
        margin-top: 1.75em;
        transform: rotate(-25deg);
      }
    }
  }

  & .cubes__chips-stack {

    display: flex;
    flex-direction: column-reverse;
    bottom: 0;
    height: 100%;
    width: 100%;

    & img {
      margin-top: -84px;
      margin-left: -40%; 
      width: 130px;
      height: 90px;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
