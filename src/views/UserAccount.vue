<template>
  <div class="background-image">
    <NavBar />
    <div align="center">
      <v-alert
        :value="alert"
        v-model="alertPass"
        dismissible
        color="blue"
        border="left"
        elevation="2"
        colored-border
        width="80%"
        icon="mdi-information"
        >Datos editados correctamente
      </v-alert>
    </div>
    <v-row no-gutters>
      <v-col align="right">
        <v-card round class="rounded-card" height="200px" width="200px">
          <v-img :src="photoPathUser" max-height="200px" max-width="200px" />
        </v-card>
        <!-- <img src="../assets/account_img.png" height="150px"/> -->
      </v-col>
      <v-col align="center">
        <div class="text-info">
          <!-- <v-card> -->
          <p class="bold_text">Nombre de Usuario / Apodo</p>
          <p>{{ username }} / {{ usernickname }}</p>
          <p class="bold_text">Correo Electronico</p>
          <p v-text="usermail"></p>
          <p class="bold_text">Pais</p>
          <p v-text="usercountry"></p>
          <!-- </v-card> -->
        </div>
      </v-col>
      <v-col align="left">
        <v-dialog v-model="dialogProfile" persistent max-width="80%">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              depressed
              large
              raised
              small
              x-large
              outlined
              color="black"
              class="ma-4"
              width="280"
              height="50"
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
        <v-dialog v-model="dialogPassword" width="60%">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              depressed
              v-bind="attrs"
              v-on="on"
              large
              raised
              small
              x-large
              outlined
              color="black"
              class="ma-4"
              width="280"
              height="50"
            >
              Cambiar Contraseña
            </v-btn>
          </template>
          <ChangePassword
            :dialogPassword="dialogPassword"
            @dialogClosed="dialogPassword = $event"
            @success="alertPass = $event"
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
        <GameCard
          :title="game.title"
          :price="game.price"
          :id="game.id"
          :color="game.color"
          :banner="game.banner"
          :sale="game.sale"
        />
      </v-col>
    </v-row>
    <infinite-loading @infinite="getGames" ref="infiniteLoading">
      <div slot="no-more">
        <img src="@/assets/huachimingo.png" width="200px" height="200px" />
        <p class="info-footer">¡Llegaste al final!</p>
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import NavBar from "../components/generic/NavBar.vue";
import { URLBACKEND } from "@/assets/url.js";
import axios from "axios";
import ChangePassword from "../components/user/ChangePassword.vue";
import EditProfile from "../components/user/EditProfile.vue";
import GameCard from "../components/generic/GameCard";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "UserAccount",
  components: {
    NavBar,
    ChangePassword,
    EditProfile,
    GameCard,
    InfiniteLoading,
  },
  data() {
    return {
      gameInfo: [],
      photoPathUser: "",
      title: "",
      username: "Username",
      usernickname: "NickName",
      usermail: "sample@yahoo.com",
      usercountry: "Some Country",
      dialogPassword: false,
      dialogProfile: false,
      alertPass: false,
      userID: 3,
    };
  },
  mounted() {
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
  methods: {
    getGames: function ($state) {
      axios
        .get(
          "http://" + URLBACKEND + "/ming/v1/users/" + this.userID + "/library"
        )
        .then((response) => {
          // if (response.data.length) {
          this.gameInfo.push(...response.data);
          $state.loaded();
          // } else {
          $state.complete();
          // }
        });
    },
  },
  watch: {
    title: function (val, oldval) {
      const info = {
        query: val,
      };
      console.log(oldval);
      console.log(info);

      if (val === "") {
        // location.reload();
        // console.log(this.gameInfo);
        this.gameInfo = [];
        this.page = 1;
        this.$refs.infiniteLoading.stateChanger.reset();
      } else {
        axios
          .get(
            "http://" +
              URLBACKEND +
              "/ming/v1/users/" +
              this.userID +
              "/library",
            {
              params: info,
            }
          )
          .then((response) => (this.gameInfo = response.data));
      }
    },
  },
};
</script>

<style scoped>
#text {
  padding-top: 2rem;
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  font-weight: bold;
  color: #707070;
  font-size: 2rem;
}
.text-info {
  font-size: 1.3rem;
  text-size-adjust: inherit;
  width: 70%;
  text-align: center;
}
.rounded-card {
  border-radius: 50%;
}
.bold_text {
  font-weight: 900;
}
</style>