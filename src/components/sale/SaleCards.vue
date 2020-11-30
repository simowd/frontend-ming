<template>
  <div>
    <div>
      <v-row no-gutters class="card-sale-list" @click="game">
        <v-col cols="4">
          <div>
            <img class="card-sale-image" v-bind:src="banner" />
          </div>
        </v-col>
        <v-col cols="3">
          <div class="sale-game-title">
            {{ title }}
          </div>
          <div class="sale-game-date">
            <p>{{ release_date.substr(0, release_date.indexOf(" ")) }}<br /></p>
          </div>
        </v-col>
        <v-col cols="3">
          <div class="sale-game">- {{ sale }} %</div>
        </v-col>
        <v-col cols="2">
          <div class="sale-prices">
            <p>
              ${{ (price - (price * sale) / 100).toFixed(2) }}
              USD
            </p>
            <p :style="{'text-decoration':' line-through'}">${{ price }} USD</p>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaleCards",
  props: ["title", "price", "banner", "id", "color", "sale", "release_date"],

  methods:{
    
    game() {
      this.$router.push("/games/" + this.id);
    },
  },
};
</script>

<style scoped>
.sale-game-title {
  font-size: 3.5rem;
  font-weight: 300;
  font-family: 'Montserrat', sans-serif;
  margin-top: 2rem;
  text-align: left;
  
}

.sale-game-date {
  font-size: 1.7rem;
  font-weight:300;
  margin-top: 2rem;
  text-align: left;
}

.sale-game{
  font-size: 3rem;
  font-weight: 300;
  width: 45%;
  height: 5rem;
  text-align: center;
  margin-top: 6.3rem;
  margin-left: 10rem;
  padding-top: 0.3rem;
  border-color: #49a82c;
  border-style: solid;
  border-width: thin;
  color: #49a82c;
}

.sale-prices{
  font-size: 2.5rem;
  text-align: center;
  margin-top: 4.3rem;
  margin-right: 2rem;
  font-weight:200;
}
</style>
