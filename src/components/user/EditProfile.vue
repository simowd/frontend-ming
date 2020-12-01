<template >
  <v-card>
    <br /><br /><br /><br />
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" class="justify-center" align="center">
            <v-card round class="rounded-card" height="300px" width="300px">
              <v-img
                :src="photoPathUser"
                max-height="300px"
                max-width="300px"
              />
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Apodo"
              required
              v-model="userNickname"
              outlined
              color="black"
              class="ma-4"
              width="280"
              height="50"
            ></v-text-field>
            <v-text-field
              label="Email"
              required
              v-model="userEmail"
              outlined
              color="black"
              class="ma-4"
              width="280"
              height="50"
            ></v-text-field>
            <v-select
              :items="countries"
              label="Pais"
              single
              outlined
              color="black"
              class="ma-4"
              width="140"
              height="50"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn
        color="red"
        outlined
        class="ma-4"
        width="280"
        height="50"
        text
        @click="dialogClose"
      >
        Cancelar
      </v-btn>
      <v-btn
        color="green"
        outlined
        class="ma-4"
        width="280"
        height="50"
        text
        @click="dialogClose"
      >
        Actualizar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import { URLBACKEND } from "@/assets/url.js";
export default {
  data() {
    return {
      close: false,
      countries: [],
      userID: 8,
      userNickname: "",
      userEmail: "",
    };
  },

  mounted() {
    axios
      .get("http://" + URLBACKEND + "/ming/v1/countries")
      .then((response) => {
        var gameInfo = response.data;
        for (var i = 0; i < gameInfo.length; i++) {
          // console.log(gameInfo[i].name);
          this.countries.push(gameInfo[i].name);
        }
        // console.log(this.countries);
      });
  },
  props: ["dialogProfile", "photoPathUser"],
  methods: {
    dialogClose() {
      this.$emit("dialogClosed", !this.dialogProfile);
    },
    sendEditData() {
      this.dialogClose();
    },
  },
};
</script>

<style scoped>
.rounded-card {
  border-radius: 50%;
}
</style>