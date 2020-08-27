import Vue from "vue";
import Vuex from "vuex";
// import axios from 'axios';
Vue.use(Vuex);

import { gameStatus } from "../enum/enum";
import { Bet, Chips, Cubes } from "../intefaces/interface";
import { toFormChipOccuranceInStack, randomCubes } from "../helper/functions";

export default new Vuex.Store({
  state: {
    balance: 100, // Set starting balance here
    cubics: randomCubes(),
    dice: {
      total: 0,
      bets: [] as Bet[],
      gameStatus: gameStatus.PLAYER_WILL_BET,
      cubes: [
        { id: 1, name: 1, fullname: "One", picked: false },
        { id: 2, name: 2, fullname: "Two", picked: false },
        { id: 3, name: 3, fullname: "Three", picked: false },
        { id: 4, name: 4, fullname: "Four", picked: false },
        { id: 5, name: 5, fullname: "Five", picked: false },
        { id: 6, name: 6, fullname: "Six", picked: false },
      ] as Cubes[],
      
      chips: [
        { id: 1, cost: 1, disabled: false },
        { id: 2, cost: 5, disabled: false },
        { id: 3, cost: 25, disabled: false },
        { id: 4, cost: 100, disabled: false },
        { id: 5, cost: 500, disabled: false },
        { id: 6, cost: 1000, disabled: false },
      ] as Chips[],
    },
  },

  mutations: {
    newCubics(state): void {
      state.cubics = randomCubes();
    },

    makeChipBet(state, payload): void {
      const countStacks = 2;

      if (
        state.dice.gameStatus === gameStatus.PLAYER_WILL_BET ||
        state.dice.gameStatus === gameStatus.PLAYER_DID_BET_NUMBERS
      ) {
        if (state.dice.bets.length < countStacks) {
          const bet: Bet = { total: 0, chips: [], cube: 0, set: false };
          state.dice.bets = [...state.dice.bets, bet];

          const lastBet = state.dice.bets.slice(-1)[0];
          if (lastBet.set === false) {
            state.dice.gameStatus = gameStatus.PLAYER_DID_BET_CHIPS;
            lastBet.total += payload.cost;
            lastBet.chips = toFormChipOccuranceInStack(lastBet.total);
            state.balance -= payload.cost;
          }
        }
      } else if (state.dice.gameStatus === gameStatus.PLAYER_DID_BET_CHIPS) {
        const lastBet = state.dice.bets.slice(-1)[0];
        if (lastBet.set === false) {
          lastBet.total += payload.cost;
          lastBet.chips = toFormChipOccuranceInStack(lastBet.total);
          state.balance -= payload.cost;
        }
      }
    },

    gameStatus(state): string {
      return gameStatus[state.dice.gameStatus];
    },

    makeCubeBet(state, payload): void {
      const dice = state.dice;
      const bets = dice.bets;
      const cubes = state.dice.cubes;
      const lastBet = bets.slice(-1)[0];

      const busyCubeEdge: boolean = bets.some((bet) => {
        return bet.cube === payload.cube;
      });

      if (!busyCubeEdge) {
        if (dice.gameStatus === gameStatus.PLAYER_DID_BET_CHIPS) {
          lastBet.set = true;
          lastBet.cube = payload.cube;
          cubes[payload.cube - 1].picked = true;
          dice.gameStatus = gameStatus.PLAYER_DID_BET_NUMBERS;
        } else if (dice.gameStatus === gameStatus.PLAYER_DID_BET_NUMBERS) {
          const oldCube = lastBet.cube;

          bets.map((bet: Bet) => {
            if (bet.cube !== payload.cube) {
              lastBet.cube = payload.cube;
              cubes[oldCube - 1].picked = false;
              cubes[payload.cube - 1].picked = true;
            }
          });
        }
      }
    },

    undo(state): void {
      const dice = state.dice;
      const bet = dice.bets.slice(-1)[0];
      dice.bets = dice.bets.slice(0, -1);
      dice.gameStatus = dice.bets.length
        ? gameStatus.PLAYER_DID_BET_NUMBERS
        : gameStatus.PLAYER_WILL_BET;
      state.balance += bet.total;
    },

    repeat(state): void {

      const lastBet = state.dice.bets.slice(-1)[0];
      if (state.balance > lastBet.total * 2) {
        lastBet.total *= 2;
        lastBet.chips = toFormChipOccuranceInStack(lastBet.total);
      }
    },

    dice(state): void {
      const stack: number = state.dice.bets.reduce((acc: number, bet: Bet) => {
        if (state.cubics.includes(bet.cube)) {
          acc +=
            bet.total *
            // total * ( count of cubics + 1 )
            (1 + state.cubics.filter((cube) => cube === bet.cube).length);
        }
        return acc;
      }, 0);

      if (stack) {
        state.dice.gameStatus = gameStatus.PLAYER_WON;
        setTimeout(() => (state.balance += Math.floor(stack)), 1500);
      } else {
        state.dice.gameStatus = gameStatus.PLAYER_LOSE;
      }

      // Hypothetic Request to Server
      // axios
      //   .post("http://localhost:8081/stub/", JSON.stringify(state.dice.bets)})
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },

    newGame(state): void {
      state.dice.bets = [];
      state.dice.cubes.map((cube) => (cube.picked = false));
      state.dice.gameStatus = gameStatus.PLAYER_WILL_BET;
      state.cubics = randomCubes();
    },
  },

  actions: {},
  modules: {},
});