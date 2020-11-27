<template>
  <div>
    <v-row v-if="game != null">
      <v-col :cols="8">
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col :cols="4"> Hola </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";

export default {
  name: "GameInfo",
  props: ["id"],
  data() {
    return {
      game: null,
      errores: null,
      colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
    };
  },
  mounted() {
    axios
      .get("http://" + URLBACKEND + "/ming/v1/store/games/" + this.id)
      .then((response) => (this.game = response.data))
      .catch((error) => (this.errores = error.response.status));
  },
  watch: {
    errores: function(val) {
      if (val === 404) {
        this.$router.push({ path: "*" });
      }
    },
  },
};
</script>
