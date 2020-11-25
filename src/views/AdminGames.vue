<template>
  <div class="background-image">
    <NavBarAdmin />
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
          :highlighted="game.highlight"
        />
      </v-col>
    </v-row>

    <infinite-loading @infinite="getGames" ref="infiniteLoading">
      <div slot="no-more">
        <img src="@/assets/huachimingo.png" width="200px" height="200px" />
        <p class="info-footer">¡Llegaste al final!</p>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import GameCard from "../components/admin/GameCard.vue";
import NavBarAdmin from "../components/generic/NavBarAdmin.vue";
import { URLBACKEND } from "@/assets/url.js";
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";


export default {
  name: "HomePage",
  components: {
    GameCard,
    NavBarAdmin,
    InfiniteLoading,
  },
  data() {
    return {
      page: 1,
      gameInfo: [],
      title: "",
    };
  },
  methods: {
    getGames: function ($state) {
      axios
        .get("http://" + URLBACKEND + "/ming/v1/games?page=" + this.page)
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
  watch: {
    title: function (val) {
      const info = {
        query: val,
      };
      if (val === "") {
        // location.reload();
        this.gameInfo = []
        this.page = 1
        this.$refs.infiniteLoading.stateChanger.reset();
      } else {
        axios
          .get("http://" + URLBACKEND + "/ming/v1/games?page=1", {
            params: info,
          })
          .then((response) => (this.gameInfo = response.data));
      }
    },
  },
};
</script>
