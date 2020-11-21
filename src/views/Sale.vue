<template>
  <div >
   <NavBar/>
   <Carousel/> 
   <SearchBar/>

<div v-for="(game,index) in gameInfo" :key="index" cols="12" sm="6">
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

  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import Carousel from "../components/sale/Carousel.vue";
import SearchBar from "../components/sale/SearchBarSale.vue";
import SaleCards from "../components/sale/SaleCards.vue";
import axios from "axios";

export default {
  name: 'Sale',
  components: {
   NavBar,
   Carousel,
   SearchBar,
   SaleCards
  },

  data() {
    return {
      gameInfo: null,
    };
  },

  mounted() {
    axios
      .get("http://localhost:8080/ming/v1/games?page=1&sale=true")
      .then((response) => (this.gameInfo = response.data));
  },
}
</script>
