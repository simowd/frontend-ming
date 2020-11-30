<template>
  <div>
    <div class="card">
      <div
        class="game-image"
        :style="{
          backgroundImage: 'url(' + banner + ')',
          boxShadow: '0 0.5px 2rem ' + color + '',
        }"
      ></div>
      <div
        class="game-card-publisher"
        :style="{
          width: '80%',
        }"
      >
        <div class="game-info">
          <p>{{ title }}<br /></p>
          <p v-if="price == 0">Free to Play</p>
          <div
            v-else-if="sale > 0"
            :style="{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              marginLeft: '0rem',
            }"
          >
            <!-- <p class="home-page-discount">- {{ sale }} %</p> -->
            <p>${{ (price - (price * sale) / 100).toFixed(2) }} USD -</p>
            <p class="text-sale">${{ price }} USD</p>
          </div>

          <p v-else>${{ price }} USD</p>
        </div>
        <div class="game-card-publisher-icons">
          <img
            src="@/assets/edit.png"
            @click="editGame(id)"
            width="35px"
            height="35px"
            :style="{ cursor: 'pointer', marginRight: '1rem' }"
          />

          <v-dialog v-model="dialog" persistent max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <img
                src="@/assets/delete.png"
                width="35px"
                height="35px"
                dark
                v-bind="attrs"
                v-on="on"
                :style="{
                  cursor: 'pointer',
                  marginLeft: '1rem',
                  marginRight: '5rem',
                }"
              />
            </template>
            <v-card>
              <v-card-title class="headline">
                ¿Desea eliminar juego?
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">
                  Cancelar
                </v-btn>

                <v-btn color="#49a82c" text @click="deleteGame(id)">
                  Eliminar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <p v-if="sale > 0" class="home-page-discount">- {{ sale }} %</p>
    </div>
  </div>
</template>

<script>
import { URLBACKEND } from "@/assets/url.js";
import axios from "axios";

export default {
  name: "GameCard",
  data() {
    return {
      dialog: false,
      aux: null,
    };
  },
  inheritAttrs: true,
  props: {
    title: String,
    price: Number,
    banner: String,
    id: String,
    color: String,
    highlighted: Number,
    sale: Number,
  },
  methods: {
    deleteGame(id) {
      axios
        .delete("http://" + URLBACKEND + "/ming/publisher/" + id + "/game")
        .then((result) => {
          console.log(result);
          this.$emit("statusGame");
        });
      // location.reload()
      this.dialog = false;
    },
    editGame(id) {
      this.$router.push("/publisher/edit-game/" + id);
    },
  },
};
</script>

<style scoped>
.text-sale {
  text-decoration: line-through;
}

.home-page-discount {
  font-size: 1.5rem;
  font-weight: 300;
  height: 3rem;
  text-align: center;
  margin-top: -0.5rem;
  margin-left: 19rem;
  padding-top: 0.4rem;
  margin-right: 6rem;
  border-color: #49a82c;
  border-style: solid;
  border-width: thin;
  color: #49a82c;
  width: 20%;
}
</style>
