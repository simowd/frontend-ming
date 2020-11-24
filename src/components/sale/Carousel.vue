<template>
  <div id="sld">
    <carousel>
      <slide v-for="(slide, i) in gameInfo" :index="i" :key="slide">
        <figure >
          <img
            class="card-sale-carousel"
            v-bind:src="slide.banner"
            :style="{
          boxShadow: '0 1px 2rem ' + slide.color + ''
        }"
          />
        </figure>
        <div>
          <v-row no-gutters>
            <v-col cols="6">
              <div >
                <p class="carousel-title">{{ slide.title }} <br /></p>
                <div class="card-carousel-data">
                  <p>
                  ${{
                    (slide.price - (slide.price * slide.sale) / 100).toFixed(2)
                  }}
                  USD -
                </p>
                <p class="text-sale">${{ slide.price }} USD</p>
                </div>
                
              </div>
            </v-col>
            <v-col cols="6">
              <div class="carousel-discount">- {{ slide.sale }} %</div>
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
import { URLBACKEND } from "@/assets/url.js";

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
      .get("http://" + URLBACKEND + "/ming/v1/games?page=1&sale=true")
      .then((response) => (this.gameInfo = response.data));
  },
};
</script>

<style scoped>
.text-sale {
  text-decoration: line-through;
}

.carousel-title{
  font-size: 2rem;
  margin-top: 1rem;
  text-align: center;
  font-weight: 200;
  margin-left: 20rem;
}

.carousel-discount{
  font-size: 2rem;
  font-weight: 300;
  height: 4rem;
  text-align: center;
  margin-top:2rem;
  margin-left: 5rem;
  padding-top: 0.4rem;
  border-color: #49a82c;
  border-style: solid;
  border-width: thin;
  color: #49a82c;
  width: 25%;
}
</style>
