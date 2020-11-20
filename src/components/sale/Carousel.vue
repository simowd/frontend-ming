<template>
  <div id="sld">
<<<<<<< HEAD
    <carousel-3d>
      <slide v-for="(slide, i) in gameInfo" :index="i" :key="i">
        <figure>
          <img v-bind:src="slide.banner" width="100%" height="100%"/>
        </figure>
      </slide>
    </carousel-3d>
=======
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
>>>>>>> 6a57476360eac3a2a50fd3999fea86ae25b1f58b
  </div>
</template>

<script>
<<<<<<< HEAD
import { Carousel3d, Slide } from "vue-carousel-3d";
=======
//import { Carousel3d, Slide } from "vue-carousel-3d";
>>>>>>> 6a57476360eac3a2a50fd3999fea86ae25b1f58b
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
<<<<<<< HEAD
    Carousel3d,
    Slide,
  },
  mounted() {
    axios
      .get("http://localhost:8080/ming/v1/games?page=1&sale=true")
      .then((response) => (this.gameInfo = response.data));
  },
};
</script>

=======
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
>>>>>>> 6a57476360eac3a2a50fd3999fea86ae25b1f58b
