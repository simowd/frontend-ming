<template>
  <div class="background-image">
    <NavBar />

    <v-row no-gutters>
      <v-col v-for="(game, index) in gameInfo" :key="index" cols="12" sm="6">
        <LatestGameCard
          :title="game.title"
          :price="game.price"
          :id="game.id"
          :color="game.color"
          :banner="game.banner"
          :description="game.description"
          :date="game.release_date"
        />
      </v-col>
    </v-row>

    <infinite-loading @infinite="getGames">
      <div slot="no-more">
        <img src="@/assets/huachimingo.png" width="200px" height="200px" />
        <p class="info-footer">¡Llegaste al final!</p>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import LatestGameCard from "@/components/latest/LatestGameCard.vue";
import axios from "axios";
import {URLBACKEND} from "@/assets/url.js"
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "LatestRelease",
  components: {
    NavBar,
    LatestGameCard,
    InfiniteLoading
  },
  data() {
    return {
      gameInfo: [],
      page: 1
    };
  },
 methods: {
    getGames($state) {
      axios
        .get("http://" + URLBACKEND + "/ming/v1/games?page="+this.page+"&latest=true")
        .then((response) => {
          if (response.data.length) {
            this.page += 1;
            this.gameInfo.push(...response.data);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },

};
</script>