<template>
  <div class="info">
    <p>Balance: {{ balance }}</p>

    <div class="info__player-info">
			<ul class="bets">
			<h2 v-if="bets.length">Bets:</h2>
				<li v-for="(bet, index) in bets" :key="index">
					<p>{{index + 1}}. {{bet.total}} on 
						<span v-if="bet.cube">
							{{cubes[bet.cube - 1].fullname}}({{ bet.cube }})
						</span>
					</p>
				</li>
			</ul>
		</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Bet } from '../intefaces/interface'

@Component({
  computed: {
    balance() {
      return this.$store.state.balance;
    },

    cubes() {
      return this.$store.state.dice.cubes;
    },

    bets() {
      return this.$store.state.dice.bets;
    }
  }
})
export default class Info extends Vue {}
</script>

<style scoped lang="scss">
.info {
  position: absolute;
  text-align: center;
  top: 7.5em;

  width: 100%;
  color: white;

  &__player-info {
		& ol {
			list-style-type: upper-roman;
		}
  }
}
</style>
