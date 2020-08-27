<template>
  <div class="deck">
    <!-- Info Panel -->
    <Info />

    <!-- Cubics Random Panel -->
    <Cubics />

    <!-- Cube Faces Panel -->
    <Cubes />

    <!-- Buttons Panel -->
    <Tools />

    <!-- Chips Panel -->
    <Chips />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Info from "@/components/Info.vue";
import Cubics from "@/components/Cubics.vue";
import Cubes from "@/components/Cubes.vue";
import Tools from "@/components/Tools.vue";
import Chips from "@/components/Chips.vue";

@Component({
  components: {
    Info,
    Cubics,
    Cubes,
    Tools,
    Chips,
  },
})
export default class Deck extends Vue {}
</script>

<style scoped lang="scss">
.deck {
  position: relative;

  background-image: url("../assets/img/desk.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  height: 100vh;
}
</style>
