<template>
  <v-card>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card height="150px" width="150px">
              <v-img :src="photoPathUser" height="150px" width="150px" />
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Apodo"
              required
              v-model="userNickname"
            ></v-text-field>
            <v-text-field
              label="Email"
              required
              v-model="userEmail"
            ></v-text-field>
            <v-select :items="countries" label="Pais" single></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="dialogClose"> Cancelar </v-btn>
      <v-btn color="blue darken-1" text @click="dialogClose">
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
    // const res =
    // axios
    //   .put(
    //     "http://" + URLBACKEND + "/ming/v1/users/" + this.userID + "/password",
    //     { old_password: "new", new_password: "qwerty12345" },
    //     { headers: { "Content-Type": "application/json" } }
    //   )
    //   .then(function (response) {
    //     console.log(response);
    //   });
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

<style>
</style>