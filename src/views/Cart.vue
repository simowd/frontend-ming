<template>
  <div class="background-image">
    <NavBar />
    <div align="center">
      <v-alert
        :value="alertBought"
        v-model="alertBought"
        dismissible
        border="top"
        color="blue"
        elevation="15"
        type="success"
        class="alert"
        colored-border
        width="60%"
        >Compra exitosa!
      </v-alert>
    </div>
    <v-row no-gutters v-for="(game, index) in gameInfo" :key="index">
      <v-col cols="12" sm="10">
        <SaleCards
          :color="game.color"
          :id="game.id"
          :banner="game.images[0]"
          :price="game.price"
          :sale="game.sale"
          :release_date="game.releaseDate"
          :title="game.title"
        >
        </SaleCards>
      </v-col>
      <v-col cols="12" sm="2">
        <v-card>
          <v-img
            :src="deleteImg"
            width="20%"
            align="center"
            @click="deleteGame(game.id, index)"
          ></v-img>
        </v-card>
      </v-col>
    </v-row>

    <InfiniteLoading @infinite="getGames" ref="infiniteLoading">
      <div slot="no-more">
        <p class="info-footer">¡Llegaste al final!</p>
      </div>
    </InfiniteLoading>
    <br />
    <v-divider />
    <v-spacer></v-spacer>
    <v-row no-gutters v-if="totalCart >= 0">
      <v-col cols="12" sm="6"></v-col>
      <v-col cols="12" sm="6">
        <v-card class="cardColor">
          <v-card-title class="sale-prices">
            Total ${{ totalCart }}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="7"></v-col>
      <v-col cols="12" sm="5">
        <v-card class="cardColor">
          <v-spacer></v-spacer>
          <v-card-actions
            ><v-btn class="buy-button" @click="buyCartGames"
              >Comprar</v-btn
            ></v-card-actions
          >
        </v-card>
      </v-col>
    </v-row>
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
    userID: 1,
    deleteImg: require("../assets/delete.png"),
    totalCart: -1.0,
    alertBought: false ,
  }),
  components: {
    NavBar,
    SaleCards,
    InfiniteLoading,
  },
  mounted() {
    // console.log(this.$ls.get("id_user"));
    this.userID = this.$ls.get("id_user");
  },
  methods: {
    buyCartGames() {
      axios
        .post(
          "http://" +
            URLBACKEND +
            "/ming/users/" +
            this.userID +
            "/cart/purchase"
        )
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            this.gameInfo = [];
            this.alertBought = true;
            this.updateTotal();
            this.dismissAlert();
          }
        });
    },
    async updateTotal() {
      if (this.gameInfo.length > 0) {
        var tot = 0;
        for (var i = 0; i < this.gameInfo.length; i++) {
          tot =
            tot +
            this.gameInfo[i].price -
            (this.gameInfo[i].price * this.gameInfo[i].sale) / 100;
        }
        tot = tot.toFixed(2);
        // for (;;) {
        //   if (this.totalCart < tot) {
        //     this.totalCart += 0.01;
        //   } else if (this.totalCart > tot) {
        //     this.totalCart -= 0.01;
        //   } else if (this.totalCart == 0.0) {
        //     break;
        //   }
        // }
        this.totalCart = tot;
      } else {
        this.totalCart = -1.0;
      }
    },
    deleteGame(id, index) {
      // console.log(id);
      console.log(index);
      axios
        .delete(
          "http://" + URLBACKEND + "/ming/" + this.userID + "/" + id + "/cart"
        )
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            for (var i = 0; i < this.gameInfo.length; i++) {
              if (i === index) {
                this.gameInfo.splice(i, 1);
              }
            }
            this.updateTotal();
          }
        });
    },
    dismissAlert() {
      setTimeout(() => {
        this.alertBought = false;
      }, 5000);
    },
    getGames($state) {
      //   this.gameInfo.push({
      //     id: 3,
      //     title: "Overcooked",
      //     players: 1,
      //     releaseDate: 1606708800000,
      //     price: 19.99,
      //   });
      axios
        .get(
          "http://" +
            URLBACKEND +
            "/ming/users/" +
            this.$ls.get("id_user") +
            "/cart"
        )
        .then((response) => {
          if (response.data.length) {
            // var res = response.data;
            // this.gameInfo = res;
            this.gameInfo.push(...response.data);
            $state.loaded();
            // console.log(this.gameInfo[0].sale);
            this.updateTotal();
          }
          //   else {
          $state.complete();
          // }
        });
    },
  },
};
</script>

<style scoped>
.buy-button {
  font-weight: 300;
  width: 45%;
  height: 5rem;
  text-align: center;
  padding-top: 0.3rem;
  border-color: #49a82c;
  border-style: solid;
  border-width: thin;
  color: #49a82c;
}

.sale-prices {
  font-size: 2.5rem;
  text-align: center;
  margin-top: 4.3rem;
  margin-right: 2rem;
  font-weight: 200;
}
.cardColor {
  background-color: rgba(255, 255, 255, 0.5) !important;
  border-color: white !important;
}
</style>