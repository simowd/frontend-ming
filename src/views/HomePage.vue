<template>
  <div>
    <div class="background-image1">
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
  </div>
</template>

<script>
import GameCard from "../components/generic/GameCard.vue";
import NavBar from "../components/generic/NavBar.vue";

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
    var url1 = "ec2-34-234-223-198.compute-1.amazonaws.com:8080";
    // var url2="localhost:8080"
    axios
      .get("http://" + url1 + "/ming/v1/games?page=1")
      .then((response) => (this.gameInfo = response.data));
  },
  watch: {
    title: function (val, oldval) {
      const info = {
        query: val,
      };
      var url1 = "ec2-34-234-223-198.compute-1.amazonaws.com:8080";

      console.log(oldval);
      if (val === "") {
        axios
          .get("http://" + url1 + "/ming/v1/games?page=1")
          .then((response) => (this.gameInfo = response.data));
      } else {
        axios
          .get("http://" + url1 + "/ming/v1/games?page=1", { params: info })
          .then((response) => (this.gameInfo = response.data));
      }
    },
  },
};
</script>