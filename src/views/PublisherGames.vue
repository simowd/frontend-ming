<template>
  <div class="background-image">
    <NavBarPublisher />
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
    <img src="@/assets/add-control.png" class="img" @click="addGame" />
    <v-row no-gutters>
      <v-col v-for="(game, index) in gameInfo" :key="index" cols="12" sm="4">
        <GameCard
          @statusGame="updatePage"
          :title="game.title"
          :price="game.price"
          :id="game.id"
          :color="game.color"
          :banner="game.banner"
          :highlighted="game.highlight"
          :sale="game.sale"
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
import GameCard from "../components/publisher/GameCard.vue";
import NavBarPublisher from "../components/generic/NavBarPublisher.vue";
import { URLBACKEND } from "@/assets/url.js";
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";

export default {
  name: "HomePage",
  components: {
    GameCard,
    NavBarPublisher,
    InfiniteLoading,
  },
  data() {
    return {
      page: 1,
      gameInfo: [],
      title: "",
      idPublisher: null,
      aux: 0,
    };
  },

  methods: {
    getGames: function ($state) {
      this.idPublisher = this.$route.params.id;

      axios
        .get(
          "http://" +
            URLBACKEND +
            "/ming/v1/games?page=" +
            this.page +
            "&publisher=" +
            this.idPublisher
        )
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
    addGame() {
      this.idPublisher = this.$route.params.id;
      this.$router.push("/publisher/add-game/" + this.idPublisher);
    },
    updatePage() {
      this.aux++;
    },
  },
  watch: {
    aux: function (val) {
      console.log(val);
      console.log("Estas dentro");
      if (val === 1) {
        this.gameInfo = [];
        this.page = 1;
        this.$refs.infiniteLoading.stateChanger.reset();
        console.log(this.$refs.infiniteLoading);
        val = 0;
      }

      console.log("Estas afuera");
    },
    title: function (val) {
      const info = {
        query: val,
      };
      this.idPublisher = this.$route.params.id;
      if (val === "") {
        // location.reload();
        this.gameInfo = [];
        this.page = 1;
        this.$refs.infiniteLoading.stateChanger.reset();
      } else {
        axios
          .get(
            "http://" +
              URLBACKEND +
              "/ming/v1/games?page=1&publisher=" +
              this.idPublisher +
              "",
            {
              params: info,
            }
          )
          .then((response) => (this.gameInfo = response.data));
      }
    },
  },
};
</script>
<style scoped>
.img {
  width: 70px;
  height: 70px;
  cursor: pointer;
  margin-left: 10rem;
}
</style>
         