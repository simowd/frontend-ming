<template>
  <div>
    <v-container class="carrusel">
      <v-layout align-center justify-center>
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          height="600"
        >
          <v-carousel-item
            v-for="(image, i) in game.images"
            :key="i"
            transition="v-fade-transition"
          >
            <v-img :src="image" class="images" height="600"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-layout>
    </v-container>

    <div class="description">
      <h1>
        Descripción: <span class="desc">{{ game.game_description }}</span>
      </h1>
    </div>

    <div class="description">
      <v-row>
        <v-col></v-col>
        <v-col>
          <v-layout justify-center>
            <div class="price ma-5" v-if="game.price > 0 && game.sale === 0">
              $ {{ game.price }} USD
            </div>
            <div class="price ma-5" v-if="game.price > 0 && game.sale > 0">
              <div class="sale-prices">
                <p>
                  ${{
                    (game.price - (game.price * game.sale) / 100).toFixed(2)
                  }}
                  USD
                </p>
                <p :style="{ 'text-decoration': ' line-through' }">
                  ${{ game.price }} USD
                </p>
              </div>
            </div>
            <div class="price ma-5" v-if="game.price === 0 && game.sale === 0">
              Free to Play
            </div>
          </v-layout>
        </v-col>
        <v-col>
          <v-layout justify-center>
            <v-btn
              outlined
              color="#604244"
              class="ma-5"
              width="175"
              height="40"
              small
            >
              Añadir al carrito
            </v-btn>
          </v-layout>
        </v-col>
        <v-col>
          <v-layout justify-center>
            <v-btn
              outlined
              color="#66698c"
              class="ma-5"
              width="200"
              height="50"
              large
            >
              Comprar ahora
            </v-btn>
          </v-layout>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftColumn",
  props: ["game"],
};
</script>

<style lang="scss" scoped>
.carrusel {
  height: fit-content;
  width: 90%;
  margin-right: 0rem;
  margin-left: 5rem;
}

.images {
  border-radius: 2.5rem;
}

.description {
  margin-top: 1rem;
  margin-left: 5rem;
  width: 90%;
}
h1 {
  font-weight: 700;
  font-size: 1.7rem;
  text-align: justify;
}
.desc {
  font-weight: 500;
  font-size: 1.6rem;
}

.price {
  font-weight: 900;
  font-size: 1.5rem;
}

.sale-prices {
  font-size: 1.5rem;
  font-weight: 900;
}
</style>
