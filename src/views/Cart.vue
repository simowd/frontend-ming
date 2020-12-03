<template>
  <div class="background-image">
    <NavBar />
    <div v-for="(game, index) in gameInfo" :key="index" cols="12" sm="6">
      <SaleCards
        :color="game.color"
        :id="game.id"
        :banner="game.images[0]"
        :price="game.price"
        :sale="game.sale"
        :release_date="game.releaseDate"
        :title="game.title"
      />
    </div>
    <InfiniteLoading @infinite="getGames" ref="infiniteLoading">
      <div slot="no-more">
        <img src="@/assets/huachimingo.png" width="200px" height="200px" />
        <p class="info-footer">¡Llegaste al final!</p>
      </div>
    </InfiniteLoading>
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import SaleCards from "../components/sale/SaleCards.vue";
import { URLBACKEND } from "@/assets/url.js";
import axios from "axios";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "Cart",
  data: () => ({
    gameInfo: [],
    userID: 3,
  }),
  components: {
    NavBar,
    SaleCards,
    InfiniteLoading,
  },
  mounted() {
    // axios
    //   .get("http://" + URLBACKEND + "/ming/users/" + this.userID + "/cart")
    //   .then((response) => {
    //     if (response.data.length) {
    //       // this.gameInfo.push(...response.data);
    //       var res = response.data;
    //       res.forEach((element) => {
    //         console.log(element);
    //         this.gameInfo.push(element);
    //         // this.gameInfo.push({
    //         //   id: element.id,
    //         //   title: element.title,
    //         //   players: element.players,
    //         //   releaseDate: element.releaseDate,
    //         //   price: element.price,
    //         // });
    //       });
    //       console.log(res.length);
    //     }
    //   });
  },
  methods: {
    getGames($state) {
      //   this.gameInfo.push({
      //     id: 3,
      //     title: "Overcooked",
      //     players: 1,
      //     releaseDate: 1606708800000,
      //     price: 19.99,
      //   });
      axios
        .get("http://" + URLBACKEND + "/ming/users/" + this.$ls.get("id_user") + "/cart")
        .then((response) => {
          if (response.data.length) {
            // var res = response.data;
            // this.gameInfo = res;
            this.gameInfo.push(...response.data);
            $state.loaded();
            console.log(this.gameInfo[0].sale);
          }
          //   else {
          $state.complete();
          // }
        });
    },
  },
};
</script>

<style>
</style>