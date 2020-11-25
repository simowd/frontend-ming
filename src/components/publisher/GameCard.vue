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
      <div class="game-card-publisher">
        <div class="game-info">
          <p v-if="price == 0">
            {{ title }}<br />
            Free to Play
          </p>
          <p v-else>
            {{ title }}<br />
            ${{ price }} USD
          </p>
        </div>
        <div class="game-card-publisher-icons">
          <img
            src="@/assets/edit.png"
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
                <v-btn color="green darken-1" text @click="deleteGame(id)">
                  Eliminar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
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
    };
  },
  props: ["title", "price", "banner", "id", "color", "highlighted"],
  methods: {
    deleteGame(id) {
      axios
        .delete("http://"+URLBACKEND+"/ming/publisher/"+id+"/game")
        .then((result) => {
          console.log(result);
        });
        location.reload();
      this.dialog = false;
    },
  },
};
</script>

