<template>
  <div id="sld">
   <!-- <carousel-3d>
      <slide
        class="card-sale-carousel"
        v-for="(slide, i) in gameInfo"
        :index="i"
        :key="slide" >
        <figure>
          <img v-bind:src="slide.banner"/>
        </figure>
      </slide>
    </carousel-3d> -->
  </div>
</template>

<script>
//import { Carousel3d, Slide } from "vue-carousel-3d";
import axios from "axios";

export default {
  el: "#sld",
  data() {
    return {
      slides: 7,
      gameInfo: null,
    };
  },

  components: {
    //Carousel3d,
    //Slide,
  },

  mounted() {
    axios
      .get("http://localhost:8080/ming/v1/games?page=1&sale=true")
      .then((response) => (this.gameInfo = response.data));
  },
};
</script>

<style scoped></style>
