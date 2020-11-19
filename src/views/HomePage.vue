<template>
  <div>
    <NavBar />
    <SearchBar />

    <v-row no-gutters>
      <v-col v-for="(game,index) in gameInfo" :key="index" cols="12" sm="4">
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
import SearchBar from "../components/generic/SearchBar.vue";
import axios from "axios";

export default {
  name: "HomePage",
  components: {
    GameCard,
    SearchBar,
    NavBar,
  },
  data() {
    return {
      gameInfo: null,
    };
  },

  mounted() {
    axios
      .get("http://localhost:8080/ming/v1/games?page=1")
      .then((response) => (this.gameInfo = response.data));
  },
};
</script>