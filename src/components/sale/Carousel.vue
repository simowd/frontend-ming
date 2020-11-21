<template>
  <div id="sld">
    <carousel>
      <slide v-for="(slide, i) in gameInfo" :index="i" :key="slide">
        <figure>
          <img class="card-sale-carousel" v-bind:src="slide.banner" />
        </figure>
        <div >
          <v-row no-gutters>
            <v-col cols="6">
              <div>
                <p>
                  {{ slide.title }}<br />
                  ${{
                    (slide.price - (slide.price * slide.sale) / 100).toFixed(2)
                  }}
                  USD
                </p>
                <p class="text-sale">${{ slide.price }} USD</p>
              </div>
            </v-col>
            <v-col cols="6">
              <div>- {{ slide.sale }} %</div>
            </v-col>
          </v-row>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
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
    Carousel,
    Slide,
  },

  mounted() {
    axios
      .get("http://localhost:8080/ming/v1/games?page=1&sale=true")
      .then((response) => (this.gameInfo = response.data));
  },
};
</script>

<style scoped>
.text-sale {
  text-decoration: line-through;
}
</style>
