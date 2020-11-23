<template>
  <div class="background-image">
    <NavBar />
    <v-row>
      <v-col align="right"><img src="../assets/account_img.png" /></v-col>
      <v-col align="center">
        <p>Nombre de Usuario/Apodo</p>
        <p v-text="username"></p>
        <p>Correo Electronico</p>
        <p v-text="usermail"></p>
        <p>Pais</p>
        <p v-text="usercountry"></p>
      </v-col>
      <v-col align="left">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              elevation="10"
              v-bind="attrs"
              v-on="on"
              large
              raised
              small
              x-large
            >
              Editar Perfil
            </v-btn>
          </template>
          <ChangePassword v-model="dialogPassword" />
        </v-dialog>

        <br />
        <br />
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              depressed
              elevation="10"
              large
              raised
              small
              x-large
            >
              Cambiar contraseña
            </v-btn>
          </template>
          <EditProfile v-model="dialogProfile" />
        </v-dialog>
      </v-col>
    </v-row>
    <div class="account-label-container">
      <v-row no-gutters>
        <v-col cols="6">
          <p align="center">Biblioteca</p>
        </v-col>
        <v-col cols="6">
          <div class="search-bar">
            <v-text-field
              label="Buscar en mi Biblioteca"
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
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import { URLBACKEND } from "@/assets/url.js";
import axios from "axios";
import ChangePassword from "../components/user/ChangePassword.vue";
import EditProfile from "../components/user/EditProfile.vue";
export default {
  name: "HomePage",
  components: {
    NavBar,
    ChangePassword,
    EditProfile,
  },
  data() {
    return {
      page: 1,
      gameInfo: [],
      title: "",
      username: "Fulano",
      usernickname: "CosmeFulano",
      usermail: "cosmefulano@yahoo.com",
      usercountry: "Bolivia",
      dialogPassword: false,
      dialogProfile: false,
    };
  },
  // mounted() {
  //   axios
  //     .get("http://" + URLBACKEND + "/ming/v1/games?page=1")
  //     .then((response) => (this.gameInfo = response.data));
  // },
  methods: {
    getGames: function ($state) {
      axios
        .get("http://" + URLBACKEND + "/ming/v1/games?page=" + this.page)
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
        location.reload();

        // axios
        //   .get("http://" + URLBACKEND + "/ming/v1/games?page=2")
        //   .then((response) => (this.gameInfo = response.data));
      } else {
        axios
          .get("http://" + URLBACKEND + "/ming/v1/games?page=1", {
            params: info,
          })
          .then((response) => (this.gameInfo = response.data));
      }
    },
  },
};
</script>

<style>
#text {
  padding-top: 2rem;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  font-weight: bold;
  color: #707070;
  font-size: 2rem;
}
</style>