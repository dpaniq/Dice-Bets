<template>
  <div class="cubics">
    <div class="cubics__dice" v-if="gameStatus > 3">
      <img
        v-for="(cube, index) in cubics"
        :key="index"
        :src="getCubeImage(index)"
        :alt="cube.name"
      />
    </div>
    <div class="cubics__secret-cover" v-else>
			
      <img src="@/assets/img/load2.gif" alt="loading" />
			<p v-if="gameStatus === 0">Waiting for a bet</p>
			<p v-if="gameStatus === 1">Where the bet goes</p>
			<p v-if="gameStatus === 2">Roll the dice!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapMutations } from "vuex";

@Component({
  computed: {
    cubics() {
      return this.$store.state.cubics;
    },

    gameStatus() {
      return this.$store.state.dice.gameStatus;
    },
  },

  methods: {
    getCubeImage(cube) {
      return require("../assets/img/cubes/" +
        this.$store.state.cubics[cube] +
        ".png");
    },
  },
})
export default class Cubics extends Vue {}
</script>

<style scoped lang="scss">
.cubics {
  padding-top: 15em;
  margin: 0 auto;	

  height: 7em;

  &__dice {
		display: flex;

		flex-direction: row;
		justify-content: center;
    text-align: center;

		height: 100%;

    & img {
      margin: -1.3em;
      height: 100%;

      &:nth-child(2) {
        margin-top: -3em;
      }
    }
  }

  &__secret-cover {
    width: 100%;
		color: rgba(224, 253, 59, 0.733);
    text-align: center;
    & img {
      height: 25px;
    }

		& p {
			font-weight: 900 !important;
		}
  }
}
</style>
