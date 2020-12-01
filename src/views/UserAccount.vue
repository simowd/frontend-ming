<template>
  <div class="background-image">
    <NavBar />
    <v-row no-gutters>
      <v-col align="right">
        <v-card height="150px" width="150px">
          <v-img :src="photoPathUser" height="150px" width="150px" />
        </v-card>
        <!-- <img src="../assets/account_img.png" height="150px"/> -->
      </v-col>
      <v-col align="center">
        <p>Nombre de Usuario/Apodo</p>
        <p>{{ username }} / {{ usernickname }}</p>
        <p>Correo Electronico</p>
        <p v-text="usermail"></p>
        <p>Pais</p>
        <p v-text="usercountry"></p>
      </v-col>
      <v-col align="left">
        <v-dialog v-model="dialogProfile" persistent max-width="600px">
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
              Editar Perfil
            </v-btn>
          </template>
          <EditProfile
            :dialogProfile="dialogProfile"
            @dialogClosed="dialogProfile = $event"
            :photoPathUser="photoPathUser"
          />
        </v-dialog>
        <br />
        <br />
        <v-dialog v-model="dialogPassword" width="500">
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
              Cambiar Contraseña
            </v-btn>
          </template>
          <ChangePassword
            :dialogPassword="dialogPassword"
            @dialogClosed="dialogPassword = $event"
            :userID="userID"
          />
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

    <v-row no-gutters>
      <v-col v-for="(game, index) in gameInfo" :key="index" cols="12" sm="4">
        <!-- <GameCard
          :title="game.title"
          :price="game.price"
          :id="game.id"
          :color="game.color"
          :banner="game.banner"
        /> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import { URLBACKEND } from "@/assets/url.js";
import axios from "axios";
import ChangePassword from "../components/user/ChangePassword.vue";
import EditProfile from "../components/user/EditProfile.vue";
export default {
  name: "UserAccount",
  components: {
    NavBar,
    ChangePassword,
    EditProfile,
  },
  data() {
    return {
      page: 1,
      gameInfo: [],
      photoPathUser: "",
      title: "",
      username: "Username",
      usernickname: "NickName",
      usermail: "sample@yahoo.com",
      usercountry: "Some Country",
      dialogPassword: false,
      dialogProfile: false,
      userID: 8,
    };
  },
  mounted() {
    // http://localhost:8080/ming/v1/countries

    axios
      .get("http://" + URLBACKEND + "/ming/v1/users/" + this.userID)
      .then((response) => {
        // this.gameInfo = response.data;
        // console.log(response.data);
        this.username = response.data.username;
        this.usernickname = response.data.alias;
        this.usermail = response.data.email;
        this.usercountry = response.data.country;
        this.photoPathUser = response.data.photo_path;
      });
    // axios
    //   .post("https://" + URLBACKEND + "/ming/user", {
    //     name: "Erica",
    //     lastname: "Butcher",
    //     username: "Crash Bandicoot",
    //     alias: "Crash",
    //     email: "contra@gmail.com",
    //     password: "contra707",
    //   })
    //   .then(function (response) {
    //     console.log(response);
    //   });
  },
  methods: {},
  watch: {
    title: function (val, oldval) {
      const info = {
        query: val,
      };
      console.log(oldval);
      if (val === "") {
        location.reload();
        axios
          .get("http://" + URLBACKEND + "/ming/v1/users/1/library")
          .then((response) => (this.gameInfo = response.data));
      } else {
        axios
          .get("http://" + URLBACKEND + "/ming/v1/users/1/library", {
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