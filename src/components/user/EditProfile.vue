<template >
  <v-card :loading="requestChanges">
    <br /><br /><br /><br />
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" class="justify-center" align="center">
            <v-card round class="rounded-card" height="300px" width="300px">
              <v-img
                :src="user.photoPathUser"
                max-height="300px"
                max-width="300px"
              />
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Apodo"
              required
              v-model="user.usernickname"
              outlined
              color="black"
              class="ma-4"
              width="280"
              height="50"
            ></v-text-field>
            <v-text-field
              label="Email"
              required
              v-model="user.usermail"
              outlined
              color="black"
              class="ma-4"
              width="280"
              height="50"
            ></v-text-field>
            <v-select
              v-model="selectedCountry"
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
    <v-card-subtitle
      align="center"
      v-if="errorText"
      class="red--text pt-2"
      style="font-size: 1.5em"
    >
      * Todos los campos deben ser completados
    </v-card-subtitle>
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
        @click="sendEditData"
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
      requestChanges: false,
      errorText: false,
      close: false,
      countries: [],
      userID: this.$ls.get("id_user"),
      selectedCountry: "",
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
    this.selectedCountry = this.user.usercountry;
  },
  props: {
    dialogProfile: { type: Boolean },
    photoPathUser: { type: String },
    user: {
      default: {
        username: "Username",
        usernickname: "NickName",
        usermail: "sample@yahoo.com",
        usercountry: "Some Country",
        photoPathUser: require("../../assets/huachimingo.png"),
      },
    },
  },
  methods: {
    dialogClose() {
      this.$emit("dialogClosed", !this.dialogProfile);
    },
    sendEditData() {
      this.requestChanges = true;
      // console.log(this.countries.indexOf(this.selectedCountry) + 1);
      var self = this;
      axios
        .put(
          "http://" + URLBACKEND + "/ming/v1/users/" + this.userID,
          {
            name: this.user.username,
            lastname: this.user.username,
            alias: this.user.usernickname,
            email: this.user.usermail,
            id_country: this.countries.indexOf(this.selectedCountry) + 1,
            photo_path: this.user.photoPathUser,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log(response.status);
          console.log(this.user);
          if (response.status == 200) {
            self.$emit("dialogClosed", false);
            self.$emit("success", true);
            self.$emit("changedUser", this.user);
            this.requestChanges = false;
          } else {
            self.$emit("dialogClosed", false);
            console.log("not 200");
          }
          console.log("response");
        })
        .catch((error) => {
          console.log(error.response);
          this.requestChanges = false;
          this.errorText = true;
        })
        .catch((error) => {
          console.log(error.response + "");
        });
    },
  },
};
</script>

<style scoped>
.rounded-card {
  border-radius: 50%;
}
</style>