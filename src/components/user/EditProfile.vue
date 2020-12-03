<template >
  <v-card :loading="requestChanges" color="custom-color">
    <br /><br /><br /><br />
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" class="justify-center" align="center">
            <v-container grid-list-xl>
              <ImageInput v-model="avatar">
                <div slot="activator">
                  <v-avatar
                    size="300px"
                    v-ripple
                    v-if="!avatar"
                    class="grey lighten-3 mb-3"
                  >
                    <span>Click para agregar una imagen</span>
                  </v-avatar>
                  <v-avatar size="300px" v-ripple v-else class="mb-3">
                    <img :src="avatar" alt="avatar" />
                  </v-avatar>
                </div>
              </ImageInput>
              <v-slide-x-transition>
                <div v-if="avatar && saved == false">
                  <!-- AQUI ESTA EL BOTON PARA GUARDAR LA IMAGEN -->
                  <v-btn class="primary" @click="uploadImage" :loading="saving">
                    Guardar Avatar
                  </v-btn>
                  <!--  -->
                </div>
              </v-slide-x-transition>
            </v-container>
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
import ImageInput from "./ImageInput.vue";
import { URLBACKEND } from "@/assets/url.js";
import { firebaseConfig } from "@/assets/firebaseAPI.js";

import firebase from "firebase/app";
import "firebase/firebase-storage";

import { nanoid } from "nanoid";
export default {
  data: () => ({
    requestChanges: false,
    errorText: false,
    close: false,
    countries: [],
    userID: -1,
    selectedCountry: "",
    avatar: null,
    saving: false,
    saved: false,
    saveCancel: [],
  }),
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
  components: { ImageInput },

  watch: {
    avatar: {
      handler: function () {
        this.saved = false;
      },
      deep: true,
    },
  },
  created() {
    firebase.initializeApp(firebaseConfig);
    this.storage = firebase.storage();
    this.saveCancel = this.user;
  },
  mounted() {
    this.userID = this.$ls.get("id_user");
    axios
      .get("http://" + URLBACKEND + "/ming/v1/countries")
      .then((response) => {
        var gameInfo = response.data;
        for (var i = 0; i < gameInfo.length; i++) {
          this.countries.push(gameInfo[i].name);
        }
      });
    this.selectedCountry = this.user.usercountry;
    this.avatar = this.user.photoPathUser;
  },

  methods: {
    uploadImage() {
      this.saving = true;
      var self = this;
      var storageRef = firebase.storage().ref();
      console.log(storageRef);
      var type = this.avatar.imageFile.name.split(".").pop();
      var nuid = nanoid();
      var uploadTask = storageRef
        .child("profile/" + nuid + "." + type)
        .put(this.avatar.imageFile);
      uploadTask.on(
        "state_changed",
        function (snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          console.log(error);
        },
        function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("File available at", downloadURL);
            self.savedAvatar(downloadURL);
          });
        }
      );
    },
    savedAvatar(URL) {
      this.saving = false;
      this.saved = true;
      // PARA DEVOLVER EL LINK Y QUE SE ACTUALICE EN EL PROFILE
      this.user.photoPathUser = URL;
    },
    dialogClose() {
      this.$emit("changedUser", this.saveCancel);
      this.$emit("dialogClosed", !this.dialogProfile);
    },
    sendEditData() {
      this.requestChanges = true;
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
          this.user.usercountry = this.selectedCountry;
          if (response.status == 200) {
            self.$emit("dialogClosed", false);
            self.$emit("success", true);
            self.$emit("changedUser", this.user);
            this.requestChanges = false;
            let cookie = JSON.parse(this.$ls.get("data"));
            cookie.photo_path = this.user.photoPathUser;
            this.$ls.set("data", JSON.stringify(cookie));
          } else {
            self.$emit("dialogClosed", false);
            console.log("not 200");
          }
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
.custom-color {
  /* background-color: rgb(141, 141, 141); */
  border-color: rgb(255, 255, 255);
}
</style>