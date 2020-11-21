<template>
  <div class="background-image">
    <NavBar />
    <div class="container-search-bar">
      <div class="search-bar">
        <v-text-field
          label="Buscar Juego"
          outlined
          color="#707070"
          append-icon="mdi-magnify"
          dense
          v-model="title"
        >
        </v-text-field>
      </div>
    </div>

    <v-row no-gutters>
      <v-col v-for="(game, index) in gameInfo" :key="index" cols="12" sm="4">
        <GameCard
          :title="game.title"
          :price="game.price"
          :id="game.id"
          :color="game.color"
          :banner="game.banner"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GameCard from "../components/generic/GameCard.vue";
import NavBar from "../components/generic/NavBar.vue";
import {URLBACKEND} from "@/assets/url.js"

import axios from "axios";

export default {
  name: "HomePage",
  components: {
    GameCard,
    NavBar,
  },
  data() {
    return {
      gameInfo: [],
      title: "",
    };
  },
  mounted() {

    axios
      .get("http://" + URLBACKEND + "/ming/v1/games?page=1")
      .then((response) => (this.gameInfo = response.data));
  },
  watch: {
    title: function (val, oldval) {
      const info = {
        query: val,
      };
    

      console.log(oldval);
      if (val === "") {
        axios
          .get("http://" + URLBACKEND + "/ming/v1/games?page=1")
          .then((response) => (this.gameInfo = response.data));
      } else {
        axios
          .get("http://" + URLBACKEND + "/ming/v1/games?page=1", { params: info })
          .then((response) => (this.gameInfo = response.data));
      }
    },
  },
};
</script>