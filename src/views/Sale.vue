<template>
  <div class="background-image">
    <NavBar />
    <Carousel />
    
    <div class="ofertas-label-container">
      <v-row no-gutters>
        <v-col cols="6">
          <p>
            Ofertas
          </p>
        </v-col>
        <v-col cols="6">
          
            <div class="search-bar" >
              <v-text-field
                label="Buscar en Ofertas"
                outlined
                v-model="title"
                color="#707070"
                append-icon="mdi-magnify"
                dense
              >
              </v-text-field>
            </div>
          
        </v-col>
      </v-row>
    </div>

    <div v-for="(game, index) in gameInfo" :key="index" cols="12" sm="6">
      <SaleCards
        :title="game.title"
        :price="game.price"
        :id="game.id"
        :color="game.color"
        :banner="game.banner"
        :sale="game.sale"
        :release_date="game.release_date"
      />
    </div>

    <infinite-loading @infinite="getGames" ref="infiniteLoading">
      <div slot="no-more">
        <img src="@/assets/huachimingo.png" width="200px" height="200px" />
        <p class="info-footer">¡Llegaste al final!</p>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import Carousel from "../components/sale/Carousel.vue";
import SaleCards from "../components/sale/SaleCards.vue";
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "Sale",
  components: {
    NavBar,
    Carousel,
    SaleCards,
    InfiniteLoading
  },

  data() {
    return {
      gameInfo: [],
      page:1,
      title:""
    };
  },

   methods: {
    getGames: function ($state) {
      axios
        .get("http://" + URLBACKEND + "/ming/v1/games?page="+this.page+"&sale=true")
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
    title: function (val, oldval) {
      const info = {
        query: val,
      };

      console.log(oldval);

      if (val === "") {
        console.log(this.gameInfo)
        this.gameInfo = []
        this.page = 1
        this.$refs.infiniteLoading.stateChanger.reset();
      } else {
        axios
          .get("http://"+URLBACKEND+"/ming/v1/games?page=1&sale=true", {
            params: info,
          })
          .then((response) => (this.gameInfo = response.data));
      }
    },
  },

  // mounted() {
  //   axios
  //     .get("http://" + URLBACKEND + "/ming/v1/games?page=1&sale=true")
  //     .then((response) => (this.gameInfo = response.data));
  // },
};
</script>
