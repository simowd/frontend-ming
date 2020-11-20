<template>
  <div>
    <NavBar />
    <div class="container-search-bar">
      <div class="search-bar">

        <v-text-field
          label="Buscar Juego"
          outlined
          color="#707070"
          append-icon="mdi-magnify"
          dense
          v-on:keyup.enter="searchData"
          v-model="search"
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

import axios from "axios";

export default {
  name: "HomePage",
  components: {
    GameCard,

    NavBar,
  },
  data() {
    return {
      gameInfo: null,
      search: "",
    };
  },
  methods: {
    searchData() {
      const info = {
        query: this.search,
      };
      axios
        .get("http://localhost:8080/ming/v1/games?page=1", { params: info })
        .then((response) => (this.gameInfo = response.data));
    },
  },

  mounted() {
    axios
      .get("http://localhost:8080/ming/v1/games?page=1")
      .then((response) => (this.gameInfo = response.data));
  },
};
</script>